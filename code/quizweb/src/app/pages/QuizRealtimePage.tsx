'use client'

import { useState, useEffect } from 'react'
import QuizDisplay from '@/components/QuizDisplay'
import ParticipantList from '@/components/ParticipantList'
import { joinQuiz as joinQuizAPI, answerQuiz as answerQuizAPI, getParticipants } from '../graphql/apiService'
import { Participant } from '../types/types'

const LIMIT = 10

export default function QuizRealtimePage() {
  const [quizId, setQuizId] = useState("")
  const [userId, setUserId] = useState("")
  const [joined, setJoined] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    if (!joined) return

    const eventSource = new EventSource(process.env.SSE_HOST || 'http://localhost:3003/sse')

    eventSource.onmessage = (event) => {
      const newParticipant: Participant = JSON.parse(event.data)
      if (newParticipant.quizId !== quizId) {
        return
      }

      setParticipants((prevParticipants) => {
        const updatedParticipants = prevParticipants.map((participant) =>
          participant.userId === newParticipant.userId && participant.quizId === newParticipant.quizId
            ? { ...participant, score: newParticipant.score }
            : participant
        )

        if (!updatedParticipants.some((p) => p.userId === newParticipant.userId && p.quizId === newParticipant.quizId)) {
          updatedParticipants.push(newParticipant)
        }

        // Sort by score and update positions
        return updatedParticipants
          .sort((a, b) => b.score - a.score)
          .map((participant, index) => ({ ...participant, position: index + 1 }))
      })
    }

    return () => {
      eventSource.close()
    }
  }, [joined, quizId])

  const joinQuiz = async (quizId: string, userId: string) => {
    try {
      await joinQuizAPI(quizId, userId)
      setQuizId(quizId)
      setUserId(userId)
      setJoined(true)

      fetchAllParticipants(quizId, LIMIT)
    } catch (error) {
      console.error('Error joining quiz:', error)
    }
  }

  const answerQuiz = async (quizId: string, userId: string, question: string, answer: string) => {
    try {
      await answerQuizAPI(quizId, userId, question, answer)
    } catch (error) {
      console.error('Error answering quiz:', error)
    }
  }

  const fetchAllParticipants = async (quizId: string, limit: number) => {
    let offset = 0
    let allParticipants: Participant[] = []
    let hasMoreData = true

    while (hasMoreData) {
      try {
        const { data } = await getParticipants(quizId, limit, offset)
        let fetchedParticipants: Participant[] = data.participants
        fetchedParticipants = fetchedParticipants.map((item) => ({...item, quizId}))

        if (fetchedParticipants.length < limit) {
          hasMoreData = false
        }

        allParticipants = [...allParticipants, ...fetchedParticipants]
        offset += limit
      } catch (error) {
        console.error('Error fetching participants:', error)
        hasMoreData = false
      }
    }
    console.log(participants)
    setParticipants(allParticipants)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Realtime</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <QuizDisplay onJoin={joinQuiz} onAnswer={answerQuiz} joined={joined}/>
        <ParticipantList participants={participants} />
      </div>
    </div>
  )
}


'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const dummyQuestions = Array.from({ length: 5 }, (_, i) => `Question ${i + 1}`)
const DEFAULT_ANSWER = "a"

interface QuizDisplayProps {
  joined: boolean;
  onJoin: (quizId: string, userId: string) => void;
  onAnswer: (quizId: string, userId: string, question: string, answer: string) => void;
}


export default function QuizDisplay({ joined, onJoin, onAnswer }: QuizDisplayProps) {
  const [quizId, setQuizId] = useState("quiz01")
  const [userId, setUserId] = useState("user01")

  const handleJoin = () => {
    onJoin(quizId, userId)
  }

  const handleAnswer = (question: string) => {
    onAnswer(quizId, userId, question, DEFAULT_ANSWER)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="quizId">Quiz ID</Label>
            <Input
              id="quizId"
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              disabled={joined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={joined}
            />
          </div>
        </div>
        <Button
          onClick={handleJoin}
          className="w-full mb-4"
          disabled={joined || !quizId || !userId}
        >
          {joined ? "Joined" : "Join"}
        </Button>
        {joined && (
          <ul className="space-y-4">
            {dummyQuestions.map((question, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{question}</span>
                <Button onClick={()=>handleAnswer(question)} variant="outline">Answer</Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}


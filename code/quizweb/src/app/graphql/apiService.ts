import client from "./apolloClient";
import { gql } from "@apollo/client";

export const joinQuiz = async (quizId: string, userId: string) => {
  const mutation = gql`
    mutation joinQuiz($quizId: String!, $userId: String!) {
      joinQuiz(joinQuizInput: { quizId: $quizId, userId: $userId })
    }
  `;

  return client.mutate({
    mutation,
    variables: { quizId, userId },
  });
};

export const answerQuiz = async (
  quizId: string,
  userId: string,
  questionId: string,
  answer: string
) => {
  const mutation = gql`
    mutation answerQuiz(
      $quizId: String!
      $userId: String!
      $questionId: String!
      $answer: String!
    ) {
      answerQuiz(
        answerQuizInput: {
          quizId: $quizId
          userId: $userId
          questionId: $questionId
          answer: $answer
        }
      )
    }
  `;

  return client.mutate({
    mutation,
    variables: { quizId, userId, questionId, answer },
  });
};

export const getParticipants = async (quizId: string, limit: number, offset: number) => {
  const query = gql`
    query participants($quizId: String!, $limit: Int!, $offset: Int!) {
      participants(queryParticipantInput: { quizId: $quizId, limit: $limit, offset: $offset }) {
        position
        userId
        score
      }
    }
  `;

  return client.query({
    query,
    variables: { quizId, limit, offset },
  });
};

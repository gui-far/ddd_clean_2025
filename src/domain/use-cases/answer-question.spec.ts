import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../entities/answer'

const fakeAnswerRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})

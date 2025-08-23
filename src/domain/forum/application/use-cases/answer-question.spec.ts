import { expect, test, describe, beforeEach, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase //sut = SYSTEM UNDER TEST

describe('Answer Question', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })

    it('should be able to create a question', async () => {

        const {answer} = await sut.execute({
          questionId: '1',
          instructorId: 'instructor-1',
          content: 'Conteudo da resposta'
        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0]!.id).toEqual(answer.id)

    })
})
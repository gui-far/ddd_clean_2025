import { expect, describe, beforeEach, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase //sut = SYSTEM UNDER TEST

describe('Create Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to create a question', async () => {

        const result = await sut.execute({
            authorId: '1',
            title: 'Nova pergunta',
            content: 'Conteudo da pergunta'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionsRepository.items[0]!.id).toEqual(result.value?.question.id)

    })
})
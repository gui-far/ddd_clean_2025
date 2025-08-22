import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { Q } from 'node_modules/@faker-js/faker/dist/airline-CLphikKp.cjs'
import { FetchRecentQuestionBySlugUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionBySlugUseCase //sut = SYSTEM UNDER TEST

describe('Fetch Recent Questions', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new FetchRecentQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('it should be able to fetch recent questions', async () => {

        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }))
        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }))
        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }))

        const { questions } = await sut.execute({
            page: 1
        })

        expect(questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
        ])

    })

    it('should be able to fetch paginated recenet questions', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionsRepository.create(makeQuestion())
        }

        const { questions } = await sut.execute({
            page: 2
        })

        expect(questions).toHaveLength(2)

    })
})
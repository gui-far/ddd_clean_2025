import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase //sut = SYSTEM UNDER TEST

describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit a answer', async () => {

        const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-1',
            content: 'Conteudo teste',

        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteudo teste',
        })

    })

    it('should not be able to edit a answer', async () => {

        const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') }, new UniqueEntityID('answer-1'))

        await inMemoryAnswersRepository.create(newAnswer)

        expect(() => {
            return sut.execute({
                answerId: newAnswer.id.toValue(),
                authorId: 'author-2',
                content: 'Conteudo teste',

            })
        }).rejects.toBeInstanceOf(Error)


    })
})
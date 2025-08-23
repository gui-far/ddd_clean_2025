import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase //sut = SYSTEM UNDER TEST

describe('Delete Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
    })

    it('should be able to choose question best anser', async () => {

        const newQuestion = makeQuestion()
        const newAnswer = makeAnswer({ questionId: newQuestion.id })

        await inMemoryQuestionsRepository.create(newQuestion)
        await inMemoryAnswersRepository.create(newAnswer)


        await sut.execute({
            answerId: newAnswer.id.toString(),
            authorId: newQuestion.authorId.toString(),
        })

        expect(inMemoryQuestionsRepository.items[0]!.bestAnswerId).toEqual(newAnswer.id)

    })

    it('should not be able to choose another user question best answer', async () => {

        const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })

        const answer = makeAnswer({
            questionId: question.id
        })

        await inMemoryQuestionsRepository.create(question)
        await inMemoryAnswersRepository.create(answer)

        const result = await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author-2'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)


    })
})
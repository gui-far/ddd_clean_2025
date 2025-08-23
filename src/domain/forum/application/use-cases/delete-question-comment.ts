import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';
import { Either, left, right } from '@/core/either';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string
}

/* interface DeleteQuestionCommentUseCaseResponse {
} */

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionCommentUseCase {

    constructor(
        private questionsCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({
        authorId,
        questionCommentId
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

        const questionComment = await this.questionsCommentsRepository.findById(questionCommentId);

        if (!questionComment) {
            return left(new ResourceNotFoundError())
        }

        if (questionComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError())
        }

        await this.questionsCommentsRepository.delete(questionComment)

        return right({})

    }
}

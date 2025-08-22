import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
    authorId: string
    questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {
}

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
            throw new Error('Question not found');
        }

        if (questionComment.authorId.toString() !== authorId) {
            throw new Error('Not allowed.');
        }

        await this.questionsCommentsRepository.delete(questionComment)

        return {}

    }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {

    constructor(private questionsRepository: QuestionRepository,
        private questionsCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error('Question not found');
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: question.id,
            content: content,
        })

        await this.questionsCommentsRepository.create(questionComment)

        return { questionComment };

    }
}

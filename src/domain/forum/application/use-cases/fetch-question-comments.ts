import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { AnswerRepository } from '../repositories/answers-repository';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

/* interface FetchQuestionCommentsUseCaseResponse {
    questionComments: QuestionComment[]
} */

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>

export class FetchQuestionCommentsUseCase {

    constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

        return right({ questionComments });

    }
}

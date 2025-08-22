import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface FetchRecentQuestionBySlugUseCaseRequest {
    page: number
}

interface FetchRecentQuestionBySlugUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionBySlugUseCase {

    constructor(private questionsRepository: QuestionRepository) { }

    async execute({
        page
    }: FetchRecentQuestionBySlugUseCaseRequest): Promise<FetchRecentQuestionBySlugUseCaseResponse> {

        const questions = await this.questionsRepository.findManyRecent({page});

        return { questions };

    }
}

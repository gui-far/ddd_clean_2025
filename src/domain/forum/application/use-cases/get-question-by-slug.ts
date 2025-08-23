import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

/* interface GetQuestionBySlugUseCaseResponse {
  question: Question
} */

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>

export class GetQuestionBySlugUseCase {

  constructor(private questionsRepository: QuestionRepository) { }

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {

    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question });

  }
}

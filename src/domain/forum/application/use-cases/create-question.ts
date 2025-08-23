import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Entity } from '@/core/entities/entity';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

/* interface CreateQuestionUseCaseResponse {
  question: Question
} */

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {

  constructor(private questionsRepository: QuestionRepository) { }

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    });

    await this.questionsRepository.create(question);

    return right({ question });

  }
}

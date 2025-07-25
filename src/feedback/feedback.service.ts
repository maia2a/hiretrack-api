import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto, authorId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: createFeedbackDto.applicationId },
    });

    if (!application) {
      throw new NotFoundException(
        `Aplicação com ID "${createFeedbackDto.applicationId}" não encontrada.`,
      );
    }

    return this.prisma.feedback.create({
      data: {
        ...createFeedbackDto,
        author: authorId,
      },
    });
  }

  findByApplication(applicationId: string) {
    return this.prisma.feedback.findMany({
      where: { applicationId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

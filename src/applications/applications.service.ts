import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStageDto } from './dto/update-application-stage.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const existingApplication = await this.prisma.application.findUnique({
      where: {
        jobId_candidateId: {
          jobId: createApplicationDto.jobId,
          candidateId: createApplicationDto.candidateId,
        },
      },
    });
    if (existingApplication) {
      throw new ConflictException(
        'Este candidato já se aplicou para esta vaga.',
      );
    }
    return this.prisma.application.create({
      data: createApplicationDto,
    });
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: string) {
    return `This action returns a #${id} application`;
  }

  async update(id: string, { stage }: UpdateApplicationStageDto) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException('Candidatura não encontrada.');
    }
    return this.prisma.application.update({
      where: { id },
      data: { stage },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} application`;
  }
}

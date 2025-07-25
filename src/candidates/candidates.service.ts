import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCandidateDto: CreateCandidateDto) {
    return this.prisma.candidate.create({
      data: createCandidateDto,
    });
  }

  findAll() {
    return this.prisma.candidate.findMany();
  }

  async findOne(id: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });
    if (!candidate) {
      throw new NotFoundException('Candidato não encontrado');
    }
    return candidate;
  }

  update(id: string, updateCandidateDto: UpdateCandidateDto) {
    return this.prisma.candidate.update({
      where: { id },
      data: updateCandidateDto,
    });
  }

  remove(id: string) {
    return this.prisma.candidate.delete({
      where: { id },
    });
  }
}

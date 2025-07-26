import { Injectable, NotFoundException } from '@nestjs/common';
import pdf from 'pdf-parse';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}
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

  async handleResumeUpload(file: Express.Multer.File) {
    const resumeUrl = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
    );

    const pdfData = await pdf(file.buffer);
    const resumeText = pdfData.text;

    return {
      resumeUrl,
      resumeText,
    };
  }
}

import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

@Module({
  imports: [S3Module],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}

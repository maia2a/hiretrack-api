import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [JobsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

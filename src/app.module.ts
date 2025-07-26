import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { PrismaService } from './prisma/prisma.service';

import { clerkMiddleware } from '@clerk/express';
import { ApplicationsModule } from './applications/applications.module';
import { CandidatesModule } from './candidates/candidates.module';
import { FeedbackModule } from './feedback/feedback.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    JobsModule,
    CandidatesModule,
    ApplicationsModule,
    FeedbackModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(clerkMiddleware()).forRoutes('*');
  }
}

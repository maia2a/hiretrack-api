import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { PrismaService } from './prisma/prisma.service';

import { clerkMiddleware } from '@clerk/express';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [JobsModule, CandidatesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(clerkMiddleware()).forRoutes('*');
  }
}

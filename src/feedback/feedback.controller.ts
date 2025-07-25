import { ExpressRequestWithAuth } from '@clerk/express';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Req() req: ExpressRequestWithAuth,
  ) {
    const { userId } = req.auth();
    if (!userId) {
      throw new UnauthorizedException('Você não está autenticado');
    }

    return this.feedbackService.create(createFeedbackDto, userId);
  }

  @Get()
  findByApplication(@Param('applicationId') applicationId: string) {
    return this.feedbackService.findByApplication(applicationId);
  }
}

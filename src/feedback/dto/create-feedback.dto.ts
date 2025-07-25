import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCuid } from 'src/validators/is-cuid.validator';

const validSentiments = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'] as const;
type Sentiment = (typeof validSentiments)[number];

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsCuid()
  @IsNotEmpty()
  applicationId: string;

  @IsOptional()
  @IsIn(validSentiments)
  sentiment?: Sentiment;
}

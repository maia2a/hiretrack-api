import { IsNotEmpty } from 'class-validator';
import { IsCuid } from 'src/validators/is-cuid.validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsCuid({ message: 'O ID do candidato não é válido.' })
  candidateId: string;

  @IsNotEmpty()
  @IsCuid({ message: 'O ID do emprego não é válido.' })
  jobId: string;
}

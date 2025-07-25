import { Stage } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateApplicationStageDto {
  @IsNotEmpty({ message: 'O estágio é obrigatório.' })
  @IsEnum(Stage, { message: 'O estágio deve ser um valor válido.' })
  stage: Stage;
}

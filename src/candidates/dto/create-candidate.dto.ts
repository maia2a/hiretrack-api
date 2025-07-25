import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCandidateDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MaxLength(100)
  name: string;

  @IsString({ message: 'O email deve ser um texto.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone: string;

  @IsString({ message: 'O linkedin deve ser um texto.' })
  @IsNotEmpty({ message: 'O linkedin é obrigatório.' })
  linkedin: string;
}

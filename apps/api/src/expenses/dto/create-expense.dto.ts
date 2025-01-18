import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  budgetId?: string;
}


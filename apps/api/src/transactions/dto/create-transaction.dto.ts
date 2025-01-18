import { IsString, IsNumber, IsDateString, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn(['INCOME', 'EXPENSE'])
  type: 'INCOME' | 'EXPENSE';

  @IsString()
  userId: string;

  @IsString()
  budgetId?: string;
}


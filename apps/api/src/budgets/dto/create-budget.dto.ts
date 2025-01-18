import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  userId: string;
}


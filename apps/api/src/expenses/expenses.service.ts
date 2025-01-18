import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      where: {
        userId,
      },
      data: createExpenseDto,
    });
  }

  findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.expense.findUnique({
      where: { id, userId },
    });
  }

  update(userId: string, id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id, userId },
      data: updateExpenseDto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.expense.delete({
      where: { id, userId },
    });
  }
}

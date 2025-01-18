import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      where: {
        userId,
      },
      data: createTransactionDto,
    });
  }

  findAll(userId: string, budgetId?: string) {
    const where: any = { userId };
    if (budgetId) {
      where.budgetId = budgetId;
    }
    return this.prisma.transaction.findMany({ where });
  }

  findOne(userId: string, id: string) {
    return this.prisma.transaction.findUnique({
      where: { id, userId },
    });
  }

  update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.prisma.transaction.update({
      where: { id, userId },
      data: updateTransactionDto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.transaction.delete({
      where: { id, userId },
    });
  }
}

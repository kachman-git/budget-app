import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async create(createBudgetDto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: createBudgetDto,
    });
  }

  async findAll(userId: string) {
    return this.prisma.budget.findMany({
      where: { userId },
      include: {
        expenses: true,
        transactions: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { id, userId },
      include: {
        expenses: true,
        transactions: true,
      },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(userId: string, id: string, updateBudgetDto: UpdateBudgetDto) {
    await this.findOne(userId, id);
    return this.prisma.budget.update({
      where: { id },
      data: updateBudgetDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.budget.delete({
      where: { id },
    });
  }

  async getBudgetSummary(userId: string, id: string) {
    const budget = await this.findOne(userId, id);
    const totalExpenses = budget.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const totalIncome = budget.transactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const remainingBudget = budget.amount - totalExpenses + totalIncome;

    return {
      ...budget,
      totalExpenses,
      totalIncome,
      remainingBudget,
    };
  }
}

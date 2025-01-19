export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  userId: string;
}

export interface BudgetSummary extends Budget {
  totalExpenses: number;
  totalIncome: number;
  remainingBudget: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  userId: string;
  budgetId?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  userId: string;
  budgetId?: string;
}

export interface CreateBudgetDto {
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  userId: string;
}

export interface CreateExpenseDto {
  description: string;
  amount: number;
  date: string;
  userId: string;
  budgetId?: string;
}

export interface CreateTransactionDto {
  amount: number;
  date: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  userId: string;
  budgetId?: string;
}

export interface UpdateBudgetDto extends Partial<CreateBudgetDto> {}
export interface UpdateExpenseDto extends Partial<CreateExpenseDto> {}
export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}


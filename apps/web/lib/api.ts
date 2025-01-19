import {
  Budget,
  BudgetSummary,
  Expense,
  Transaction,
  CreateBudgetDto,
  CreateExpenseDto,
  CreateTransactionDto,
  UpdateBudgetDto,
  UpdateExpenseDto,
  UpdateTransactionDto,
  User,
  UpdateUserDto,
} from "./types";
import { SignUpInput, SignInInput } from "./schemas";

const API_URL = "https://thorough-flexibility-production.up.railway.app";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}${url}`, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
}

// Authentication
export const signUp = async (input: SignUpInput): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.access_token);
    return data.user;
  }
  if (response.status === 409) {
    throw new Error("Email is already in use. Please use a different email.");
  }
  throw new Error(data.message || "Failed to sign up");
};

export const signIn = async (input: SignInInput): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.access_token);
    return data.user;
  }
  throw new Error(data.message || "Failed to sign in");
};

export const logout = () => {
  localStorage.removeItem("token");
};

// User Api
export const getCurrentUser = (): Promise<User> => fetchWithAuth("/user/me");

export const updateUser = (data: UpdateUserDto): Promise<User> =>
  fetchWithAuth("/user", { method: "PUT", body: JSON.stringify(data) });

// Budget API calls
export const getBudgets = () => fetchWithAuth("/budgets");
export const getBudget = (id: string) => fetchWithAuth(`/budgets/${id}`);
export const getBudgetSummary = (id: string): Promise<BudgetSummary> =>
  fetchWithAuth(`/budgets/${id}/summary`);
export const createBudget = (budget: CreateBudgetDto) =>
  fetchWithAuth("/budgets", { method: "POST", body: JSON.stringify(budget) });
export const updateBudget = (id: string, budget: UpdateBudgetDto) =>
  fetchWithAuth(`/budgets/${id}`, {
    method: "PUT",
    body: JSON.stringify(budget),
  });
export const deleteBudget = (id: string) =>
  fetchWithAuth(`/budgets/${id}`, { method: "DELETE" });

// Expense API calls
export const getExpenses = (budgetId?: string) =>
  fetchWithAuth(budgetId ? `/expenses?budgetId=${budgetId}` : "/expenses");
export const getExpense = (id: string) => fetchWithAuth(`/expenses/${id}`);
export const createExpense = (expense: CreateExpenseDto) =>
  fetchWithAuth("/expenses", { method: "POST", body: JSON.stringify(expense) });
export const updateExpense = (id: string, expense: UpdateExpenseDto) =>
  fetchWithAuth(`/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(expense),
  });
export const deleteExpense = (id: string) =>
  fetchWithAuth(`/expenses/${id}`, { method: "DELETE" });

// Transaction API calls
export const getTransactions = (budgetId?: string) =>
  fetchWithAuth(
    budgetId ? `/transactions?budgetId=${budgetId}` : "/transactions"
  );
export const getTransaction = (id: string) =>
  fetchWithAuth(`/transactions/${id}`);
export const createTransaction = (transaction: CreateTransactionDto) =>
  fetchWithAuth("/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
  });
export const updateTransaction = (
  id: string,
  transaction: UpdateTransactionDto
) =>
  fetchWithAuth(`/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(transaction),
  });
export const deleteTransaction = (id: string) =>
  fetchWithAuth(`/transactions/${id}`, { method: "DELETE" });

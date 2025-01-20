import { ProtectedRoute } from "@/components/protected-route";
import { BudgetList } from "./budget-list";

export default function BudgetsPage() {
  return (
    <ProtectedRoute>
      <BudgetList />
    </ProtectedRoute>
  );
}

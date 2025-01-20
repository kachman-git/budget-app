import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Budget App
        </Link>
        <div className="space-x-4">
          <Link href="/budgets">
            <Button variant="ghost">Budgets</Button>
          </Link>
          <Link href="/expenses">
            <Button variant="ghost">Expenses</Button>
          </Link>
          <Link href="/transactions">
            <Button variant="ghost">Transactions</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

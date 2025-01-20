import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to BudgetApp</h1>
      <p className="text-xl mb-8 max-w-md">
        Take control of your finances with our easy-to-use budgeting tool.
      </p>
      <div className="space-x-4">
        <Link href="/signin">
          <Button size="lg">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button size="lg" variant="outline">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

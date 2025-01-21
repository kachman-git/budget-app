import Link from 'next/link'
import { Home, PieChart, DollarSign, BarChart2, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="bg-white w-64 h-full shadow-lg hidden md:block">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-bold text-primary">Budget App</span>
      </div>
      <nav className="mt-6">
        <Link href="/" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link href="/budgets" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <PieChart className="h-5 w-5 mr-3" />
          Budgets
        </Link>
        <Link href="/expenses" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <DollarSign className="h-5 w-5 mr-3" />
          Expenses
        </Link>
        <Link href="/analysis" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <BarChart2 className="h-5 w-5 mr-3" />
          Analysis
        </Link>
        <Link href="/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
      </nav>
    </div>
  )
}


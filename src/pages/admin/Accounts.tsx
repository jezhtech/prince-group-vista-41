
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Search, 
  CreditCard, 
  FileText, 
  Download, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatisticsCard from "@/components/StatisticsCard";

// Mock transaction data
const transactions = [
  {
    id: "TXN-5432",
    date: "2023-05-15",
    description: "Membership Renewal - Rajesh Kumar",
    amount: 1999,
    status: "completed",
    type: "income",
    category: "membership"
  },
  {
    id: "TXN-5431",
    date: "2023-05-14",
    description: "Loan Processing Fee - Anita Singh",
    amount: 2500,
    status: "completed",
    type: "income",
    category: "loan"
  },
  {
    id: "TXN-5430",
    date: "2023-05-14",
    description: "Documentation Service - Vikram Mehta",
    amount: 1200,
    status: "completed",
    type: "income",
    category: "documentation"
  },
  {
    id: "TXN-5429",
    date: "2023-05-13",
    description: "Event Ticket Purchase - Priya Sharma",
    amount: 500,
    status: "completed",
    type: "income",
    category: "event"
  },
  {
    id: "TXN-5428",
    date: "2023-05-12",
    description: "Utility Bill Payment",
    amount: 3500,
    status: "completed",
    type: "expense",
    category: "utility"
  },
  {
    id: "TXN-5427",
    date: "2023-05-10",
    description: "Equipment Purchase",
    amount: 15000,
    status: "completed",
    type: "expense",
    category: "equipment"
  }
];

const AdminAccounts = () => {
  const [transactionPeriod, setTransactionPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button className="bg-ui-blue-600 hover:bg-ui-blue-700">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatisticsCard
          value={formatCurrency(totalIncome)}
          label="Total Income"
          variant="blue"
        />
        <StatisticsCard
          value={formatCurrency(totalExpense)}
          label="Total Expenses"
          variant="green"
        />
        <StatisticsCard
          value={formatCurrency(totalIncome - totalExpense)}
          label="Net Profit"
          variant="blue"
        />
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Financial overview of different revenue streams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { category: "Documentation Services", amount: 65000, percentage: 45, trend: "up" },
              { category: "Loan Processing", amount: 48000, percentage: 33, trend: "up" },
              { category: "Membership Fees", amount: 22000, percentage: 15, trend: "up" },
              { category: "Event Tickets", amount: 10000, percentage: 7, trend: "down" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <span className="font-medium">{item.category}</span>
                    {item.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                    )}
                  </div>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-ui-blue-500 h-2.5 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{item.percentage}% of total</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expenses</TabsTrigger>
          </TabsList>
          
          <Select value={transactionPeriod} onValueChange={setTransactionPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Transaction ID</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Description</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Category</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{transaction.id}</td>
                        <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                        <td className="py-3 px-4 text-gray-600">{transaction.description}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                            transaction.category === 'membership' 
                              ? 'bg-purple-100 text-purple-800'
                              : transaction.category === 'loan'
                              ? 'bg-blue-100 text-blue-800'
                              : transaction.category === 'documentation'
                              ? 'bg-green-100 text-green-800'
                              : transaction.category === 'event'
                              ? 'bg-yellow-100 text-yellow-800'
                              : transaction.category === 'utility'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.category}
                          </span>
                        </td>
                        <td className={`py-3 px-4 text-right font-medium ${
                          transaction.type === 'income' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Income Transactions</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This tab would show only income transactions filtered from the all transactions list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expense" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <CreditCard className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Expense Transactions</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This tab would show only expense transactions filtered from the all transactions list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAccounts;

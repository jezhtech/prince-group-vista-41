
import { Card } from "@/components/ui/card";

const AdminAccounts = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts Management</h1>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Accounts Management Page</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This is a placeholder for the accounts management page where admins can view financial transactions, manage billing, and generate reports.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminAccounts;

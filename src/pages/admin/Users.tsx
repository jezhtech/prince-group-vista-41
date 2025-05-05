
import { Card } from "@/components/ui/card";

const AdminUsers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Users Management Page</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This is a placeholder for the users management page where admins can view, create, edit, and manage user accounts.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;

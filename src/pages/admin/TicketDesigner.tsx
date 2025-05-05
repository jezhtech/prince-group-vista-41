
import { Card } from "@/components/ui/card";

const AdminTicketDesigner = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Ticket Designer</h1>
      </div>
      
      <Card className="p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Ticket Designer Tool</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This is a placeholder for the ticket designer tool where admins can customize the appearance of event tickets, including layouts, colors, and branding.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminTicketDesigner;

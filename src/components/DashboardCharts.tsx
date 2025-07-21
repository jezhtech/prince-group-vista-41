import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart3, TrendingUp, Download, Info, Calendar } from "lucide-react";
import { DashboardData, TimeSeriesData } from "@/services/dashboard";

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const getMetricColor = (dataKey: string) => {
    switch (dataKey) {
      case "bookings":
        return "#3B82F6";
      case "users":
        return "#10B981";
      case "revenue":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getMetricLabel = (dataKey: string) => {
    switch (dataKey) {
      case "bookings":
        return "Bookings";
      case "users":
        return "Users";
      case "revenue":
        return "Revenue";
      default:
        return dataKey;
    }
  };

  const formatValue = (dataKey: string, value: number) => {
    if (dataKey === "revenue") {
      return `₹${value.toLocaleString()}`;
    }
    return value.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg min-w-[200px]">
      {/* Date/Time Header */}
      <div className="border-b border-gray-100 py-1 px-3">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
      </div>
      
      {/* Metrics */}
      <div className="space-y-1 px-3 py-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="size-2.5 rounded" 
                style={{ backgroundColor: getMetricColor(entry.dataKey) }}
              />
              <span className="text-xs text-gray-600">
                {getMetricLabel(entry.dataKey)}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-900">
              {formatValue(entry.dataKey, entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "./ui/chart";

interface DashboardChartsProps {
  dashboardData: DashboardData;
}

type ChartType = "line" | "bar";

const COLORS = {
  bookings: "#3B82F6", // ui-blue-500
  users: "#10B981", // prince-green
  revenue: "#F59E0B", // orange-500
};

const DashboardCharts: React.FC<DashboardChartsProps> = ({ dashboardData }) => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "bookings",
    "users",
    "revenue",
  ]);
  const [dateRange, setDateRange] = useState<string>("7days");

  // Prepare data for charts - show selected metrics in the graph
  const chartData = useMemo(() => {
    const allData = dashboardData.timeSeriesData.map((item) => ({
      name: item.date,
      bookings: item.registrations, // Using registrations as bookings
      users: item.users,
      revenue: item.revenue,
    }));

    // Filter based on date range
    const today = new Date();
    let daysToShow = 7; // default

    switch (dateRange) {
      case "yesterday":
        daysToShow = 1;
        break;
      case "2days":
        daysToShow = 2;
        break;
      case "3days":
        daysToShow = 3;
        break;
      case "7days":
        daysToShow = 7;
        break;
      case "14days":
        daysToShow = 14;
        break;
      case "30days":
        daysToShow = 30;
        break;
      default:
        daysToShow = 7;
    }

    return allData.slice(-daysToShow);
  }, [dashboardData.timeSeriesData, dateRange]);

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ChartContainer config={{}} className="h-[300px] w-full">
            <LineChart data={chartData} className="h-full w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<CustomTooltip />} />
              <ChartLegend />
              {selectedMetrics.includes("bookings") && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke={COLORS.bookings}
                  strokeWidth={3}
                  dot={{ fill: COLORS.bookings, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Bookings"
                />
              )}
              {selectedMetrics.includes("users") && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  stroke={COLORS.users}
                  strokeWidth={3}
                  dot={{ fill: COLORS.users, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Users"
                />
              )}
              {selectedMetrics.includes("revenue") && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.revenue}
                  strokeWidth={3}
                  dot={{ fill: COLORS.revenue, strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Revenue"
                />
              )}
            </LineChart>
          </ChartContainer>
        );

      case "bar":
        return (
          <ChartContainer config={{}} className="h-[300px] w-full">
            <BarChart data={chartData} className="h-full w-full">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<CustomTooltip />} />
              <ChartLegend />
              {selectedMetrics.includes("bookings") && (
                <Bar
                  yAxisId="left"
                  dataKey="bookings"
                  fill={COLORS.bookings}
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
              )}
              {selectedMetrics.includes("users") && (
                <Bar
                  yAxisId="left"
                  dataKey="users"
                  fill={COLORS.users}
                  radius={[4, 4, 0, 0]}
                  name="Users"
                />
              )}
              {selectedMetrics.includes("revenue") && (
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill={COLORS.revenue}
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              )}
            </BarChart>
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  const getTotalValue = (metric: string) => {
    const total = chartData.reduce(
      (sum, item) => sum + (item[metric as keyof typeof item] as number),
      0
    );
    return metric === "revenue" ? `₹${total.toLocaleString()}` : total;
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
        <CardTitle>Analytics Dashboard</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="2days">Last 2 Days</SelectItem>
            <SelectItem value="3days">Last 3 Days</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="14days">Last 14 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <hr />
      <CardContent className="px-3 py-3">
        {/* Chart Type Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
              className="flex items-center"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Bar Chart
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className="flex items-center"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Line Chart
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Metrics:</span>
            <Select
              value={selectedMetrics.join(",")}
              onValueChange={(value) => setSelectedMetrics(value.split(","))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select metrics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bookings,users,revenue">
                  All Metrics
                </SelectItem>
                <SelectItem value="bookings">Bookings Only</SelectItem>
                <SelectItem value="users">Users Only</SelectItem>
                <SelectItem value="revenue">Revenue Only</SelectItem>
                <SelectItem value="bookings,users">Bookings & Users</SelectItem>
                <SelectItem value="bookings,revenue">
                  Bookings & Revenue
                </SelectItem>
                <SelectItem value="users,revenue">Users & Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metrics Summary */}
        <div
          className={`grid gap-4 mb-6 ${
            selectedMetrics.length === 1
              ? "grid-cols-1"
              : selectedMetrics.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {selectedMetrics.includes("bookings") && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Bookings</p>
                  <p className="text-lg font-bold text-blue-900">
                    {getTotalValue("bookings")}
                  </p>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          )}

          {selectedMetrics.includes("users") && (
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Users</p>
                  <p className="text-lg font-bold text-green-900">
                    {getTotalValue("users")}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          )}

          {selectedMetrics.includes("revenue") && (
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Revenue</p>
                  <p className="text-lg font-bold text-orange-900">
                    {getTotalValue("revenue")}
                  </p>
                </div>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">{renderChart()}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardCharts;

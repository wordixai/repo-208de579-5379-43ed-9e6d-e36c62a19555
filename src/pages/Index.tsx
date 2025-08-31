import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { OrderCard } from "@/components/admin/OrderCard";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Order {
  id: string;
  customer: {
    name: string;
    avatar?: string;
  };
  status: "pending" | "completed" | "cancelled";
  amount: number;
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: { name: "张三", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" },
    status: "pending",
    amount: 2999,
    date: "2024-01-15",
    items: 2
  },
  {
    id: "ORD-2024-002", 
    customer: { name: "李四", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face" },
    status: "completed",
    amount: 8999,
    date: "2024-01-14",
    items: 1
  },
  {
    id: "ORD-2024-003",
    customer: { name: "王五", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    status: "pending",
    amount: 1599,
    date: "2024-01-14",
    items: 3
  },
  {
    id: "ORD-2024-004",
    customer: { name: "赵六", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1b8?w=40&h=40&fit=crop&crop=face" },
    status: "completed",
    amount: 12999,
    date: "2024-01-13",
    items: 1
  },
  {
    id: "ORD-2024-005",
    customer: { name: "陈七", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    status: "cancelled",
    amount: 3999,
    date: "2024-01-13",
    items: 2
  }
];

const Index = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleOrderStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const stats = {
    totalRevenue: orders.reduce((sum, order) => order.status === "completed" ? sum + order.amount : sum, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === "pending").length,
    completedOrders: orders.filter(order => order.status === "completed").length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar activeItem="仪表盘" />
        <SidebarInset>
          <AdminHeader />
          
          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">仪表盘</TabsTrigger>
                <TabsTrigger value="orders">订单管理</TabsTrigger>
                <TabsTrigger value="products">商品管理</TabsTrigger>
                <TabsTrigger value="analytics">数据分析</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">仪表盘</h1>
                  <p className="text-muted-foreground">欢迎回来！这里是您的业务概览</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="card-surface">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">总收入</p>
                          <p className="text-2xl font-bold">¥{stats.totalRevenue.toLocaleString()}</p>
                          <p className="text-xs text-green-600 flex items-center">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +12.5%
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-surface">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">总订单</p>
                          <p className="text-2xl font-bold">{stats.totalOrders}</p>
                          <p className="text-xs text-blue-600 flex items-center">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +8.2%
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-surface">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">待处理订单</p>
                          <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                          <p className="text-xs text-orange-600 flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            需要处理
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-surface">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">已完成订单</p>
                          <p className="text-2xl font-bold">{stats.completedOrders}</p>
                          <p className="text-xs text-green-600 flex items-center">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            +15.3%
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="card-surface">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        最近订单
                        <Button variant="outline" size="sm">查看全部</Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <div>
                              <p className="font-medium">{order.customer.name}</p>
                              <p className="text-sm text-muted-foreground">#{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">¥{order.amount.toLocaleString()}</p>
                              <Badge 
                                className={
                                  order.status === "pending" ? "status-pending" :
                                  order.status === "completed" ? "status-completed" :
                                  "status-cancelled"
                                }
                              >
                                {order.status === "pending" ? "待处理" :
                                 order.status === "completed" ? "已完成" : "已取消"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-surface">
                    <CardHeader>
                      <CardTitle>快捷操作</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Package className="mr-2 h-4 w-4" />
                          添加新商品
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          处理订单
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          查看客户
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          查看报表
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">订单管理</h1>
                  <p className="text-muted-foreground">管理和跟踪所有订单状态</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleOrderStatusChange}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="products">
                <ProductManagement />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsDashboard />
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
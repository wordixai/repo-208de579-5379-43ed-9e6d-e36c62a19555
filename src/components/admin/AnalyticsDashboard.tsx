import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const salesData = [
  { month: "1月", sales: 12000, orders: 240, users: 180 },
  { month: "2月", sales: 15000, orders: 300, users: 220 },
  { month: "3月", sales: 18000, orders: 360, users: 280 },
  { month: "4月", sales: 22000, orders: 440, users: 350 },
  { month: "5月", sales: 25000, orders: 500, users: 420 },
  { month: "6月", sales: 28000, orders: 560, users: 480 },
];

const categoryData = [
  { name: "手机数码", value: 35, color: "#4F46E5" },
  { name: "电脑办公", value: 25, color: "#2563EB" },
  { name: "家电家居", value: 20, color: "#0891B2" },
  { name: "服装鞋包", value: 15, color: "#0D9488" },
  { name: "其他", value: 5, color: "#64748B" },
];

const recentSales = [
  { month: "1月", revenue: 12000 },
  { month: "2月", revenue: 15000 },
  { month: "3月", revenue: 18000 },
  { month: "4月", revenue: 22000 },
  { month: "5月", revenue: 25000 },
  { month: "6月", revenue: 28000 },
  { month: "7月", revenue: 32000 },
  { month: "8月", revenue: 35000 },
  { month: "9月", revenue: 38000 },
  { month: "10月", revenue: 42000 },
  { month: "11月", revenue: 45000 },
  { month: "12月", revenue: 48000 },
];

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  trend: "up" | "down" 
}) => (
  <Card className="card-surface">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
            {change}
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">数据分析</h2>
          <p className="text-muted-foreground">实时监控您的业务数据</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">最近7天</SelectItem>
              <SelectItem value="30days">最近30天</SelectItem>
              <SelectItem value="90days">最近90天</SelectItem>
              <SelectItem value="1year">最近1年</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            导出报表
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="总销售额"
          value="¥128,000"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="订单数量"
          value="2,456"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <MetricCard
          title="活跃用户"
          value="1,892"
          change="+15.3%"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="商品总数"
          value="568"
          change="-2.1%"
          icon={Package}
          trend="down"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="sales">销售分析</TabsTrigger>
          <TabsTrigger value="products">商品分析</TabsTrigger>
          <TabsTrigger value="customers">客户分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle>销售趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#4F46E5" 
                      strokeWidth={2}
                      fill="url(#salesGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-surface">
              <CardHeader>
                <CardTitle>销售类别分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card className="card-surface">
            <CardHeader>
              <CardTitle>年度销售收入</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={recentSales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle>热销商品排行</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "iPhone 15 Pro Max", sales: 1256, change: "+23%" },
                    { name: "MacBook Air M3", sales: 892, change: "+18%" },
                    { name: "AirPods Pro 3", sales: 743, change: "+12%" },
                    { name: "iPad Pro M4", sales: 567, change: "+8%" },
                    { name: "Apple Watch S9", sales: 432, change: "+5%" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">销量: {item.sales}</p>
                      </div>
                      <span className="text-sm text-green-600">{item.change}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-surface">
              <CardHeader>
                <CardTitle>库存预警</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "MacBook Air M3", stock: 5, status: "低库存" },
                    { name: "iPad Mini 6", stock: 0, status: "缺货" },
                    { name: "Apple Watch SE", stock: 8, status: "低库存" },
                    { name: "AirTag 4包装", stock: 2, status: "极低" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">剩余: {item.stock} 件</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.stock === 0 ? 'bg-red-100 text-red-700' : 
                        item.stock < 5 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle>用户活跃度</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-surface">
              <CardHeader>
                <CardTitle>新增用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">+234</p>
                    <p className="text-sm text-muted-foreground">本月新增</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-green-600">+15.2%</p>
                    <p className="text-sm text-muted-foreground">较上月增长</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-surface">
              <CardHeader>
                <CardTitle>用户留存率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">78.5%</p>
                    <p className="text-sm text-muted-foreground">7天留存率</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-primary">65.2%</p>
                    <p className="text-sm text-muted-foreground">30天留存率</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
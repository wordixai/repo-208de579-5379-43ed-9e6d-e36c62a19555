import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface OrderCardProps {
  order: Order;
  onStatusChange?: (orderId: string, status: Order["status"]) => void;
}

const statusConfig = {
  pending: { label: "待处理", className: "status-pending" },
  completed: { label: "已完成", className: "status-completed" },
  cancelled: { label: "已取消", className: "status-cancelled" },
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStatusChange = (newStatus: Order["status"]) => {
    setIsAnimating(true);
    setTimeout(() => {
      onStatusChange?.(order.id, newStatus);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <Card 
      className={`card-surface animate-slide-up ${isAnimating ? 'opacity-50' : ''}`}
      style={{ animationDelay: Math.random() * 0.2 + 's' }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={order.customer.avatar} />
            <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{order.customer.name}</p>
            <p className="text-xs text-muted-foreground">订单 #{order.id}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              查看详情
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              编辑订单
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              删除订单
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <Badge className={statusConfig[order.status].className}>
            {statusConfig[order.status].label}
          </Badge>
          <span className="text-sm text-muted-foreground">{order.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">¥{order.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{order.items} 件商品</p>
          </div>
          <div className="flex space-x-2">
            {order.status === "pending" && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => handleStatusChange("completed")}
                >
                  完成
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleStatusChange("cancelled")}
                >
                  取消
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  GripVertical,
  Package,
  Star,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  category: string;
  status: "active" | "inactive" | "out-of-stock";
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=120&h=120&fit=crop",
    price: 9999,
    stock: 24,
    sales: 156,
    rating: 4.8,
    category: "手机数码",
    status: "active"
  },
  {
    id: "2", 
    name: "MacBook Air M3 13寸",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&h=120&fit=crop",
    price: 8999,
    stock: 0,
    sales: 89,
    rating: 4.9,
    category: "电脑办公",
    status: "out-of-stock"
  },
  {
    id: "3",
    name: "AirPods Pro 3代",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=120&h=120&fit=crop",
    price: 1999,
    stock: 45,
    sales: 234,
    rating: 4.7,
    category: "音频设备",
    status: "active"
  },
  {
    id: "4",
    name: "iPad Pro 12.9寸 M4",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=120&fit=crop",
    price: 7999,
    stock: 12,
    sales: 67,
    rating: 4.6,
    category: "平板电脑",
    status: "active"
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=120&h=120&fit=crop",
    price: 2999,
    stock: 8,
    sales: 145,
    rating: 4.5,
    category: "智能穿戴",
    status: "inactive"
  }
];

const statusConfig = {
  active: { label: "上架中", className: "bg-green-100 text-green-700" },
  inactive: { label: "已下架", className: "bg-gray-100 text-gray-700" },
  "out-of-stock": { label: "缺货", className: "bg-red-100 text-red-700" },
};

export function ProductManagement() {
  const [products, setProducts] = useState(mockProducts);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, productId: string) => {
    setDraggedItem(productId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = products.findIndex(p => p.id === draggedItem);
    const targetIndex = products.findIndex(p => p.id === targetId);

    const newProducts = [...products];
    const [draggedProduct] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedProduct);

    setProducts(newProducts);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">商品管理</h2>
          <p className="text-muted-foreground">管理您的商品库存和信息</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          添加商品
        </Button>
      </div>

      <Card className="card-surface">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>商品列表</span>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="搜索商品..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                draggable
                onDragStart={(e) => handleDragStart(e, product.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, product.id)}
                className={`draggable-item flex items-center space-x-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors ${
                  draggedItem === product.id ? 'opacity-50' : ''
                }`}
              >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>编辑商品</DropdownMenuItem>
                        <DropdownMenuItem>复制商品</DropdownMenuItem>
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          删除商品
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold">¥{product.price.toLocaleString()}</span>
                      <Badge className={statusConfig[product.status].className}>
                        {statusConfig[product.status].label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>库存: {product.stock}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>销量: {product.sales}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
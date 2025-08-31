import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  Zap,
  Home,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "概览",
    items: [
      { title: "仪表盘", icon: Home, url: "#" },
      { title: "数据分析", icon: BarChart3, url: "#" },
    ],
  },
  {
    title: "业务管理",
    items: [
      { title: "订单管理", icon: ShoppingCart, url: "#" },
      { title: "商品管理", icon: Package, url: "#" },
      { title: "客户管理", icon: Users, url: "#" },
      { title: "库存管理", icon: FileText, url: "#" },
    ],
  },
  {
    title: "运营工具",
    items: [
      { title: "营销活动", icon: Zap, url: "#" },
      { title: "数据报表", icon: TrendingUp, url: "#" },
      { title: "系统设置", icon: Settings, url: "#" },
    ],
  },
];

interface AdminSidebarProps {
  activeItem?: string;
}

export function AdminSidebar({ activeItem = "仪表盘" }: AdminSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        {menuItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.title === activeItem}
                      className="w-full"
                    >
                      <a href={item.url} className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
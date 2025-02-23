import {
  HomeIcon,
  BarChartIcon,
  FileTextIcon,
  UsersIcon,
  CreditCardIcon,
  BookOpenIcon,
} from "lucide-react";

export const menuItems = [
  { href: "dashboard", icon: HomeIcon, label: "ダッシュボード" },
  { href: "input", icon: BarChartIcon, label: "燃料消費量入力" },
  { href: "workflow", icon: FileTextIcon, label: "ワークフロー" },
  { href: "company-info", icon: UsersIcon, label: "会社情報" },
  { href: "co2-reduction-goals", icon: CreditCardIcon, label: "CO2削減目標" },
  { href: "manual", icon: BookOpenIcon, label: "マニュアル" },
];

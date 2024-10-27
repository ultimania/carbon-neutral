import Link from "next/link";
import {
  HomeIcon,
  BarChartIcon,
  FileTextIcon,
  UsersIcon,
  CreditCardIcon,
  BookOpenIcon,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md text-primary-text p-4">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">CO2 Visualization</h1>
      </div>
      <nav className="p-8 my-2">
        <ul className="space-y-8">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center hover:text-primary"
            >
              <HomeIcon className="mr-2" size={18} color="#10b981" /> ダッシュボード
            </Link>
          </li>
          <li>
            <Link
              href="/input"
              className="flex items-center hover:text-primary"
            >
              <BarChartIcon className="mr-2" size={18} color="#10b981" /> 燃料消費量入力
            </Link>
          </li>
          <li>
            <Link
              href="/aggregation-rules"
              className="flex items-center hover:text-primary"
            >
              <FileTextIcon className="mr-2" size={18} color="#10b981" /> 集計ルール管理
            </Link>
          </li>
          <li>
            <Link
              href="/company-info"
              className="flex items-center hover:text-primary"
            >
              <UsersIcon className="mr-2" size={18} color="#10b981" /> 会社情報
            </Link>
          </li>
          <li>
            <Link
              href="/co2-reduction-goals"
              className="flex items-center hover:text-primary"
            >
              <CreditCardIcon className="mr-2" size={18} color="#10b981" /> CO2削減目標
            </Link>
          </li>
          <li>
            <Link
              href="/manual"
              className="flex items-center hover:text-primary"
            >
              <BookOpenIcon className="mr-2" size={18} color="#10b981" /> マニュアル
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

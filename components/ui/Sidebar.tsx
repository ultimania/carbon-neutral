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
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">CO2 Visualization</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <HomeIcon className="mr-2" size={18} /> ダッシュボード
            </Link>
          </li>
          <li>
            <Link
              href="/input"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <BarChartIcon className="mr-2" size={18} /> 燃料消費量入力
            </Link>
          </li>
          <li>
            <Link
              href="/aggregation-rules"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FileTextIcon className="mr-2" size={18} /> 集計ルール管理
            </Link>
          </li>
          <li>
            <Link
              href="/company-info"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <UsersIcon className="mr-2" size={18} /> 会社情報
            </Link>
          </li>
          <li>
            <Link
              href="/co2-reduction-goals"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <CreditCardIcon className="mr-2" size={18} /> CO2削減目標
            </Link>
          </li>
          <li>
            <Link
              href="/manual"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <BookOpenIcon className="mr-2" size={18} /> マニュアル
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

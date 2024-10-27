import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { CalendarIcon, ChevronDownIcon, HomeIcon, BarChartIcon, FileTextIcon, UsersIcon, CreditCardIcon, BookOpenIcon, HelpCircleIcon } from "lucide-react"

export default function InputArea() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content */}

        <h2 className="text-2xl font-bold mb-6">CO2見える化</h2>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">照射費の登録</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">照射区分 *</label>
              <select>
                <option>照射区分を選択</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">金額 *</label>
              <Input type="text" placeholder="金額を入力" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">支払日 *</label>
              <div className="relative">
                <Input type="text" placeholder="YYYY/MM/DD" />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">備考</label>
              <Textarea placeholder="備考を入力" />
            </div>
            <button type="submit">登録</button>
          </form>
        </div>

        {/* Data table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">登録済み照射費一覧</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">項目</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支払日</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">承認日</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">1,829,932 円</td>
                    <td className="px-6 py-4 whitespace-nowrap">電気料金</td>
                    <td className="px-6 py-4 whitespace-nowrap">2023/10/20</td>
                    <td className="px-6 py-4 whitespace-nowrap">田中太郎</td>
                    <td className="px-6 py-4 whitespace-nowrap">2023/10/21</td>
                    <td className="px-6 py-4 whitespace-nowrap">仮登録</td>
                    <td className="px-6 py-4 whitespace-nowrap">東京本社</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    </div>
  )
}
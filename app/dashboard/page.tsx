"use client";

import { useState, useEffect } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

const monthlyData = [
  { month: "1月", co2: 250 },
  { month: "2月", co2: 300 },
  { month: "3月", co2: 200 },
  { month: "4月", co2: 280 },
  { month: "5月", co2: 100 },
  { month: "6月", co2: 230 },
  { month: "7月", co2: 380 },
  { month: "8月", co2: 350 },
  { month: "9月", co2: 300 },
  { month: "10月", co2: 240 },
  { month: "11月", co2: 180 },
  { month: "12月", co2: 150 },
];

const costData = [
  { month: "1月", cost: 200000 },
  { month: "2月", cost: 180000 },
  { month: "3月", cost: 220000 },
  { month: "4月", cost: 240000 },
  { month: "5月", cost: 260000 },
  { month: "6月", cost: 280000 },
  { month: "7月", cost: 300000 },
  { month: "8月", cost: 320000 },
  { month: "9月", cost: 280000 },
  { month: "10月", cost: 260000 },
  { month: "11月", cost: 240000 },
  { month: "12月", cost: 220000 },
];

const locationData = [
  { name: "東京本社", co2: 31.2, energy: 939, cost: 717090 },
  { name: "大阪支社", co2: 5.83, energy: 299, cost: 369410 },
  { name: "札幌支社", co2: 4.7, energy: 644, cost: 347680 },
  { name: "名古屋営業所", co2: 5.4, energy: 207, cost: 346000 },
  { name: "長野工場", co2: 5.8, energy: 161, cost: 392820 },
];

interface MonthlyCost {
  month: string;
  amount: number;
}

const Dashboard = () => {
  const [monthlyCosts, setMonthlyCosts] = useState<MonthlyCost[]>([]);

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await fetch("/api/costs");
        if (!response.ok) throw new Error("Failed to fetch data");
        const { data } = await response.json();

        // Convert the data into an array of objects with month and amount properties
        const chartData: MonthlyCost[] = Object.entries(data).map(
          ([month, amount]) => ({
            month,
            amount: Number(amount),
          })
        );

        setMonthlyCosts(chartData);
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchCostData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO2 排出量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53,000t</div>
            <p className="text-xs text-muted-foreground">+55%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">電力使用量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,300kWh</div>
            <p className="text-xs text-muted-foreground">+5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ガソリン消費量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,052L</div>
            <p className="text-xs text-muted-foreground">-14%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">月間コスト</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥2,173,000</div>
            <p className="text-xs text-muted-foreground">+8%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>月間CO2排出量</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="co2" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>月間コスト</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>拠点別データ</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>拠点</TableHead>
                <TableHead>CO2排出量 (t)</TableHead>
                <TableHead>電力使用量 (kWh)</TableHead>
                <TableHead>コスト (円)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locationData.map((location) => (
                <TableRow key={location.name}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.co2}</TableCell>
                  <TableCell>{location.energy}</TableCell>
                  <TableCell>{location.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

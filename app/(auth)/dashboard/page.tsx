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

const locationData = [
  { name: "東京本社", co2: 31.2, energy: 939, cost: 717090 },
  { name: "大阪支社", co2: 5.83, energy: 299, cost: 369410 },
  { name: "札幌支社", co2: 4.7, energy: 644, cost: 347680 },
  { name: "名古屋営業所", co2: 5.4, energy: 207, cost: 346000 },
  { name: "長野工場", co2: 5.8, energy: 161, cost: 392820 },
];

interface MonthlyData {
  month: string;
  amount: number;
}

const Dashboard = () => {
  const [monthlyCosts, setMonthlyCosts] = useState<MonthlyData[]>([]);
  const [monthlyCO2Data, setMonthlyCO2Data] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await fetch("/api/workflows?status=Approved");
        if (!response.ok) throw new Error("Failed to fetch data");
        const { data } = await response.json();

        // Aggregate cost data by month
        const aggregatedData = data.reduce((acc: any, workflow: any) => {
          const month = new Date(workflow.payment.paymentDate).getMonth() + 1;
          const monthKey = `${month}月`;
          if (!acc[monthKey]) {
            acc[monthKey] = 0;
          }
          acc[monthKey] += workflow.payment.amount;
          return acc;
        }, {});

        // Convert the aggregated data into an array of objects with month and amount properties
        const chartData: MonthlyData[] = Object.entries(aggregatedData).map(
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

    const fetchCO2Data = async () => {
      try {
        const response = await fetch("/api/emissions");
        if (!response.ok) throw new Error("Failed to fetch data");
        const { data } = await response.json();

        // Aggregate CO2 data by month
        const aggregatedData = data.reduce((acc: any, emission: any) => {
          const month = new Date(emission.createdAt).getMonth() + 1;
          const monthKey = `${month}月`;
          if (!acc[monthKey]) {
            acc[monthKey] = 0;
          }
          acc[monthKey] += emission.weight;
          return acc;
        }, {});

        // Convert the aggregated data into an array of objects with month and amount properties
        const chartData: MonthlyData[] = Object.entries(aggregatedData).map(
          ([month, amount]) => ({
            month,
            amount: Number(amount),
          })
        );

        setMonthlyCO2Data(chartData);
      } catch (error) {
        console.error("Error fetching CO2 data:", error);
      }
    };

    fetchCostData();
    fetchCO2Data();
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
              <BarChart data={monthlyCO2Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#10b981" />
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
              <LineChart data={monthlyCosts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#10b981" />
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

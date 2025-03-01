'use client';

import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useSession } from "next-auth/react";
import { Payment, Provider } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const [providerOptions, setProviderOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { data: session } = useSession();
  const [fuelOptions, setFuelOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/fuelTypes")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch fuel types");
        return response.json();
      })
      .then(({ data }) => {
        setFuelOptions(data.map((fuelType: { name: string }) => fuelType.name));
      })
      .catch((error) => {
        console.error("Error fetching fuel types:", error);
      });
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/providers?email=${session.user.email}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch data");
          return response.json();
        })
        .then(({ data }) => {
          const providerNames = data.map((provider: Provider) => provider.name);
          setProviderOptions(providerNames);
          setFormData((prev) => ({
            ...prev,
            provider: providerNames[0] || "",
            userInCharge: session.user?.name || "",
          }));
        })
        .catch((error) => {
          console.error("Error fetching provider data:", error);
        });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(async(response) => {
      if (!response.ok) throw new Error("Failed to submit form");
      // paymentデータを元にworkflowデータを作成
      const payment = await response.json() as Payment;
      return fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment: payment,
          status: "Unapproved",
          approvedById: null,
          type: "Purchase",
          typeIcon: "🛒"
          }),
      });
    });

    if (response.ok) {
      console.log("Form submitted successfully");
    } else {
      console.error("Form submission failed");
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">燃料消費量登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <label className="input-form">
              <div className="flex my-2">
                金額
                <span>*</span>
              </div>
              <Input
                type="number"
                name="amount"
                required
                placeholder="1234567890"
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
            </label>
            <label className="input-form">
              <div className="flex my-2">
                燃料区分
                <span>*</span>
              </div>
              <select
                name="fuelType"
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
              >
                {fuelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="input-form">
              <div className="flex my-2">
                支払日
                <span>*</span>
              </div>
              <Input
                type="date"
                name="paymentDate"
                required
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
              />
            </label>
            <label className="input-form">
              <div className="flex my-2">
                契約会社
                <span>*</span>
              </div>
              <select
                name="provider"
                className="w-full p-2 border border-gray-400 rounded"
                onChange={handleChange}
                value={formData.provider}
              >
                {providerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" className="button">
              登録
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">登録履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

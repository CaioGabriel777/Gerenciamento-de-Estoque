"use client"

import { useProducts } from "@/contexts/products-context"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}


export default function HomePage() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const UserData: User = {
      id: 1,
      name: "Caio Gabriel"
    };
    setUser(UserData);
  }, []);

  const { products, loading } = useProducts()

  if (loading) return <p>Carregando gráfico...</p>

  const grouped = Object.values(
    products.reduce((acc: any, p: any) => {
      if (!acc[p.category])
        acc[p.category] = { category: p.category, total: 0, count: 0 }
      acc[p.category].total += p.price
      acc[p.category].count += 1
      return acc
    }, {})
  )

  const data = grouped.map((g: any) => ({
    category: g.category,
    avgPrice: Number((g.total / g.count).toFixed(2)),
  }))

  const chartConfig: ChartConfig = {
    avgPrice: {
      label: "Preço médio",
      color: "#ccc",
    },
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">Bem vindo, {user?.name}</h1>
      <h2 className="text-2xl font-semibold mb-6">Média de Preços por Categoria</h2>

      <ChartContainer
        config={chartConfig}
        className="
          w-full 
          h-106
          bg-card 
          rounded-md 
          p-4 
          shadow 
          aspect-video 
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="avgPrice" fill="var(--color-avgPrice)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

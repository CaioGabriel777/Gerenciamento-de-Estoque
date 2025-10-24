"use client"
import { useProducts } from "@/contexts/products-context"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemo, useState } from "react"

export default function ListaDeProdutosPage() {
  const { products, loading } = useProducts()
  const [selectedCategary, setSelectedCategory] = useState<string | null>("All")

  const categories = useMemo(() => {
    const all = products.map(p => p.category)
    return Array.from(new Set(all))
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategary === "All") return products
    return products.filter(p => p.category === selectedCategary)
  }, [products, selectedCategary])

  return (
    <div className="container mx-auto p-6 bg-card rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">

        

        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Filtrar Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="All">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>

      <h2 className="text-2xl font-semibold mb-4">Lista de Produtos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Carregando...</TableCell>
            </TableRow>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>R$ {p.price.toFixed(2)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { Product, useProducts } from "@/contexts/products-context"
import { useMemo, useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getColumns } from "@/components/products/columns-data-table"
import EditProductModal from "@/components/products/edit-product-modal"


export default function ListaDeProdutosPage() {
  const { products, loading } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditClick = (produto: Product) => {
    setEditingProduct(produto);
  };
  
  const categories = useMemo(() => {
    const all = products.map((p) => p.category)
    return Array.from(new Set(all))
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = products
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return result
  }, [products, selectedCategory, searchTerm])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState<number[]>([])

  const handleConfirmDelete = (ids: number[]) => {
    setIdsToDelete(ids)
    setIsDialogOpen(true)
  }

  const handleDeleteConfirmed = () => {
    console.log("Excluir produtos:", idsToDelete)
    // Aqui ficará a chamada da API que receberá um list de IDs para deletar
    setIsDialogOpen(false)
  }

  // useMemo é um hook do React que serve pra memorizar o resultado de uma função e só recalcular quando alguma dependência mudar.
  // Ou seja, ele evita que o React refaça cálculos pesados toda hora toda vez que o componente renderiza.
  const columns = useMemo(
    () => getColumns(handleConfirmDelete, handleEditClick),
    [handleConfirmDelete]
  )



  return (
    <div className="container mx-auto p-6 bg-card rounded-lg shadow">

      <div className="flex flex-row items-center mb-6 space-x-2">

        {/* FILTRO NOME PRODUTOS */}
        <Input
          type="text"
          placeholder="Filtrar por produto..."
          className="border rounded px-2 py-1 w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        {/* FILTRO CATEGORIAS */}
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="All">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>


      <h2 className="text-2xl font-semibold mb-4">Lista de Produtos</h2>

      {loading ? (
        <div className="p-4 text-center text-muted-foreground">
          Carregando...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          onBulkDelete={handleConfirmDelete}
        />
      )}

      {/* DIALOG DE CONFIRMAÇÃO */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Você quer mesmo excluir{" "}
              <strong>{idsToDelete.length}</strong>{" "}
              {idsToDelete.length > 1 ? "produtos" : "produto"}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirmed}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {editingProduct && (
        <EditProductModal
          produto={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

    </div>
  )
}

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

// colunas da tabela
export const getColumns = (
  handleConfirmDelete: (ids: number[]) => void,
  handleEditClick: (produto: any) => void
): ColumnDef<any>[] => [


    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center justify-start w-full space-x-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>ID</span>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue<number>("id")}</div>
      )

    },
    {
      accessorKey: "title",
      header: "Produto",
      cell: ({ row }) => (
        <div className="truncate max-w-[400px]" title={row.getValue("title")}>
          {row.getValue("title")}
        </div>
      ),
    },

    {
      accessorKey: "category",
      header: "Categoria",
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">R$ {row.getValue<number>("price").toFixed(2)}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const produto = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

              <DropdownMenuItem onClick={() => handleEditClick(produto)}>
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleConfirmDelete([produto.id])}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

  ]
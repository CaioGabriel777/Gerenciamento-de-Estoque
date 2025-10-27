// O useContext serve pra compartilhar dados entre componentes 
// sem precisar ficar passando props manualmente de pai pra filho, neto, bisneto…

"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Primeiro definimos o tipo dos dados
export type Product = {
  id: number
  title: string
  price: number
  category: string
}

type ProductsContextType = {
  products: Product[]
  loading: boolean
  setProducts: (p: Product[]) => void
}

// createContext cria a "caixinha global" onde os dados vão ser armazenados
const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  setProducts: () => {},
})

// o Provider envolve os componentes da aplicação 
// e fornece os dados (products, loading e setProducts) pro resto do app.
export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fakestoreapi.com/products")
      const data: Product[] = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}

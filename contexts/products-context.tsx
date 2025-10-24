"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Product = {
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

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  setProducts: () => {},
})

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

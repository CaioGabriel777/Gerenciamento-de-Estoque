import { Package, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProducts } from "@/contexts/products-context"

export function DashboardCards() {

    const {products, loading} = useProducts();
    if(loading){
        return <p>Carregando...</p>
    }
    const totalProducts = products.length; 
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Quantidade de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <p className="text-2xl font-bold">{totalProducts}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(totalValue)}
            </p>
            </CardContent>
        </Card>
        </div>
    )
}

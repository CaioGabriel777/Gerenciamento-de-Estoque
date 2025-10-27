"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react"

export default function CadastroDeProdutos() {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [sucess, setSucess] = useState(false);
 
    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault()

        const newProduct = {
            title,
            price: parseFloat(price),
            category,
            description
        }

        console.log("Produto Cadastrado: ", newProduct);

        setSucess(true);

        setTitle("")
        setPrice("")
        setCategory("")
        setDescription("")

        setTimeout(() => setSucess(false), 5000)
    }

    return (
        <Card className="max-w-200 mx-auto mt-10">

            <CardHeader>
                <CardTitle>Cadastro de Produtos</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>
                        <Label htmlFor="title" className="mb-2">Título</Label>
                        <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Camiseta Preta"
                        required
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="mb-2">Preço</Label>
                        <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ex: 99.90"
                        required
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Categoria</Label>
                        <Select onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="camisetas">Roupas</SelectItem>
                            <SelectItem value="calças">Eletrônicos</SelectItem>
                            <SelectItem value="sapatos">Acessórios</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-2">Descrição</Label>
                        <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o produto..."
                        />
                    </div>
                    {sucess && (
                        <Alert className="mb-4 border-green-500 text-green-700">
                            <CheckCircle2 className="h-5 w-5 text-green-600"/>
                            <AlertTitle>Sucesso!</AlertTitle>
                            <AlertDescription>Produto cadastrado com sucesso!</AlertDescription>
                        </Alert>
                    )} 
                    <Button type="submit" className="w-full">Cadastrar</Button>
                </form>
            </CardContent>
        </Card>
    )
}
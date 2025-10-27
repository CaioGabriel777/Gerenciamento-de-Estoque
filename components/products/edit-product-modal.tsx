import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Product } from "../../contexts/products-context";

interface EditProductModalProps {
    produto: Product;
    onClose: () => void;
}

export default function EditProductModal({ produto, onClose }: EditProductModalProps) {
    const [editingProduct, setEditingProduct] = useState<Product>(produto);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Editar Produto</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col space-y-4">
                    <h1 className="mb-2 text-m font-semibold">Nome do Produto</h1>
                    <Input
                        value={editingProduct.title}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, title: e.target.value })
                        }
                        placeholder="Nome do Produto"
                    />

                    <h1 className="mb-2 text-m font-semibold">Preço</h1>
                    <Input
                        value={editingProduct.price}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                        }
                        placeholder="Preço"
                        type="number"
                    />
                    <h1 className="mb-2 text-m font-semibold">Categoria</h1>
                    <Input
                        value={editingProduct.category}
                        onChange={(e) =>
                            setEditingProduct({ ...editingProduct, category: e.target.value })
                        }
                        placeholder="Categoria"
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => {
                            console.log("Salvar alterações:", editingProduct);
                            onClose();
                        }}
                    >
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

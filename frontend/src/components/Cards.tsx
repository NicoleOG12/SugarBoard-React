import { useEffect } from "react";
import { createIcons, icons } from "lucide";

interface CardsProps {
  totalProdutos: number;
  totalCategorias: number;
  valorTotal: number;
}

export default function Cards({ totalProdutos, totalCategorias, valorTotal }: CardsProps) {
  useEffect(() => {
    createIcons({ icons });
  }, []);

  return (
    <div className="cards">
      <div className="card">
        <i data-lucide="package"></i>
        <h3>Total de Produtos</h3>
        <p>{totalProdutos}</p>
      </div>
      <div className="card">
        <i data-lucide="cookie"></i>
        <h3>Categorias</h3>
        <p>{totalCategorias}</p>
      </div>
      <div className="card">
        <i data-lucide="dollar-sign"></i>
        <h3>Valor Total</h3>
        <p>R$ {valorTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

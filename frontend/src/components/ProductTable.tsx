import type { Produto } from "../App";
import { Edit3, Trash2 } from "lucide-react";

interface ProductTableProps {
  produtos: Produto[];
  pesquisa: string;
  confirmarExclusaoProduto: (produto: Produto) => void;
  abrirEdicaoProduto?: (produto: Produto) => void;
}

export default function ProductTable({
  produtos,
  pesquisa,
  confirmarExclusaoProduto,
  abrirEdicaoProduto,
}: ProductTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Subtítulo</th>
            <th>Valor</th>
            <th>Peso</th>
            <th>Estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                Nenhum produto cadastrado 🍰
              </td>
            </tr>
          ) : (
            produtos
              .filter((p) =>
                p.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.imagem ? <img src={p.imagem} className="thumb" /> : "—"}</td>
                  <td>{p.nome}</td>
                  <td>{p.subtitulo}</td>
                  <td>R$ {p.valor.toFixed(2)}</td>
                  <td>{p.peso}</td>
                  <td>{p.estoque}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => abrirEdicaoProduto && abrirEdicaoProduto(p)}
                    >
                      <Edit3 size={20} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => confirmarExclusaoProduto(p)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

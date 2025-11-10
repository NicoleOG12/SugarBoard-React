import { useState, useEffect } from "react";
import "./styles/global.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import TopBar from "./components/TopBar";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { getProdutos, getCategorias, deletarProduto } from "./services/api";

export interface Produto {
  id: number;
  nome: string;
  subtitulo: string;
  valor: number;
  peso: string;
  estoque: number;
  categoria: string;
  categoria_id?: number;
  imagem?: string;
}

interface Categoria {
  id: number;
  nome: string;
}

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [pesquisa, setPesquisa] = useState("");

  const carregarProdutos = async () => {
    const produtosData = await getProdutos();
    const produtosFormatados = produtosData.map((p: any) => ({
      id: p.id,
      nome: p.nome,
      subtitulo: p.subtitulo,
      valor: Number(p.valor),
      peso: p.peso,
      estoque: p.estoque,
      categoria: p.categoria_nome,
      categoria_id: p.categoria_id,
      imagem: p.imagem,
    }));
    setProdutos(produtosFormatados);
  };

  useEffect(() => {
    async function fetchDados() {
      await carregarProdutos();
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    }
    fetchDados();
  }, []);

  const totalValor = produtos.reduce((acc, p) => acc + (p.valor || 0), 0);

  async function confirmarExclusaoProduto() {
    if (produtoSelecionado) {
      try {
        await deletarProduto(produtoSelecionado.id);
        setProdutos((prev) => prev.filter((p) => p.id !== produtoSelecionado.id));
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Não foi possível deletar o produto.");
      }
    }
    setConfirmarExclusao(false);
    setProdutoSelecionado(null);
  }

  function abrirConfirmacao(produto: Produto) {
    setProdutoSelecionado(produto);
    setConfirmarExclusao(true);
  }

  function abrirModalEdicao(produto: Produto) {
    setProdutoEditando(produto);
    setMostrarModal(true);
  }

  return (
    <div className="container">
      <Header />
      <Cards
        totalProdutos={produtos.length}
        totalCategorias={categorias.length}
        valorTotal={totalValor}
      />
      <TopBar
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        abrirModal={() => {
          setProdutoEditando(null);
          setMostrarModal(true);
        }}
      />
      <ProductTable
        produtos={produtos}
        pesquisa={pesquisa}
        confirmarExclusaoProduto={abrirConfirmacao}
        abrirEdicaoProduto={abrirModalEdicao}
      />
      {mostrarModal && (
        <ProductModal
          fecharModal={() => setMostrarModal(false)}
          produtoEditando={produtoEditando}
          categorias={categorias}
          atualizar={carregarProdutos}
        />
      )}
      {confirmarExclusao && (
        <ConfirmDeleteModal
          cancelarExclusao={() => setConfirmarExclusao(false)}
          confirmar={confirmarExclusaoProduto}
        />
      )}
    </div>
  );

}
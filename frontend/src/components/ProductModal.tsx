import { useState, useEffect } from "react";
import { createIcons, icons } from "lucide";
import { salvarProduto } from "../services/api";
import type { Produto } from "../App";

interface Categoria {
  id: number;
  nome: string;
}

interface ProductModalProps {
  fecharModal: () => void;
  atualizar: () => Promise<void>;
  produtoEditando: Produto | null;
  categorias: Categoria[];
}

export default function ProductModal({
  fecharModal,
  atualizar,
  produtoEditando,
  categorias,
}: ProductModalProps) {
  const [preview, setPreview] = useState<string>(produtoEditando?.imagem || "");
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(
    produtoEditando?.categoria || ""
  );

  useEffect(() => {
    createIcons({ icons });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemArquivo(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (imagemArquivo) {
      formData.append("imagem", imagemArquivo);
    } else if (produtoEditando?.imagem) {
      formData.append("imagem", produtoEditando.imagem);
    }

    const categoriaId = categorias.find((c) => c.nome === categoriaSelecionada)?.id;
    if (categoriaId) {
      formData.set("categoria_id", categoriaId.toString());
    }

    try {
      await salvarProduto(formData, produtoEditando?.id);
      await atualizar();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto, tente novamente.");
    }
  };

  return (
    <div className="modal-bg" style={{ display: "flex" }}>
      <div className="modal-horizontal">
        <button className="close-btn" onClick={fecharModal}>×</button>
        <div className="modal-content">
          <div className="modal-preview">
            <div className="image-upload">
              <img
                src={preview || "https://via.placeholder.com/250x250?text=Prévia"}
                alt="Prévia"
                className={`preview ${preview ? "show" : ""}`}
              />
              <label htmlFor="imagem" className="upload-icon">
                <i data-lucide="camera"></i>
              </label>
              <input
                type="file"
                id="imagem"
                name="imagem"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <h2>{produtoEditando ? "Editar Produto" : "Adicionar Produto"}</h2>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                defaultValue={produtoEditando?.nome || ""}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitulo">Subtítulo</label>
              <input
                type="text"
                id="subtitulo"
                name="subtitulo"
                defaultValue={produtoEditando?.subtitulo || ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor (R$)</label>
              <input
                type="number"
                id="valor"
                name="valor"
                step="0.01"
                defaultValue={produtoEditando?.valor || ""}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="peso">Peso</label>
              <input
                type="text"
                id="peso"
                name="peso"
                defaultValue={produtoEditando?.peso || ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estoque">Estoque</label>
              <input
                type="number"
                id="estoque"
                name="estoque"
                min="0"
                defaultValue={produtoEditando?.estoque || ""}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria_id">Categoria</label>
              <select
                id="categoria_id"
                name="categoria_id"
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {Array.from(new Map(categorias.map(cat => [cat.nome, cat])).values()).map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-buttons">
              <button type="button" className="btn-secondary" onClick={fecharModal}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

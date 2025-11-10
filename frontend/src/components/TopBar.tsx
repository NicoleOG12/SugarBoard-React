interface TopBarProps {
  pesquisa: string;
  setPesquisa: (value: string) => void;
  abrirModal: () => void;
}

export default function TopBar({ pesquisa, setPesquisa, abrirModal }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="search-box">
        <i data-lucide="search"></i>
        <input
          type="text"
          id="search"
          placeholder="Buscar produtos..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      <button id="btnAdd" className="btn-primary" onClick={abrirModal}>
        <i data-lucide="plus-circle"></i> Adicionar Produto
      </button>
    </div>
  );
}

interface ConfirmDeleteModalProps {
  cancelarExclusao: () => void;
  confirmar: () => void;
}

export default function ConfirmDeleteModal({
  cancelarExclusao,
  confirmar,
}: ConfirmDeleteModalProps) {
  return (
    <div className="modal-bg" id="confirmModal">
      <div className="modal-confirm">
        <p>Deseja realmente excluir este produto?</p>
        <div className="confirm-buttons">
          <button className="btn-secondary" onClick={cancelarExclusao}>
            Não
          </button>
          <button className="btn-primary" onClick={confirmar}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

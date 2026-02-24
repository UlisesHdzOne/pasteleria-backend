type ConfirmDeleteModalProps = {
  courseName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const ConfirmDeleteModal = ({
  courseName,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDeleteModalProps) => {
  return (
    <div className="backdrop">
      <div className="modal">
        <h3>Eliminar curso</h3>
        <p>
          ¿Seguro que deseas eliminar el curso <strong>{courseName}</strong>?
        </p>

        <div>
          <button onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

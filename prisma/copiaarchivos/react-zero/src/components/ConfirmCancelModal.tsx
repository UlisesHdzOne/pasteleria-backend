type ConfirmCancelModalProps = {
  drivenCourseId: number;
  loading: boolean;
  onCancel: () => void;
  onConfirm: (drivenCourseId: number) => Promise<void>;
};

const ConfirmCancelModal = ({
  drivenCourseId,
  loading,
  onCancel,
  onConfirm,
}: ConfirmCancelModalProps) => {
  return (
    <div className="backdrop">
      <div className="modal">
        <h3>Cancelar curso</h3>
        <p>
          Esta acción es <strong>irreversible</strong>. El driven no podrá
          continuar el curso.
        </p>

        <button onClick={onCancel} disabled={loading}>
          Volver
        </button>

        <button disabled={loading} onClick={() => onConfirm(drivenCourseId)}>
          Sí, cancelar
        </button>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;

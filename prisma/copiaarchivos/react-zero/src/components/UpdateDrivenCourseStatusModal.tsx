import { useState } from "react";
import { useDrivenCourseStatusActions } from "../assets/context/driven-course-status/DrivenCourseStatusActionsContext";
import type { DrivenCourseStatus } from "../types/driven-course-status";

type UpdateDrivenCourseStatusModalProps = {
  courseId: number;
  drivenId: number;
  currentStatus: DrivenCourseStatus;
  onClose: () => void;
  onSuccess?: () => void;
};

const STATUS_OPTIONS: DrivenCourseStatus[] = [
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELED",
];

const UpdateDrivenCourseStatusModal = ({
  courseId,
  drivenId,
  currentStatus,
  onClose,
  onSuccess,
}: UpdateDrivenCourseStatusModalProps) => {
  const { updateStatus, loading } = useDrivenCourseStatusActions();
  const [status, setStatus] = useState<DrivenCourseStatus>(currentStatus);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);

    const result = await updateStatus(courseId, drivenId, status);

    if (!result.success) {
      setError(result.message);
      return;
    }

    onSuccess?.();
    onClose();
  };
  return (
    <div className="modal">
      <h3>Cambiar estado del curso</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as DrivenCourseStatus)}
        disabled={loading}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button onClick={onClose} disabled={loading}>
          Cancelar
        </button>
        <button onClick={handleSave} disabled={loading}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default UpdateDrivenCourseStatusModal;
///cambio de estados del driven-cursos
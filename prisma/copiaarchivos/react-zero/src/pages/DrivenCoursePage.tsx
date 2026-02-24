import { useEffect, useState } from "react";

import { useCourseAssignmentActions } from "../assets/context/course-assignment/CourseAssignmentActionsContext";

import { useDrivenCourseAllActions } from "../assets/context/driven-courses/all/DrivenCourseAllActionsContext";
import { useDrivenCourseAllData } from "../assets/context/driven-courses/all/DrivenCourseAllDataContext";
import CreateCourseDriverModal from "../components/CreateCourseDriverModal";
import ConfirmCancelModal from "../components/ConfirmCancelModal";
import Toast from "../components/Toast";

import { useCourseData } from "../assets/context/course/CourseDataContext";
import { useCourseAction } from "../assets/context/course/CourseActionsContext";
import { useDrivenData } from "../assets/context/driven/DrivenDataContext";
import { useDrivenActions } from "../assets/context/driven/DrivenActionsContext";
import type { CourseDrivenInput } from "../hook/useCourseDrivenForm";

const DrivenCoursePage = () => {
  const {
    fetchAll,
    updateStatus,
    updateProgress,
    remove,
    loading,
    loadingActionId,
  } = useDrivenCourseAllActions();
  const { items, error } = useDrivenCourseAllData();
  const { assignCourseToDriven } = useCourseAssignmentActions();

  const [cursoDrivenOpen, setCursoDrivenOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState<number | null>(null);
  const [localProgress, setLocalProgress] = useState<Record<number, number>>(
    {},
  );

  const { courses } = useCourseData();
  const { fetchCourses } = useCourseAction();

  const { drivens } = useDrivenData();
  const { fetchDrivens } = useDrivenActions();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch de cursos y drivens
  useEffect(() => {
    fetchCourses({});
    fetchDrivens({});
  }, [fetchCourses, fetchDrivens]);

  // Fetch de driven courses
  useEffect(() => {
    fetchAll({ page: 1, limit: 10 });
  }, [fetchAll]);

  const handleAssignCourseToDriven = async (
    data: CourseDrivenInput,
  ): Promise<{ success: boolean; message?: string }> => {
    if (
      typeof data.courseId !== "number" ||
      typeof data.drivenId !== "number"
    ) {
      return { success: false, message: "Datos inválidos" };
    }

    const result = await assignCourseToDriven({
      courseId: data.courseId,
      drivenId: data.drivenId,
    });

    if (result.success) {
      showToast("Curso asignado correctamente", "success");

      // 🔥 refresca la lista para que aparezca el nuevo registro
      await fetchAll({ page: 1, limit: 10 });
    } else {
      showToast(result.message, "error");
    }

    return result;
  };

  const handleConfirmCancel = async (drivenCourseId: number) => {
    const result = await updateStatus(drivenCourseId, "CANCELED");

    if (result.success) {
      showToast("Curso cancelado", "success");
    } else {
      showToast(result.message, "error");
    }
    setConfirmCancel(null);
  };

  const handleProgressChange = async (
    drivenCourseId: number,
    progress: number,
  ) => {
    const result = await updateProgress(drivenCourseId, progress);

    if (result.success) {
      showToast("Progreso actualizado", "success");

      setLocalProgress((prev) => {
        const copy = { ...prev };
        delete copy[drivenCourseId];
        return copy;
      });
    } else {
      showToast(result.message, "error");
    }
  };

  const handleRemove = async (drivenCourseId: number) => {
    const result = await remove(drivenCourseId);
    if (result.success) {
      showToast("Curso removido del driven", "success");
    } else {
      showToast(result.message, "error");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <h1>Driven course</h1>

      <button onClick={() => setCursoDrivenOpen(true)}>
        Asignar curso a un Driven
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.drivenCourseId}>
            Driven: {item.driven.name} – Course: {item.course.name} – Estado:{" "}
            <strong>{item.status.replace("_", " ")}</strong>
            {item.status === "IN_PROGRESS" && (
              <>
                <div style={{ marginTop: 8 }}>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={localProgress[item.drivenCourseId] ?? item.progress}
                    disabled={loadingActionId === item.drivenCourseId}
                    onChange={(e) =>
                      setLocalProgress((prev) => ({
                        ...prev,
                        [item.drivenCourseId]: Number(e.target.value),
                      }))
                    }
                    onPointerUp={() =>
                      handleProgressChange(
                        item.drivenCourseId,
                        localProgress[item.drivenCourseId] ?? item.progress,
                      )
                    }
                  />

                  <span>
                    {localProgress[item.drivenCourseId] ?? item.progress}%
                  </span>
                </div>

                <button
                  style={{ marginTop: 8 }}
                  disabled={loadingActionId === item.drivenCourseId}
                  onClick={() => setConfirmCancel(item.drivenCourseId)}
                >
                  Cancelar curso
                </button>
              </>
            )}
            {(item.status === "COMPLETED" || item.status === "CANCELED") && (
              <button
                style={{ marginTop: 8 }}
                disabled={loadingActionId === item.drivenCourseId}
                onClick={() => handleRemove(item.drivenCourseId)}
              >
                Quitar curso
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* corregido */}
      {cursoDrivenOpen && (
        <CreateCourseDriverModal
          onClose={() => setCursoDrivenOpen(false)}
          courses={courses}
          drivens={drivens}
          assignCourseToDriven={handleAssignCourseToDriven}
        />
      )}

      {confirmCancel !== null && (
        <ConfirmCancelModal
          drivenCourseId={confirmCancel}
          loading={loadingActionId === confirmCancel}
          onCancel={() => setConfirmCancel(null)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
};

export default DrivenCoursePage;

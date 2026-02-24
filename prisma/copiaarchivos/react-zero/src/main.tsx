import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DrivenDataProvider } from "./assets/context/driven/DrivenDataContext.tsx";
import { CourseDataProvider } from "./assets/context/course/CourseDataContext.tsx";
import { CourseActionsProvider } from "./assets/context/course/CourseActionsContext.tsx";
import { DrivenActionsProvider } from "./assets/context/driven/DrivenActionsContext.tsx";
import { CourseAssignmentActionsProvider } from "./assets/context/course-assignment/CourseAssignmentActionsContext.tsx";
import { DrivenCourseStatusActionsProvider } from "./assets/context/driven-course-status/DrivenCourseStatusActionsContext.tsx";
import { DrivenCourseAllActionsProvider } from "./assets/context/driven-courses/all/DrivenCourseAllActionsContext.tsx";
import { DrivenCourseAllDataProvider } from "./assets/context/driven-courses/all/DrivenCourseAllDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DrivenCourseAllDataProvider>
    <DrivenCourseAllActionsProvider>
      <DrivenCourseStatusActionsProvider>
        <CourseAssignmentActionsProvider>
          <DrivenDataProvider>
            <DrivenActionsProvider>
              <CourseDataProvider>
                <CourseActionsProvider>
                  <App />
                </CourseActionsProvider>
              </CourseDataProvider>
            </DrivenActionsProvider>
          </DrivenDataProvider>
        </CourseAssignmentActionsProvider>
      </DrivenCourseStatusActionsProvider>
    </DrivenCourseAllActionsProvider>
  </DrivenCourseAllDataProvider>,
);

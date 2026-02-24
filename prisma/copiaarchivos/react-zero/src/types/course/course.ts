//para el back este es el dominio
export type CourseLifecycleStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type CourseListItem = {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  status: CourseLifecycleStatus;
  durationHours?: number;
};

export type CourseMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type CoursesResponse = {
  data: CourseListItem[];
  meta: CourseMeta;
};

// -------
// crear curso
export type CourseInput = {
  name: string;
  description?: string;
  durationHours?: number;
};

export type CourseUpdateInput = {
  name?: string;
  description?: string;
  isActive?: boolean;
  status?: CourseLifecycleStatus;
  durationHours?: number;
};

export type DrivenCourseListItem = {
  drivenCourseId: number;

  driven: {
    id: number;
    name: string;
  };

  course: {
    id: number;
    name: string;
    isActive: boolean;
  };

  status: string;
  progress: number;
  assignedAt: string;
};

export type DrivenCourseMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type DrivenCourseResponse = {
  data: DrivenCourseListItem[];
  meta: DrivenCourseMeta;
};

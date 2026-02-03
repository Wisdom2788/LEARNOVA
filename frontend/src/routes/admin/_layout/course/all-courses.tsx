import AdminLayout from "@/components/admin/adminLayout";
import { CourseItem } from "@/components/admin/course/courseItem";
import Select from "@/components/common/form/select";
import ModuleHeader from "@/components/common/layout/moduleHeader";
import { AlertModal } from "@/components/common/modal/alertModal";
import ReorderButtons from "@/components/common/reorderButtons";
import { SortableList } from "@/components/common/sortableList";
import { useCourseListController } from "@/hooks/controller/course/useCourseListController";
import { ECourseStatus, type ICourse } from "@packages/definitions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_layout/course/all-courses")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    searchQuery,
    setSearchQuery,
    courses,
    handleReorder,
    isReorderMode,
    setArchivedModalOpen,
    cancelChanges,
    toggleReorderMode,
    archivedModalOpen,
    cancelArchivedOperationModal,
    confirmArchivedOperation,
    isLoading,
    statusFilter,
    setStatusFilter,
    isUpdating,
  } = useCourseListController();

  return (
    <AdminLayout>
      <ModuleHeader
        searchPlaceholder="Search courses..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <Select
          options={[
            { value: "", label: "All Status" },
            { value: ECourseStatus.PUBLISHED, label: "Published" },
            { value: ECourseStatus.DRAFT, label: "Draft" },
            { value: ECourseStatus.ARCHIVED, label: "Archived" },
          ]}
          value={statusFilter}
          onChange={(val) => setStatusFilter(val as ICourse["status"])}
          placeholder="All Status"
          className="w-38"
        />

        <ReorderButtons
          visible={courses?.length > 0}
          isReorderMode={isReorderMode}
          cancelChanges={cancelChanges}
          isUpdating={isUpdating}
          toggleReorderMode={toggleReorderMode}
        />
      </ModuleHeader>

      <SortableList<
        ICourse,
        { isReorderMode: boolean; onArchived?: (courseId: number) => void }
      >
        items={courses}
        onItemsReorder={handleReorder}
        renderItem={CourseItem}
        itemIdKey="id"
        containerClassName="divide-y divide-gray-200 dark:divide-gray-700"
        extraProps={{
          isReorderMode,
          onArchived: (id) => setArchivedModalOpen(id),
        }}
        isLoading={isLoading}
      />

      <AlertModal
        open={!!archivedModalOpen}
        onCancel={cancelArchivedOperationModal}
        onConfirm={() => confirmArchivedOperation(archivedModalOpen)}
      />
    </AdminLayout>
  );
}

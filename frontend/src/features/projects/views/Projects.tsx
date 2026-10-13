import { useState } from "react";
import { ProjectFilters } from "../components/project_filters/ProjectFilters";
import { ProjectHeader } from "../components/project_header/ProjectHeader";
import { ProjectList } from "../components/project_list/ProjectList";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { useProjects } from "../hooks/useProjects";
import { ProjectFormModal } from "../components/project_form_modal/ProjectFormModal";
import { ProjectDetailsSheet } from "../components/project_details_sheet/ProjectDetailsSheet";
import type { Project } from "../types/project.types";
import { useProjectStats } from "../hooks/useProjectStats";
import { useProjectSessionFeedback } from "../hooks/useProjectSessionFeedback";
import ProjectSessionFeedback from "../components/project_session_feedback/ProjectSessionFeedback";
import { useProjectAreas } from "../hooks/useProjectAreas";
import { ProjectAreaParam } from "../components/project_area_param/ProjectAreaParam";

export default function Projects() {
	const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
	const { feedbacks: sessionFeedbacks, createFeedback } = useProjectSessionFeedback();
	const { areas, handleAddArea, handleDeleteArea, handleUpdateArea, isAreaModalOpen, setIsAreaModalOpen } = useProjectAreas();

	// Estados para el Modal (Crear / Editar)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

	// Estados para el Sheet (Detalles laterales)
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const {
		searchQuery,
		setSearchQuery,
		selectedFilter,
		setSelectedFilter,
		selectedArea,
		setSelectedArea,
		filteredProjects,
	} = useProjectFilters(projects);

	const stats = useProjectStats(projects);

	const handleSaveProject = async (data: Project) => {
		if (data.id && projects.some(p => p.id === data.id)) {
			// Si ya existe, actualizamos
			const result = await updateProject(data.id, data);
			if (!result.success) alert(result.error);
		} else {
			// Si no tiene ID o no existe, creamos
			const result = await createProject(data);
			if (!result.success) alert(result.error);
		}
		setProjectToEdit(null);
		setIsModalOpen(false);
	};

	const handleDeleteProject = async (projectId: string) => {
		const result = await deleteProject(projectId);
		if (result.success) {
			setIsModalOpen(false);
			setProjectToEdit(null);
		} else {
			alert(result.error);
		}
	};

	const handleOpenProjectDetails = (project: Project) => {
		setSelectedProject(project);
		setIsSheetOpen(true);
	};

	if (loading) {
		return <div className="p-6 text-center text-muted-foreground">Cargando proyectos...</div>;
	}

	return (
		<>
			<ProjectHeader
				totalProjects={stats.totalProjects}
				completedProjects={stats.completedProjects}
				inProgressProjects={stats.inProgressProjects}
				averageProgress={stats.averageProgress}
			/>
			<section className="mx-auto max-w-6xl px-6 sm:px-10">
				<ProjectFilters
					searchQuery={searchQuery}
					onSearchChange={(e) => setSearchQuery(e.target.value)}
					selectedFilter={selectedFilter}
					onFilterChange={setSelectedFilter}
					selectedArea={selectedArea}
					onAreaChange={(e) => setSelectedArea(e.target.value)}
					onOpenAreas={() => setIsAreaModalOpen(true)}
					onNewProject={() => {
						setProjectToEdit(null); // Limpiamos para indicar que es nuevo
						setIsModalOpen(true);
					}}
					totalCount={stats.totalProjects}
					completedCount={stats.completedProjects}
					inProgressCount={stats.inProgressProjects}
					pendingCount={stats.pendingProjects}
					highPriorityCount={stats.highPriorityProjects}
					areas={areas}
				/>

				<ProjectList
					projects={filteredProjects}
					onProjectClick={handleOpenProjectDetails}
				/>

				{/* Modal único para Crear y Editar */}
				<ProjectFormModal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
						setProjectToEdit(null);
					}}
					project={projectToEdit}
					onSave={handleSaveProject}
					onDelete={handleDeleteProject}
					areas={areas}
				/>
			</section>

			{/* Sheet Lateral de Detalles */}
			<ProjectDetailsSheet
				isOpen={isSheetOpen} 
				onClose={() => {
					setIsSheetOpen(false);
					setSelectedProject(null);
				}}
				project={selectedProject}
				feedbacks={sessionFeedbacks.filter(f => f.projectId === selectedProject?.id || f.proyecto === selectedProject?.nombre)}
				onEdit={(proj) => {
					setIsSheetOpen(false); // Cerramos el detalle lateral
					setProjectToEdit(proj); // Cargamos el proyecto a editar
					setIsModalOpen(true);   // Abrimos el formulario modal
				}}
				onSaveNote={(noteData) => {
					console.log('Guardar nota de gerencia:', noteData);
					createFeedback(noteData);
					// Aquí actualizas tu backend o estado local de notas
				}}
			/>

			<ProjectSessionFeedback
				feedbacks={sessionFeedbacks}
				onExportCSV={() => console.log('Exportando feedback a CSV...')}
			/>

			<ProjectAreaParam
				isOpen={isAreaModalOpen}
				onClose={() => setIsAreaModalOpen(false)}
				areas={areas}
				onAddArea={handleAddArea}
				onUpdateArea={handleUpdateArea}
				onDeleteArea={handleDeleteArea}
			/>
		</>
	);
}
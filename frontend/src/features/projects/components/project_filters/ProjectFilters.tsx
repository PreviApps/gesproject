import React from 'react';
import { Search, Settings2, Plus } from 'lucide-react';
import type { Area } from '../../hooks/useProjectAreas';

interface ProjectToolbarProps {
	searchQuery?: string;
	onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedFilter?: string;
	onFilterChange?: (filter: string) => void;
	selectedArea?: string;
	onAreaChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onOpenAreas?: () => void;
	onNewProject?: () => void;
	totalCount?: number;
	completedCount?: number;
	inProgressCount?: number;
	pendingCount?: number;
	highPriorityCount?: number;
	areas: Area[];
}

export const ProjectFilters: React.FC<ProjectToolbarProps> = ({
	searchQuery = '',
	onSearchChange,
	selectedFilter = 'TODOS',
	onFilterChange,
	selectedArea = 'TODAS',
	onAreaChange,
	onOpenAreas,
	onNewProject,
	totalCount = 0,
	completedCount = 0,
	inProgressCount = 0,
	pendingCount = 0,
	areas = []
}) => {
	return (
		<>
			<div className="sticky top-0 z-10 -mx-2 flex flex-wrap items-center gap-2 bg-[#f2fafa] px-2 py-4 backdrop-blur text-slate-700">
				{/* Botón Todos */}
				<button
					type="button"
					onClick={() => onFilterChange?.('TODOS')}
					className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedFilter === 'TODOS'
						? 'border-primary bg-[#006772] text-white'
						: 'border-border bg-card text-muted-foreground hover:bg-secondary'
						}`}
				>
					Todos<span className="opacity-70">{totalCount}</span>
				</button>

				{/* Botón Finalizado */}
				<button
					type="button"
					onClick={() => onFilterChange?.('FINALIZADO')}
					className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedFilter === 'FINALIZADO'
						? 'border-primary bg-[#006772] text-white'
						: 'border-border bg-card text-muted-foreground hover:bg-secondary'
						}`}
				>
					<span className="size-2 rounded-full" style={{ backgroundColor: '#2a9d67' }}></span>
					Finalizado
					<span className="opacity-70">{completedCount}</span>
				</button>

				{/* Botón En desarrollo */}
				<button
					type="button"
					onClick={() => onFilterChange?.('DESARROLLO')}
					className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedFilter === 'DESARROLLO'
						? 'border-primary bg-[#006772] text-white'
						: 'border-border bg-card text-muted-foreground hover:bg-secondary'
						}`}
				>
					<span className="size-2 rounded-full" style={{ backgroundColor: '#d6810c' }}></span>
					En desarrollo
					<span className="opacity-70">{inProgressCount}</span>
				</button>

				{/* Botón Pendiente */}
				<button
					type="button"
					onClick={() => onFilterChange?.('PENDIENTE')}
					className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedFilter === 'PENDIENTE'
						? 'border-primary bg-[#006772] text-white'
						: 'border-border bg-card text-muted-foreground hover:bg-secondary'
						}`}
				>
					<span className="size-2 rounded-full" style={{ backgroundColor: '#718391' }}></span>
					Pendiente
					<span className="opacity-70">{pendingCount}</span>
				</button>

				{/* Botón Prioridad alta */}
				<button
					type="button"
					onClick={() => onFilterChange?.('PRIORIDAD_ALTA')}
					className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedFilter === 'PRIORIDAD_ALTA'
						? 'border-primary bg-[#006772] text-white'
						: 'border-border bg-card text-muted-foreground hover:bg-secondary'
						}`}
				>
					Solo prioridad alta
				</button>

				{/* Selector de Área */}
				<label className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
					Área
					<select
						value={selectedArea}
						onChange={onAreaChange}
						className="h-8 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-ring"
					>
						<option value="TODAS">Todas</option>
						{areas.map((area) => (
							<option key={area.id} value={area.id}>
								{area.nombre}
							</option>
						))}
						<option value="SIN_AREA">Sin área</option>
					</select>
				</label>

				{/* Barra de Búsqueda */}
				<div className="relative ml-auto w-full sm:w-64">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
					<input
						type="text"
						value={searchQuery}
						onChange={onSearchChange}
						className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
						placeholder="Buscar proyecto o líder…"
					/>
				</div>

				{/* Acciones Finales (Áreas y Nuevo proyecto) */}
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={onOpenAreas}
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
					>
						<Settings2 className="size-4" aria-hidden="true" /> Áreas
					</button>
					<button
						type="button"
						onClick={onNewProject}
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-[#006772] text-white shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
					>
						<Plus className="size-4" aria-hidden="true" /> Nuevo proyecto
					</button>
				</div>
			</div>
		</>
	);
};
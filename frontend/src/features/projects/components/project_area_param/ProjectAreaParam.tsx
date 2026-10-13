import React, { useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import type { Area } from '../../types/project.types';

interface AreaModalProps {
	isOpen: boolean;
	onClose: () => void;
	areas: Area[];
	onAddArea: (area: Omit<Area, 'id'>) => void;
	onUpdateArea: (id: string, area: Partial<Area>) => void;
	onDeleteArea: (id: string) => void;
}

export const ProjectAreaParam: React.FC<AreaModalProps> = ({
	isOpen,
	onClose,
	areas = [],
	onAddArea,
	onUpdateArea,
	onDeleteArea,
}) => {
	const [newAreaName, setNewAreaName] = useState('');
	const [newAreaColor, setNewAreaColor] = useState('#0ea5a4');

	if (!isOpen) return null;

	const handleCreateArea = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newAreaName.trim()) return;

		onAddArea({
			nombre: newAreaName.trim(),
			color: newAreaColor,
		});

		setNewAreaName('');
		setNewAreaColor('#0ea5a4');
	};

	return (
		<>
			{/* Backdrop */}
			<div
				data-state="open"
				className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
				style={{ pointerEvents: 'auto' }}
				aria-hidden="true"
				onClick={onClose}
			/>

			{/* Dialog */}
			<div
				role="dialog"
				data-state="open"
				className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg max-w-md text-slate-700"
				tabIndex={-1}
				style={{ pointerEvents: 'auto' }}
			>
				<div className="flex flex-col space-y-1.5 text-center sm:text-left">
					<h2 className="text-lg font-semibold leading-none tracking-tight">Parametrizar áreas</h2>
				</div>

				{/* Listado de Áreas Existentes */}
				<div className="space-y-2 max-h-60 overflow-y-auto pr-1">
					{areas.map((area) => (
						<div key={area.id} className="flex items-center gap-2 rounded-lg border border-border p-2">
							<input
								aria-label={`Color de ${area.nombre}`}
								className="h-8 w-10 cursor-pointer rounded border border-border bg-transparent"
								type="color"
								value={area.color}
								onChange={(e) => onUpdateArea(area.id, { color: e.target.value })}
							/>
							<input
								className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm h-8"
								value={area.nombre}
								onChange={(e) => onUpdateArea(area.id, { nombre: e.target.value })}
							/>
							<button
								type="button"
								aria-label={`Eliminar ${area.nombre}`}
								onClick={() => onDeleteArea(area.id)}
								className="p-1.5 text-muted-foreground transition-colors hover:text-destructive cursor-pointer"
							>
								<Trash2 className="size-4" aria-hidden="true" />
							</button>
						</div>
					))}
					{areas.length === 0 && (
						<p className="text-xs text-center text-muted-foreground py-2">No hay áreas parametrizadas.</p>
					)}
				</div>

				{/* Formulario para Nueva Área */}
				<form onSubmit={handleCreateArea} className="space-y-2 rounded-lg border border-border p-3">
					<label className="font-medium text-xs">Nueva área</label>
					<div className="flex items-center gap-2">
						<input
							aria-label="Color del área nueva"
							className="h-9 w-10 cursor-pointer rounded border border-border bg-transparent"
							type="color"
							value={newAreaColor}
							onChange={(e) => setNewAreaColor(e.target.value)}
						/>
						<input
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
							placeholder="Ej. Desarrollo, BI, Infraestructura…"
							value={newAreaName}
							onChange={(e) => setNewAreaName(e.target.value)}
						/>
						<button
							type="submit"
							className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
							aria-label="Agregar área"
						>
							<Plus className="size-4" aria-hidden="true" />
						</button>
					</div>
				</form>

				{/* Botón de Cierre (X) */}
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					<X className="h-4 w-4" aria-hidden="true" />
					<span className="sr-only">Close</span>
				</button>
			</div>
		</>
	);
};
import { Download } from 'lucide-react';

export interface SessionFeedback {
	id: string;
	proyecto: string;
	autor: string;
	categoria: string;
	comentario: string;
	created_at: string;
}

interface SessionFeedbackSectionProps {
	feedbacks?: SessionFeedback[];
	onExportCSV?: () => void;
}

export default function ProjectSessionFeedback({
	feedbacks = [],
	onExportCSV,
}: SessionFeedbackSectionProps) {
	// Función para formatear la fecha ISO al formato amigable
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return new Intl.DateTimeFormat('es-ES', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: true,
			}).format(date);
		} catch {
			return dateString;
		}
	};

	return (
		<section className="mx-auto mt-16 max-w-6xl px-6 sm:px-10 text-slate-700">
			{/* Cabecera con título y botón de Exportar */}
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="text-xl font-semibold text-slate-800">Feedback de la sesión</h2>
					<p className="text-sm text-muted-foreground">
						Notas registradas durante la presentación ({feedbacks.length}).
					</p>
				</div>

				<button
					type="button"
					onClick={onExportCSV}
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
				>
					<Download className="size-4 shrink-0" aria-hidden="true" />
					Exportar CSV
				</button>
			</div>

			{/* Grid de tarjetas de feedback global */}
			<div className="mt-5 grid gap-3 sm:grid-cols-2">
				{feedbacks.map((item) => (
					<div
						key={item.id}
						className="rounded-xl border border-border bg-card p-4 shadow-soft flex flex-col justify-between"
					>
						<div>
							{/* Metadatos superiores (Categoría, Autor y Fecha) */}
							<div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
								<div className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors border-transparent bg-[#ddf1f4] text-secondary-foreground hover:bg-secondary/80 text-[10px]">
									{item.categoria || 'Comentario'}
								</div>
								<span className="font-medium text-foreground">{item.autor}</span>
								<span>{formatDate(item.created_at)}</span>
							</div>

							{/* Nombre del proyecto */}
							<p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#006772]">
								{item.proyecto}
							</p>

							{/* Contenido del comentario */}
							<p className="mt-1 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
								{item.comentario}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
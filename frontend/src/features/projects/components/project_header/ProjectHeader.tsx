import React from 'react';
import logoPrevisalud from '../../../../assets/eprevisalud.png'

interface HeaderProps {
	logoSrc?: string;
	totalProjects?: number | string;
	completedProjects?: number | string;
	inProgressProjects?: number | string;
	averageProgress?: string | number;
}

export const ProjectHeader: React.FC<HeaderProps> = ({
	totalProjects = 42,
	completedProjects = 13,
	inProgressProjects = 6,
	averageProgress = "92%",
}) => {
	return (
		<header className="w-full bg-[#006869] px-6 py-8 text-white sm:px-10 sm:py-10 shadow-md">
			<div className="mx-auto max-w-6xl">
				{/* Contenedor del Logo */}
				<div className="mb-8 inline-flex items-center rounded-xl bg-white/95 px-4 py-2.5 shadow-sm">
					<img
						src={logoPrevisalud}
						alt="Logo Previsalud"
						className="h-9 w-auto sm:h-11 object-contain"
						width="220"
						height="44"
					/>
				</div>

				{/* Subtítulo superior */}
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
					Gestión de Tecnología · Grupo Previsalud
				</p>

				{/* Título Principal */}
				<h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
					Avances del portafolio de aplicaciones 2026
				</h1>

				{/* Descripción */}
				<p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
					Estado del primer semestre: lo desplegado, lo que está en curso y lo pendiente por estructurar. Selecciona cualquier proyecto para ver el detalle y registrar el feedback de la reunión.
				</p>

				{/* Tarjetas de Estadísticas (Grid de 4) */}
				<div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<p className="text-3xl font-bold text-white">{totalProjects}</p>
						<p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">Proyectos en portafolio</p>
					</div>
					<div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<p className="text-3xl font-bold text-white">{completedProjects}</p>
						<p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">Entregados / en producción</p>
					</div>
					<div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<p className="text-3xl font-bold text-white">{inProgressProjects}</p>
						<p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">En desarrollo activo</p>
					</div>
					<div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
						<p className="text-3xl font-bold text-white">{averageProgress}</p>
						<p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">Avance promedio</p>
					</div>
				</div>
			</div>
		</header>
	);
};
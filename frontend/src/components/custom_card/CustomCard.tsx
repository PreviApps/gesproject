import React, { type ReactNode } from 'react';

interface CardProps {
  title: string;
  statusText: string;
  badges?: ReactNode[];
  description: string;
  generalProgress: number;
  phases: {
    label: string;
    percentage: number;
  }[];
  metadata?: ReactNode[];
  footerContent?: ReactNode;
  onClick?: () => void;
}

export const CustomCard: React.FC<CardProps> = ({
  title,
  statusText,
  badges = [],
  description,
  generalProgress,
  phases = [],
  metadata = [],
  footerContent,
  onClick,
}) => {
  // Colores exactos que solicitaste
  const activeColor = statusText === 'FINALIZADO' ? '#2a9d67' : '#d6810c';

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      {/* Cabecera: Título y Punto de Estado */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-slate-900">{title}</h3>
        <span 
          className="mt-1 size-2.5 shrink-0 rounded-full" 
          style={{ backgroundColor: activeColor }}
          aria-hidden="true"
        ></span>
      </div>

      {/* Etiquetas / Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-medium border-transparent bg-slate-100 text-slate-700">
          {statusText}
        </div>
        {badges.map((badge, index) => (
          <React.Fragment key={index}>{badge}</React.Fragment>
        ))}
      </div>

      {/* Descripción */}
      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
        {description}
      </p>

      {/* Sección Inferior: Avance y Detalles */}
      <div className="mt-auto pt-4 w-full">
        {/* Barra de Progreso General */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
          <span>Avance general</span>
          <span className="font-bold" style={{ color: activeColor }}>{generalProgress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${generalProgress}%`, backgroundColor: activeColor }}
          ></div>
        </div>

        {/* Fases dinámicas (Grid) */}
        {phases.length > 0 && (
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {phases.map((phase, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="text-slate-600">{phase.label}</span>
                  <span className="font-medium text-slate-900">{phase.percentage}%</span>
                </div>
                <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${phase.percentage}%`, backgroundColor: activeColor }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metadatos (Tiempo, Fechas, etc.) */}
        {metadata.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500">
            {metadata.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </div>
        )}

        {/* Footer (Líder u otros elementos al final) */}
        {footerContent && <div className="mt-3 text-slate-600">{footerContent}</div>}
      </div>
    </button>
  );
};
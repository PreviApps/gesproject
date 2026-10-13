import { useCallback, useEffect, useState } from 'react';
import type { SessionFeedback } from '../types/project.types';
import { createProjectComment, deleteProjectComment, getProjectComments } from '../api/feedback.api';

export const useProjectSessionFeedback = (projectId?: string) => {
  /*const [feedbacks, setFeedbacks] = useState<SessionFeedback[]>([
    {
      id: "4c222b58-309d-48c6-aa6d-e7a89e5d244b",
      proyecto: "SOLINT (FACTURACIÓN)",
      autor: "Darwin Acosta",
      categoria: "Comentario",
      comentario: "El RN ya fue enviado a Henry para su respectiva evaluacion de desarrollo y Cotizacion. se espera respuesta por parte de Henry para que se proceda a solicitar autorizacion de pago.",
      created_at: "2026-09-04T16:20:34.555461+00:00"
    },
    {
      id: "c1d070d1-80a1-447f-9b86-92b69ca8a43c",
      proyecto: "IndexOne Tablero Gerencial",
      autor: "Darwin Acosta",
      categoria: "Comentario",
      comentario: "Adicinal por parte de sistema se realizo la creacion de un Nuevo ROL, en que los usuario deben tener estas opciones habilita y se les parametrizo para que puedan tener su uso, adicional Anuar Rizacala realizo unos video en que socializa la usabilidad de la herramienta para seguimiento.",
      created_at: "2026-09-04T15:24:07.375751+00:00"
    },
    {
      id: "79291717-6ca0-45b1-927a-93317d8c9661",
      proyecto: "PREVILIBRANZA",
      autor: "Alvaro Meriño",
      categoria: "Comentario",
      comentario: "Debemos realizar debido despliegue con los colaboradores en acompañamiento con Gestion Humana.\n\nOrganizar plan de despliegue.",
      created_at: "2026-08-24T20:57:22.526758+00:00"
    }
  ]);
  
  const [loading] = useState(false);

  // Aquí en el futuro puedes cambiar el mock por un fetch a tu API:
  // useEffect(() => { fetchFeedback()... }, [])*/

  const [feedbacks, setFeedbacks] = useState<SessionFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjectComments(projectId);
      setFeedbacks(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error de conexión al cargar los comentarios');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createFeedback = async (commentData: { projectId: string; autor: string; categoria: string; observacion: string }) => {
    try {
      setError(null);
      const newComment = await createProjectComment(commentData);
      setFeedbacks((prev) => [newComment, ...prev]);
      return { success: true, data: newComment };
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'No se pudo guardar el comentario');
      return { success: false, error: err.message };
    }
  };

  const removeFeedback = async (id: string) => {
    try {
      setError(null);
      await deleteProjectComment(id);
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'No se pudo eliminar el comentario');
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return {
    feedbacks,
    setFeedbacks,
    loading,
    error,
    refreshFeedbacks: fetchFeedbacks,
    createFeedback,
    removeFeedback,
  };
};
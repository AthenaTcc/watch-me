import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Turma, Professor, HorarioComRelacoes, FiltrosGrade } from '../types/database';
import { MOCK_TURMAS, MOCK_PROFESSORES, MOCK_HORARIOS_COMPLETOS } from './mockData';

/**
 * Busca todas as turmas cadastradas
 */
export async function buscarTurmas(): Promise<Turma[]> {
  if (!isSupabaseConfigured) {
    // Simula latência de rede para testar Skeletons
    await new Promise((res) => setTimeout(res, 300));
    return MOCK_TURMAS;
  }

  const { data, error } = await supabase
    .from('turmas')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar turmas no Supabase:', error.message);
    throw new Error(`Falha ao carregar turmas: ${error.message}`);
  }

  return (data as Turma[]) || [];
}

/**
 * Busca todos os professores cadastrados
 */
export async function buscarProfessores(): Promise<Professor[]> {
  if (!isSupabaseConfigured) {
    await new Promise((res) => setTimeout(res, 300));
    return MOCK_PROFESSORES;
  }

  const { data, error } = await supabase
    .from('professores')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao buscar professores no Supabase:', error.message);
    throw new Error(`Falha ao carregar professores: ${error.message}`);
  }

  return (data as Professor[]) || [];
}

/**
 * Busca a grade horária com consultas relacionais completas para evitar o problema N+1.
 * Query principal: supabase.from('horarios').select('*, turmas(*), professores(*)')
 */
export async function buscarHorarios(filtros: FiltrosGrade): Promise<HorarioComRelacoes[]> {
  if (!isSupabaseConfigured) {
    // Modo Simulação/Fallback
    await new Promise((res) => setTimeout(res, 400));

    let resultado = [...MOCK_HORARIOS_COMPLETOS];

    if (filtros.turmaId) {
      resultado = resultado.filter((h) => h.turma_id === filtros.turmaId);
    }

    if (filtros.professorId) {
      resultado = resultado.filter((h) => h.professor_id === filtros.professorId);
    }

    if (filtros.buscaTexto) {
      const termo = filtros.buscaTexto.toLowerCase();
      resultado = resultado.filter((h) => {
        const mat = h.professores?.materia.toLowerCase() || '';
        const prof = h.professores?.nome.toLowerCase() || '';
        const sala = h.turmas?.sala_numero.toLowerCase() || '';
        return mat.includes(termo) || prof.includes(termo) || sala.includes(termo);
      });
    }

    return resultado;
  }

  try {
    let query = supabase
      .from('horarios')
      .select('*, turmas(*), professores(*)')
      .order('dia_semana', { ascending: true })
      .order('numero_aula', { ascending: true });

    if (filtros.turmaId) {
      query = query.eq('turma_id', filtros.turmaId);
    }

    if (filtros.professorId) {
      query = query.eq('professor_id', filtros.professorId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    let items = (data as unknown as HorarioComRelacoes[]) || [];

    // Filtro adicional em memória por texto (matéria, nome do professor ou sala)
    if (filtros.buscaTexto && filtros.buscaTexto.trim() !== '') {
      const termo = filtros.buscaTexto.trim().toLowerCase();
      items = items.filter((h) => {
        const mat = h.professores?.materia?.toLowerCase() || '';
        const prof = h.professores?.nome?.toLowerCase() || '';
        const sala = h.turmas?.sala_numero?.toLowerCase() || '';
        return mat.includes(termo) || prof.includes(termo) || sala.includes(termo);
      });
    }

    return items;
  } catch (error: any) {
    console.error('Erro ao consultar horários com relações no Supabase:', error);
    throw new Error(
      error?.message || 'Não foi possível conectar ao banco de dados para obter a grade horária.'
    );
  }
}

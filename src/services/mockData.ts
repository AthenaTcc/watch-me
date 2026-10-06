import { Turma, Professor, HorarioComRelacoes } from '../types/database';

export const MOCK_TURMAS: Turma[] = [
  { id: '11111111-1111-1111-1111-111111111111', nome: '1º Ano A', ano_letivo: 1, sala_numero: 'Sala 101 (Bloco A)' },
  { id: '22222222-2222-2222-2222-222222222222', nome: '2º Ano B', ano_letivo: 2, sala_numero: 'Sala 104 (Bloco A)' },
  { id: '33333333-3333-3333-3333-333333333333', nome: '3º Ano C', ano_letivo: 3, sala_numero: 'Sala 201 (Bloco B)' },
];

export const MOCK_PROFESSORES: Professor[] = [
  { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', nome: 'Prof. Carlos Eduardo', materia: 'Matemática', email: 'carlos.eduardo@escola.edu.br', cor_etiqueta: '#2563EB' },
  { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', nome: 'Profa. Mariana Costa', materia: 'Física', email: 'mariana.costa@escola.edu.br', cor_etiqueta: '#7C3AED' },
  { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', nome: 'Prof. Roberto Souza', materia: 'Química', email: 'roberto.souza@escola.edu.br', cor_etiqueta: '#059669' },
  { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', nome: 'Profa. Fernanda Lima', materia: 'Biologia', email: 'fernanda.lima@escola.edu.br', cor_etiqueta: '#10B981' },
  { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', nome: 'Prof. André Martins', materia: 'História', email: 'andre.martins@escola.edu.br', cor_etiqueta: '#D97706' },
  { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', nome: 'Profa. Juliana Santos', materia: 'Geografia', email: 'juliana.santos@escola.edu.br', cor_etiqueta: '#EA580C' },
  { id: '10101010-1010-1010-1010-101010101010', nome: 'Profa. Beatriz Mendes', materia: 'Português', email: 'beatriz.mendes@escola.edu.br', cor_etiqueta: '#DC2626' },
  { id: '20202020-2020-2020-2020-202020202020', nome: 'Prof. Lucas Rocha', materia: 'Inglês', email: 'lucas.rocha@escola.edu.br', cor_etiqueta: '#0891B2' },
];

const profMap = new Map(MOCK_PROFESSORES.map(p => [p.id, p]));
const turmaMap = new Map(MOCK_TURMAS.map(t => [t.id, t]));

interface HorarioRaw {
  id: string;
  turma_id: string;
  professor_id: string;
  dia_semana: 1 | 2 | 3 | 4 | 5;
  numero_aula: number;
}

const RAW_HORARIOS: HorarioRaw[] = [
  // 1º Ano A
  // Seg
  { id: 'h-1-1', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 1, numero_aula: 1 },
  { id: 'h-1-2', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 1, numero_aula: 2 },
  { id: 'h-1-3', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 1, numero_aula: 3 },
  { id: 'h-1-4', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 1, numero_aula: 4 },
  { id: 'h-1-5', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 1, numero_aula: 5 },
  { id: 'h-1-6', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 1, numero_aula: 6 },
  // Ter
  { id: 'h-2-1', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', dia_semana: 2, numero_aula: 1 },
  { id: 'h-2-2', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', dia_semana: 2, numero_aula: 2 },
  { id: 'h-2-3', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 2, numero_aula: 3 },
  { id: 'h-2-4', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 2, numero_aula: 4 },
  { id: 'h-2-5', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', dia_semana: 2, numero_aula: 5 },
  { id: 'h-2-6', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', dia_semana: 2, numero_aula: 6 },
  // Qua
  { id: 'h-3-1', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 3, numero_aula: 1 },
  { id: 'h-3-2', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 3, numero_aula: 2 },
  { id: 'h-3-3', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 3, numero_aula: 3 },
  { id: 'h-3-4', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 3, numero_aula: 4 },
  { id: 'h-3-5', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 3, numero_aula: 5 },
  { id: 'h-3-6', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 3, numero_aula: 6 },
  // Qui (Aula 6 vaga para simular janela)
  { id: 'h-4-1', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 4, numero_aula: 1 },
  { id: 'h-4-2', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 4, numero_aula: 2 },
  { id: 'h-4-3', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 4, numero_aula: 3 },
  { id: 'h-4-4', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 4, numero_aula: 4 },
  { id: 'h-4-5', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', dia_semana: 4, numero_aula: 5 },
  // Sex
  { id: 'h-5-1', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 5, numero_aula: 1 },
  { id: 'h-5-2', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 5, numero_aula: 2 },
  { id: 'h-5-3', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', dia_semana: 5, numero_aula: 3 },
  { id: 'h-5-4', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 5, numero_aula: 4 },
  { id: 'h-5-5', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 5, numero_aula: 5 },
  { id: 'h-5-6', turma_id: '11111111-1111-1111-1111-111111111111', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 5, numero_aula: 6 },

  // 2º Ano B
  { id: 'h-2b-1-1', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 1, numero_aula: 1 },
  { id: 'h-2b-1-2', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 1, numero_aula: 2 },
  { id: 'h-2b-1-3', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 1, numero_aula: 3 },
  { id: 'h-2b-1-4', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', dia_semana: 1, numero_aula: 4 },
  { id: 'h-2b-1-5', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 1, numero_aula: 5 },
  { id: 'h-2b-1-6', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: '10101010-1010-1010-1010-101010101010', dia_semana: 1, numero_aula: 6 },
  { id: 'h-2b-2-1', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', dia_semana: 2, numero_aula: 1 },
  { id: 'h-2b-2-2', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', dia_semana: 2, numero_aula: 2 },
  { id: 'h-2b-2-3', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', dia_semana: 2, numero_aula: 3 },
  { id: 'h-2b-2-4', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', dia_semana: 2, numero_aula: 4 },
  { id: 'h-2b-2-5', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 2, numero_aula: 5 },
  { id: 'h-2b-2-6', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 2, numero_aula: 6 },
  { id: 'h-2b-3-1', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 3, numero_aula: 1 },
  { id: 'h-2b-3-2', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 3, numero_aula: 2 },
  { id: 'h-2b-3-3', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 3, numero_aula: 3 },
  { id: 'h-2b-3-4', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 3, numero_aula: 4 },
  { id: 'h-2b-3-5', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 3, numero_aula: 5 },
  { id: 'h-2b-3-6', turma_id: '22222222-2222-2222-2222-222222222222', professor_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', dia_semana: 3, numero_aula: 6 },

  // 3º Ano C
  { id: 'h-3c-1-1', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 1, numero_aula: 1 },
  { id: 'h-3c-1-2', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', dia_semana: 1, numero_aula: 2 },
  { id: 'h-3c-1-3', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 1, numero_aula: 3 },
  { id: 'h-3c-1-4', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', dia_semana: 1, numero_aula: 4 },
  { id: 'h-3c-1-5', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 1, numero_aula: 5 },
  { id: 'h-3c-1-6', turma_id: '33333333-3333-3333-3333-333333333333', professor_id: '20202020-2020-2020-2020-202020202020', dia_semana: 1, numero_aula: 6 },
];

export const MOCK_HORARIOS_COMPLETOS: HorarioComRelacoes[] = RAW_HORARIOS.map(raw => ({
  ...raw,
  turmas: turmaMap.get(raw.turma_id)!,
  professores: profMap.get(raw.professor_id)!,
}));

import { DiaSemanaNumero, PeriodoAula } from '../types/database';

export const DIAS_SEMANA: { numero: DiaSemanaNumero; nome: string; abrev: string }[] = [
  { numero: 1, nome: 'Segunda-feira', abrev: 'Seg' },
  { numero: 2, nome: 'Terça-feira', abrev: 'Ter' },
  { numero: 3, nome: 'Quarta-feira', abrev: 'Qua' },
  { numero: 4, nome: 'Quinta-feira', abrev: 'Qui' },
  { numero: 5, nome: 'Sexta-feira', abrev: 'Sex' },
];

export const PERIODOS_AULA: PeriodoAula[] = [
  { numero: 1, label: '1ª Aula', inicio: '07:00', fim: '07:50' },
  { numero: 2, label: '2ª Aula', inicio: '07:50', fim: '08:40' },
  { numero: 3, label: '3ª Aula', inicio: '08:40', fim: '09:30', intervaloApos: true },
  { numero: 4, label: '4ª Aula', inicio: '09:50', fim: '10:40' },
  { numero: 5, label: '5ª Aula', inicio: '10:40', fim: '11:30' },
  { numero: 6, label: '6ª Aula', inicio: '11:30', fim: '12:20' },
];

export const INTERVALO_CONFIG = {
  label: 'Intervalo / Recreio',
  inicio: '09:30',
  fim: '09:50',
};

/**
 * Converte "HH:MM" em minutos desde o início do dia
 */
export function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Retorna o dia da semana atual no formato escolar (1 a 5). Se for fim de semana, retorna 1 (Segunda) como padrão.
 */
export function getDiaSemanaAtual(): DiaSemanaNumero {
  const day = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  if (day >= 1 && day <= 5) {
    return day as DiaSemanaNumero;
  }
  return 1; // Padrão Segunda-feira para visualização amigável
}

/**
 * Verifica se uma determinada aula está ocorrendo exatamente agora
 */
export function isAulaAgora(diaSemana: number, numeroAula: number): boolean {
  const now = new Date();
  const currentDay = now.getDay();

  if (currentDay !== diaSemana) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const periodo = PERIODOS_AULA.find((p) => p.numero === numeroAula);
  if (!periodo) return false;

  const inicioMin = timeStringToMinutes(periodo.inicio);
  const fimMin = timeStringToMinutes(periodo.fim);

  return currentMinutes >= inicioMin && currentMinutes < fimMin;
}

/**
 * Retorna informações sobre o status do momento escolar (Em aula, No intervalo ou Fora do expediente)
 */
export function getStatusMomentoAtual(): {
  emAula: boolean;
  noIntervalo: boolean;
  numeroAula?: number;
  label: string;
} {
  const now = new Date();
  const currentDay = now.getDay();

  if (currentDay < 1 || currentDay > 5) {
    return { emAula: false, noIntervalo: false, label: 'Fim de semana (Fora de horário letivo)' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const intInicio = timeStringToMinutes(INTERVALO_CONFIG.inicio);
  const intFim = timeStringToMinutes(INTERVALO_CONFIG.fim);

  if (currentMinutes >= intInicio && currentMinutes < intFim) {
    return { emAula: false, noIntervalo: true, label: 'Recreio / Intervalo em andamento' };
  }

  for (const p of PERIODOS_AULA) {
    const start = timeStringToMinutes(p.inicio);
    const end = timeStringToMinutes(p.fim);
    if (currentMinutes >= start && currentMinutes < end) {
      return {
        emAula: true,
        noIntervalo: false,
        numeroAula: p.numero,
        label: `${p.label} em andamento (${p.inicio} - ${p.fim})`,
      };
    }
  }

  if (currentMinutes < timeStringToMinutes(PERIODOS_AULA[0].inicio)) {
    return { emAula: false, noIntervalo: false, label: 'Aulas ainda não iniciaram hoje' };
  }

  return { emAula: false, noIntervalo: false, label: 'Período letivo encerrado por hoje' };
}

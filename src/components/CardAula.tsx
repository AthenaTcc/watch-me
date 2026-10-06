import React from 'react';
import { HorarioComRelacoes } from '../types/database';
import { MapPin, User, Sparkles, Coffee } from 'lucide-react';
import { isAulaAgora } from '../utils/timeHelpers';

interface CardAulaProps {
  horario?: HorarioComRelacoes;
  diaSemana: number;
  numeroAula: number;
  onClick?: (horario: HorarioComRelacoes) => void;
}

export const CardAula: React.FC<CardAulaProps> = ({
  horario,
  diaSemana,
  numeroAula,
  onClick,
}) => {
  const ativaAgora = isAulaAgora(diaSemana, numeroAula);

  // Caso não haja aula alocada neste horário (Janela / Vago)
  if (!horario) {
    return (
      <div className={`card-aula card-aula-vago ${ativaAgora ? 'card-vago-agora' : ''}`}>
        <div className="vago-content">
          <Coffee size={18} className="vago-icon" />
          <span className="vago-text">Sem Aula / Vago</span>
        </div>
      </div>
    );
  }

  const materia = horario.professores?.materia || 'Disciplina';
  const professorNome = horario.professores?.nome || 'Professor não definido';
  const sala = horario.turmas?.sala_numero || 'Sala a definir';
  const corBadge = horario.professores?.cor_etiqueta || '#4F46E5';

  return (
    <div
      className={`card-aula card-aula-preenchido ${ativaAgora ? 'card-aula-agora' : ''}`}
      onClick={() => onClick && onClick(horario)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick(horario);
        }
      }}
    >
      {/* Badge de Aula em Andamento (Agora) */}
      {ativaAgora && (
        <div className="badge-agora" title="Aula ocorrendo neste momento">
          <span className="badge-pulse"></span>
          <Sparkles size={11} />
          <span>Agora</span>
        </div>
      )}

      {/* Header do Card: Matéria com badge colorido */}
      <div className="card-materia-row">
        <span
          className="materia-badge"
          style={{
            backgroundColor: `${corBadge}18`, // 10% opacidade
            color: corBadge,
            borderColor: `${corBadge}40`,
          }}
        >
          <span
            className="materia-bullet"
            style={{ backgroundColor: corBadge }}
          />
          {materia}
        </span>
      </div>

      {/* Nome do Professor */}
      <div className="card-professor-row" title={`Docente: ${professorNome}`}>
        <div className="professor-avatar" style={{ backgroundColor: `${corBadge}22`, color: corBadge }}>
          <User size={13} />
        </div>
        <span className="professor-nome">{professorNome}</span>
      </div>

      {/* Localização da Sala */}
      <div className="card-sala-row">
        <div className="sala-tag">
          <MapPin size={12} className="sala-icon" />
          <span>{sala}</span>
        </div>
      </div>
    </div>
  );
};

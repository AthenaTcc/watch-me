import React from 'react';
import { Turma, Professor, FiltrosGrade } from '../types/database';
import { Users, GraduationCap, Search, X, MapPin } from 'lucide-react';

interface FiltrosBarProps {
  turmas: Turma[];
  professores: Professor[];
  filtros: FiltrosGrade;
  turmaSelecionadaInfo?: Turma;
  totalAulasEncontradas: number;
  onFiltrosChange: (novosFiltros: FiltrosGrade) => void;
  onResetFiltros: () => void;
}

export const FiltrosBar: React.FC<FiltrosBarProps> = ({
  turmas,
  professores,
  filtros,
  turmaSelecionadaInfo,
  totalAulasEncontradas,
  onFiltrosChange,
  onResetFiltros,
}) => {
  const handleTurmaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange({
      ...filtros,
      turmaId: e.target.value,
    });
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange({
      ...filtros,
      professorId: e.target.value || undefined,
    });
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({
      ...filtros,
      buscaTexto: e.target.value,
    });
  };

  const temFiltroAtivo = Boolean(filtros.professorId || filtros.buscaTexto);

  return (
    <div className="filtros-container">
      <div className="filtros-grid">
        {/* 1. Seleção de Turma (Principal / Obrigatório) */}
        <div className="filtro-group primary-filter">
          <label htmlFor="select-turma" className="filtro-label">
            <Users size={16} className="text-primary" />
            <span>Turma do Ensino Médio</span>
            <span className="required-tag">*Obrigatório</span>
          </label>
          <div className="select-wrapper">
            <select
              id="select-turma"
              className="custom-select"
              value={filtros.turmaId}
              onChange={handleTurmaChange}
            >
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {turma.nome} — {turma.ano_letivo}º Ano ({turma.sala_numero})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Seleção de Professor / Matéria (Filtro Alternativo Bônus) */}
        <div className="filtro-group">
          <label htmlFor="select-professor" className="filtro-label">
            <GraduationCap size={16} />
            <span>Filtrar por Professor / Matéria</span>
          </label>
          <div className="select-wrapper">
            <select
              id="select-professor"
              className="custom-select"
              value={filtros.professorId || ''}
              onChange={handleProfessorChange}
            >
              <option value="">Todos os Professores</option>
              {professores.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome} ({prof.materia})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Campo de Busca Rápida por Texto */}
        <div className="filtro-group search-filter">
          <label htmlFor="input-busca" className="filtro-label">
            <Search size={16} />
            <span>Busca Rápida</span>
          </label>
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              id="input-busca"
              type="text"
              className="custom-input"
              placeholder="Buscar por disciplina, professor ou sala..."
              value={filtros.buscaTexto || ''}
              onChange={handleBuscaChange}
            />
            {filtros.buscaTexto && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onFiltrosChange({ ...filtros, buscaTexto: '' })}
                title="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Barra de resumo da turma selecionada e contadores */}
      <div className="filtros-footer">
        <div className="turma-info-tag">
          {turmaSelecionadaInfo && (
            <>
              <span className="turma-name-highlight">{turmaSelecionadaInfo.nome}</span>
              <span className="turma-room-badge">
                <MapPin size={13} />
                Sala Padrão: {turmaSelecionadaInfo.sala_numero}
              </span>
            </>
          )}
        </div>

        <div className="filtros-actions">
          <span className="results-count">
            {totalAulasEncontradas} {totalAulasEncontradas === 1 ? 'aula listada' : 'aulas listadas'}
          </span>

          {temFiltroAtivo && (
            <button
              type="button"
              className="btn-reset-filtros"
              onClick={onResetFiltros}
            >
              <X size={13} />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

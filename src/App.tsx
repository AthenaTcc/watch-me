import React, { useState, useEffect, useCallback } from 'react';
import { Turma, Professor, HorarioComRelacoes, FiltrosGrade } from './types/database';
import { buscarTurmas, buscarProfessores, buscarHorarios } from './services/horariosService';
import { Header } from './components/Header';
import { FiltrosBar } from './components/FiltrosBar';
import { GradeHoraria } from './components/GradeHoraria';
import { ModalDetalheAula } from './components/ModalDetalheAula';
import { GradeSkeleton } from './components/Skeletons';
import { ErrorMessage } from './components/ErrorMessage';

export const App: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [horarios, setHorarios] = useState<HorarioComRelacoes[]>([]);

  const [filtros, setFiltros] = useState<FiltrosGrade>({
    turmaId: '',
    professorId: undefined,
    buscaTexto: '',
  });

  const [isCarregandoEstrutura, setIsCarregandoEstrutura] = useState<boolean>(true);
  const [isCarregandoHorarios, setIsCarregandoHorarios] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const [aulaSelecionadaModal, setAulaSelecionadaModal] = useState<HorarioComRelacoes | null>(null);

  // 1. Carrega turmas e professores na montagem inicial
  const carregarDadosIniciais = useCallback(async () => {
    setIsCarregandoEstrutura(true);
    setErro(null);

    try {
      const [listaTurmas, listaProfessores] = await Promise.all([
        buscarTurmas(),
        buscarProfessores(),
      ]);

      setTurmas(listaTurmas);
      setProfessores(listaProfessores);

      if (listaTurmas.length > 0) {
        setFiltros((prev) => ({
          ...prev,
          turmaId: prev.turmaId || listaTurmas[0].id,
        }));
      }
    } catch (err: any) {
      console.error(err);
      setErro(err.message || 'Erro ao carregar dados essenciais do sistema.');
    } finally {
      setIsCarregandoEstrutura(false);
    }
  }, []);

  useEffect(() => {
    carregarDadosIniciais();
  }, [carregarDadosIniciais]);

  // 2. Carrega a grade horária sempre que os filtros mudarem
  const carregarHorariosFiltrados = useCallback(async () => {
    if (!filtros.turmaId) return;

    setIsCarregandoHorarios(true);
    setErro(null);

    try {
      const resultado = await buscarHorarios(filtros);
      setHorarios(resultado);
    } catch (err: any) {
      console.error(err);
      setErro(err.message || 'Falha ao buscar a grade horária.');
    } finally {
      setIsCarregandoHorarios(false);
    }
  }, [filtros]);

  useEffect(() => {
    if (filtros.turmaId) {
      carregarHorariosFiltrados();
    }
  }, [filtros, carregarHorariosFiltrados]);

  // Turma atualmente selecionada
  const turmaSelecionada = turmas.find((t) => t.id === filtros.turmaId);

  const handleResetFiltros = () => {
    setFiltros((prev) => ({
      ...prev,
      professorId: undefined,
      buscaTexto: '',
    }));
  };

  return (
    <div className="app-container">
      {/* Cabeçalho com Relógio e Status */}
      <Header />

      {/* Exibição de Erro Crítico (com opção de tentar novamente) */}
      {erro && (
        <ErrorMessage
          mensagem={erro}
          onTentarNovamente={() => {
            if (turmas.length === 0) {
              carregarDadosIniciais();
            } else {
              carregarHorariosFiltrados();
            }
          }}
        />
      )}

      {/* Barra de Filtros */}
      {!erro && (
        <FiltrosBar
          turmas={turmas}
          professores={professores}
          filtros={filtros}
          turmaSelecionadaInfo={turmaSelecionada}
          totalAulasEncontradas={horarios.length}
          onFiltrosChange={setFiltros}
          onResetFiltros={handleResetFiltros}
        />
      )}

      {/* Grade Horária ou Skeletons de Loading */}
      {isCarregandoEstrutura || isCarregandoHorarios ? (
        <GradeSkeleton />
      ) : !erro ? (
        <GradeHoraria
          horarios={horarios}
          onSelectAula={(aula) => setAulaSelecionadaModal(aula)}
        />
      ) : null}

      {/* Modal de Detalhes da Aula */}
      <ModalDetalheAula
        horario={aulaSelecionadaModal}
        onClose={() => setAulaSelecionadaModal(null)}
      />
    </div>
  );
};

export default App;

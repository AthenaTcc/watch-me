import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { getStatusMomentoAtual } from '../utils/timeHelpers';
import { isSupabaseConfigured } from '../lib/supabase';

export const Header: React.FC = () => {
  const [horaAtual, setHoraAtual] = useState<string>('');
  const [dataAtual, setDataAtual] = useState<string>('');
  const [statusMomento, setStatusMomento] = useState(getStatusMomentoAtual());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHoraAtual(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDataAtual(
        now.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      );
      setStatusMomento(getStatusMomentoAtual());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-icon-wrapper">
            <Calendar className="brand-icon" />
          </div>
          <div>
            <div className="brand-badge">
              <Sparkles size={12} />
              <span>Ensino Médio 2026</span>
            </div>
            <h1 className="brand-title">Localizador de Salas & Grade Horária</h1>
            <p className="brand-subtitle">
              Consulte a programação semanal de turmas, docentes e localização de salas em tempo real.
            </p>
          </div>
        </div>

        <div className="header-status-panel">
          {/* Relógio e Data */}
          <div className="clock-widget">
            <div className="clock-time">
              <Clock size={16} className="text-primary" />
              <span>{horaAtual || '--:--:--'}</span>
            </div>
            <div className="clock-date">{dataAtual}</div>
          </div>

          {/* Status do momento atual */}
          <div
            className={`status-pill ${
              statusMomento.emAula
                ? 'status-live'
                : statusMomento.noIntervalo
                ? 'status-break'
                : 'status-idle'
            }`}
          >
            <span className="pulse-dot"></span>
            <span>{statusMomento.label}</span>
          </div>

          {/* Indicador de Conexão Supabase */}
          <div
            className="db-status-badge"
            title={
              isSupabaseConfigured
                ? 'Conectado diretamente ao Supabase PostgreSQL com RLS'
                : 'Modo Demonstração com dados locais ativos (Configure o .env para conectar ao Supabase)'
            }
          >
            <Database size={13} />
            {isSupabaseConfigured ? (
              <>
                <span>Supabase Conectado</span>
                <CheckCircle2 size={13} className="text-success" />
              </>
            ) : (
              <>
                <span>Dados Locais (Demo)</span>
                <AlertCircle size={13} className="text-warning" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

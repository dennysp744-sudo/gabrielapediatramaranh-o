import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Baby, 
  Thermometer, 
  Utensils, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppSupportModal: React.FC<WhatsAppSupportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedTopic, setSelectedTopic] = useState('Agendamento de Consulta');
  const [patientName, setPatientName] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const topics = [
    { id: 'Agendamento de Consulta', label: 'Agendamento & Horários', icon: Calendar },
    { id: 'Febre ou Sintoma Agudo', label: 'Febre / Sintoma Recente', icon: Thermometer },
    { id: 'Amamentação e Pega', label: 'Amamentação & Pega do RN', icon: Baby },
    { id: 'Introdução Alimentar', label: 'Introdução Alimentar & Alergias', icon: Utensils },
    { id: 'Envio de Exames e Retorno', label: 'Exames & Retorno', icon: FileText },
    { id: 'Dúvida Geral Pediátrica', label: 'Outras Dúvidas', icon: Sparkles },
  ];

  const handleSend = () => {
    let message = `Olá, equipe da Dra. Gabriela Lara! 🌸\n`;
    message += `Gostaria de uma orientação rápida sobre: *${selectedTopic}*.\n`;
    if (patientName.trim()) {
      message += `👶 Criança/Paciente: *${patientName.trim()}*\n`;
    }
    if (details.trim()) {
      message += `📝 Detalhes:\n${details.trim()}\n`;
    }
    message += `\nAguardo retorno da equipe da MedClinic São Lucas. Muito obrigado(a)!`;

    const url = createWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Canal Direto de Dúvidas Rápidas</h3>
                <p className="text-xs text-emerald-100">WhatsApp Oficial • {CLINIC_INFO.phoneDisplay}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 text-left">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Selecione o assunto da dúvida:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {topics.map((t) => {
                const isSelected = selectedTopic === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTopic(t.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome da Criança (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Gabriel (8 meses)"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Descreva brevemente sua dúvida
            </label>
            <textarea
              rows={3}
              placeholder="Ex: O bebê teve febre de 38°C agora à tarde, posso dar o remédio que ela receitou na última consulta?"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Atenção:</strong> O WhatsApp é para triagem, suporte a agendamentos e dúvidas pontuais. Em caso de emergências com falta de ar grave ou convulsão, dirija-se imediatamente ao pronto-socorro.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Contato seguro e direto com a equipe da MedClinic São Lucas.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            onClick={handleSend}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Abrir no WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};

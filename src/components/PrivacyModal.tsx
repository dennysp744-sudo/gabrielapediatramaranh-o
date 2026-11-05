import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle, FileText, HeartHandshake } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Privacidade e Proteção de Dados</h3>
                <p className="text-xs text-purple-200">Compromisso Ético & Conformidade com a LGPD</p>
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

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto">
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Armazenamento 100% Local:</strong> Todos os seus agendamentos, anotações de consultas e medições de crescimento (peso/altura) ficam guardados unicamente no armazenamento local do seu próprio aparelho telefônico ou computador.
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-700" />
              <span>Nossos Princípios de Sigilo Médico:</span>
            </h4>

            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Sem Rastreadores ou Venda de Dados:</strong> Este site não compartilha nenhuma informação sobre o seu bebê ou família com empresas terceiras, anunciantes ou redes sociais.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Sigilo Profissional Pediátrico:</strong> As consultas na MedClinic São Lucas respeitam rigorosamente o Código de Ética Médica do Conselho Federal de Medicina (CFM) e a Lei Geral de Proteção de Dados (Lei 13.709/2018).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span><strong>Controle Total:</strong> Você pode excluir seu histórico de consultas e medidas a qualquer instante na aba "Área dos Pais" limpando os dados do navegador.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 text-slate-500 text-[11px] leading-relaxed border-t border-slate-100">
            Dúvidas sobre o tratamento de dados médicos? Entre em contato diretamente com o consultório da {CLINIC_INFO.doctorName} pelo telefone {CLINIC_INFO.phoneDisplay}.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

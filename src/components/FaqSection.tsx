import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

interface FaqSectionProps {
  onOpenWhatsApp: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWhatsApp }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section className="py-12 bg-white border-t border-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dúvidas Frequentes das Mães e Pais
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Respostas diretas para as questões mais comuns sobre consultas, vacinas e reembolso.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-5 text-left bg-slate-50/50 hover:bg-purple-50/40 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-purple-950">Ficou com alguma outra dúvida?</h4>
            <p className="text-xs text-slate-600">Nossa equipe está pronta para te atender com carinho no WhatsApp.</p>
          </div>
          <button
            onClick={onOpenWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com a Secretária</span>
          </button>
        </div>

      </div>
    </section>
  );
};

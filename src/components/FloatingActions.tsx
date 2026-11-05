import React from 'react';
import { Calendar, MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Ações rápidas flutuantes" className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      
      {/* Scroll to Top button */}
      <button
        onClick={scrollToTop}
        className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-900 border border-slate-200 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100"
        title="Voltar ao Topo"
        aria-label="Voltar ao topo da página"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* WhatsApp Quick Chat Floating Button */}
      <button
        onClick={onOpenWhatsApp}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 active:scale-95 cursor-pointer border-2 border-white"
        aria-label="Dúvidas Rápidas no WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="text-xs font-bold tracking-tight">Dúvida Rápida</span>
      </button>

      {/* Direct Booking Floating Button */}
      <button
        onClick={onOpenAppointment}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 active:scale-95 cursor-pointer border-2 border-white"
        aria-label="Agendar Consulta Online"
      >
        <Calendar className="w-5 h-5" />
        <div className="text-left">
          <span className="block text-xs font-extrabold uppercase tracking-wide">Agendar Consulta</span>
          <span className="block text-[10px] text-purple-200 font-medium">Online & Imediato</span>
        </div>
      </button>

    </aside>
  );
};

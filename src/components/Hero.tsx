import React from 'react';
import { 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  Heart, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface HeroProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
  onNavigatePuericultura: () => void;
  onNavigateArticles: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  onOpenWhatsApp,
  onNavigatePuericultura,
  onNavigateArticles,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-16 lg:py-20 bg-gradient-to-b from-purple-50/70 via-rose-50/30 to-white">
      {/* Decorative subtle medical background elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-purple-200/20 via-pink-200/20 to-teal-200/20 blur-3xl pointer-events-none -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, Credentials & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Verified Medical Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/60 text-purple-900 text-xs font-semibold shadow-xs">
              <Award className="w-4 h-4 text-purple-700" />
              <span>{CLINIC_INFO.crm} • {CLINIC_INFO.rqe}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span className="text-purple-700 font-bold">Açailândia - MA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Cuidado humanizado e acolhedor para quem é o seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-rose-600">
                maior tesouro.
              </span>
            </h1>

            {/* Subheading / Emotional Doctor Quote */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 border border-purple-100/90 shadow-sm backdrop-blur-xs text-left max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-100 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed">
                    "O lado emocional da profissão: tem consultas que terminam na sala, mas continuam comigo pelo resto do dia."
                  </p>
                  <p className="text-xs text-purple-800 font-bold mt-2">
                    — {CLINIC_INFO.doctorName} | Pediatra e Neonatologista
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Consultas sem pressa, acompanhamento rigoroso do desenvolvimento da criança, acolhimento neonatal especializado e orientação baseada nas mais atuais evidências científicas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-emerald-800 bg-white hover:bg-emerald-50/80 border border-emerald-300 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                <span>Dúvidas Rápidas (WhatsApp)</span>
              </button>
            </div>

            {/* Quick Badges / Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-purple-100/80">
              <div className="flex items-center gap-2 text-left">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Tempo Dedicado de Consulta</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Privacidade Total LGPD</span>
              </div>
              <div className="flex items-center gap-2 text-left col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Apoio Pós-Consulta</span>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Profile Card Featuring Official Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-75"></div>

              {/* Main Profile Card */}
              <div className="relative rounded-3xl bg-white border border-purple-100 shadow-xl overflow-hidden p-3.5 sm:p-5">
                
                {/* Doctor Portrait Image container */}
                <div className="relative w-full h-88 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-purple-100 to-indigo-50 shadow-inner group">
                  <img
                    src={CLINIC_INFO.profilePhoto}
                    alt="Dra. Gabriela Lara - Pediatra e Neonatologista em Açailândia"
                    className="w-full h-full object-cover object-[50%_35%] scale-105 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Floating badge inside photo */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold text-purple-900 border border-purple-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span>Agenda Aberta</span>
                  </div>

                  {/* Overlaid Info on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-sm">
                      {CLINIC_INFO.doctorName}
                    </h3>
                    <p className="text-xs text-purple-200 font-medium">
                      {CLINIC_INFO.specialties}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {CLINIC_INFO.crm} • {CLINIC_INFO.rqe}
                    </p>
                  </div>
                </div>

                {/* Clinic address & direct action box below photo */}
                <div className="mt-4 pt-3 border-t border-purple-50 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-purple-50/60 p-3 rounded-xl border border-purple-100/60">
                    <MapPin className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">{CLINIC_INFO.clinicName}</p>
                      <p className="text-slate-600">{CLINIC_INFO.address}</p>
                      <p className="text-purple-700 font-semibold">{CLINIC_INFO.city}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <button
                      onClick={onNavigatePuericultura}
                      className="px-3 py-2 text-xs font-semibold text-purple-900 bg-purple-100/70 hover:bg-purple-200/80 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                      <span>Guia de Cuidados</span>
                    </button>
                    <button
                      onClick={onNavigateArticles}
                      className="px-3 py-2 text-xs font-semibold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
                      <span>Artigos de Saúde</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

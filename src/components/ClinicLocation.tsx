import React from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Phone, 
  Instagram, 
  Clock, 
  Navigation, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface ClinicLocationProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const ClinicLocation: React.FC<ClinicLocationProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-purple-50/40 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Consultório Pediátrico & Neonatal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Onde Atendemos: MedClinic São Lucas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Estrutura planejada com carinho para receber recém-nascidos, bebês e crianças com conforto, segurança e acessibilidade completa no centro de Açailândia.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Detailed Information and Links */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* Doctor & Clinic identification */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 text-[11px] font-bold">
                  {CLINIC_INFO.crm} • {CLINIC_INFO.rqe}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1">
                  {CLINIC_INFO.doctorName}
                </h3>
                <p className="text-sm text-purple-800 font-semibold">
                  {CLINIC_INFO.specialties}
                </p>
              </div>

              {/* Exact Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Endereço do Consultório</h4>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {CLINIC_INFO.clinicName}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-purple-700 font-semibold">
                    {CLINIC_INFO.city} — CEP: {CLINIC_INFO.postalCode}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Horários de Atendimento</h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                    {CLINIC_INFO.hours}
                  </p>
                </div>
              </div>

              {/* Accessibility Features */}
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 space-y-2">
                <h5 className="text-xs font-bold text-purple-950 uppercase tracking-wide">
                  Comodidades & Acessibilidade:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Acesso para carrinhos de bebê
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Sala de espera climatizada
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Espaço com fraldário limpo
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Ambiente lúdico e acolhedor
                  </span>
                </div>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl text-white font-bold text-xs bg-purple-700 hover:bg-purple-800 shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Abrir no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-xs text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>{CLINIC_INFO.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={onOpenAppointment}
                  className="py-2.5 px-4 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-700" />
                  <span>Agendar Consulta</span>
                </button>

                <button
                  onClick={onOpenWhatsApp}
                  className="py-2.5 px-4 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp: {CLINIC_INFO.phoneDisplay}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Visual Map & Location Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md flex flex-col justify-between space-y-6">
            
            {/* Map Preview Container */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
              
              {/* Stylized Map Mock / Visual Directions */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50 flex flex-col items-center justify-center p-6 text-center">
                
                {/* Decorative map grid lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-purple-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      MedClinic São Lucas — 1º Andar
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                      Avenida Desembargador Tácito de Caldas, nº 142, Centro, Açailândia/MA
                    </p>
                  </div>

                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                  >
                    <span>Ver no Google Maps Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Pin Tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-bold text-purple-900 shadow-xs border border-purple-100">
                📍 Ponto de Referência: Centro de Açailândia
              </div>
            </div>

            {/* How to Get There Tips */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Orientações para o dia da consulta:
              </h4>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5"></span>
                  <span>Chegue com cerca de 10 a 15 minutos de antecedência para preenchimento de ficha sem pressa.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5"></span>
                  <span>Traga a Caderneta de Saúde da Criança e exames recentes caso possua.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5"></span>
                  <span>Se a criança estiver em período de amamentação, sinta-se totalmente à vontade para amamentar a qualquer momento na nossa sala.</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

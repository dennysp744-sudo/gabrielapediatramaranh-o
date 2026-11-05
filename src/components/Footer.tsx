import React from 'react';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Instagram, 
  ExternalLink, 
  ShieldCheck, 
  Calendar,
  Building2,
  Lock
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onNavigateTab,
  onOpenAppointment,
  onOpenWhatsApp,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Doctor bio & CRM */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CLINIC_INFO.profilePhoto}
                alt={CLINIC_INFO.doctorName}
                className="w-12 h-12 rounded-full object-cover object-[50%_30%] ring-2 ring-purple-400"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{CLINIC_INFO.doctorName}</h3>
                <p className="text-xs text-purple-300 font-medium">{CLINIC_INFO.specialties}</p>
                <p className="text-[11px] text-slate-400">{CLINIC_INFO.crm} • {CLINIC_INFO.rqe}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pediatria humanizada e Neonatologia dedicada ao cuidado integral, desenvolvimento neuropsicomotor e segurança das crianças em Açailândia - MA.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-pink-950/50 text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Instagram da Dra. Gabriela Lara"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>{CLINIC_INFO.instagramHandle}</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-950/50 text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('inicio')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Início / Apresentação
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('agendamento')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Agendamento de Consulta Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('puericultura')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Guia de Puericultura & Cuidados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('artigos')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Artigos & Saúde da Criança
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('historico')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Área dos Pais (Histórico e Medidas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('localizacao')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Localização e Horários
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Location and Map */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Consultório Presencial
            </h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <strong className="text-white">{CLINIC_INFO.clinicName}</strong>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}, {CLINIC_INFO.city}</span>
              </p>
              <p className="text-[11px] text-slate-500 pl-6">
                {CLINIC_INFO.hours}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-semibold underline"
              >
                <span>Ver rota no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Medical Ethics, CFM Notice & LGPD */}
      <div className="bg-slate-950 py-6 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {CLINIC_INFO.doctorName}. Todos os direitos reservados.
            </p>
            <p className="text-slate-600">
              {CLINIC_INFO.crm} • {CLINIC_INFO.rqe}. As informações deste site têm caráter educativo e não substituem o diagnóstico presencial.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Privacidade & LGPD</span>
            </button>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-purple-200 text-purple-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Acesso Recepção / Consultório (PIN: 7773)</span>
                </button>
              </>
            )}
            <span>•</span>
            <span className="text-slate-600">MedClinic São Lucas — Açailândia/MA</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

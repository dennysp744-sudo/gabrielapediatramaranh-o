import React, { useState } from 'react';
import { 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Baby, 
  FolderHeart, 
  MapPin, 
  Menu, 
  X, 
  Sparkles,
  Sun,
  Type,
  Lock
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAppointment,
  onOpenWhatsApp,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    if (next) {
      document.body.classList.add('text-large');
    } else {
      document.body.classList.remove('text-large');
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Início', icon: Sparkles },
    { id: 'agendamento', label: 'Agendamento Online', icon: Calendar },
    { id: 'puericultura', label: 'Guia de Puericultura', icon: Baby },
    { id: 'artigos', label: 'Artigos & Saúde', icon: BookOpen },
    { id: 'historico', label: 'Área dos Pais', icon: FolderHeart },
    { id: 'localizacao', label: 'Onde Atendemos', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs transition-colors">
      {/* Top Bar with Credentials & Accessibility */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-purple-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Atendimento Médico Pediátrico & Neonatal
            </span>
            <span className="hidden md:inline text-purple-300">|</span>
            <span className="hidden md:inline font-semibold text-white/95">
              {CLINIC_INFO.crm} • {CLINIC_INFO.rqe}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-purple-200">
              <button
                onClick={toggleHighContrast}
                title="Alternar Alto Contraste"
                className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                  highContrast ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-purple-800 text-purple-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Contraste</span>
              </button>

              <button
                onClick={toggleLargeText}
                title="Aumentar Tamanho da Fonte"
                className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                  largeText ? 'bg-purple-300 text-purple-950 font-bold' : 'hover:bg-purple-800 text-purple-200'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Texto A+</span>
              </button>
            </div>

            <span className="hidden lg:inline text-purple-300">|</span>
            <a 
              href={`tel:${CLINIC_INFO.phoneRaw}`} 
              className="text-white hover:text-purple-200 font-medium transition-colors"
            >
              📞 {CLINIC_INFO.phoneDisplay}
            </a>

            {onOpenAdmin && (
              <>
                <span className="hidden sm:inline text-purple-300">|</span>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 font-semibold text-[11px] text-purple-200 hover:text-white bg-purple-800/80 hover:bg-purple-700 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                  title="Painel de Agendamentos da Recepção (PIN: 7773)"
                >
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Acesso Recepção</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.25rem] py-2 gap-2">
          
          {/* Brand & Doctor Info */}
          <button 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-purple-600/30 p-0.5 bg-gradient-to-tr from-purple-500 to-rose-400 group-hover:ring-purple-600 transition-all">
                <img 
                  src={CLINIC_INFO.profilePhoto} 
                  alt="Dra. Gabriela Lara" 
                  className="w-full h-full object-cover object-[50%_30%] scale-135 rounded-full"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-900 transition-colors whitespace-nowrap">
                  {CLINIC_INFO.doctorName}
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded-full bg-purple-100 text-purple-800 shrink-0">
                  Pediatra
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">
                {CLINIC_INFO.specialties} <span className="hidden sm:inline">• <span className="text-purple-700 font-semibold">MedClinic</span></span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Responsive) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-100/90 text-purple-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-purple-50/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-purple-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenWhatsApp}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-all shadow-xs whitespace-nowrap"
              title="Dúvidas rápidas via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>Dúvida Rápida</span>
            </button>

            <button
              onClick={onOpenAppointment}
              className="flex items-center gap-1.5 px-3.5 py-1.5 xl:px-4 xl:py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 rounded-full shadow-sm hover:shadow-md transition-all active:scale-98 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Consulta</span>
            </button>
          </div>

          {/* Mobile Actions and Hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <button
              onClick={onOpenAppointment}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-full flex items-center gap-1 shadow-xs whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white/98 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="space-y-1 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-900 font-bold'
                      : 'text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Dúvida Rápida no WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta Online</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-900 text-purple-200 hover:text-white font-semibold text-xs mt-1"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Painel da Recepção (Consultas Recebidas)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

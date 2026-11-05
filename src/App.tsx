import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PuericulturaSection } from './components/PuericulturaSection';
import { ArticlesSection } from './components/ArticlesSection';
import { PatientPortal } from './components/PatientPortal';
import { ClinicLocation } from './components/ClinicLocation';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppSupportModal } from './components/WhatsAppSupportModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { FloatingActions } from './components/FloatingActions';
import { 
  Calendar, 
  Baby, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Building2
} from 'lucide-react';
import { APPOINTMENT_TYPES, CLINIC_INFO } from './data/mockData';
import { AppointmentType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedAppointmentType, setPreselectedAppointmentType] = useState<AppointmentType>('puericultura');

  const handleOpenAppointmentWithType = (type: AppointmentType) => {
    setPreselectedAppointmentType(type);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Sticky Accessible Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: INÍCIO / HOME */}
        {activeTab === 'inicio' && (
          <div>
            <Hero
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              onNavigatePuericultura={() => {
                setActiveTab('puericultura');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateArticles={() => {
                setActiveTab('artigos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Pillars of Pediatric Excellence */}
            <section className="py-12 bg-white border-y border-purple-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    Especialidades & Atendimento
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Cuidado Especializado em Cada Etapa da Infância
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Acompanhamento contínuo desde os primeiros dias na maternidade até a adolescência.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Pillar 1 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/70 to-white border border-purple-100 shadow-xs hover:shadow-md transition-shadow space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
                      <Baby className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Neonatologia & Recém-Nascido</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Avaliação minuciosa nos primeiros 15 dias de vida, apoio integral à amamentação e pega correta, coto umbilical, triagem neonatal e acolhimento das mães no puerpério.
                    </p>
                    <button
                      onClick={() => handleOpenAppointmentWithType('neonatologia')}
                      className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Marcar consulta do RN</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50/70 to-white border border-rose-100 shadow-xs hover:shadow-md transition-shadow space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Puericultura & Desenvolvimento</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Consultas periódicas sem pressa para acompanhar o ganho de peso e estatura, marcos motores e de linguagem, vacinação, introdução alimentar e prevenção de doenças.
                    </p>
                    <button
                      onClick={() => handleOpenAppointmentWithType('puericultura')}
                      className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Agendar Puericultura</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50/70 to-white border border-teal-100 shadow-xs hover:shadow-md transition-shadow space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Suporte & Queixas Agudas</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Diagnóstico seguro para febre, tosse, resfriados, alergias e alterações intestinais, com canal de dúvidas rápidas e encaixes para evitar a tensão de salas de espera hospitalares.
                    </p>
                    <button
                      onClick={() => setIsWhatsAppOpen(true)}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Falar no WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Preview of Puericultura */}
            <PuericulturaSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />

            {/* Preview of Articles & Reference Center */}
            <ArticlesSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />

            {/* Clinic Location Details */}
            <ClinicLocation
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />

            {/* FAQ Accordion */}
            <FaqSection onOpenWhatsApp={() => setIsWhatsAppOpen(true)} />

          </div>
        )}

        {/* TAB 2: AGENDAMENTO ONLINE DEDICADO */}
        {activeTab === 'agendamento' && (
          <div className="py-12 bg-slate-50 min-h-[80vh]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Central de Agendamento Online</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Agende sua Consulta Pediátrica na MedClinic São Lucas
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                  Escolha o tipo de consulta que seu filho precisa. O agendamento é imediato, com confirmação direta pelo WhatsApp da clínica.
                </p>
              </div>

              {/* Consultation Type Cards with Direct Start */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {APPOINTMENT_TYPES.map((type) => (
                  <div
                    key={type.id}
                    className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                          {type.badge}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          ⏱ {type.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{type.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{type.description}</p>
                      <p className="text-[11px] text-purple-700 font-semibold">
                        Recomendado para: {type.recommendedFor}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenAppointmentWithType(type.id as AppointmentType)}
                      className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Este Atendimento</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Reception Workflow Explanation Card */}
              <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                  <Building2 className="w-5 h-5 text-purple-700" />
                  <h3>Como a clínica e a Dra. Gabriela recebem os agendamentos?</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed pt-1">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      1. Notificação Instantânea no WhatsApp da Clínica
                    </span>
                    <p>
                      Ao finalizar o formulário, o paciente é direcionado para enviar os dados completos da criança diretamente ao WhatsApp oficial <strong>(99) 99209-9826</strong> da MedClinic São Lucas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                    <span className="font-bold text-purple-950 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-purple-600" />
                      2. Registro no Painel da Recepção
                    </span>
                    <p>
                      Todas as solicitações ficam catalogadas no <strong>Painel da Recepção</strong> com nome da criança, data e telefone, permitindo que a secretária confirme o horário com 1 clique.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-purple-700" />
                    <span>Abrir Painel da Recepção (Acesso da Clínica - PIN: 7773)</span>
                  </button>
                </div>
              </div>

              {/* Fast Booking Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-white">Prefere agendar diretamente pelo WhatsApp?</h4>
                  <p className="text-xs text-purple-200">Nossa recepcionista está online para consultar os horários de hoje e da semana.</p>
                </div>
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Falar com a Recepção no WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: GUIA DE PUERICULTURA */}
        {activeTab === 'puericultura' && (
          <div>
            <PuericulturaSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />
          </div>
        )}

        {/* TAB 4: ARTIGOS & SAÚDE */}
        {activeTab === 'artigos' && (
          <div>
            <ArticlesSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />
          </div>
        )}

        {/* TAB 5: HISTÓRICO & ÁREA DOS PAIS */}
        {activeTab === 'historico' && (
          <div>
            <PatientPortal
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />
          </div>
        )}

        {/* TAB 6: LOCALIZAÇÃO */}
        {activeTab === 'localizacao' && (
          <div>
            <ClinicLocation
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            />
          </div>
        )}

      </main>

      {/* Floating Action Buttons */}
      <FloatingActions
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      />

      {/* Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedType={preselectedAppointmentType}
      />

      <WhatsAppSupportModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

    </div>
  );
}

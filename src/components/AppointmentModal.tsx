import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  CalendarPlus,
  Download,
  AlertCircle
} from 'lucide-react';
import { APPOINTMENT_TYPES, CLINIC_INFO } from '../data/mockData';
import { AppointmentType, PatientAppointment } from '../types';
import { formatAppointmentWhatsAppMessage } from '../utils/whatsapp';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { saveAppointment } from '../utils/storage';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCreated?: (appointment: PatientAppointment) => void;
  preselectedType?: AppointmentType;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onAppointmentCreated,
  preselectedType = 'puericultura'
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<AppointmentType>(preselectedType);
  
  // Date & Time states
  // Generate dates starting tomorrow or today
  const today = new Date();
  const getFormattedDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(today.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate(1));
  const [selectedTime, setSelectedTime] = useState<string>('09:00');

  // Form Fields
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentCpf, setParentCpf] = useState('');
  const [paymentType, setPaymentType] = useState<'particular' | 'convenio-reembolso'>('particular');
  const [notes, setNotes] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(true);

  // Completed appointment
  const [completedAppointment, setCompletedAppointment] = useState<PatientAppointment | null>(null);

  if (!isOpen) return null;

  const availableHours = [
    '08:30', '09:00', '09:40', '10:30', '11:15',
    '14:00', '14:45', '15:30', '16:15', '17:00'
  ];

  // Quick next 7 weekdays
  const dateOptions: { dateStr: string; dayName: string; dayNumber: string; monthName: string }[] = [];
  let dayOffset = 1;
  while (dateOptions.length < 6) {
    const d = new Date();
    d.setDate(today.getDate() + dayOffset);
    const dayOfWeek = d.getDay();
    // Monday(1) to Saturday(6)
    if (dayOfWeek !== 0) {
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const dayNumber = d.getDate().toString();
      const monthName = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
      dateOptions.push({ dateStr, dayName, dayNumber, monthName });
    }
    dayOffset++;
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        alert('Por favor, selecione uma data e um horário.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!childName.trim() || !parentName.trim() || !parentPhone.trim()) {
        alert('Por favor, preencha o nome da criança, responsável e telefone de contato.');
        return;
      }
      if (!lgpdConsent) {
        alert('É necessário concordar com a política de privacidade para prosseguir.');
        return;
      }

      const newAppt: PatientAppointment = {
        id: 'appt_' + Date.now(),
        childName: childName.trim(),
        childAge: childAge.trim() || 'Não informada',
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        parentCpf: parentCpf.trim() || 'Não informado',
        type: selectedType,
        date: selectedDate,
        time: selectedTime,
        paymentType,
        notes: notes.trim(),
        status: 'confirmado',
        createdAt: new Date().toISOString()
      };

      saveAppointment(newAppt);
      setCompletedAppointment(newAppt);
      if (onAppointmentCreated) {
        onAppointmentCreated(newAppt);
      }
      setStep(4);
    }
  };

  const handleWhatsAppConfirm = () => {
    if (!completedAppointment) return;
    const msg = formatAppointmentWhatsAppMessage(completedAppointment);
    const url = `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const selectedTypeInfo = APPOINTMENT_TYPES.find(t => t.id === selectedType) || APPOINTMENT_TYPES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header with Title and Steps */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">
                Agendamento de Consultas
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {CLINIC_INFO.doctorName}
              </h2>
              <p className="text-xs text-purple-200 font-medium mt-0.5">
                {CLINIC_INFO.clinicName} • {CLINIC_INFO.city}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress */}
          {step < 4 && (
            <div className="mt-5 pt-4 border-t border-purple-700/60 flex items-center justify-between text-xs">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-white font-bold' : 'text-purple-300'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-white text-purple-900 font-bold' : 'bg-purple-700 text-purple-300'}`}>1</span>
                <span>Tipo</span>
              </div>
              <div className="flex-1 h-0.5 bg-purple-700 mx-2">
                <div className={`h-full bg-white transition-all ${step === 2 ? 'w-1/2' : step >= 3 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-white font-bold' : 'text-purple-300'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-white text-purple-900 font-bold' : 'bg-purple-700 text-purple-300'}`}>2</span>
                <span>Data & Hora</span>
              </div>
              <div className="flex-1 h-0.5 bg-purple-700 mx-2">
                <div className={`h-full bg-white transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-white font-bold' : 'text-purple-300'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-white text-purple-900 font-bold' : 'bg-purple-700 text-purple-300'}`}>3</span>
                <span>Dados do Paciente</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: Select Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-left">
                <h3 className="text-base font-bold text-slate-900">Selecione a modalidade da consulta:</h3>
                <p className="text-xs text-slate-500">Escolha o atendimento que melhor se adapta à fase da criança</p>
              </div>

              <div className="space-y-2.5">
                {APPOINTMENT_TYPES.map((t) => {
                  const isSelected = selectedType === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedType(t.id as AppointmentType)}
                      className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900">{t.title}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800">
                              {t.badge}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">⏱ {t.duration}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                          <p className="text-[11px] text-purple-700 font-medium">
                            Indicado: {t.recommendedFor}
                          </p>
                        </div>
                        <div className="shrink-0 pt-0.5">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Escolha o melhor dia e horário:</h3>
                <p className="text-xs text-slate-500">Horários de atendimento presencial na MedClinic São Lucas</p>
              </div>

              {/* Date selection cards */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Dias disponíveis para consulta:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {dateOptions.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold shadow-xs'
                            : 'border-slate-200 hover:border-purple-200 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-semibold text-slate-500">{item.dayName}</div>
                        <div className="text-lg font-extrabold text-slate-900">{item.dayNumber}</div>
                        <div className="text-[10px] text-purple-700 font-medium">{item.monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Date input override */}
              <div className="flex items-center gap-2 pt-1">
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">Ou escolha outra data:</span>
                <input
                  type="date"
                  min={today.toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-purple-600"
                />
              </div>

              {/* Time selection slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Horários disponíveis:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {availableHours.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'border-purple-600 bg-purple-600 text-white shadow-xs'
                            : 'border-slate-200 hover:border-purple-300 text-slate-700 bg-slate-50'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-2.5 text-xs text-purple-900">
                <Clock className="w-4 h-4 text-purple-700 shrink-0" />
                <span>
                  Consultas com tempo médio de <strong>{selectedTypeInfo.duration}</strong> para atendimento calmo e detalhado.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Patient & Parent Info + Privacy Consent */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <div>
                <h3 className="text-base font-bold text-slate-900">Informações do Paciente e Responsável</h3>
                <p className="text-xs text-slate-500">Dados protegidos com sigilo médico absoluto (LGPD & CFM)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo da Criança / Bebê *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Theo Ribeiro Lara"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Idade da Criança ou Tempo de Vida *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 12 dias, 4 meses, 2 anos"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome do Responsável (Mãe/Pai/Tutor) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariana Silva"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefone / WhatsApp do Responsável *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="(99) 99999-9999"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CPF do Responsável (para nota fiscal e reembolso)
                  </label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={parentCpf}
                    onChange={(e) => setParentCpf(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tipo de Pagamento / Cobertura
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white"
                  >
                    <option value="particular">Particular (Pix, Cartão ou Dinheiro)</option>
                    <option value="convenio-reembolso">Convênio (Emissão de Relatório p/ Reembolso)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Motivo da Consulta ou Observações Clínicas
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Consulta de rotina de 4 meses; ou está apresentando tosse seca há 2 dias..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              {/* Privacy and LGPD Notice */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>Privacidade Total Garantida:</strong> Seus dados e os do seu filho são armazenados de forma estritamente confidencial e segura no seu dispositivo e utilizados unicamente para a confirmação médica da consulta na MedClinic São Lucas, sem qualquer compartilhamento de terceiros.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    Concordo com a política de privacidade e autorizo o contato para confirmação.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Confirmation View */}
          {step === 4 && completedAppointment && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  Pré-agendamento Realizado com Sucesso!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Os dados foram salvos no seu histórico local com total segurança. Para garantir seu horário imediatamente, confirme com nossa recepção via WhatsApp.
                </p>
              </div>

              {/* Appointment Summary Box */}
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <span className="font-bold text-purple-950 text-sm">
                    {completedAppointment.childName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-200 text-purple-900">
                    {selectedTypeInfo.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Data e Horário:</span>
                    <strong className="text-purple-900">{completedAppointment.date} às {completedAppointment.time}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Responsável:</span>
                    <strong>{completedAppointment.parentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Local:</span>
                    <span>{CLINIC_INFO.clinicName} (1º andar)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contato:</span>
                    <span>{completedAppointment.parentPhone}</span>
                  </div>
                </div>
              </div>

              {/* Primary Action: Direct WhatsApp Confirmation */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppConfirm}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="WhatsApp" 
                    className="w-5 h-5 filter brightness-0 invert" 
                  />
                  <span>Confirmar no WhatsApp Oficial Agora</span>
                </button>

                {/* Calendar Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={createGoogleCalendarUrl(completedAppointment)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-purple-600" />
                    <span>Adicionar ao Google Agenda</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(completedAppointment)}
                    className="py-2.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>Baixar Lembrete (.ICS)</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Você pode rever este agendamento a qualquer momento na aba "Área dos Pais".
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{step === 3 ? 'Confirmar Agendamento' : 'Avançar'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

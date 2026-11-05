import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  MessageCircle, 
  Filter, 
  Trash2,
  ShieldCheck,
  Building2,
  Search
} from 'lucide-react';
import { PatientAppointment } from '../types';
import { getStoredAppointments, saveAppointment } from '../utils/storage';
import { CLINIC_INFO } from '../data/mockData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Default PIN is the doctor's CRM: 7773
  const CORRECT_PIN = '7773';

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const loadAppointments = () => {
    const list = getStoredAppointments();
    // If no appointments exist yet, provide realistic mock sample appointments so the doctor/secretary sees how it works
    if (list.length === 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const sampleAppointments: PatientAppointment[] = [
        {
          id: 'demo_1',
          childName: 'Theo Henrique Ribeiro',
          childAge: '14 dias',
          parentName: 'Juliana Ribeiro',
          parentPhone: '(99) 98455-1234',
          parentCpf: '045.892.113-22',
          type: 'neonatologia',
          date: todayStr,
          time: '09:00',
          paymentType: 'particular',
          notes: 'Primeira consulta de recém-nascido, avaliação de icterícia e pega na amamentação.',
          status: 'confirmado',
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo_2',
          childName: 'Maria Alice Santos',
          childAge: '4 meses',
          parentName: 'Carlos Eduardo Santos',
          parentPhone: '(99) 99122-8765',
          parentCpf: '812.334.901-55',
          type: 'puericultura',
          date: todayStr,
          time: '10:30',
          paymentType: 'convenio-reembolso',
          notes: 'Puericultura de 4 meses, introdução de vacinas e rotina do sono.',
          status: 'pendente',
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo_3',
          childName: 'Arthur Gabriel Lima',
          childAge: '2 anos',
          parentName: 'Renata Lima',
          parentPhone: '(99) 98844-3321',
          parentCpf: '542.128.990-11',
          type: 'pediatria-geral',
          date: todayStr,
          time: '14:30',
          paymentType: 'particular',
          notes: 'Tosse seca e coriza há 2 dias, sem febre.',
          status: 'pendente',
          createdAt: new Date().toISOString()
        }
      ];
      sampleAppointments.forEach(saveAppointment);
      setAppointments(sampleAppointments);
    } else {
      setAppointments(list);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === CORRECT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: PatientAppointment['status']) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointments(updated);
    try {
      localStorage.setItem('dra_gabriela_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleReplyToPatientWhatsApp = (appt: PatientAppointment) => {
    // Cleans phone for wa.me
    const cleanPhone = appt.parentPhone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    
    const message = `Olá, ${appt.parentName}! 🌸\nAqui é da recepção da *Dra. Gabriela Lara (MedClinic São Lucas)*.\n\nRecebemos a solicitação de agendamento para o(a) pequeno(a) *${appt.childName}* no dia *${appt.date} às ${appt.time}*.\n\nO horário está pré-reservado! Por favor, poderia confirmar a presença de vocês?\n\nEndereço: ${CLINIC_INFO.address}, ${CLINIC_INFO.city} (1º andar). Ficamos à disposição!`;
    
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleExportCSV = () => {
    const headers = ['Data', 'Horario', 'Crianca', 'Idade', 'Responsavel', 'WhatsApp', 'Tipo_Consulta', 'Status', 'Observacoes'];
    const rows = appointments.map(a => [
      `"${a.date}"`,
      `"${a.time}"`,
      `"${a.childName}"`,
      `"${a.childAge}"`,
      `"${a.parentName}"`,
      `"${a.parentPhone}"`,
      `"${a.type}"`,
      `"${a.status}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `consultas-medclinic-dra-gabriela-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = filterStatus === 'todos' || a.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || 
      a.childName.toLowerCase().includes(q) || 
      a.parentName.toLowerCase().includes(q) || 
      a.parentPhone.includes(q) ||
      a.date.includes(q);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = appointments.filter(a => a.status === 'pendente').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmado').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Painel da Recepção & Consultório</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-700/80 text-purple-200">Uso Interno</span>
              </div>
              <p className="text-xs text-purple-200">MedClinic São Lucas • Dra. Gabriela Lara (CRM MA 7773)</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Acesso Restrito da Recepção</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Digite a senha/PIN de acesso da clínica para visualizar a lista completa de consultas agendadas pelos pacientes.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Digite o PIN (Dica: CRM 7773)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-sm font-bold tracking-widest p-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5">
                    PIN incorreto. Digite 7773 (número do CRM).
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Entrar no Painel de Consultas
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 max-w-md">
              💡 <strong>Como funciona:</strong> Todas as vezes que um paciente preenche a aba de agendamento, os dados chegam ao WhatsApp da clínica e também ficam registrados neste painel para a secretária conferir e chamar.
            </div>
          </div>
        ) : (
          /* Logged In Reception Panel */
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-700">Total Registrado</span>
                <p className="text-2xl font-extrabold text-purple-950">{appointments.length}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-700">Pendentes</span>
                <p className="text-2xl font-extrabold text-amber-950">{pendingCount}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700">Confirmadas</span>
                <p className="text-2xl font-extrabold text-emerald-950">{confirmedCount}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center gap-1.5">
                <button
                  onClick={handleExportCSV}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold flex items-center justify-center gap-1 text-[11px]"
                >
                  <Download className="w-3.5 h-3.5 text-purple-700" />
                  <span>Baixar Excel / CSV</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold flex items-center justify-center gap-1 text-[11px]"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Imprimir Pauta</span>
                </button>
              </div>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar por criança, responsável, telefone ou data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-purple-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold text-[11px]">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="pendente">Apenas Pendentes</option>
                  <option value="confirmado">Confirmados</option>
                  <option value="realizado">Atendidos</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>
            </div>

            {/* Appointments Table / Cards */}
            <div className="space-y-3">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <div 
                    key={appt.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{appt.childName}</span>
                          <span className="text-xs text-slate-500">({appt.childAge})</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            appt.status === 'confirmado' ? 'bg-emerald-100 text-emerald-800' :
                            appt.status === 'pendente' ? 'bg-amber-100 text-amber-800' :
                            appt.status === 'realizado' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {appt.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-purple-800 font-semibold mt-0.5">
                          {appt.type} • {appt.paymentType === 'particular' ? 'Particular' : 'Convênio (Recibo)'}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-sm font-extrabold text-purple-950 block">
                          📅 {appt.date} às {appt.time}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          MedClinic São Lucas (1º andar)
                        </span>
                      </div>
                    </div>

                    {/* Patient and Parent Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 block">Responsável:</span>
                        <strong className="text-slate-800">{appt.parentName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">WhatsApp:</span>
                        <strong className="text-slate-800">{appt.parentPhone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">CPF / Documento:</span>
                        <span>{appt.parentCpf || 'Não informado'}</span>
                      </div>
                    </div>

                    {appt.notes && (
                      <div className="p-2.5 bg-purple-50/60 rounded-xl text-[11px] text-slate-700">
                        <strong className="text-purple-900">Queixa / Motivo:</strong> "{appt.notes}"
                      </div>
                    )}

                    {/* Action Toolbar for Secretary */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                      {/* Direct WhatsApp Call to Parent */}
                      <button
                        onClick={() => handleReplyToPatientWhatsApp(appt)}
                        className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                        title="Enviar mensagem de confirmação para o WhatsApp do paciente"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chamar {appt.parentName.split(' ')[0]} no WhatsApp</span>
                      </button>

                      {/* Status Update Quick Toggles */}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-[11px] text-slate-400">Alterar:</span>
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'confirmado')}
                          className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                        >
                          ✓ Confirmar
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'realizado')}
                          className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px]"
                        >
                          Atendido
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(appt.id, 'cancelado')}
                          className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px]"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl p-6">
                  <p className="text-xs text-slate-500 font-semibold">Nenhuma consulta encontrada com os filtros atuais.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Painel sincronizado com a base de agendamentos da clínica</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl"
          >
            Fechar Painel
          </button>
        </div>

      </div>
    </div>
  );
};

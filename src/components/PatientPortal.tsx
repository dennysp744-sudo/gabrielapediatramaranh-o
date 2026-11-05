import React, { useState, useEffect } from 'react';
import { 
  FolderHeart, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  FileCheck, 
  ShieldCheck, 
  Activity, 
  CalendarPlus, 
  Download,
  AlertCircle,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { PatientAppointment, GrowthRecord } from '../types';
import { 
  getStoredAppointments, 
  cancelStoredAppointment, 
  getStoredGrowthRecords, 
  saveGrowthRecord, 
  deleteGrowthRecord,
  getVaccineChecklist,
  toggleVaccineStatus
} from '../utils/storage';
import { VACCINE_SCHEDULE, CLINIC_INFO } from '../data/mockData';
import { downloadIcsFile } from '../utils/calendar';
import { formatAppointmentWhatsAppMessage } from '../utils/whatsapp';

interface PatientPortalProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  const [activeTab, setActiveTab] = useState<'consultas' | 'crescimento' | 'vacinas' | 'anotacoes'>('consultas');
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [vaccineMap, setVaccineMap] = useState<Record<string, boolean>>({});

  // Growth form state
  const [showAddGrowth, setShowAddGrowth] = useState(false);
  const [childName, setChildName] = useState('');
  const [ageMonths, setAgeMonths] = useState<number>(4);
  const [weightKg, setWeightKg] = useState<number>(6.5);
  const [heightCm, setHeightCm] = useState<number>(63);
  const [headCircumferenceCm, setHeadCircumferenceCm] = useState<number>(41);
  const [growthNotes, setGrowthNotes] = useState('');

  // Parent notes for the consultation
  const [parentNotes, setParentNotes] = useState<string>(() => {
    return localStorage.getItem('dra_gabriela_parent_notes') || '';
  });
  const [notesSavedAlert, setNotesSavedAlert] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAppointments(getStoredAppointments());
    setGrowthRecords(getStoredGrowthRecords());
    setVaccineMap(getVaccineChecklist());
  };

  const handleCancel = (id: string) => {
    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
      cancelStoredAppointment(id);
      loadData();
    }
  };

  const handleAddGrowthRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      alert('Informe o nome da criança.');
      return;
    }

    const newRecord: GrowthRecord = {
      id: 'growth_' + Date.now(),
      childName: childName.trim(),
      date: new Date().toISOString().split('T')[0],
      ageMonths: Number(ageMonths),
      weightKg: Number(weightKg),
      heightCm: Number(heightCm),
      headCircumferenceCm: headCircumferenceCm ? Number(headCircumferenceCm) : undefined,
      notes: growthNotes.trim()
    };

    saveGrowthRecord(newRecord);
    setShowAddGrowth(false);
    loadData();
  };

  const handleDeleteGrowth = (id: string) => {
    if (confirm('Deseja excluir esta medição?')) {
      deleteGrowthRecord(id);
      loadData();
    }
  };

  const handleToggleVaccine = (vacId: string) => {
    const updated = toggleVaccineStatus(vacId);
    setVaccineMap(updated);
  };

  const handleSaveNotes = () => {
    localStorage.setItem('dra_gabriela_parent_notes', parentNotes);
    setNotesSavedAlert(true);
    setTimeout(() => setNotesSavedAlert(false), 2500);
  };

  return (
    <section className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
              <FolderHeart className="w-3.5 h-3.5" />
              <span>Área Segura dos Pais e Familiares</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Histórico & Acompanhamento da Criança
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Gerencie suas consultas, controle o crescimento e acompanhe as vacinas com privacidade total no seu aparelho.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dados 100% privados e salvos localmente</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('consultas')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'consultas'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Consultas Marcadas ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('crescimento')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'crescimento'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Curva & Medidas ({growthRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vacinas')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'vacinas'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-purple-50'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Caderneta de Vacinação</span>
          </button>

          <button
            onClick={() => setActiveTab('anotacoes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'anotacoes'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-purple-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Dúvidas para a Consulta</span>
          </button>
        </div>

        {/* TAB 1: CONSULTAS MARCADAS */}
        {activeTab === 'consultas' && (
          <div className="space-y-4">
            {appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appt) => {
                  const isCancelled = appt.status === 'cancelado';
                  return (
                    <div 
                      key={appt.id}
                      className={`p-5 rounded-2xl bg-white border transition-all ${
                        isCancelled ? 'border-slate-200 opacity-60' : 'border-purple-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-base">{appt.childName}</span>
                            <span className="text-xs text-slate-500">({appt.childAge})</span>
                          </div>
                          <p className="text-xs text-purple-700 font-semibold mt-0.5">
                            {appt.type}
                          </p>
                        </div>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isCancelled ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isCancelled ? 'Cancelado' : 'Agendado'}
                        </span>
                      </div>

                      <div className="py-3 text-xs space-y-1.5 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-purple-600" />
                          <span>Data: <strong>{appt.date}</strong> às <strong>{appt.time}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          <span>Local: MedClinic São Lucas (1º andar)</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Responsável: {appt.parentName} • {appt.parentPhone}
                        </div>
                        {appt.notes && (
                          <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600 italic">
                            Obs: "{appt.notes}"
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                        {!isCancelled && (
                          <button
                            onClick={() => {
                              const msg = formatAppointmentWhatsAppMessage(appt);
                              window.open(`https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Confirmar via WhatsApp</span>
                          </button>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          {!isCancelled && (
                            <>
                              <button
                                onClick={() => downloadIcsFile(appt)}
                                title="Baixar Lembrete de Calendário"
                                className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg text-xs flex items-center gap-1"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">.ICS</span>
                              </button>
                              <button
                                onClick={() => handleCancel(appt.id)}
                                className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded-lg font-medium"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <Calendar className="w-12 h-12 text-purple-300 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">Nenhuma consulta registrada neste dispositivo</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Quando você agenda uma consulta online, ela fica salva aqui com segurança para seu controle.
                  </p>
                </div>
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Agendar Primeira Consulta
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CURVA & MEDIDAS DE CRESCIMENTO */}
        {activeTab === 'crescimento' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-600">
                Acompanhe o peso e a estatura do seu filho entre as consultas de puericultura.
              </p>
              <button
                onClick={() => setShowAddGrowth(!showAddGrowth)}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Medição</span>
              </button>
            </div>

            {/* Form to add measurement */}
            {showAddGrowth && (
              <form onSubmit={handleAddGrowthRecord} className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm space-y-4 animate-in fade-in">
                <h4 className="text-sm font-bold text-purple-950">Registrar Medição da Criança</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome da Criança *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Theo"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Idade (Meses)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={ageMonths}
                      onChange={(e) => setAgeMonths(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Peso (kg) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={weightKg}
                      onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Comprimento / Altura (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={heightCm}
                      onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Perímetro Cefálico (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={headCircumferenceCm}
                      onChange={(e) => setHeadCircumferenceCm(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-purple-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddGrowth(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer"
                  >
                    Salvar Registro
                  </button>
                </div>
              </form>
            )}

            {/* Growth Records Table / Cards */}
            {growthRecords.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-purple-50/70 text-purple-900 font-bold border-b border-purple-100">
                      <tr>
                        <th className="p-3.5">Data</th>
                        <th className="p-3.5">Criança</th>
                        <th className="p-3.5">Idade</th>
                        <th className="p-3.5">Peso</th>
                        <th className="p-3.5">Altura / Comprimento</th>
                        <th className="p-3.5">Perímetro Cefálico</th>
                        <th className="p-3.5 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {growthRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-medium text-slate-600">{r.date}</td>
                          <td className="p-3.5 font-bold text-slate-900">{r.childName}</td>
                          <td className="p-3.5 text-purple-800 font-semibold">{r.ageMonths} meses</td>
                          <td className="p-3.5 font-bold text-emerald-700">{r.weightKg} kg</td>
                          <td className="p-3.5 text-slate-700">{r.heightCm} cm</td>
                          <td className="p-3.5 text-slate-600">{r.headCircumferenceCm ? `${r.headCircumferenceCm} cm` : '-'}</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteGrowth(r.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Excluir medição"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                <Activity className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">Nenhuma medição registrada ainda. Clique em "Nova Medição" para começar.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CADERNETA DE VACINAÇÃO DIGITAL */}
        {activeTab === 'vacinas' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                <FileCheck className="w-4 h-4 text-purple-700" />
                <h4>Controle Digital de Imunização Infantil</h4>
              </div>
              <p className="text-xs text-slate-600">
                Marque as doses já administradas para não perder os prazos. Dados atualizados de acordo com o Programa Nacional de Imunizações (PNI/SUS) e recomendações da Sociedade Brasileira de Pediatria (SBP).
              </p>
            </div>

            <div className="space-y-3">
              {VACCINE_SCHEDULE.map((vac) => {
                const isChecked = !!vaccineMap[vac.id];
                return (
                  <div
                    key={vac.id}
                    onClick={() => handleToggleVaccine(vac.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white flex items-start justify-between gap-3 ${
                      isChecked ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">{vac.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                            {vac.ageLabel}
                          </span>
                          {isChecked && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              ✓ Dose Aplicada
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600">
                          <strong>Protege contra:</strong> {vac.diseaseTarget}
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                          {vac.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DÚVIDAS E ANOTAÇÕES PARA A CONSULTA */}
        {activeTab === 'anotacoes' && (
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Bloco de Notas dos Pais para a Consulta</h3>
              <p className="text-xs text-slate-500">
                Anote aqui todas as perguntas que surgirem na rotina (sono, cólica, alimentação, xixi, vacina) para não esquecer de perguntar para a Dra. Gabriela Lara na consulta!
              </p>
            </div>

            <textarea
              rows={8}
              value={parentNotes}
              onChange={(e) => setParentNotes(e.target.value)}
              placeholder="Ex: &#10;- O bebê tem golfado bastante após as mamadas das 15h. &#10;- Posso começar a oferecer água aos 5 meses ou só aos 6? &#10;- Ele tem coçado muito a gengiva, qual mordedor é o mais seguro?"
              className="w-full p-4 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:outline-none leading-relaxed"
            />

            <div className="flex items-center justify-between">
              {notesSavedAlert ? (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  ✓ Anotações salvas no seu aparelho!
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Salvo automaticamente apenas no seu navegador.
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Salvar Anotações
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Baby, 
  ShieldAlert, 
  Thermometer, 
  Sparkles, 
  Utensils, 
  Moon, 
  CheckCircle, 
  HelpCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { PUERICULTURA_MILESTONES } from '../data/mockData';

interface PuericulturaSectionProps {
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const PuericulturaSection: React.FC<PuericulturaSectionProps> = ({
  onOpenAppointment,
  onOpenWhatsApp
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Fever Calculator state
  const [inputTemp, setInputTemp] = useState<number>(37.8);

  const stage = PUERICULTURA_MILESTONES[selectedStageIndex];

  // Helper for fever advice
  const getFeverStatus = (temp: number) => {
    if (temp < 37.3) {
      return {
        level: 'Normal',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Temperatura Fisiológica',
        advice: 'A temperatura está dentro dos padrões normais. Mantenha os cuidados rotineiros, boa hidratação e roupas adequadas para o clima.'
      };
    } else if (temp >= 37.3 && temp < 37.8) {
      return {
        level: 'Febrícula (Estado Subfebril)',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        badge: 'Atenção e Monitoramento',
        advice: 'Não é febre formal ainda. Muitas vezes decorre de excesso de agasalhos, choro intenso ou calor ambiente. Deixe a criança com roupas leves e observe a evolução sem necessidade de medicação imediata.'
      };
    } else if (temp >= 37.8 && temp < 39.0) {
      return {
        level: 'Febre Moderada',
        color: 'text-orange-700 bg-orange-50 border-orange-200',
        badge: 'Mecanismo de Defesa Ativo',
        advice: 'O organismo está reagindo de forma saudável contra um agente invasor. Foque no conforto da criança: hidrate bastante (água, leite materno), banho morno relaxante e, se houver dor ou prostração, utilize o antitérmico prescrito pela pediatra.'
      };
    } else {
      return {
        level: 'Febre Alta (≥ 39,0°C)',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Atenção Redobrada',
        advice: 'Medique com o antitérmico prescrito pela pediatra na dose do peso atual, ofereça líquidos aos poucos e acompanhe o estado geral. Se a febre persistir por mais de 48-72h ou acompanhar sinais de alerta (gemência, manchas na pele), consulte a pediatra.'
      };
    }
  };

  const feverInfo = getFeverStatus(inputTemp);

  return (
    <section className="relative pt-10 sm:pt-14 pb-16 lg:py-20 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
            <Baby className="w-3.5 h-3.5" />
            <span>Puericultura & Desenvolvimento Infantil</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Orientações de Cuidados para Pais & Responsáveis
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Acompanhar cada conquista e saber como agir com segurança em cada fase é fundamental. Consulte o guia por faixas etárias preparado com base nas diretrizes da Sociedade Brasileira de Pediatria.
          </p>
        </div>

        {/* Age Stage Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PUERICULTURA_MILESTONES.map((m, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={m.stageId}
                onClick={() => {
                  setSelectedStageIndex(idx);
                  setOpenFaqIndex(null);
                }}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-700 text-white shadow-md shadow-purple-600/20 scale-102'
                    : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
                }`}
              >
                <span>{m.ageRange}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-purple-900/60 text-purple-100' : 'bg-slate-100 text-slate-600'}`}>
                  {m.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-300">
          
          {/* Header of Stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Fase: {stage.ageRange}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {stage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {stage.description}
              </p>
            </div>

            <button
              onClick={onOpenAppointment}
              className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-2 border border-purple-200 transition-colors shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>Agendar Avaliação da Fase</span>
            </button>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Marcos do Desenvolvimento */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4>Marcos do Desenvolvimento Esperados</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {stage.developmentGoals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Nutrição e Alimentação */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <Utensils className="w-4 h-4 text-rose-600" />
                <h4>Nutrição, Aleitamento & Alimentação</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {stage.nutritionGuidelines.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Sono e Rotina */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Moon className="w-4 h-4 text-indigo-600" />
                <h4>Sono Seguro, Rotina & Ritmo Familiar</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {stage.sleepAndRoutine.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Segurança e Higiene */}
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-3">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                <h4>Higiene, Segurança & Prevenção</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {stage.safetyAndHygiene.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Dúvidas Frequentes da Fase */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-700" />
              <span>Dúvidas comuns que os pais perguntam nessa fase:</span>
            </h4>

            <div className="space-y-2">
              {stage.frequentQuestions.map((q, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 transition-colors"
                    >
                      <span>{q.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-purple-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                        {q.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* TWO CRITICAL CLINICAL TOOLS: Red Flags + Interactive Fever Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sinais de Alerta: Quando ir ao Pronto Socorro (Emergency Guide) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-950">
                  Sinais de Alerta: Quando ir ao Pronto-Socorro?
                </h3>
                <p className="text-xs text-rose-800/80 font-normal">
                  Fique atento a estes sintomas que exigem avaliação médica hospitalar imediata
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-800 pt-1">
              <div className="p-3 rounded-xl bg-white/90 border border-rose-100 flex items-start gap-2.5 shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-950">Dificuldade respiratória importante:</strong> Afundamento da pele entre as costelas, respiração muito rápida, chiado intenso ou lábios arroxeados.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/90 border border-rose-100 flex items-start gap-2.5 shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-950">Bebê menor de 3 meses com febre:</strong> Qualquer temperatura axilar ≥ 37,8°C em recém-nascidos exige atendimento presencial sem demora.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/90 border border-rose-100 flex items-start gap-2.5 shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-950">Alteração neurológica ou do nível de consciência:</strong> Criança que não acorda para mamar, extremamente apática, gemência contínua ou convulsão.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/90 border border-rose-100 flex items-start gap-2.5 shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-950">Desidratação acentuada ou manchas na pele:</strong> Fraldas secas por mais de 8 horas, choro sem lágrimas, boca seca ou pontinhos vermelhos/arroxeados que não somem ao esticar a pele.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Em dúvida se é caso de PS? Fale no WhatsApp da Clínica</span>
              </button>
            </div>
          </div>

          {/* Interactive Fever Guide for Parents */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-md space-y-5">
            <div className="flex items-center gap-2.5 text-purple-950">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Guia Interativo de Febre na Infância
                </h3>
                <p className="text-xs text-slate-500">
                  Ajuste a temperatura marcada no termômetro axilar para ver a orientação médica
                </p>
              </div>
            </div>

            {/* Slider / Number Input */}
            <div className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Temperatura Axilar:</span>
                <span className="text-2xl font-extrabold text-purple-900">
                  {inputTemp.toFixed(1)}°C
                </span>
              </div>

              <input
                type="range"
                min="36.0"
                max="40.5"
                step="0.1"
                value={inputTemp}
                onChange={(e) => setInputTemp(parseFloat(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>36.0°C</span>
                <span>37.3°C</span>
                <span>37.8°C (Febre)</span>
                <span>39.0°C</span>
                <span>40.5°C</span>
              </div>
            </div>

            {/* Result Box */}
            <div className={`p-4 rounded-2xl border ${feverInfo.color} space-y-2 transition-all`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">{feverInfo.level}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/70 shadow-2xs">
                  {feverInfo.badge}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {feverInfo.advice}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              *Nunca administre medicamentos sem a dosagem prescrita individualmente para o peso da criança.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

import { CLINIC_INFO } from '../data/mockData';
import { PatientAppointment } from '../types';

export function createWhatsAppUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CLINIC_INFO.phoneRaw}?text=${encoded}`;
}

export function formatAppointmentWhatsAppMessage(appointment: PatientAppointment): string {
  const typeMap: Record<string, string> = {
    'puericultura': 'Puericultura & Desenvolvimento',
    'neonatologia': 'Primeira Consulta do Recém-Nascido',
    'pediatria-geral': 'Consulta Pediátrica Geral',
    'prenatal-pediatrico': 'Consulta Pré-Natal Pediátrica',
    'urgencia-leve': 'Encaixe de Urgência Leve'
  };

  const paymentText = appointment.paymentType === 'particular' ? 'Particular' : 'Convênio (Solicitação de Recibo p/ Reembolso)';

  return `Olá, equipe da Dra. Gabriela Lara! 🌸
Gostaria de confirmar a solicitação de agendamento realizada pelo site:

👶 *Criança:* ${appointment.childName} (${appointment.childAge})
👩‍👦 *Responsável:* ${appointment.parentName}
📱 *WhatsApp:* ${appointment.parentPhone}
🩺 *Tipo de Consulta:* ${typeMap[appointment.type] || appointment.type}
📅 *Data pretendida:* ${appointment.date}
⏰ *Horário:* ${appointment.time}
💳 *Modalidade:* ${paymentText}
${appointment.notes ? `📝 *Observação / Motivo:* ${appointment.notes}` : ''}

Por favor, poderiam confirmar a disponibilidade deste horário na MedClinic São Lucas? Agradeço!`;
}

export function formatQuickQueryWhatsAppMessage(topic: string, details?: string): string {
  return `Olá, Dra. Gabriela Lara e equipe! 🌸
Gostaria de uma orientação rápida sobre: *${topic}*.
${details ? `\nDetalhes:\n${details}` : ''}

Agradeço a atenção!`;
}

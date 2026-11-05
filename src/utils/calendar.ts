import { PatientAppointment } from '../types';
import { CLINIC_INFO } from '../data/mockData';

export function createGoogleCalendarUrl(appointment: PatientAppointment): string {
  // Appointment date in YYYY-MM-DD and time in HH:mm
  const [year, month, day] = appointment.date.split('-');
  const [hours, minutes] = appointment.time.split(':');

  if (!year || !month || !day || !hours || !minutes) return '#';

  const startDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10)
  );

  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatCalTime = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const title = `Consulta Pediátrica: ${appointment.childName} com Dra. Gabriela Lara`;
  const details = `Consulta médica com a Dra. Gabriela Lara (CRM MA 7773 | RQE 5632/6808).\nPaciente: ${appointment.childName}\nResponsável: ${appointment.parentName}\nContato: ${CLINIC_INFO.phoneDisplay}`;
  const location = `${CLINIC_INFO.clinicName}, ${CLINIC_INFO.address}, ${CLINIC_INFO.city}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${formatCalTime(startDate)}/${formatCalTime(endDate)}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;
}

export function downloadIcsFile(appointment: PatientAppointment): void {
  const [year, month, day] = appointment.date.split('-');
  const [hours, minutes] = appointment.time.split(':');

  const startDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10)
  );
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatIcsTime = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dra Gabriela Lara//Pediatria e Neonatologia//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ped-${appointment.id}@dragabrielalara.med.br`,
    `DTSTAMP:${formatIcsTime(new Date())}`,
    `DTSTART:${formatIcsTime(startDate)}`,
    `DTEND:${formatIcsTime(endDate)}`,
    `SUMMARY:Consulta Pediátrica: ${appointment.childName} - Dra. Gabriela Lara`,
    `DESCRIPTION:Consulta Pediátrica na ${CLINIC_INFO.clinicName}.\\nPaciente: ${appointment.childName}.\\nTelefone: ${CLINIC_INFO.phoneDisplay}.`,
    `LOCATION:${CLINIC_INFO.clinicName}\\, ${CLINIC_INFO.address}\\, ${CLINIC_INFO.city}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `consulta-dra-gabriela-lara-${appointment.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

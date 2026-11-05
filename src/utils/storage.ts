import { PatientAppointment, GrowthRecord } from '../types';

const APPOINTMENTS_KEY = 'dra_gabriela_appointments';
const GROWTH_KEY = 'dra_gabriela_growth_records';
const VACCINE_STATUS_KEY = 'dra_gabriela_vaccine_status';

export function getStoredAppointments(): PatientAppointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading appointments', e);
    return [];
  }
}

export function saveAppointment(appointment: PatientAppointment): void {
  try {
    const current = getStoredAppointments();
    const updated = [appointment, ...current.filter(a => a.id !== appointment.id)];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving appointment', e);
  }
}

export function cancelStoredAppointment(id: string): void {
  try {
    const current = getStoredAppointments();
    const updated = current.map(item => item.id === id ? { ...item, status: 'cancelado' as const } : item);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error cancelling appointment', e);
  }
}

export function getStoredGrowthRecords(): GrowthRecord[] {
  try {
    const raw = localStorage.getItem(GROWTH_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveGrowthRecord(record: GrowthRecord): void {
  try {
    const current = getStoredGrowthRecords();
    const updated = [record, ...current.filter(r => r.id !== record.id)];
    localStorage.setItem(GROWTH_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving growth record', e);
  }
}

export function deleteGrowthRecord(id: string): void {
  try {
    const current = getStoredGrowthRecords();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(GROWTH_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting record', e);
  }
}

export function getVaccineChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(VACCINE_STATUS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function toggleVaccineStatus(vaccineId: string): Record<string, boolean> {
  try {
    const current = getVaccineChecklist();
    const updated = { ...current, [vaccineId]: !current[vaccineId] };
    localStorage.setItem(VACCINE_STATUS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return {};
  }
}

import { create } from "zustand";
import { MedicalReportState } from "@/types/state";
import {
  getMedicalReports,
  getMedicalReportById,
  updateMedicalReport,
  createMedicalReport,
  deleteMedicalReport,
} from "@/services/medicalReportService";

export const useMedicalReportStore = create<MedicalReportState>((set) => ({
  reports: [] as MedicalReport[],
  setReports: (reports) => set({ reports }),

  getMedicalReports: async () => {
    const reports = await getMedicalReports();
    set({ reports });
  },

  getMedicalReportById: async (id: number) => {
    const report = await getMedicalReportById(id);
    set((state) => ({
      reports: state.reports.map((r) => (r.id === id ? report : r)),
    }));
    return report;
  },

  postMedicalReport: async (report: MedicalReport) => {
    try {
      const newReport = await createMedicalReport(report);
      if (newReport) {
        set((state) => ({ reports: [...state.reports, newReport] }));
        return newReport;
      }
      return null;
    } catch (error) {
      console.error("Error al crear el reporte médico:", error);
      return null;
    }
  },

  putMedicalReport: async (id: number, report: MedicalReport) => {
    const updatedReport = await updateMedicalReport(id, report);
    set((state) => ({
      reports: state.reports.map((r) => (r.id === id ? updatedReport : r)),
    }));
    return updatedReport;
  },

  deleteMedicalReport: async (id: number) => {
    await deleteMedicalReport(id);
    set((state) => ({
      reports: state.reports.filter((r) => r.id !== id),
    }));
  },
}));

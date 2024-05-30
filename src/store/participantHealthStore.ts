import { create } from "zustand";
import { ParticipantHealthState } from "@/types/state";
import {
  getParticipantsHealth,
  getParticipantHealthById,
  createParticipantHealth,
  updateParticipantHealth,
  deleteParticipantHealth,
  getParticipantHealthByBloodType,
  getParticipantHealthByParticipantId,
} from "@/services/participantHealthService";

export const useParticipantHealthStore = create<ParticipantHealthState>(
  (set) => ({
    participantsHealth: [] as ParticipantHealth[],
    setParticipantsHealth: (participantsHealth) => set({ participantsHealth }),

    getParticipantsHealth: async () => {
      const participantsHealth = await getParticipantsHealth();
      set({ participantsHealth });
    },

    getParticipantHealthById: async (id: number) => {
      const participantHealth = await getParticipantHealthById(id);
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.id === id ? participantHealth : p
        ),
      }));
      return participantHealth;
    },

    postParticipantHealth: async (participantHealth: ParticipantHealth) => {
      try {
        const newParticipantHealth = await createParticipantHealth(
          participantHealth
        );
        if (newParticipantHealth) {
          set((state) => ({
            participantsHealth: [
              ...state.participantsHealth,
              newParticipantHealth,
            ],
          }));
          console.log('storehealth', newParticipantHealth);
          return newParticipantHealth;
        }
        return null;
      } catch (error) {
        console.error("Error al crear el participante en salud:", error);
        return null;
      }
    },

    putParticipantHealth: async (
      id: number,
      participantHealth: ParticipantHealth
    ) => {
      const updatedParticipantHealth = await updateParticipantHealth(
        id,
        participantHealth
      );
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.id === id ? updatedParticipantHealth : p
        ),
      }));
      return updatedParticipantHealth;
    },

    deleteParticipantHealth: async (id: number) => {
      await deleteParticipantHealth(id);
      set((state) => ({
        participantsHealth: state.participantsHealth.filter((p) => p.id !== id),
      }));
    },

    getParticipantHealthByBloodType: async (bloodType: string) => {
      const participantHealth = await getParticipantHealthByBloodType(
        bloodType
      );
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.bloodType === bloodType ? participantHealth : p
        ),
      }));
      return participantHealth;
    },

    getParticipantHealthByParticipantId: async (participantId: number) => {
      const participantHealth = await getParticipantHealthByParticipantId(
        participantId
      );
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.participantId === participantId ? participantHealth : p
        ),
      }));
      return participantHealth;
    },
  })
);

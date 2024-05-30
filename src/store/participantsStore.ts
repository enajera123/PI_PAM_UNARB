import { create } from "zustand";
import { ParticipantState } from "@/types/state";
import {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  getParticipantByEmail,
  getParticipantByFirstName,
  getParticipantByIdentification,
} from "@/services/participantsService";

export const useParticipantsStore = create<ParticipantState>((set) => ({
  participants: [] as Participant[],
  setParticipants: (participants) => set({ participants }),

  getParticipants: async () => {
    const participants = await getParticipants();
    set({ participants });
  },

  getParticipantById: async (id: number): Promise<Participant | null> => {
    const participant = await getParticipantById(id);
    console.log("Valor de participant:", participant);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? participant : p
      ),
    }));
    return participant;
  },

  postParticipant: async (
    participant: Participant
  ): Promise<Participant | null> => {
    try {
      const newParticipant = await createParticipant(participant);
      if (newParticipant) {
        set((state) => ({
          participants: [...state.participants, newParticipant],
        }));
        console.log("Nuevo participante agregado:", newParticipant);
        return newParticipant;
      }
      return null;
    } catch (error) {
      console.error("Error al crear participante:", error);
      return null;
      throw error;
    }
  },

  putParticipant: async (id: number, participant: Participant): Promise<Participant | null> => {
    const updatedParticipant = await updateParticipant(id, participant);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? updatedParticipant : p
      ),
    }));
    return updatedParticipant;
  },

  deleteParticipant: async (id: number) => {
    await deleteParticipant(id);
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }));
  },

  getParticipantByEmail: async (email: string) => {
    const participant = await getParticipantByEmail(email);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.email === email ? participant : p
      ),
    }));
  },

  getParticipantByFirstName: async (firstName: string) => {
    const participant = await getParticipantByFirstName(firstName);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.firstName === firstName ? participant : p
      ),
    }));
  },

  getParticipantByIdentification: async (identification: string) => {
    const participant = await getParticipantByIdentification(identification);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.identification === identification ? participant : p
      ),
    }));
  },
}));

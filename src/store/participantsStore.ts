import { create } from "zustand";
import { Participant } from "@/types/types";
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

  getParticipantById: async (id: number) => {
    const participant = await getParticipantById(id);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? participant : p
      ),
    }));
  },

  postParticipant: async (participant: Participant) => {
    const newParticipant = await createParticipant(participant);
    if (newParticipant) {
      set((state) => ({
        participants: [...state.participants, newParticipant],
      }));
    }
  },

  putParticipant: async (id: number, participant: Participant) => {
    const updatedParticipant = await updateParticipant(id, participant);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? updatedParticipant : p
      ),
    }));
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

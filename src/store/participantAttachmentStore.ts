import { create } from "zustand";
import { ParticipantAttachmentState } from "@/types/state";
import {
  getParticipantsAttachment,
  getParticipantAttachmentById,
  createParticipantAttachment,
  updateParticipantAttachment,
  deleteParticipantAttachment,
  getParticipantAttachmentByParticipantId,
} from "@/services/participantAttachmentService";

export const useParticipantAttachmentStore = create<ParticipantAttachmentState>(
  (set) => ({
    participantsAttachment: [] as ParticipantAttachment[],
    setParticipantsAttachment: (participantsAttachment) =>
      set({ participantsAttachment }),

    getParticipantsAttachment: async () => {
      const participantsAttachment = await getParticipantsAttachment();
      set({ participantsAttachment });
    },

    getParticipantAttachmentById: async (
      id: number
    ): Promise<ParticipantAttachment | null> => {
      const participantAttachment = await getParticipantAttachmentById(id);
      set((state) => ({
        participantsAttachment: state.participantsAttachment.map((p) =>
          p.id === id ? participantAttachment : p
        ),
      }));
      return participantAttachment;
    },

    postParticipantAttachment: async (
      participantAttachment: ParticipantAttachment
    ): Promise<ParticipantAttachment | null> => {
      try {
        const newParticipantAttachment = await createParticipantAttachment(
          participantAttachment
        );
        if (newParticipantAttachment) {
          set((state) => ({
            participantsAttachment: [
              ...state.participantsAttachment,
              newParticipantAttachment,
            ],
          }));
          console.log(
            "store participant attachment:",
            newParticipantAttachment
          );
          return newParticipantAttachment;
        }
        return null;
      } catch (error) {
        console.error("Error al crear el adjunto del participante:", error);
        return null;
      }
    },

    putParticipantAttachment: async (
      id: number,
      participantAttachment: ParticipantAttachment
    ): Promise<ParticipantAttachment | null> => {
      const updatedParticipantAttachment = await updateParticipantAttachment(
        id,
        participantAttachment
      );
      set((state) => ({
        participantsAttachment: state.participantsAttachment.map((p) =>
          p.id === id ? updatedParticipantAttachment : p
        ),
      }));
      return updatedParticipantAttachment;
    },

    deleteParticipantAttachment: async (id: number) => {
      await deleteParticipantAttachment(id);
      set((state) => ({
        participantsAttachment: state.participantsAttachment.filter(
          (p) => p.id !== id
        ),
      }));
    },

    getParticipantAttachmentByParticipantId: async (
      participantId: number
    ): Promise<ParticipantAttachment | null> => {
      const participantAttachment =
        await getParticipantAttachmentByParticipantId(participantId);
      set((state) => ({
        participantsAttachment: state.participantsAttachment.map((p) =>
          p.participantId === participantId ? participantAttachment : p
        ),
      }));
      return participantAttachment;
    },
  })
);

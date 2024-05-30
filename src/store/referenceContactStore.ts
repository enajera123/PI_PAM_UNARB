import { create } from "zustand";
import { ReferenceContactState } from "@/types/state";
import {
  getReference,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
  searchContacts,
  getreferenceContactByParticipantId,
  updatereferenceContactByParticipantId,
} from "@/services/referenceContactService";

export const useReferenceContactStore = create<ReferenceContactState>(
  (set) => ({
    contacts: [] as ReferenceContact[],
    setContacts: (contacts) => set({ contacts }),

    getContacts: async () => {
      const contacts = await getReference();
      set({ contacts });
    },

    getContactById: async (id: number) => {
      const referenceContact = await getReferenceById(id);
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? referenceContact : rc
        ),
      }));
      return referenceContact;
    },

    postContact: async (reference: ReferenceContact): Promise<ReferenceContact | null> => {
      try {
        const newReference = await createReference(reference);
        if (newReference) {
          set((state) => ({ contacts: [...state.contacts, newReference] }));
          return newReference;
        }
        return null;
      } catch (error) {
        console.error("Error al crear el contacto:", error);
        return null;
      }
    },

    putContact: async (id: number, reference: ReferenceContact) => {
      const updatedReference = await updateReference(id, reference);
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? updatedReference : rc
        ),
      }));
      return updatedReference;
    },

    deleteContact: async (id: number) => {
      await deleteReference(id);
      set((state) => ({
        contacts: state.contacts.filter((rc) => rc.id !== id),
      }));
    },

    searchContact: async (searchTerm: string) => {
      const searchedContacts = await searchContacts(searchTerm);
      set({ contacts: searchedContacts });
    },

    getContactByParticipantId: async (participantId: number): Promise<ReferenceContact | null> => {
      const contact = await getreferenceContactByParticipantId(participantId);
      set((state) => ({
        contacts: state.contacts.map((p) =>
          p.participantId === participantId ? contact : p
        ),
      }));
      return contact;
    },

    putContactByParticipantId: async (
      participantId: number,
      contact: ReferenceContact
    ): Promise<ReferenceContact | null> => {
      const updatedReference = await updatereferenceContactByParticipantId(
        participantId,
        contact
      );
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === participantId ? updatedReference : rc
        ),
      }));
      return updatedReference;
    },
  })
);

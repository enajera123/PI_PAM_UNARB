import { create } from "zustand";
import { PolicyState } from "@/types/state";
import {
  getPolicy,
  getPolicyById,
  updatePolicy,
  createPolicy,
  deletePolicy,
} from "@/services/policyService";

export const usePolicyStore = create<PolicyState>((set) => ({
  policys: [] as Policy[],
  setPolicys: (policys) => set({ policys }),

  getPolicys: async () => {
    const policys = await getPolicy();
    set({ policys });
  },

  getPolicyById: async (id: number) => {
    const policy = await getPolicyById(id);
    set((state) => ({
      policys: state.policys.map((p) => (p.id === id ? policy : p)),
    }));
    return policy;
  },

  postPolicy: async (policy: Policy): Promise<Policy | null> => {
    try {
      const newPolicy = await createPolicy(policy);
      if (newPolicy) {
        set((state) => ({ policys: [...state.policys, newPolicy] }));
        console.log("Nuevo poliza agregado:", newPolicy);
        return newPolicy;
      }
      return null;
    } catch (error) {
      console.error("Error al crear la póliza:", error);
      return null;
    }
  },

  putPolicy: async (id: number, policy: Policy): Promise<Policy | null> => {
    const updatedPolicy = await updatePolicy(id, policy);
    set((state) => ({
      policys: state.policys.map((p) => (p.id === id ? updatedPolicy : p)),
    }));
    return updatedPolicy;
  },

  deletePolicy: async (id: number) => {
    await deletePolicy(id);
    set((state) => ({
      policys: state.policys.filter((p) => p.id !== id),
    }));
  },
}));

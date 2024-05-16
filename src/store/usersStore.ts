import { create } from "zustand";
import { UsersState } from "@/types/state";
import {
  getUsers,
  getUserById,
  getUserByFirstName,
  authenticateUser,
  updateUserPassword,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/usersService";

export const useUsersStore = create<UsersState>((set) => ({
  users: [] as User[],
  setUsers: (users) => set({ users }),

  getUsers: async () => {
    const users = await getUsers();
    set({ users });
  },

  getUserById: async (id: number) => {
    const user = await getUserById(id);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? user : u)),
    }));
  },

  getUserByFirstName: async (firstName: string) => {
    const user = await getUserByFirstName(firstName);
    set((state) => ({
      users: state.users.filter((u) => (u.firstName === firstName ? user : u)),
    }));
  },

  postUser: async (user: User) => {
    const newUser = await createUser(user);
    if (newUser) {
      set((state) => ({ users: [...state.users, newUser] }));
    }
  },

  putUser: async (id: number, user: User) => {
    const updatedUser = await updateUser(id, user);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
  },

  deleteUser: async (id: number) => {
    await deleteUser(id);
    set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
  },

  authenticateUser: async (user: User) => {
    const authenticatedUser = await authenticateUser(user);
    if (authenticatedUser) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === authenticatedUser.id ? authenticatedUser : u
        ),
      }));
    }
  },

  putUserPassword: async (id: number, user: User) => {
    const updatedUser = await updateUserPassword(id, user);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
  },
}));

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isUserAuthenticated: false,
      isStationAuthenticated: false,
      hasUnreadNotifications: false,
      setHasUnreadNotifications: (value) =>
        set({ hasUnreadNotifications: value }),

      //user
      login: async (username, token, id, phoneNo, email) => {
        set({
          user: { username, token, id, phoneNo, email },
          isUserAuthenticated: true,
        });
      },
      signup: async (email, username) => {
        set({ user: { email, username }, isUserAuthenticated: true });
      },
      logout: async () => {
        set({
          user: null,
          isUserAuthenticated: false,
          hasUnreadNotifications: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
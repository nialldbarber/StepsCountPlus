import { storage } from "@/app/storage/mmkv";
import { createClient } from "@supabase/supabase-js";
import { Config } from "react-native-config";
import "react-native-url-polyfill/auto";

const StoreAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) => {
    return storage.set(key, value);
  },
  removeItem: (key: string) => {
    return storage.delete(key);
  },
};

const supabaseUrl = Config.SUPABASE_URL as string;
const supabaseKey = Config.SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: StoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

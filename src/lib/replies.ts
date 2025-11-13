import { supabase } from "./supabase";

export type Reply = {
  id: string;
  thread_id: string;
  body: string

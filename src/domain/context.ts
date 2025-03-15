import {createContext} from "react";
import type {Session, User} from "@supabase/supabase-js";

export const UserContext = createContext<{ user?: User | null, $set?(user?: User | null): void }>({});
export const PageSizeContext = createContext<{ pageSize: number, $set?(pageSize: number): void }>({} as any);
export const SessionContext = createContext<{ session?: Session | null, $set?(session?: Session | null): void }>({});
export const FavouriteDealIdsContext = createContext<{ favouriteDealIds?: string[] | null, $set?(favouriteDealIds?: string[] | null): void }>({});

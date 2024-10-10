import { Projets } from "./projets";

export interface Avis {
    id?: number;
    titre: string;
    description: string;
    user_id: number;
    projet_id: number;
    created_at?: string;
    updated_at?: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
    projet?: Projets;
  }
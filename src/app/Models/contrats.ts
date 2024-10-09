// models/contrats.ts
export interface Contrats {
    id?: number;
    etat: string;
    date: string;
    objectif: string;
    mode_paiement: string;
    nature_paiement: string;
    quantite: number;
    presvu: string;
    force_majeure?: string;
    projet_id: number;
    ressource_id: number; // ID du fournisseur
    user_id?: number[]; // Liste des IDs des utilisateurs (agriculteurs)
    users?:Users[];
  }
  import { Users } from "./users";
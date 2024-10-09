
  export interface Demandes {
    id?: number; // bigint unsigned
    info_demande_id: number;  // Assurez-vous que cette propriété est bien présente
    controle_demande_id: number;
    ressource_id: number;
    user_id: number;
    titre: string;
    statut: 'en_attente' | 'approuvee' | 'refusee';  // Enum pour les statuts
    created_at?: string; // Facultatif selon votre logique
    updated_at?: string; // Facultatif selon votre logique
  }
  
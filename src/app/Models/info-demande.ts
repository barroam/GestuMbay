export interface InfoDemande {
    id?: number;  // L'identifiant est optionnel
  demandeur: 'individuel' | 'groupe' | 'association';  // Type de demandeur, requis
  nom_demandeur: string;  // Nom du demandeur, requis
  adresse: string;  // Adresse, requise
  cin_ninea: string;  // CIN ou NINEA, requis
  contact: number;  // Contact, requis
  created_at?: Date;  // Date de création, optionnelle
  updated_at?: Date;  // Date de mise à jour, optionnelle
}

export interface InfoDemande {
  id?: number;
  demandeur: 'individuel' | 'groupe' | 'association';
  nom_demandeur: string;
  adresse: string;
  cin_ninea: string;
  contact: number;
  created_at?: Date;
  updated_at?: Date;
}

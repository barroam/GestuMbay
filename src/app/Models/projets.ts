export interface Projets {
    id?: number;            // Optionnel, car il est généralement auto-incrémenté par la base de données
    etat: 'en_cours' | 'terminer' | 'annuler';  // Enum pour l'état du projet
    type_activite: string;   // Type de l'activité, champ texte
    date: string;            // Date de début du projet
    attentes: string;        // Attentes du projet
    obstacles: string;       // Obstacles rencontrés ou prévus
    solutions: string;       // Solutions envisagées ou appliquées
    date_fin?: string;       // Optionnelle, date de fin du projet
    created_at?: string;     // Date de création (optionnel, généralement géré par la base de données)
    updated_at?: string;     // Date de mise à jour (optionnel, généralement géré par la base de données)
  }
  
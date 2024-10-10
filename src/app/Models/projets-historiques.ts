export interface ProjetsHistoriques {

    id: number;                        // Identifiant unique
    type_activite: string;            // Type d'activité (ex: "Réunion", "Évaluation")
    date: string;                     // Date (format: YYYY-MM-DD)
    etat: 'en_cours' | 'terminer' | 'annuler'; // État de l'historique
    attentes: string;                 // Attentes associées à l'activité
    obstacles: string;                // Obstacles rencontrés
    solutions: string;                // Solutions apportées
    date_fin?: string | null;         // Date de fin (optionnelle)
    projet_id: number;                // Identifiant du projet associé
    created_at?: string;              // Date de création (généralement géré par la base de données)
    updated_at?: string;              // Date de mise à jour (optionnelle)
}

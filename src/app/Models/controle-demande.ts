export interface ControleDemande {
    id: number;
    numero_parcelle: number; // Changé en string car vous utilisez Validators.pattern(/^[0-9]+$/)
    hectare: string;
    culture: 'vivriere' | 'rente' | 'horticole' | 'industrielle' | 'perenne';
    created_at?: string;
    updated_at?: string;
}
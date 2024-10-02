export interface ControleDemande {
    id?:number;
    numero_parcelle: number;       // unsigned int
    hectare: number;               // decimal(8,2)
    culture: 'vivriere' | 'rente' | 'horticole' | 'industrielle' | 'perenne';  // enum
    created_at?: Date;             // timestamp, optionnel
    updated_at?: Date;   
}


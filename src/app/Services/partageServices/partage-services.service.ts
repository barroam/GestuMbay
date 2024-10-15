import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartageServicesService {

  constructor() {  }
    private ressourceIdSource = new BehaviorSubject<number | null>(null);
    private projetIdSource = new BehaviorSubject<number | null>(null);
  
    // Observable pour écouter les changements
    ressourceId$ = this.ressourceIdSource.asObservable();
    projetId$ = this.projetIdSource.asObservable();
  
    // Méthodes pour mettre à jour les IDs
    setRessourceId(id: number) {
      this.ressourceIdSource.next(id);
    }
  
    setProjetId(id: number) {
      this.projetIdSource.next(id);
    }
  }

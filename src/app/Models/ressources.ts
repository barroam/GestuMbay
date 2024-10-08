import { Engrais } from "./engrais";
import { Equipements } from "./equipements";
import { Semences } from "./semences";

  
  export interface Resource {
    semences: Semences[];
    engrais: Engrais[];
    equipements: Equipements[];
    [key: string]: Semences[] | Engrais[] | Equipements[]; // Signature d'index
  }


  
import { Injectable } from '@angular/core';
import { Cuestionario } from './cuestionario';
import { CUESTIONARIOS } from './cuestionarios';

@Injectable()
export class CuestionarioService {
  getCuestionarios(): Promise<Cuestionario[]> {
    return Promise.resolve(CUESTIONARIOS);
  }
}

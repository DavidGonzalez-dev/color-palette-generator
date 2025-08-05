import { Injectable } from '@angular/core';
import chroma from 'chroma-js';
import { Color } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ColorGenService {
  
  getColorCodesWithHex(color: string): Color {
    return { hex: chroma(color).hex(), hsl: chroma(color).hsl(), rgb: chroma(color).rgb()}
  }
}

import { Component, computed, inject, input } from '@angular/core';
import { Color } from '../../models/';
import chroma from 'chroma-js';
import { ColorGenService } from '../../services/color-gen.service';

@Component({
  selector: 'app-color-pane',
  imports: [],
  templateUrl: './color-pane.html',
  styleUrl: './color-pane.css'
})
export class ColorPaneComponent {
  
  color = input('')
  colorService = inject(ColorGenService)

  colorCodes = computed<Color>(() => (this.colorService.getColorCodesWithHex(this.color())))

  textColor = computed<string>(() => {
    const contrastWithWhite = chroma.contrast(this.color(), "#ffffff")
    const contrastWithBlack = chroma.contrast(this.color(), "#000000")

    return  contrastWithWhite  > contrastWithBlack ? "#ffffff" : "#000000"
  })

}

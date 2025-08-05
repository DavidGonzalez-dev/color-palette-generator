import { Component, computed, inject, input } from '@angular/core';
import { Color } from '@models/index';
import chroma from 'chroma-js';
import { ColorGenService } from '@services/color-gen.service';
import { ColorCodeButtonComponent } from '@components/index';

@Component({
  selector: 'app-color-pane',
  imports: [ColorCodeButtonComponent],
  templateUrl: './color-pane.html',
  styleUrl: './color-pane.css'
})
export class ColorPaneComponent {

  color = input('')
  copied = false
  colorService = inject(ColorGenService)

  colorCodes = computed<Color>(() => (this.colorService.getColorCodesWithHex(this.color())))

  textColor = computed<string>(() => {
    const contrastWithWhite = chroma.contrast(this.color(), "#ffffff")
    const contrastWithBlack = chroma.contrast(this.color(), "#000000")

    return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000"
  })

}

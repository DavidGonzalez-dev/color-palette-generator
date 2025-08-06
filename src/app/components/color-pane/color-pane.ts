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
  
  colorService = inject(ColorGenService)

  color =  input.required<Color>()
  
  textColor = computed<string>(() => {
    const contrastWithWhite = chroma.contrast(this.color()?.hex as string, "#ffffff")
    const contrastWithBlack = chroma.contrast(this.color()?.hex as string, "#000000")

    return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000"
  })

}

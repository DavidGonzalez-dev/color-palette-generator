import { Component, computed, inject, input } from '@angular/core';
import { ColorPaneComponent } from '@components/index';
import { ColorGenService } from '@services/color-gen.service';
import { Color } from '@models/color.model';

@Component({
  selector: 'app-color-palette',
  imports: [ColorPaneComponent],
  templateUrl: './color-palette.html',
  styleUrl: './color-palette.css'
})
export class ColorPalette {

  private colorService = inject(ColorGenService)

  readonly baseColor = input('')
  readonly baseColorCodes = computed<Color>(() => this.colorService.getColorCodes(this.baseColor()))
  readonly palette = computed<Color[]>(() => this.colorService.getMonoPalette(this.baseColorCodes(), 5))

    

}

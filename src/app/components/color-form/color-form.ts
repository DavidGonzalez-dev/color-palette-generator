import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorGenService } from '@services/color-gen.service';

@Component({
  selector: 'app-color-form',
  imports: [ReactiveFormsModule],
  templateUrl: './color-form.html',
  styleUrl: './color-form.css'
})
export class ColorFormComponent {
  
  private readonly colorService = inject(ColorGenService)

  readonly colorCode = new FormControl(this.colorService.getBaseColor().hex)
  readonly paletteType = new FormControl ("analog")

  changeColor(event: Event) {

    event.preventDefault()
    
    if (this.colorCode.getRawValue() != null){
      this.colorService.setBaseColor(this.colorCode.getRawValue() as string)
    }
  }
}

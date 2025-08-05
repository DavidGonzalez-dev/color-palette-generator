import { Component, input } from '@angular/core';

@Component({
  selector: 'app-color-code-button',
  imports: [],
  templateUrl: './color-code-button.html',
  styleUrl: './color-code-button.css'
})
export class ColorCodeButtonComponent {

  readonly variant = input('')
  readonly textColor = input('')
  copied = false

  async copyCodeToClipboard(event: MouseEvent) {
    const colorCode = (event.target as HTMLElement).textContent

    try {

      await navigator.clipboard.writeText(colorCode as string)

      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)


    } catch (error) {
      console.log("Error al copiar en el portapapeles")
    }
  }
}

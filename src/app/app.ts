import { Component, signal } from '@angular/core';
import { ColorPalette } from '@components/index';

@Component({
  selector: 'app-root',
  imports: [ColorPalette],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('color-palette-generator');
}

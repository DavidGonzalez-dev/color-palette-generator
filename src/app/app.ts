import { Component, signal } from '@angular/core';
import {  ColorFormComponent, ColorPaletteComponent } from '@components/index';

@Component({
  selector: 'app-root',
  imports: [ColorPaletteComponent, ColorFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('color-palette-generator');
}

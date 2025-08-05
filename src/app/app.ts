import { Component, signal } from '@angular/core';
import { ColorPaneComponent } from './components/color-pane/color-pane';

@Component({
  selector: 'app-root',
  imports: [ColorPaneComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('color-palette-generator');
}

import { Injectable, signal } from '@angular/core';
import chroma from 'chroma-js';
import { Color, HSL, RGB } from '../models';
import ColorNamer from 'color-namer';

@Injectable({
  providedIn: 'root'
})
export class ColorGenService {

  private baseColor = signal<Color>(this.getColorCodes("black"))

  setBaseColor(color: string) {
    this.baseColor.set(this.getColorCodes(color))
  }

  getBaseColor() {
    return this.baseColor()
  }

  getColorCodes(color: string): Color {
    return { name: ColorNamer(color).ntc[0].name, hex: chroma(color).hex(), hsl: this.getHslCodeFromColor(color), rgb: this.getRgbCodeFromColor(color) }
  }

  getMonoPalette(color: Color, paletteSize: number) {

    const increment = this.getLightnessVariation(paletteSize)
    const palette: Color[] = Array(paletteSize)

    if (color.hsl.lightness <= 40) {

      palette[0] = this.getColorCodes(color.hex)

      for (let colorIndex = 1; colorIndex < paletteSize; colorIndex++) {
        let newLightness = color.hsl.lightness + (increment * colorIndex)
        palette[colorIndex] = this.getColorCodes(`hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${newLightness}%)`)
      }
    }
    else if (color.hsl.lightness >= 70) {

      palette[0] = this.getColorCodes(color.hex)

      for (let colorIndex = 1; colorIndex < paletteSize; colorIndex++) {
        let newLightness = color.hsl.lightness - (increment * colorIndex)
        palette[colorIndex] = this.getColorCodes(`hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${newLightness}%)`)
      }
    }
    else {
      const middleIndex = Math.floor(paletteSize / 2)
      palette[middleIndex] = color

      for (let colorIndex = middleIndex - 1; colorIndex >= 0; colorIndex--) {
        let newLightness = color.hsl.lightness - (increment * (middleIndex - colorIndex))
        palette[colorIndex] = this.getColorCodes(`hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${newLightness}%)`)
      }

      for (let colorIndex = middleIndex + 1; colorIndex < paletteSize; colorIndex++) {
        let newLightness = color.hsl.lightness + (increment * (colorIndex - middleIndex))
        palette[colorIndex] = this.getColorCodes(`hsl(${color.hsl.hue}, ${color.hsl.saturation}%, ${newLightness}%)`)
      }

    }

    return palette
  }

  private getHslCodeFromColor(color: string): HSL {
    const hslTuple = chroma(color).hsl()

    return { 
      hue: Number.isNaN(hslTuple[0]) ? 0 : Math.round(hslTuple[0]), 
      saturation: Math.round(hslTuple[1] * 100), 
      lightness: Math.round(hslTuple[2] * 100) }
  }

  private getRgbCodeFromColor(color: string): RGB {
    const rgbTuple = chroma(color).rgb()
    return { red: rgbTuple[0], green: rgbTuple[1], blue: rgbTuple[2] }
  }

  private getLightnessVariation(paletteSize: number) {
    const upperLimit = 90
    const lowerLimit = 20

    return (upperLimit - lowerLimit) / (paletteSize)
  }
}

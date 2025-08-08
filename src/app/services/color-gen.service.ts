import { Injectable, signal } from '@angular/core';
import chroma from 'chroma-js';
import { Color, HSL, PaletteTypes, RGB } from '../models';
import ColorNamer from 'color-namer';

@Injectable({
  providedIn: 'root'
})
export class ColorGenService {

  private baseColor = signal<Color>(this.getColorCodes("blue"))
  private paletteType = PaletteTypes.MONO

  setBaseColor(color: string) {
    this.baseColor.set(this.getColorCodes(color))
  }

  getBaseColor() {
    return this.baseColor()
  }

  setPaletteType(paletteType: PaletteTypes) {
    this.paletteType = paletteType
  }

  getPaletteType() {
    return this.paletteType
  }

  getColorCodes(color: string): Color {
    return { name: ColorNamer(color).ntc[0].name, hex: chroma(color).hex(), hsl: this.getHslCodeFromColor(color), rgb: this.getRgbCodeFromColor(color) }
  }

  getColorPalette(baseColor: Color, paletteSize: number): Color[] {

    switch (this.paletteType) {
      case PaletteTypes.MONO:
        return this.getMonoPalette(baseColor, paletteSize)
      case PaletteTypes.TRIADIC:
        return this.getTriadicPalette(baseColor, paletteSize)
      case PaletteTypes.ANALOG:
        return this.getAnalogPalette(baseColor, paletteSize)
      default:
        return []
    }

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

  getTriadicPalette(color: Color, paletteSize: number) {
    // Calcular el rango de separacion de cada color
    const increment = 360 / paletteSize
    const palette: Color[] = Array(paletteSize)

    palette[0] = color
    // Calcular el hue de cada uno de los colores con la siguinete formula ((H % 360) + 360) % 360
    for (let colorIndex = 1; colorIndex < paletteSize; colorIndex++) {
      const newHue = color.hsl.hue + (increment * colorIndex)
      const fixedHue = ((newHue % 360) + 360) % 360
      palette[colorIndex] = this.getColorCodes(`hsl(${fixedHue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`)
    }

    return palette
  }

  getAnalogPalette(color: Color, paletteSize: number) {

    const spread = 100
    const increment = spread / (paletteSize - 1)

    const palette: Color[] = Array(paletteSize)
    const middleIndex = Math.floor(paletteSize / 2)
    console.log(middleIndex)
    palette[middleIndex] = color

    for (let colorIndex = middleIndex - 1; colorIndex >= 0; colorIndex--) {
      const newHue = color.hsl.hue - (increment * (middleIndex - colorIndex))
      const fixedHue = ((newHue % 360) + 360) % 360
      palette[colorIndex] = this.getColorCodes(`hsl(${fixedHue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`)
    }

    for (let colorIndex = middleIndex + 1; colorIndex < paletteSize; colorIndex++) {
      const newHue = color.hsl.hue + (increment * (colorIndex - middleIndex))
      const fixedHue = ((newHue % 360) + 360) % 360
      palette[colorIndex] = this.getColorCodes(`hsl(${fixedHue}, ${color.hsl.saturation}%, ${color.hsl.lightness}%)`)
    }
    return palette
  }

  private getHslCodeFromColor(color: string): HSL {
    const hslTuple = chroma(color).hsl()

    return {
      hue: Number.isNaN(hslTuple[0]) ? 0 : Math.round(hslTuple[0]),
      saturation: Math.round(hslTuple[1] * 100),
      lightness: Math.round(hslTuple[2] * 100)
    }
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

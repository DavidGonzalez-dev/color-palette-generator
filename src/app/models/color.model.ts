export interface  HSL {
    hue: number
    saturation: number
    lightness: number
}

export interface RGB {
    red: number
    green: number
    blue: number
}

export interface Color {
    hex: string
    hsl: HSL
    rgb: RGB
}
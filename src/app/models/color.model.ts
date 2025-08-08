export interface HSL {
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
    name: string
    hex: string
    hsl: HSL
    rgb: RGB
}

export enum PaletteTypes {
    MONO = "mono",
    ANALOG = "analog",
    TRIADIC = "triadic",
    COMPLEMENTARY = "complementary"
}
interface DinoPlayers {
    CharacterClass: string;
    DNA: string;
    Location_Isle_V3: string;
    Rotation_Isle_V3: string;
    Growth: string;
    Hunger: string;
    Thirst: string;
    Stamina: string;
    Health: string;
    BleedingRate: string;
    Oxygen: string;
    bGender: boolean;
    bIsResting: boolean;
    bBrokenLegs: boolean;
    ProgressionPoints: string;
    ProgressionTier: string;
    UnlockedCharacters: string;
    CameraRotation_Isle_V3: string;
    CameraDistance_Isle_V3: string;
    SkinPaletteSection1: number;
    SkinPaletteSection2: number;
    SkinPaletteSection3: number;
    SkinPaletteSection4: number;
    SkinPaletteSection5: number;
    SkinPaletteSection6: number;
    SkinPaletteVariation: string;
    steamId: string;
    dinoId: string;
    isActive: boolean;
    server: 'V3' | 'Thenyaw';
}

interface ChangeColor {
    color1: number;
    color2: number;
    color3: number;
    color4: number;
    color5: number;
    pattern: string;
}

interface DinoServer {
    CharacterClass: string;
    DNA: string;
    Location_Isle_V3: string;
    Rotation_Isle_V3: string;
    Growth: string;
    Hunger: string;
    Thirst: string;
    Stamina: string;
    Health: string;
    BleedingRate: string;
    Oxygen: string;
    bGender: boolean;
    bIsResting: boolean;
    bBrokenLegs: boolean;
    ProgressionPoints: string;
    ProgressionTier: string;
    UnlockedCharacters: string;
    CameraRotation_Isle_V3: string;
    CameraDistance_Isle_V3: string;
    SkinPaletteSection1: number;
    SkinPaletteSection2: number;
    SkinPaletteSection3: number;
    SkinPaletteSection4: number;
    SkinPaletteSection5: number;
    SkinPaletteSection6: number;
    SkinPaletteVariation: string;
    dinoId?: string;
}

export { DinoPlayers, ChangeColor, DinoServer };
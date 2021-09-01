import { IDinoPlayers } from '../../types';
import mongoose from '../database';

const DinoSchema = new mongoose.Schema({
    CharacterClass: { type: String, required: true },
    DNA: { type: String, required: true },
    Location_Isle_V3: { type: String, required: true },
    Rotation_Isle_V3: { type: String, required: true },
    Growth: { type: String, required: true },
    Hunger: { type: String, required: true },
    Thirst: { type: String, required: true },
    Stamina: { type: String, required: true },
    Health: { type: String, required: true },
    BleedingRate: { type: String, required: true },
    Oxygen: { type: String, required: true },
    bGender: { type: Boolean, required: true },
    bIsResting: { type: Boolean, required: true },
    bBrokenLegs: { type: Boolean, required: true },
    ProgressionPoints: { type: String, required: true },
    ProgressionTier: { type: String, required: true },
    UnlockedCharacters: { type: String, required: true },
    CameraRotation_Isle_V3: { type: String, required: true },
    CameraDistance_Isle_V3: { type: String, required: true },
    SkinPaletteSection1: { type: Number, required: true },
    SkinPaletteSection2: { type: Number, required: true },
    SkinPaletteSection3: { type: Number, required: true },
    SkinPaletteSection4: { type: Number, required: true },
    SkinPaletteSection5: { type: Number, required: true },
    SkinPaletteSection6: { type: Number, required: true },
    SkinPaletteVariation: { type: String, required: true },
    steamId: { type: String, required: true },
    dinoId: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    server: { type: String, required: true }
});

export default mongoose.model<IDinoPlayers>('Dinos', DinoSchema, 'dinos');
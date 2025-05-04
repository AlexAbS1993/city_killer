import { DistrictTitles } from './index';
import { IDistrict } from "./District.interface"

export enum MapMods {
    SIMPLE = 'SIMPLE'
}

export const MapModsDiscribes = {
    [MapMods.SIMPLE]: 'Стартовая раскладка. Режим для начинающих'
}

type modeInfoType = {
    title: MapMods,
    describe: string
}

export type districtTytlesType = typeof DistrictTitles[number]

export interface IGameMap {
    getModeInfo(): modeInfoType
    getDistrictByIndex(index: number): IDistrict
    getDistrictByTitle(title: districtTytlesType): IDistrict
    addCitizen(citizen: unknown, id: number): IGameMap | Error
    removeCitizen(citizenJob: string, id: number): IGameMap | Error
    getCitizenTempStorage(): unknown
    moveCitizen(citizenJob: string, idFrom: number, idTo: number): IGameMap | Error
}
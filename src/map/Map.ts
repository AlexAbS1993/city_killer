import { DistrictTitles } from ".";
import { District } from "./District";
import { IDistrict } from "./District.interface";
import { districtTytlesType, IGameMap, MapMods, MapModsDiscribes } from "./Map.interface";

export class GameMap implements IGameMap {
    private gameMode: MapMods
    private gameModeDiscribe: string
    private districts: IDistrict[] = []
    constructor(mode: MapMods) {
        this.gameMode = mode
        this.gameModeDiscribe = MapModsDiscribes[mode]
        this.constructMap(mode)
    }
    private constructMap(mode: MapMods) {
        this.districts = DistrictTitles.map((title: districtTytlesType, index: number) => {
            return new District(title, index)
        })
        switch (mode) {
            case MapMods.SIMPLE: {
                return
            }
            default: return
        }
    }
    getDistrictByIndex(index: number): IDistrict {
        return this.districts[index]
    }
    getDistrictByTitle(title: districtTytlesType): IDistrict {
        return this.districts.find((d: IDistrict) => {
            if (d.getTitle() === title) {
                return true
            }
            else {
                return false
            }
        }) as IDistrict
    }
    getModeInfo(): { title: MapMods; describe: string; } {
        return {
            title: this.gameMode,
            describe: this.gameModeDiscribe
        }
    }
}
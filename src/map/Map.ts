import { DistrictTitles } from ".";
import { District } from "./District";
import { IDistrict } from "./District.interface";
import { districtTytlesType, IGameMap, MapMods, MapModsDiscribes } from "./Map.interface";

const mapAvailablePaths: { [key: number]: number[] } = {
    0: [1, 4],
    1: [0, 2, 5],
    2: [1, 3, 6],
    3: [2, 7],
    4: [0, 5, 8],
    5: [4, 1, 6, 9],
    6: [5, 7, 2, 10],
    7: [3, 6, 11],
    8: [4, 12, 9],
    9: [8, 5, 10, 13],
    10: [9, 6, 11, 14],
    11: [10, 7, 15],
    12: [8, 13],
    13: [12, 9, 14],
    14: [13, 10, 15],
    15: [14, 11]
}

export class GameMap implements IGameMap {
    private gameMode: MapMods
    private gameModeDiscribe: string
    private districts: IDistrict[] = []
    private citizenTempStorage: unknown = null
    private errors = {
        noCitizenOnDistrict: 'Такого жителя нет в районе',
        pathIsNotAvailable: 'Путь недоступен'
    }
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

    addCitizen(citizen: unknown, id: number): IGameMap | Error {
        this.getDistrictByIndex(id).addCitizen(citizen)
        return this
    }
    removeCitizen(citizenJob: string, id: number): IGameMap | Error {
        let citizen = this.getCitizenFromDistrict(citizenJob, id)
        this.citizenTempStorage = citizen
        this.getDistrictByIndex(id).removeCitizen(citizenJob)
        return this
    }
    getCitizenFromDistrict(citizenJob: string, id: number) {
        let dist = this.getDistrictByIndex(id)
        let citizen = dist.getCitizens().find((cit) => {
            //@ts-ignore
            return (cit.getJob?.() || cit.job) === citizenJob
        })
        if (!citizen) {
            throw new Error(this.errors.noCitizenOnDistrict)
        }
        return citizen
    }
    getCitizenTempStorage(): unknown {
        return this.citizenTempStorage
    }
    nullifyCitizenTempStorage() {
        this.citizenTempStorage = null
        return this
    }
    moveCitizen(citizenJob: string, idFrom: number, idTo: number): IGameMap | Error {
        this.isPathAvailable(idFrom, idTo)
        this.removeCitizen(citizenJob, idFrom)
        this.addCitizen(this.getCitizenTempStorage(), idTo)
        this.nullifyCitizenTempStorage()
        return this
    }
    isPathAvailable(from: number, to: number) {
        if (!mapAvailablePaths[from].some(p => p === to)) {
            throw new Error(this.errors.pathIsNotAvailable)
        }
    }
}
import { describe, expect, test } from "@jest/globals";
import { MapMods } from "../../src/map/Map.interface";
import { GameMap } from "../../src/map/Map";
import { DistrictTitles } from "../../src/map";

describe('Карта представляет собой игровое поле, где располагаются здания, жители и разворачивается игровой процесс', () => {
    const map = new GameMap(MapMods.SIMPLE)
    test('Карта инициализируется и предоставляет описание мода', () => {
        expect(map.getModeInfo()).toBeDefined()
        expect(map.getModeInfo().title).toBe(MapMods.SIMPLE)
    })
    test('После инициализации карта содержит 16 районов. Они строго фиксированы', () => {
        const districtIndex = 2
        const disctrictTitle = DistrictTitles[districtIndex + 1]
        expect(map.getDistrictByIndex(districtIndex).getTitle()).toBe(DistrictTitles[districtIndex])
        expect(map.getDistrictByTitle(disctrictTitle).getTitle()).toBe(DistrictTitles[districtIndex + 1])
        expect(map.getDistrictByIndex(districtIndex).getOrder()).toBe(districtIndex)
    })
})
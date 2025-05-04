import { describe, expect, test } from "@jest/globals";
import { MapMods } from "../../src/map/Map.interface";
import { GameMap } from "../../src/map/Map";
import { DistrictTitles } from "../../src/map";

describe('Карта представляет собой игровое поле, где располагаются здания, жители и разворачивается игровой процесс', () => {
    const map = new GameMap(MapMods.SIMPLE)
    const mockCitizen = { job: 'Worker', getJob: () => { return mockCitizen.job } }
    const noCitizenOnDistrictError = 'Такого жителя нет в районе'
    const pathNotAvailableError = 'Путь недоступен'
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
    test('На карту в определённый район можно добавить жителя', () => {
        map.addCitizen(mockCitizen, 1)
        expect(map.getDistrictByIndex(1).countOfCitizens()).toBe(1)
    })
    test('С определенного района можно убрать жителя', () => {
        map.removeCitizen(mockCitizen.getJob(), 1)
        expect(map.getDistrictByIndex(1).countOfCitizens()).toBe(0)
    })
    test('После того, как житель убран, он помещается во временное хранилище внутри карты', () => {
        expect(map.getCitizenTempStorage()).toEqual(mockCitizen)
    })
    test('Невозможно убрать жителя, которого нет в районе. Выдается ошибка', () => {
        try {
            map.removeCitizen('Medic', 1)
        }
        catch (e: any) {
            expect(e.message).toMatch(noCitizenOnDistrictError)
        }
    })
    test('Метод проверки доступности пути работает правильно', () => {
        map.isPathAvailable(0, 1)
        try {
            map.isPathAvailable(1, 10)
        }
        catch (e: any) {
            expect(e.message).toMatch(pathNotAvailableError)
        }
    })
    test('Жителя можно перемещать с одного района в другой', () => {
        const mockCit2 = { job: 'Guard' }
        map.addCitizen(mockCit2, 0)
        map.moveCitizen(mockCit2.job, 0, 4)
        expect(map.getCitizenFromDistrict(mockCit2.job, 4)).toBeDefined()
        try {
            map.getCitizenFromDistrict(mockCit2.job, 0)
        }
        catch (e: any) {
            expect(e.message).toMatch(noCitizenOnDistrictError)
        }
    })
})
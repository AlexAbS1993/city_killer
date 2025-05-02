import { describe, test, expect, jest } from '@jest/globals'
import { District } from '../../src/map/District'
import { CONSTS } from '../../global/constantas'

describe('Сущность Disctict определяет район игрового поля, где находятся жители и могут быть расположены некоторые здания', () => {
    const DIST_TITLE = 'Metrogorodok'
    const DIST_ORDER = 0
    const test_district = new District(DIST_TITLE, DIST_ORDER)
    describe('Инициализация сущности District', () => {
        test('Сущность Disctrict после создания инициализируется и является собой', () => {
            expect(new District('Center', 0) instanceof District).toBe(true)
        })
        test('У сущности District можно получить его название и порядковый номер на карте (он всегда закреплён и является постоянным)', () => {
            expect(typeof test_district.getTitle()).toBe(CONSTS.string)
            expect(test_district.getTitle()).toBe(DIST_TITLE)
            expect(typeof test_district.getOrder()).toBe(CONSTS.number)
            expect(test_district.getOrder()).toBe(DIST_ORDER)
        })
    })
    describe('У сущности Disctrict есть внутренние конфигурационные правила, описывающие игровые ограничения', () => {
        const config = test_district.getConfig()
        const MAX_B = 1
        const MAX_C = 3
        const readOnlyErrorMessage = 'Cannot assign to read only property'
        test('У сущности District есть конфигурационный файл', () => {
            expect(config).toBeDefined()
        })
        test('Конфигурационный файл невозможно изменить вручную', () => {
            try {
                config.max_building = 5
            }
            catch (e: any) {
                expect(e.message).toMatch(readOnlyErrorMessage)
            }
            expect(test_district.getConfig().max_building).toBe(MAX_B)
        })
        test('Сущность имеет конфигурационную опцию в 1 доступное место для здания', () => {
            expect(config.max_building).toBe(MAX_B)
        })
        test('Сущность имеет конфигурационную опцию в 3 в качестве максимального количества жителей в ней', () => {
            expect(config.max_citizen).toBe(MAX_C)
        })
    })
    describe('Сущность является частью игрового поля и взаимодействует с другими игровыми элементами', () => {
        const HOSPITAL = 'hospital'
        const FIRE_STATIOn = 'fire station'
        const citizen_one = { job: 'Worker' }
        const citizen_two = { job: 'Artist' }
        const citizen_three = { job: 'Teacher' }
        const citizen_4 = { job: 'Driver' }
        const building_one = { getTitle() { return HOSPITAL } }
        const building_two = { getTitle() { return FIRE_STATIOn } }
        const copyCitizenError = 'Невозможно добавить'
        const fullDistrictError = 'Район переполнен'
        const onlyOneBuildingError = 'только одно здание'
        test('В district можно добавить жителя', () => {
            test_district.addCitizen(citizen_one)
            expect(test_district.countOfCitizens()).toBe(1)
        })
        test('В district невозможно добавить одного и того же жителя дважды', () => {
            try {
                test_district.addCitizen(citizen_one)
            }
            catch (e: any) {
                expect(e.message).toMatch(copyCitizenError)
            }
        })
        test('В District невозможно добавить более 3 жителей', () => {
            test_district.addCitizen(citizen_two)
            test_district.addCitizen(citizen_three)
            try {
                test_district.addCitizen(citizen_4)
            }
            catch (e: any) {
                expect(e.message).toMatch(fullDistrictError)
            }
        })
        test('Можно получить список жителей, находящихся в районе', () => {
            let citizens = test_district.getCitizens()
            expect(citizens.length).toBe(test_district.countOfCitizens())
            //@ts-ignore
            expect(citizens.every((c: unknown) => c.job !== undefined)).toBeTruthy()
        })
        test('В District можно добавить здание', () => {
            test_district.addBuilding(building_one)
            expect(test_district.isBuildingHere()).toBeTruthy()
            //@ts-ignore
            expect(test_district.getBuilding().getTitle()).toBe(HOSPITAL)
        })
        test('Здание можно добавить только один раз', () => {
            try {
                test_district.addBuilding(building_two)
            }
            catch (e: any) {
                expect(e.message).toMatch(onlyOneBuildingError)
            }
        })
    })
})
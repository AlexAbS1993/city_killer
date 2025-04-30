import { describe, test, expect } from '@jest/globals'
import { District } from '../../src/map/District'
import { CONSTS } from '../../global/constantas'

describe('Сущность Disctict определяет район игрового поля, где находятся жители и могут быть расположены некоторые здания', () => {
    const DIST_TITLE = 'Metrogorodok'
    const DIST_ORDER = 0
    const test_district = new District(DIST_TITLE, DIST_ORDER)
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
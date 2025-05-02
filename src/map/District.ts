import { DistrictConfigType, IDistrict } from "./District.interface"

export class District implements IDistrict {
    private title: string
    private order: number
    private config: DistrictConfigType = {
        max_building: 1,
        max_citizen: 3
    }
    private citizens: unknown[] = []
    private errors = {
        full: 'Район переполнен',
        same: 'Невозможно добавить в район того же жителя, что уже стоит там',
        building_here: 'В районе может быть только одно здание'
    }
    private building: unknown | null = null
    constructor(title: string, order: number) {
        this.title = title
        this.order = order
        Object.freeze(this.config)
    }
    addBuilding(building: unknown): Error | this {
        this.checkBuildings()
        this.building = building
        return this
    }
    isBuildingHere(): boolean {
        return Boolean(this.building)
    }
    getBuilding(): unknown | null {
        return this.building
    }
    addCitizen(citizen: unknown): this | Error {
        this.checkPlace()
        this.checkSame(citizen)
        this.citizens.push(citizen)
        return this
    }
    getCitizens(): unknown[] {
        return this.citizens
    }
    checkPlace() {
        if (this.citizens.length === this.config.max_citizen) {
            throw new Error(this.errors.full)
        }
    }
    checkSame(citizen: unknown) {
        //@ts-ignore
        if (this.citizens.some(inner => inner.job === citizen.job)) {
            throw new Error(this.errors.same)
        }
    }
    checkBuildings() {
        if (this.isBuildingHere()) {
            throw new Error(this.errors.building_here)
        }
    }
    countOfCitizens(): number {
        return this.citizens.length
    }
    getConfig(): DistrictConfigType {
        return this.config
    }
    getTitle() {
        return this.title
    }
    getOrder() {
        return this.order
    }
}
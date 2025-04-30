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
        same: 'Невозможно добавить в район того же жителя, что уже стоит там'
    }
    constructor(title: string, order: number) {
        this.title = title
        this.order = order
        Object.freeze(this.config)
    }
    addCitizen(citizen: unknown): this {
        this.checkPlace()
        this.checkSame(citizen)
        this.citizens.push(citizen)
        return this
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
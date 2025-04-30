export type DistrictConfigType = {
    max_building: number,
    max_citizen: number
}

export interface IDistrict {
    getTitle(): string
    getOrder(): number
    getConfig(): DistrictConfigType
    addCitizen(citizen: unknown): this
    countOfCitizens(): number
    checkPlace(): Error | void
}
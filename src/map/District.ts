import { DistrictConfigType, IDistrict } from "./District.interface"

export class District implements IDistrict {
    private title: string
    private order: number
    private config: DistrictConfigType = {
        max_building: 1,
        max_citizen: 3
    }
    constructor(title: string, order: number) {
        this.title = title
        this.order = order
        Object.freeze(this.config)
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
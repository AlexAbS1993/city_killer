import { IDistrict } from "./District.interface"

export class District implements IDistrict {
    private title: string
    private order: number
    constructor(title: string, order: number) {
        this.title = title
        this.order = order
    }
    getTitle() {
        return this.title
    }
    getOrder() {
        return this.order
    }
}
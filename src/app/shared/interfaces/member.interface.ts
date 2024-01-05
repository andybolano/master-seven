export interface Member {
    id?: number,
    name: string,
    lastName: string,
    registerTypes: RegisterType[]
}

export interface RegisterType {
    name: string,
    id: number,
    registerId?: number,
    value: boolean
}
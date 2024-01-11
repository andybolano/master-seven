export interface Member {
    id: number,
    name: string,
    lastName: string,
    phone?: string,
    birthDay?: string,
    birthMonth?: string,
    registerTypes: RegisterType[],
    status: boolean,
}

export interface RegisterType {
    name: string,
    id: number,
    registerId?: number,
    value: boolean
}
import { RegisterType } from "./member.interface";

export interface RegisterToSave {
    memberId: number;
    date: string;
    registerTypes: RegisterType[];
}
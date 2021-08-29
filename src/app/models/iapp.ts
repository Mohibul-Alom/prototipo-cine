import { IapiMovie, IapiSeat } from "./iapi";

export interface Iapp {
}


export interface Iheader{
    name: string;
    navigate:string;
}

export interface IappAuditorium {
    _id: string;
    name: string;
    capacity: number;
    sessions: IappSession[];
    movie:IapiMovie;
    seats:IapiSeat[];
}

export interface IappSession {
    id: string;
    day: string;
    month: string;
    hour: string;
    minute: string;
}
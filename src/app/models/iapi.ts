export interface Iapi {
}


export interface IapiMovie {
    _id: string;
    title: string;
    director:string;
    description:string;
    duration:number;
    image: string;
    genere: IapiGenere[];

}

export interface IapiGenere {
    category: string;
}

export interface IapiAuditorium {

    _id: string;
    name: string;
    capacity: number;
    sessions: Date[];
    movie:IapiMovie;
    seats:IapiSeat[];
}

export interface IapiSeat {
    row: string;
    number: number;
    price: number;
    booked: boolean;
}
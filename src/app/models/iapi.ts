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
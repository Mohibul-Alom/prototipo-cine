export interface Iapi {
}


export interface Imovie {
    _id: string;
    title: string;
    director:string;
    description:string;
    duration:number;
    image: string;
    genere: Igenere[];

}

export interface Igenere {
    category: string;
}
export interface JwtResponseI {
    dataUser:{
        id:number,
        name:string,
        email:string,
        accessToken:string,
        expiredIn:string
    }

}

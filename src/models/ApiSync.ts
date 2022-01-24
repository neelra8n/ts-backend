import axios, {AxiosPromise} from "axios";

interface HasId {
    /* generate tsconfig file - this will enable typechecking and now our id can either be number or undefined */
    id?: number;
}

export class ApiSync <T extends HasId> {
    
    constructor(public rootUrl:string){}

    fetch = (id:number): AxiosPromise =>  {
        return axios.get( `${this.rootUrl}/${id}`);
    }

    save = (data: T): AxiosPromise => {
        const {id} = data;
        if(id){
            return axios.put(`${this.rootUrl}/${id}`, data);
        }else {
            return axios.post(this.rootUrl, data);
        }
    }

}


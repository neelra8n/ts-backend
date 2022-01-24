import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";



// multiplr generic arguments can be paased on for type... (example case- when T does not provide reference to K ,, need to independently provide K)

export class Collection <T,K> {
    models: T[] = [];
    events: Eventing = new Eventing();


    // keep an eye on constructor mainly deserialize object/data
    // here it is taking json data of type K and returning object of type T
    constructor(
        public rootUrl: string,
        public deserialize: (json : K) => T 
        ){}
    get on () {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }


    fetch(): void {
        axios.get(this.rootUrl)
        .then((response : AxiosResponse) => {
            response.data.forEach((value: K) => {
                this.models.push(this.deserialize(value));
            })
        }) 

        this.trigger('change');
    }
}
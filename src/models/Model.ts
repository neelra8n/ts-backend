import { AxiosPromise, AxiosResponse } from "axios";

interface HasId {
    id?: number;
}

interface ModelAtrributes<T> {
    set(updatae: T):void;
    getAll():T;
    get<K extends keyof T> (key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(events: string, callback: ()=>void): void;
    trigger(eventName: string): void;
}



export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAtrributes<T>,
        private events: Events,
        private sync: Sync<T> 
    ){}

    // get on() {
    //     return this.events.on; 
    // }

    on = this.events.on;
    
    // get trigger() {
    //     return this.events.trigger;
    // }

    get = this.attributes.get;

    // get get(){
    //     return this.attributes.get;
    // }

    trigger = this.events.trigger;

    // get trigger() {
    //     return this.events.trigger;
    // }

    set(update : T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): void {
        const id = this.attributes.get('id');
        if(typeof id != 'number'){
            throw new Error('Cannot fetch without id');
        }
        this.sync.fetch(id)
        .then((response: AxiosResponse): void =>{            
            this.set(response.data);
        }).catch((e)=>{
            console.log(e);
        })
    }

    save(): void{
        this.sync.save(this.attributes.getAll())
        .then((response: AxiosResponse): void=>{
            this.trigger('save')
        })
        .catch(e=>console.log(`Error while saving ${e}`))
    }
}


export class Attributes <T> {
    
    constructor(private data: T){}

    get = <K extends keyof T> (key: K): T[K] => {
        console.log(this.data[key]);
        return this.data[key];
    }

    set = (update: T): void => {
        Object.assign(this.data, update);        
    }

    getAll = (): T => {
        return this.data;
    }
}

 
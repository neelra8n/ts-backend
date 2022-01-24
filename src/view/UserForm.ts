
export class UserForm {
    constructor(public parent: Element){}

    eventsMap(): {[key: string]: ()=> void } {
        return {
            'click:button' : this.onButtonClick,
            ' mouseenter:h1' : this.onHeaderHover
        };
    }

    onButtonClick(): void {
        console.log("jhgjh");
        
    }

    onHeaderHover():void {
        console.log("Hover header");
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventMap = this.eventsMap();

        for(let eventKey in eventMap){
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(ele => {
                ele.addEventListener(eventName, eventMap[eventKey]);
            })
            
        }
    }

    template(): string {
        return `
            <div>
                <h1>UserForm</h1>
                <input />
                <button>click me</button>
            </div>
        `;
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content)
        this.parent.append(templateElement.content);
    }
}  
import {BaseElement} from './base-element.js';


export class DateTimePicker extends BaseElement {
    constructor (title,dateID) {
        super();
        this.title = title;
        this.ID = dateID;
        this.styleString = "";
    }

    getElementString(){
        return `
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell   ">
                <input class="mdl-textfield__input" type="date" id="${this.ID}">
                <label class="mdl-textfield__label" for="${this.ID}">${this.title}</label>
        </div>`
    }

    setStyleString(style){
        this.styleString = style;
    }
}
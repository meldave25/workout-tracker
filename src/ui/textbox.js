import {BaseElement} from './base-element.js';

export class TextBox extends BaseElement {

    constructor(txtID, isNum) {
        super();
        this.txtID = txtID;
        this.isNum = isNum;
        this.stylestring = "";
    }

    getElementString(){
        if(this.isNum) {
            return `
            <form action="#">
        <div class="mdl-textfield mdl-js-textfield">
             <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="${this.txtID}">
             <label class="mdl-textfield__label" for="${this.txtID}">Number...</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
        </form>`
        }
        else{
            return `
            <form action="#">
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="${this.txtID}">
        <label class="mdl-textfield__label" for="${this.txtID}">Text...</label>
      </div>
    </form>`
        }

        return;
        
    }

    setStyleString(style){
        this.styleString = style;
    }
}
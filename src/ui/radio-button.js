import {BaseElement} from './base-element.js';

export class RadioButton extends BaseElement {

    constructor(radioID, dispName, value, checked) {
        super();
        this.radioID = radioID;
        this.dispName = dispName;
        this.value = value;
        this.checked = checked;
        this.stylestring = "";
    }

    getElementString(){

        if(this.checked) {
            return `       
            <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="${this.radioID}" style=${this.styleString}>
      <input type="radio" id="${this.radioID}" class="mdl-radio__button" name="options" value="${this.value}" checked>
      <span class="mdl-radio__label">${this.dispName}</span>
    </label> 
            `
        }

        else {
            return `
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="${this.radioID}" style=${this.styleString}>
  <input type="radio" id="${this.radioID}" class="mdl-radio__button" name="options" value="${this.value}">
  <span class="mdl-radio__label">${this.dispName}</span>
</label>
        `
        }

        return;
        
    }

    setStyleString(style){
        this.styleString = style;
    }
}
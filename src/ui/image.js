import {BaseElement} from './base-element.js'

export class Image extends BaseElement {
    constructor (filename) {
        super();
        this.filename = filename;
    }

    getElementByString() {
        return `
            <img src="${this.filename}" style="width:100%;" />
        `
    }
}
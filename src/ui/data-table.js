import {BaseElement} from './base-element.js';
//import {application} from '../app.js';

export class DataTable extends BaseElement {

    constructor(headers,data) {
        super();
        this.headers = headers;
        this.data = data;
        this.styleString = "";
        
    }

    getElementString() {
        let  thTags = '';
        for (let h of this.headers)
        {
            //console.log("header: " + h);
            thTags += `<th class="mdl-data-table__cell--non-numeric">${h}</th>\n`;
        }
        
        let trTags = '';
        
        
        
        this.data.forEach((val)=>{
           
                
                trTags += '<tr>';
                for(let property of this.headers){
                    let field = val[property];
                    trTags += `<td class="mdl-data-table__cell--non-numeric">
                                ${field}
                            </td>
                            
                            `;
                }
                
                trTags += '</tr>';
            
        });
        
        return `
        <br/>
        <br/>
        <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" style=${this.styleString}>
  <thead>
    ${thTags}
  </thead>
  <tbody>
    ${trTags}
  </tbody>
</table>
        `
    }

    setStyleString(style){
      this.styleString = style;
    }

    
}
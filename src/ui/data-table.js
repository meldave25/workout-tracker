import {BaseElement} from './base-element.js';
import {application} from '../app.js';

export class DataTable extends BaseElement {

    constructor(headers,data) {
        super();
        this.headers = headers;
        this.data = data;
        
    }

    getElementString() {
        let  thTags = '';
        for (let h of this.headers)
        {
            //console.log("header: " + h);
            thTags += `<th class="mdl-data-table__cell--non-numeric">${h}</th>\n`;
        }
        
        let trTags = '';
        
        //console.log(this.data[0]);
        const arr = this.data;
        arr.forEach((val)=>{
            for(let [key,value] of Object.entries(val)) {
                console.log(`Value of ${key} is ${value}`);
            }
        });
        //application.dataService.workouts.forEach(function(row){console.log(row.emailAddress); });
        for (let row of this.data){
            console.log(row);
            trTags += '<tr>';
            let tdTags = '';
            for(let property of this.headers) {
                let field = row[property];;
                //console.log("property: " + property + ",field: "+ field);
                trTags += `<td class="mdl-data-table__cell--non-numeric">
                                ${field}
                            </td>
                            
                            `;
            }
        
            trTags += '</tr>';
            }
        return `
        <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
  <thead>
    ${thTags}
  </thead>
  <tbody>
    ${trTags}
  </tbody>
</table>
        `
    }

    
}
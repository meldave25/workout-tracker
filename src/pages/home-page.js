import {Page} from '../framework/page.js';
import {Image} from '../ui/image.js';
import {Button} from '../ui/button.js';
import {application} from '../app.js';
import { TextBox } from '../ui/textbox.js';
import { RadioButton } from '../ui/radio-button.js';
import { DataTable } from '../ui/data-table.js';
import { Workout } from '../classes/workout.js';
import {workouts} from '../workout-data.js';

export class HomePage extends Page {

    constructor() {
        super('Home');

        
    }

    createDataTable(headers, homepageObj) {

        var dynamodb = new AWS.DynamoDB();
        var docClient = new AWS.DynamoDB.DocumentClient();
        var tableData = [];

        try {
            var params = {
                TableName: "Workouts"
            };

        docClient.scan(params,onScan);

        function onScan(err, data) {
            if (err) {
                document.getElementById('textarea').innerHTML += "Unable to scan. Error: " + "\n" + JSON.stringify(err, undefined, 2);
            } else {
                 

                 let dt = new DataTable(headers,data.Items);
                 dt.appendToElement(homepageObj);
            }
     }
     } catch (error) {
            console.error(error);
        }
    }

    createElement() {

        //creating Page element
        super.createElement();

        //appending Image
        //let i = new Image('images/drone.jpeg');
        //i.appendToElement(this.element);

        let styleString = 'width:300px; height: 80px;';

        let radSquats = new RadioButton('rbSquats','Squats','1', true);
        radSquats.setStyleString(styleString);
        radSquats.appendToElement(this.element);

        let radSteps = new RadioButton('rbSteps','Steps','2');
        radSteps.setStyleString(styleString);
        radSteps.appendToElement(this.element);

        let radPullUps = new RadioButton('rbPullUps','Pull Ups','3');
        radPullUps.setStyleString(styleString);
        radPullUps.appendToElement(this.element);
        
        let txt = new TextBox('txtinput1',true);
        txt.setStyleString(styleString);
        txt.appendToElement(this.element);
        

        let b = new Button('Submit');
        b.setStyleString(styleString);
        b.appendToElement(this.element);
        b.element.click(function() {
            //console.log(document.getElementById(txt.txtID).value);
            let dateObject = new Date();
            let today = (dateObject.getMonth()+1).toString() + "-" + dateObject.getUTCDate().toString() + "-"+ dateObject.getUTCFullYear().toString();
            let w = new Workout("Melvin David",today);
            if (radSquats.element.hasClass("is-checked")){
                console.log("Inside squats");
                w.addSquats(document.getElementById(txt.txtID).value);
            }
            else if(radSteps.element.hasClass("is-checked")){
                console.log("Inside steps");
                w.addSteps(document.getElementById(txt.txtID).value);
            }
            else if(radPullUps.element.hasClass("is-checked")){
                console.log("Inside pullups");
                w.addPullUps(document.getElementById(txt.txtID).value);
            }
           
            w.points = w.calculatePoints();
        
            //workouts.push({"emailAddress":"Melvin David","WorkoutDate":today,"squats":w.squats,"steps":w.steps,"pullUps":w.pullUps});
            application.dataService.addWorkout(w);
            
            
        });

        let txtRemoveUser = new TextBox('txtRemoveUser');
        txtRemoveUser.setStyleString(styleString);
        txtRemoveUser.appendToElement(this.element);
        

        let btnRemoveUser = new Button('Remove User');
        btnRemoveUser.setStyleString(styleString);
        btnRemoveUser.appendToElement(this.element);
        btnRemoveUser.element.click(function(){
            var docClient = new AWS.DynamoDB.DocumentClient();

            var table = "Workouts";
            var emailAddress = document.getElementById(txtRemoveUser.txtID).value;
            
        
            var params = {
                TableName:table,
                Key:{
                    "emailAddress":emailAddress,
                    "WorkoutDate": "12-5-2020"
                   
                }
                //ConditionExpression:"points <= :val",
                //ExpressionAttributeValues: {
                //    ":val": 100
                //}
            };
        
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.log(err);
                    //document.getElementById('textarea').innerHTML = "The conditional delete failed: " + "\n" + JSON.stringify(err, undefined, 2);
                } else {
                    console.log(JSON.stringify(data));
                    //document.getElementById('textarea').innerHTML = "The conditional delete succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
                }
            });
        });
         
        let headers ="emailAddress WorkoutDate squats steps pullUps points".split(' ');
        this.createDataTable(headers, this.element);


    }

    getElementString() {
        return '<div style="text-align: center;"></div>';
    }

    loadDataTable(workoutArray){
        let dt = new DataTable(headers, application.dataService.workouts);
        dt.appendToElement(this.element);
    }

    
    

}
import {Page} from '../framework/page.js';
import {Image} from '../ui/image.js';
import {Button} from '../ui/button.js';
import {application} from '../app.js';
import { TextBox } from '../ui/textbox.js';
import { RadioButton } from '../ui/radio-button.js';
import { DataTable } from '../ui/data-table.js';
import { Workout } from '../classes/workout.js';
//import {workouts} from '../workout-data.js';
import {DateTimePicker} from '../ui/date-time-picker.js';

export class HomePage extends Page {

    constructor() {
        super('Home'); 
    }

    createDataTable(headers, homepageObj, style) {

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
                //document.getElementById('textarea').innerHTML += "Unable to scan. Error: " + "\n" + JSON.stringify(err, undefined, 2);
                console.log(err);
            } else {
                 

                 let dt = new DataTable(headers,data.Items);
                 dt.setStyleString(style);
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

        let styleString = '';
        let btnStyleString = 'width:300px; width:80px;margin:10px';
        let dtStyleString = 'margin:auto; width:50%';

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
        //txt.setStyleString(btnStyleString);
        txt.appendToElement(this.element);
        

        let b = new Button('Submit');
        b.setStyleString(btnStyleString);
        b.appendToElement(this.element);
        b.element.click(function() {
            //console.log(document.getElementById(txt.txtID).value);
            let dateObject = new Date();
            let today = (dateObject.getMonth()+1).toString() + "-" + dateObject.getUTCDate().toString() + "-"+ dateObject.getUTCFullYear().toString();
            let newSquats = 0;
            let newSteps = 0;
            let newPullUps = 0;
            var currSquats = 0;
            var currSteps = 0;
            var currPullUps = 0;
            
            var docClient = new AWS.DynamoDB.DocumentClient();
            
            let w = new Workout("Melvin David",today);
            //w.squats = currSquats;

            var params = {
            TableName: 'Workouts',
            Key: {'emailAddress': w.emailAddress}
            };

            docClient.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                //console.log(data.Item.squats);
                if(data.Item != undefined){
                    currSquats = parseInt(data.Item.squats);
                    currSteps = parseInt(data.Item.steps);
                    currPullUps = parseInt(data.Item.pullUps);
                    
                    if (radSquats.element.hasClass("is-checked")){
                        console.log("Inside squats");
                        newSquats = parseInt(document.getElementById(txt.txtID).value);
                        currSquats += newSquats;
                        console.log(currSquats);
                        //w.getSquatForUser(w.emailAddress);
                        
                        w.updateWorkout(data.Item.emailAddress, "squats",currSquats);
                    }
                    else if(radSteps.element.hasClass("is-checked")){
                        console.log("Inside steps");
                        newSteps = parseInt(document.getElementById(txt.txtID).value);
                        currSteps += newSteps;
                        
                        w.updateWorkout(data.Item.emailAddress, "steps",currSteps);
                    }
                    else if(radPullUps.element.hasClass("is-checked")){
                        console.log("Inside pullups");
                        newPullUps = parseInt(document.getElementById(txt.txtID).value);
                        currPullUps += newPullUps;
                        
                        w.updateWorkout(data.Item.emailAddress, "pullUps",currPullUps);
                    }
                    w.addSquats(currSquats);
                    w.addSteps(currSteps);
                    w.addPullUps(currPullUps);
                    w.calculatePoints();
                    w.updateWorkout(data.Item.emailAddress, "points",w.points); 
                    
                    application.dataService.addWorkout(w);
                }
                else {
                    //application.dataService.addWorkout(w);
                }

            }
            });
            
            
            
           
            
        
            //workouts.push({"emailAddress":"Melvin David","WorkoutDate":today,"squats":w.squats,"steps":w.steps,"pullUps":w.pullUps});
            
            
            
        });
        let removeUserStyleString = 'width:100px; height: 80px;'

        let txtRemoveUser = new TextBox('txtRemoveUser');
        //txtRemoveUser.setStyleString(btnStyleString);
        //txtRemoveUser.appendToElement(this.element);

        // let dtRemoveUser = new DateTimePicker("Workout Date","dtRemoveUser");
        // dtRemoveUser.setStyleString(styleString);
        // dtRemoveUser.appendToElement(this.element);

        

        let btnRemoveUser = new Button('Remove User');
        //btnRemoveUser.setStyleString(btnStyleString);
        //btnRemoveUser.appendToElement(this.element);
        // btnRemoveUser.element.click(function(){
        //     var docClient = new AWS.DynamoDB.DocumentClient();

        //     var table = "Workouts";
        //     var emailAddress = document.getElementById(txtRemoveUser.txtID).value;
            
        
        //     var params = {
        //         TableName:table,
        //         Key:{
        //             "emailAddress":emailAddress,
                    
                   
        //         }
        //         //ConditionExpression:"points <= :val",
        //         //ExpressionAttributeValues: {
        //         //    ":val": 100
        //         //}
        //     };
        
        //     docClient.delete(params, function(err, data) {
        //         if (err) {
        //             console.log(err);
        //             //document.getElementById('textarea').innerHTML = "The conditional delete failed: " + "\n" + JSON.stringify(err, undefined, 2);
        //         } else {
        //             console.log(JSON.stringify(data));
                    
        //         }
        //     });
        // });
         
        let headers ="emailAddress WorkoutDate squats steps pullUps points".split(' ');
        this.createDataTable(headers, this.element, dtStyleString);


    }

    

    getElementString() {
        return '<div style="text-align: center;"></div>';
    }

    loadDataTable(workoutArray){
        let dt = new DataTable(headers, application.dataService.workouts);
        dt.setStyleString(dtStyleString);
        dt.appendToElement(this.element);
    }

    
    

}
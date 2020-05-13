import {DataError} from './data-error.js';
import { Workout } from '../classes/workout.js';
import {application} from '../app.js';
import {homepage} from '../pages/home-page.js';

export class WorkoutDataService {

    constructor() {
            this.workouts = [];
            this.errors = [];

            
    }

    loadData(workouts) {
        for(let data of workouts) {
            //if(this.validateEventData(data)) {
                let workout = this.loadWorkout(data);
                this.workouts.push(workout);
            //}
            
        }
    }

    loadWorkout(workout) {
        try{
            console.log("Inside loadWorkout ... ")
            let e = new Workout(workout.emailAddress,workout.WorkoutDate);
            //let e = new Workout(workout.name,workout.workoutDate);
            e.squats = workout.squats;
            e.steps = workout.steps;
            e.pullUps = workout.pullUps;
            e.points = e.calculatePoints();
            console.log("points - "+ e.points)
            return e;
        }
        catch(error){
            this.errors.push(new DataError('error loading workout', workout));
        }

        return null;
    }

    addWorkout(workout) {
        console.log("Inside add workout");
        var dynamodb = new AWS.DynamoDB();
        var docClient = new AWS.DynamoDB.DocumentClient();

            var params = {
                    TableName :"Workouts",
                     Item:{
                    "emailAddress": workout.emailAddress,
                    "WorkoutDate": workout.WorkoutDate,
                    "squats": workout.squats,
                    "steps": workout.steps,
                    "pullUps": workout.pullUps,
                    "points" : workout.points
                    }
                };
            docClient.put(params, function(err, data) {
           if (err) {
                   document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
                } else {
                   document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
               }
            });
    

        
    }

    loadDynamoDBData(){
        console.log("Inside load DynamoDB Data...");
        var dynamodb = new AWS.DynamoDB();
        var docClient = new AWS.DynamoDB.DocumentClient();

       
        var params = {
            TableName : "Workouts"
            //KeyConditionExpression: "#yr = :yyyy",
            //ExpressionAttributeNames:{
            //    "#yr": "year"
            //},
            //ExpressionAttributeValues: {
           //     ":yyyy":1985
            //}
        };

        docClient.scan(params,onScan);
    
        function onScan(err, data) {
            if (err) {
                document.getElementById('textarea').innerHTML += "Unable to scan. Error: " + "\n" + JSON.stringify(err, undefined, 2);
            } else {
                
                
                data.Items.forEach(function(w) {
                    //console.log(JSON.stringify(w));
                    document.getElementById('textarea').innerHTML += "\n" + w.emailAddress + ": " + w.WorkoutDate;
                    
                    //let workout = application.dataService.loadWorkout(w);
                    application.dataService.workouts.push(w);
                    //console.log(application.dataService.workouts);
                    
                    
                });

                
                
                // application.dataService.workouts.forEach((val)=>{
                //     for(let [key,value] of Object.entries(val)) {
                //         console.log(`Value of ${key} is ${value}`);
                //     }
                // });
            }
                    
                
             
            }

            return new Promise(function(resolve,reject){
                resolve(application.dataService.workouts);
            });
        }
    

    validateEventData(workout){
        let requiredProps = 'emailAddress WorkoutDate squats steps pullUps'.split(' ');
        let hasErrors = false;

        for(let field of requiredProps) {
            if(!workout[field]){
                this.errors.push(new DataError(`invalid field: ${field}`,workout))
                hasErrors = true;
            }
        }

        return !hasErrors;
    }

    

    

}
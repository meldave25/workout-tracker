export class Workout {

    constructor(emailAddress, WorkoutDate) {
        this.emailAddress = emailAddress;
        this.WorkoutDate = WorkoutDate;
        this.squats = 0;
        this.steps= 0;
        this.pullUps = 0;
        this.points = 0;

    }

    addSquats(numOfSquats){

        this.squats = numOfSquats;
    }
    
    addSteps(numOfSteps){

        this.steps = numOfSteps;
    }

    addPullUps(numOfPullUps){

        this.pullUps = numOfPullUps;
    }

    calculatePoints(){

        this.points = ((parseInt(this.squats)*2) + (parseInt(this.steps)*0.01)+ (parseInt(this.pullUps)*10));
    }

    getSquatForUser(squats){
        
        return parseInt(user.squats);
    }

    updateWorkout(email,rbOption, value){
        console.log("Inside updateWorkout...");
        var dynamodb = new AWS.DynamoDB();
        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: 'Workouts',
            Key: {
              'emailAddress' : email
            },
            UpdateExpression: `set ${rbOption} = :t`,
            ExpressionAttributeValues: {
              ':t' : value
              
            }
          };

          docClient.update(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
            }
          });

    }


}
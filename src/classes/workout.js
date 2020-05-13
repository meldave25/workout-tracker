export class Workout {

    constructor(emailAddress, WorkoutDate) {
        this.emailAddress = emailAddress;
        this.WorkoutDate = WorkoutDate;
        this.squats = "0";
        this.steps= "0";
        this.pullUps = "0";
        this.points = "0";

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

        return ((parseInt(this.squats)*2) + (parseInt(this.steps)*0.01)+ (parseInt(this.pullUps)*10)).toString();
    }

}
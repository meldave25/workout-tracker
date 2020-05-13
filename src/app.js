import $ from 'jquery';
import {workouts} from './workout-data.js';
import {WorkoutDataService} from './services/workout-data-service.js';
import {ApplicationBase} from './framework/application-base.js';
import {HomePage} from './pages/home-page.js';

export class App extends ApplicationBase {

    constructor() {
        super('Workout Tracker');
        this.dataService = new WorkoutDataService();
        //this.dataService.loadData(workouts);
        //this.dataService.loadDynamoDBData();

        let homepage = new HomePage();
        this.addRoute('Home',homepage,true);
        //this.addRoute('Cars', new CarsPage());
        //this.addRoute('Drones',new DronesPage());
        //this.addRoute('Map', null);
    }
}


export let application = new App();
application.show($('body'));











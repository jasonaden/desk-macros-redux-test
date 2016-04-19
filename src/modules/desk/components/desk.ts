import {RxPoller} from '../services/RxPoller';
import {Case} from '../resources/case';

export class Desk {
  constructor ($scope, $http, $ngRedux, RxPoller, Case:Case) {   
          
    let poller: RxPoller = new RxPoller('cases', {interval:2000});
    
    poller.setAction(() => $http.get('http://localhost:8888/cases'));
    
    poller.subscribe((value) => {
        console.log('poller$ subscribe:', value);
        Case.find(value.data);
    });
          
    // poller.start();
      
    setTimeout(()=> {
        console.log('setting period to every 1 second');
        poller.setConfig({interval:1000});
    }, 20000)
                   
    // setTimeout(()=> {
    //     console.log('stopping poller');
    //     poller.stop();
    // }, 30000)
  };
}

export const DeskComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: Desk
};

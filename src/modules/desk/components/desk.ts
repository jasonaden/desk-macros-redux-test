import {setCases, applyMacro} from '../../desk-agent-case/states';
import {RxPoller} from '../services/RxPoller';

export class Desk {
  constructor ($scope, $http, $ngRedux, RxPoller: RxPoller) {   
          
    let poller = new RxPoller('cases', 2000);
    
    poller.setAction(() => $http.get('http://localhost:8888/cases'));
    
    poller.subscribe((value) => {
        console.log('poller$ subscribe:', value);
        $ngRedux.dispatch(setCases(value.data))
    });
          
    poller.start();
      
    setTimeout(()=> {
        console.log('setting period to every 1 second');
        poller.setPeriod(1000);
    }, 20000)
                   
    setTimeout(()=> {
        console.log('stopping poller');
        poller.stop();
    }, 30000)
  };
}

export const DeskComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: Desk
};
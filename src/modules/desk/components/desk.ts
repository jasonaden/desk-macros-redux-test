import {setCases, applyMacro} from '../../desk-agent-case/states';
import {RxPoller} from '../services/DsPoller';

export class Desk {
  constructor ($scope, $http, DsPoller, $ngRedux) {
      
    
      
    let poller = new RxPoller('cases', 2000);
    
    poller.setAction(() => $http.get('http://localhost:8888/cases'));
    
    poller.subscribe((value) => {
        console.log('poller$ subscribe:', value);
        $ngRedux.dispatch(setCases(value.data))
    });
          
    poller.start();
    
    // let poller2 = DsPoller.getPoller('cases');
             
    // poller2.subscribe((value) => {
    //     console.log('poller2$ subscribe:', value);
    //     $ngRedux.dispatch(setCases(value.data))
    // });
    
    setTimeout(()=> {
        console.log('setting period to every 1 second');
        poller.setPeriod(1000);
    }, 10000)
                   
    setTimeout(()=> {
        console.log('stopping poller');
        poller.stop();
    }, 20000)
  };
}

export const DeskComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: Desk
};
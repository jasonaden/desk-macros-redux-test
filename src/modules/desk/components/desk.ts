import {RxPoller} from '../services/DsPoller';

import {setCases, applyMacro} from '../../desk-agent-case/states';

export class Desk {
  constructor ($scope, $http, DsPoller, $ngRedux) {
      
    // let poller = new DsPoller('cases', 
    //     () => $http.get('http://localhost:8888/cases'),
    //     1000
    // )
                   
    // $scope.unsubscribe = poller.getPoller().subscribe(function (value) {
    //     console.log('poller$ subscribe:', value);
    //     $ngRedux.dispatch(setCases(value.data))
    // });    
         
    // setTimeout(()=> {
    //     console.log('adjust poller rate');
    //     poller.setInterval(5000);
    // }, 5000)

    // setTimeout(()=> {
    //     console.log('stopping poller');
    //     $scope.unsubscribe.dispose();
    //     poller.destroy();
    // }, 30000)
    
    
    let poller2 = new RxPoller('cases2', 2000);
    poller2.setAction(() => $http.get('http://localhost:8888/cases'));
    poller2.subscribe((value) => {
        console.log('poller$ subscribe:', value);
        $ngRedux.dispatch(setCases(value.data))
    })
    poller2.start()
    
    // poller2.poller2$.subscribe(c => console.log(c));
  };
}

export const DeskComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: Desk
};
import {DsPoller} from '../services/DsPoller'

export class Desk {
  constructor ($scope, $http) {
    var poller = new DsPoller('cases',function () {return $http.get('http://localhost:3333/cases')},5000);
  
    $scope.unsubscribe = poller.poller$.subscribe(function (items) {
        // console.log('fetch #', ++fetch, items);
        $scope.$apply(function(){
            $scope.items = items.data;        
        });
    }, function (err) {
        debugger
    });
    
    setTimeout(()=> {
        console.log('stopping poller');
        $scope.unsubscribe.dispose();
    },15000)
  };
}

export const DeskComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: Desk
};
export class Desk {
  constructor ($scope, $http, DsPoller) {
      
    var poller$ = DsPoller.addPoller('cases', 
        () => $http.get('http://localhost:8888/cases'),
        1000
    )
    
    $scope.unsubscribe = poller$.subscribe(function (value) {
        console.log('subscribe:', value);
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
// DsPoller should:
// 1. Accept the action to be taken & the interval
// 2. Return something that can paused and restarted

// TODO:
// 1.5 Allow pollers to have a name
// 2.5 Make sure we can destroy a poller
// 3. Ability to do DsPoller.get('Name') to return the existing poller
// 4. Retry logic (retry(3))
// 5. Exponential Backoff
// 6. Prevent pollers from stacking up due to delays in getting a response

export class DsPoller { 
    pollers: any;
    
    period: any;
      
    static $inject = ['rx'];
    
    constructor (private rx) {
        this.pollers = {};      
    }
    
    addPoller(name: string, action: any, period: number = 5000) {       
        let period$ = new this.rx.Subject();        
        
        let interval$ = period$.startWith(period)
            .flatMapLatest((t) => this.rx.Observable.timer(0, t));
            
        let poller$ = interval$
            .timeInterval()
            .do((value) => {
                console.log(value.interval);
            })
            .flatMapLatest(() => {
                return this.rx.Observable.defer(() => action())
            })     
            
        this.pollers[name] = poller$;
        return this.pollers[name]; 
    }
}

// export const DsPoller = 
//   function (name: string, action, period: number) {
    
//     period = period || 5000;
    
//     this.period$ = new Subject();
    
//     this.interval$ = this.period$.startWith(period)
//     .flatMapLatest(function (t) {return Observable.timer(0, t)});
    
//     this.poller$ = this.interval$
//         .timeInterval()
//         .do(function (x) {
//             console.log('interval', x.interval);
//         })
//         .flatMapLatest(function () {
//             return Observable.defer(() => action())
//         })
//         .retryWhen(function (errors) {
//             return errors
//                 .zip(Rx.Observable.range(1, 5), function (_, i) { return i })
//                 .flatMap(function (i) {
//                     console.log('delay retry by ' + i + ' second(s)');
//                     return Rx.Observable.timer(i * 1000);
//                 });               
//         })
//         .map(function(x) {
//            console.log('map', x);
//            return x; 
//         });        
//   }
        
// DsPoller.prototype.setPeriod = function(time) {
//     this.period$.onNext(time);
// }

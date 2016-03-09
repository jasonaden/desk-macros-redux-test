// DsPoller should:
// 1. Accept the action to be taken & the interval
// 1.5 Allow pollers to have a name (done)
// 2. Return something that can paused and restarted
// 3. Ability to do DsPoller.get('Name') to return the existing poller (done)

// TODO:
// 2.5 Make sure we can destroy a poller 
// 4. Retry logic (retry(3))
// 5. Exponential Backoff
// 6. Prevent pollers from stacking up due to delays in getting a response

export const DsPoller = (rx) => {    
    
    let pollers = {};
    
    return class DsPoller {
        name: string;
        
        period$: any;
        
        connection: any;
        
        constructor (name: string, action, period) {
            this.period$ = new rx.Subject();     
            
            this.name = name;   
            
            let interval$ = this.period$.startWith(period)
                .flatMapLatest((t) => rx.Observable.timer(0, t));
                
            let poller$ = interval$
                .timeInterval()
                .do((value) => {
                    console.log(value.interval);
                })
                .flatMapLatest(() => {
                    return rx.Observable.defer(() => action())
                })
                .publish();
                
            this.connection = poller$.connect();
                
            pollers[name] = poller$;
        }
        
        public static getPollerInstance (name: string) {
            return pollers[name];
        }
        
        getPoller () { 
            return pollers[this.name];
        }
        
        destroy () {
            this.connection.dispose();
        }
                
        setInterval (interval) {
            console.log('interval set to', interval, 'ms');
            this.period$.onNext(interval);
        }
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

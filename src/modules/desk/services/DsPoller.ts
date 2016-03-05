import {Observable, Subject} from 'rx';

export const DsPoller = 
  function (name: string, action, period: number) {
 
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
    
    period = period || 5000;
    
    this.period$ = new Subject();
    
    this.interval$ = this.period$.startWith(period)
    .flatMapLatest(function (t) {return Observable.timer(0, t)});
    
    this.poller$ = this.interval$.flatMapLatest(function () {
        return Observable.fromPromise(action())
            .catch(function (err) {
            return Observable.empty();
            });
    });
        
  }

DsPoller.prototype.setPeriod = function(time) {
    this.period$.onNext(time);
}

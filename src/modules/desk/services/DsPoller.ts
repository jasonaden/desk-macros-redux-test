import {Subject, Observable, ConnectableObservable, TimeInterval} from 'rx';

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
    return class DsPoller {             
        // CLASS METHODS
        private static _pollers = new Map<String, DsPoller>();        
 
        // PROPERTIES
        private _interval$: Observable<TimeInterval<number>>;
        private _poller$: ConnectableObservable<any>;
        
        private _action = _ => _;
        private _connection = Rx.helpers.noop;
        private _period$ = new Subject<number>();
                           
        constructor (name: string, interval: number) {
            this._period$ = new rx.Subject();     
                       
            let interval$ = this._period$.startWith(interval)
                .flatMapLatest((t) => rx.Observable.timer(0, t));
                
            this._poller$ = interval$
                .timeInterval()
                .do((value) => {
                    console.log(value.interval);
                })
                .flatMapLatest(() => {
                    return Observable.defer(() => this._action())
                })
                .publish();    
                         
            DsPoller.setPoller(name, this);
        }
        
        static setPoller (name: string, instance: DsPoller) {
            let curr = this._pollers.get(name);
            if (curr) throw "Cannot cache two RxPollers with the same name."
            this._pollers.set(name, instance);
        }
        
        add (fn) {
            this._action = fn;
        }
        
        start () {
            this._connection = this._poller$.connect();
        }
        
        stop () {
            this._connection.dispose();
        }
        
        subscribe (cb) {
            this._poller$.subscribe(cb);  
        }
        
        getPoller () { 
            return this._poller$;
        }
        
        destroy () {
            this._connection.dispose();
        }
                
        setInterval (time: number) {
            console.log('interval set to', time, 'ms');
            this._period$.onNext(time);
        }
    }
}

export class RxPoller {
  // CLASS METHODS
  private static _pollers = new Map<String, RxPoller>();
  
  // PROPERTIES
  private _action = _ => _;
  private _action$ = new Subject();
  private _period$ = new Subject<number>();
  private _pauser$ = new Subject<boolean>();
  
  private _interval$: Observable<TimeInterval<number>>;
  private _poller$: ConnectableObservable<any>;
  private _connection = Rx.helpers.noop;
  
  constructor (name: string, period: number = 8000) {
    this._interval$ = this._period$
      .startWith(period)
      .flatMapLatest(t => Observable.timer(0, t))
      .timeInterval()
      .pausable()
      .publish();
      
    this._interval$.connect();
  
    // this._poller$ = this._interval$
    //   .do(_ => this._interval$.pause())
    //   .flatMapLatest(() => this._action())
    //   .do(_ => this._interval$.resume())
    //   .catch(Observable.empty())
    //   .publish();
    
    this._poller$ = Observable.fromPromise(() => this._action())
      .repeatWhen(n => n.delay(2000))
      .retryWhen(function (attempts) {
        return Rx.Observable.range(1, 3).zip(attempts, function (i) { return i; }).flatMap(function (i) {
          console.log("delay retry by " + i + " second(s)");
          return Rx.Observable.timer(i * 1000);
        });
      }).publish();
    
    RxPoller.setPoller(name, this);
  }
  
  static setPoller (name: string, instance: RxPoller) {
    let curr = this._pollers.get(name);
    if (curr) throw "Cannot cache two RxPollers with the same name."
    this._pollers.set(name, instance);
  }
  
  setAction (fn) {
    this._action = fn;
  }
  
  setPeriod (time: number) {
    this._period$.onNext(time);
  }
  
  subscribe (cb) {
    this._poller$.subscribe(cb);  
  }
  
  start () {
    this._connection = this._poller$.connect();
  }
  
  stop () {
    this._connection();
  }
  
}
import {Subject, BehaviorSubject, Disposable, Observable, ConnectableObservable, TimeInterval} from 'rx';

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
                    return Observable.defer(this._action)
                })
                .publish();    
                         
            DsPoller.setPoller(name, this);
        }
        
        static setPoller (name: string, instance: DsPoller) {
            let curr = this._pollers.get(name);
            if (curr) throw "Cannot cache two RxPollers with the same name."
            this._pollers.set(name, instance);
        }
        
        static getPoller (name) {
            return this._pollers.get(name);
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
  
  // private _interval$: Observable<TimeInterval<number>>;
  // private _poller$: ConnectableObservable<any>;
  private _connection = Rx.helpers.noop;
  
  // Subject for number of errors
  private _errorCount$ = new BehaviorSubject(0);
  
  // Subject for interval
  private _interval$ = new BehaviorSubject(0);
  private _maxInterval$ = new BehaviorSubject(4000);
  
  
  // Observable to compute the interval
  private computedInterval$ = this._interval$
    .zip(this._errorCount$, this._maxInterval$, function (interval: number, errorCnt: number, maxInterval: number) {
      let calInt = interval * Math.pow(2, errorCnt);
      return calInt > (maxInterval || Infinity) ? maxInterval : calInt;
    })
    
  private _poller$: ConnectableObservable<any> = Observable.fromPromise(() => this._action())
      .repeatWhen(n => n
        .do(_ => this._errorCount$.onNext(0))
        .delay(_ => this.computedInterval$.flatMap(interval => Observable.timer(interval)))
      )
      .retryWhen(err => err
        .do(err => this._errorCount$.onNext(this._errorCount$.getValue() + 1))
        .flatMap(cnt => this.computedInterval$)
        .flatMap(interval => Observable.timer(interval)))
      .publish();
    
  constructor (name: string, period: number = 8000) {
    this._interval$.onNext(period);
    
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
    this._interval$.onNext(time);
  }
  
  subscribe (cb) {
    this._poller$.subscribe(cb);  
  }
  
  start () {
    this._connection = this._poller$.connect();
  }
  
  stop () {
    this._connection.dispose();
  }
  
}
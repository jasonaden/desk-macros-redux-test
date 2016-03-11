import {Subject, BehaviorSubject, Disposable, Observable, ConnectableObservable, TimeInterval} from 'rx';

// DsPoller should:
// 1. Accept the action to be taken & the interval
// 1.5 Allow pollers to have a name (done)
// 2. Return something that can paused and restarted
// 2.5 Make sure we can destroy a poller
// 3. Ability to do DsPoller.get('Name') to return the existing poller (done)
// 4. Retry logic (retry(3))
// 5. Exponential Backoff
// 6. Prevent pollers from stacking up due to delays in getting a response

export class RxPoller {
  // CLASS METHODS
  private static _pollers = new Map<String, RxPoller>();
  
  // PROPERTIES
  private _action = _ => _;
  private _action$ = new Subject();
  private _period$ = new Subject<number>();
  private _pauser$ = new Subject<boolean>();
  private _connection = Rx.helpers.noop;
  
  // Subject for number of errors
  private _errorCount$ = new BehaviorSubject(0);
  
  // Subject for interval
  private _interval$ = new BehaviorSubject(0);
  private _maxInterval$ = new BehaviorSubject(8000);  
  
  // Observable to compute the interval
  private computedInterval$ = this._interval$
    .zip(this._errorCount$, this._maxInterval$, function (interval: number, errorCnt: number, maxInterval: number) {
      let calInt = interval * Math.pow(2, errorCnt);
      return calInt > (maxInterval || Infinity) ? maxInterval : calInt;
    })
    
  private _poller$: ConnectableObservable<any> = Observable.fromPromise(() => this._action())
      .repeatWhen(n => n
        .do(_ => this._errorCount$.onNext(0))
        .flatMap(_ => this.computedInterval$)
        .flatMap(interval => Observable.timer(interval))
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
        
  static getPoller (name) {
    return this._pollers.get(name);
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

export const RxPollerFactory = () => RxPoller

const defaultComparator = (a, b) => a === b;

export class ReduxWatch {
  private ngRedux;
  private watchers;
  private subscription;

  static $inject = ['$ngRedux'];
  constructor ($ngRedux) {
    this.ngRedux = $ngRedux;
    this.watchers = {}
    this.subscription = null;
  }

  watch (name, selector, comparator, cb) {
    comparator = comparator || defaultComparator;
    this.watchers[name] = { prevState: selector(), selector, comparator, cb };
    this.subscribe();
  }

  unwatch (path) {
    if (this.watchers[path]) {
      delete this.watchers[path];
      if (Object.keys(this.watchers).length == 0) {
        this.unsubscribe();
      }
    }
  }

  subscribe () {
    // if we're already subscribed, nothing to do
    if (this.subscription !== null) { return; }

    // start subscribing
    this.subscription = this.ngRedux.subscribe(()=>{

      // go through each watcher
      for(let n in this.watchers) {
        
        // run selector to get new value
        let sVal = this.watchers[n].selector();

        // run callback and update prevState when it has changed
        if (!this.watchers[n].comparator(sVal, this.watchers[n].prevState)) {
          this.watchers[n].prevState = sVal;
          this.watchers[n].cb();
        }
      }
    });
  }

  unsubscribe () {
    this.subscription();
    this.subscription = null;
  }
}
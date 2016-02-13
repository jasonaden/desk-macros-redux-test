System.register(['angular2/core', 'redux', 'redux-logger', './macros/reducers'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, redux_1, redux_logger_1, reducers_1;
    var logger, createStoreWithMiddleware, store, AppStore;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (redux_logger_1_1) {
                redux_logger_1 = redux_logger_1_1;
            },
            function (reducers_1_1) {
                reducers_1 = reducers_1_1;
            }],
        execute: function() {
            logger = redux_logger_1.default();
            createStoreWithMiddleware = redux_1.applyMiddleware(logger)(redux_1.createStore);
            store = createStoreWithMiddleware(reducers_1.rootReducer);
            AppStore = (function () {
                function AppStore() {
                    return store;
                }
                AppStore = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppStore);
                return AppStore;
            })();
            exports_1("AppStore", AppStore);
        }
    }
});
//# sourceMappingURL=app.js.map
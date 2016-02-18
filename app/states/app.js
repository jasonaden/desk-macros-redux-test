System.register(['redux', 'redux-logger', './macroFilter/reducers'], function(exports_1) {
    var redux_1, redux_logger_1, reducers_1;
    var logger, createStoreWithMiddleware, store;
    return {
        setters:[
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
            exports_1("store", store = createStoreWithMiddleware(reducers_1.rootReducer));
        }
    }
});
// console.log(store)
// @Injectable()
// export class AppStore implements Store{
//   getReducer;
//   replaceReducer;
//   dispatch;
//   getState;
//   subscribe;
//   constructor () {
//     return store;
//   }
// } 
//# sourceMappingURL=app.js.map
System.register(['redux', './actions'], function(exports_1) {
    var redux_1, actions_1;
    var macroData, rootReducer;
    function selectedMacro(state, action) {
        if (state === void 0) { state = null; }
        switch (action.type) {
            case actions_1.SELECT_MACRO:
                return action.data;
            default:
                return state;
        }
    }
    function macroFilters(state, action) {
        if (state === void 0) { state = []; }
        switch (action.type) {
            case actions_1.ADD_MACRO_FILTER:
                return state.concat(['']);
            case actions_1.SET_MACRO_FILTER:
                var idx = action.data.index;
                return state.slice(0, idx).concat([
                    action.data.filter
                ], state.slice(idx + 1));
            default:
                return state;
        }
    }
    function macros(state, action) {
        if (state === void 0) { state = []; }
        switch (action.type) {
            case actions_1.SET_MACROS:
                return action.data.slice(0);
            default:
                return state;
        }
    }
    return {
        setters:[
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            }],
        execute: function() {
            macroData = redux_1.combineReducers({
                macros: macros
            });
            exports_1("rootReducer", rootReducer = redux_1.combineReducers({
                macroFilters: macroFilters,
                macros: macros
            }));
        }
    }
});
//# sourceMappingURL=reducers.js.map
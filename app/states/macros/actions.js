System.register([], function(exports_1) {
    var SET_MACROS, SELECT_MACRO, SET_MACRO_FILTER, ADD_MACRO_FILTER;
    function setMacros(data) {
        return {
            type: SET_MACROS,
            data: data
        };
    }
    exports_1("setMacros", setMacros);
    function selectMacro(data) {
        return {
            type: SELECT_MACRO,
            data: data
        };
    }
    exports_1("selectMacro", selectMacro);
    function setMacroFilter(data, index) {
        return {
            type: SET_MACRO_FILTER,
            data: {
                value: data,
                index: index
            }
        };
    }
    exports_1("setMacroFilter", setMacroFilter);
    function addMacroFilter() {
        return {
            type: ADD_MACRO_FILTER
        };
    }
    exports_1("addMacroFilter", addMacroFilter);
    return {
        setters:[],
        execute: function() {
            exports_1("SET_MACROS", SET_MACROS = "SET_MACROS");
            exports_1("SELECT_MACRO", SELECT_MACRO = "SELECT_MACRO");
            exports_1("SET_MACRO_FILTER", SET_MACRO_FILTER = "SET_MACRO_FILTER");
            exports_1("ADD_MACRO_FILTER", ADD_MACRO_FILTER = "ADD_MACRO_FILTER");
        }
    }
});
//# sourceMappingURL=actions.js.map
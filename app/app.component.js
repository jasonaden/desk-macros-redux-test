System.register(['./data/macros', './states/macroFilter/actions', './states/macroFilter/selectors'], function(exports_1) {
    var macros_1, actions_1, selectors_1;
    var DeskMacros, DeskMacrosComponent;
    return {
        setters:[
            function (macros_1_1) {
                macros_1 = macros_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (selectors_1_1) {
                selectors_1 = selectors_1_1;
            }],
        execute: function() {
            DeskMacros = (function () {
                function DeskMacros(AppStore) {
                    var _this = this;
                    var store = AppStore;
                    store.subscribe(function () {
                        var state = store.getState();
                        _this.macros = selectors_1.macros(state);
                    });
                    store.dispatch(actions_1.setMacros(macros_1.macroList));
                }
                ;
                return DeskMacros;
            })();
            exports_1("DeskMacros", DeskMacros);
            exports_1("DeskMacrosComponent", DeskMacrosComponent = {
                template: "\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <macro-selector macros=\"$ctrl.macros\"></macro-selector>\n      </div>\n      <div class=\"col-md-3\">\n        <macro-folder-selector macros=\"$ctrl.macros\"></macro-folder-selector>\n      </div>\n    </div>\n\t",
                controller: DeskMacros
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map
System.register(['./data/macros', './data/cases', './macros/states/actions', './cases/states/actions', './macros/states/selectors', './cases/states/selectors'], function(exports_1) {
    var macros_1, cases_1, actions_1, actions_2, selectors_1, selectors_2;
    var DeskApp, DeskAppComponent;
    return {
        setters:[
            function (macros_1_1) {
                macros_1 = macros_1_1;
            },
            function (cases_1_1) {
                cases_1 = cases_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (actions_2_1) {
                actions_2 = actions_2_1;
            },
            function (selectors_1_1) {
                selectors_1 = selectors_1_1;
            },
            function (selectors_2_1) {
                selectors_2 = selectors_2_1;
            }],
        execute: function() {
            DeskApp = (function () {
                function DeskApp(AppStore) {
                    var _this = this;
                    var store = AppStore;
                    store.subscribe(function () {
                        var state = store.getState();
                        _this.macros = selectors_1.macros(state);
                        _this.cases = selectors_2.cases(state);
                    });
                    store.dispatch(actions_1.setMacros(macros_1.macroList));
                    store.dispatch(actions_2.setCases(cases_1.caseList));
                }
                ;
                return DeskApp;
            })();
            exports_1("DeskApp", DeskApp);
            exports_1("DeskAppComponent", DeskAppComponent = {
                template: "\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <case-selector cases=\"$ctrl.cases\"></case-selector>\n      </div>\n      <div class=\"col-md-3\">\n        <macro-selector macros=\"$ctrl.macros\"></macro-selector>\n      </div>\n      <div class=\"col-md-3\">\n        <macro-folder-selector macros=\"$ctrl.macros\"></macro-folder-selector>\n      </div>\n    </div>\n\t",
                controller: DeskApp
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map
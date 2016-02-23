System.register(['./data/macros', './data/cases', './macros/states/actions', './cases/states/actions'], function(exports_1) {
    var macros_1, cases_1, actions_1, actions_2;
    var App, AppComponent;
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
            }],
        execute: function() {
            App = (function () {
                function App(AppStore) {
                    // TODO: This just pre-load's data. Maybe work in $http or some kind of fetch
                    var store = AppStore;
                    store.dispatch(actions_1.setMacros(macros_1.macroList));
                    store.dispatch(actions_2.setCases(cases_1.caseList));
                }
                ;
                return App;
            })();
            exports_1("App", App);
            exports_1("AppComponent", AppComponent = {
                template: "\n    <desk-agent></desk-agent>\n\t",
                controller: App
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map
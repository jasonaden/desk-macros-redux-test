System.register(['angular2/core', './data/macros', './states/store', './components/macros', './states/macroFilter/actions', './states/macroFilter/selectors'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, macros_1, store_1, macros_2, actions_1, selectors_1;
    var DeskMacrosComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (macros_1_1) {
                macros_1 = macros_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (macros_2_1) {
                macros_2 = macros_2_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (selectors_1_1) {
                selectors_1 = selectors_1_1;
            }],
        execute: function() {
            DeskMacrosComponent = (function () {
                function DeskMacrosComponent(store) {
                    var _this = this;
                    store.subscribe(function () {
                        var state = store.getState();
                        _this.macros = selectors_1.macros(state);
                    });
                    store.dispatch(actions_1.setMacros(macros_1.macroList));
                }
                DeskMacrosComponent = __decorate([
                    core_1.Component({
                        selector: 'DeskMacros',
                        providers: [store_1.AppStore],
                        directives: [macros_2.MacroSelector, macros_2.MacroFolderSelector],
                        template: "\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <MacroSelector [macros]=\"macros\"></MacroSelector>\n      </div>\n      <div class=\"col-md-3\">\n        <MacroFolderSelector [macros]=\"macros\"></MacroFolderSelector>\n      </div>\n    </div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [store_1.AppStore])
                ], DeskMacrosComponent);
                return DeskMacrosComponent;
            })();
            exports_1("DeskMacrosComponent", DeskMacrosComponent);
            ;
        }
    }
});
//# sourceMappingURL=app.component.js.map
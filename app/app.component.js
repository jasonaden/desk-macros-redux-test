System.register(['angular2/core', './data/macros', './states/app', './components/macros/macroFilter', './components/macros/macroList', './components/macros/folderList', './states/macros/actions', './states/macros/selectors'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, macros_1, app_1, macroFilter_1, macroList_1, folderList_1, actions_1, selectors_1;
    var DeskMacrosComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (macros_1_1) {
                macros_1 = macros_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (macroFilter_1_1) {
                macroFilter_1 = macroFilter_1_1;
            },
            function (macroList_1_1) {
                macroList_1 = macroList_1_1;
            },
            function (folderList_1_1) {
                folderList_1 = folderList_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (selectors_1_1) {
                selectors_1 = selectors_1_1;
            }],
        execute: function() {
            DeskMacrosComponent = (function () {
                function DeskMacrosComponent(_store) {
                    var _this = this;
                    this._store = _store;
                    _store.subscribe(function () {
                        var state = _store.getState();
                        _this.macros = selectors_1.macros(state);
                        // this.filteredMacros = filteredMacros(state);
                        // this.filteredFolders = filteredFolders(state);
                        _this.macroFilters = selectors_1.macroFilters(state);
                        console.log(_this.filteredFolders);
                    });
                    _store.dispatch(actions_1.setMacros(macros_1.macroList));
                }
                DeskMacrosComponent.prototype.onFilterChange = function (filter) {
                    console.log(filter);
                    this._store.dispatch(actions_1.setMacroFilter(filter));
                };
                DeskMacrosComponent.prototype.addMacroFilter = function () {
                    this._store.dispatch(actions_1.addMacroFilter());
                };
                DeskMacrosComponent = __decorate([
                    core_1.Component({
                        selector: 'DeskMacros',
                        directives: [macroFilter_1.MacroFilter, macroList_1.MacroList, folderList_1.MacroFolderList],
                        providers: [app_1.AppStore],
                        template: "\n  <button (click)=\"addMacroFilter()\">+ Add Macro Filter</button>\n  <!-- <MacroFilter *ngFor=\"#filter of ; #idx = index\" (filterChange)=\"onFilterChange($event)\"></MacroFilter> -->\n  <div style=\"float: left;\">\n    <h1>State</h1>\n    <MacroList [macros]=\"macros\"></MacroList>\n  </div>\n  <MacroSelector style=\"float: left;\" *ngFor=\"#selector of macroFilters; #idx = index\">\n    <h1>Macros  {{idx}}</h1>\n    <MacroFilter (filterChange)=\"onFilterChange($event)\"></MacroFilter>\n    <MacroList [macros]=\"filteredMacros\"></MacroList>\n  </MacroSelector>\n  <div style=\"float: left;\">\n    <h1>Folders</h1>\n    <MacroFolderList [folders]=\"filteredFolders\"></MacroFolderList>\n  </div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [app_1.AppStore])
                ], DeskMacrosComponent);
                return DeskMacrosComponent;
            })();
            exports_1("DeskMacrosComponent", DeskMacrosComponent);
            ;
        }
    }
});
//# sourceMappingURL=app.component.js.map
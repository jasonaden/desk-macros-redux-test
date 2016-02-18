System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var MacroFilter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MacroFilter = (function () {
                function MacroFilter() {
                    this.filterChange = new core_1.EventEmitter();
                }
                MacroFilter.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.form.control.valueChanges
                        .map(function (c) { return c.filter; })
                        .forEach(function (txt) { return _this.filterChange.emit(txt); });
                };
                __decorate([
                    core_1.ViewChild(common_1.NgForm), 
                    __metadata('design:type', Object)
                ], MacroFilter.prototype, "form", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MacroFilter.prototype, "placeholder", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MacroFilter.prototype, "filterChange", void 0);
                MacroFilter = __decorate([
                    core_1.Component({
                        selector: 'MacroFilter',
                        template: "\n  <form>\n    <input class=\"form-control\" [placeholder]=\"placeholder || 'Filter'\" ngControl=\"filter\">\n  </form>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MacroFilter);
                return MacroFilter;
            })();
            exports_1("MacroFilter", MacroFilter);
            ;
        }
    }
});
//# sourceMappingURL=macroFilter.js.map
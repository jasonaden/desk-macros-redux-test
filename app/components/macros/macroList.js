System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var MacroList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MacroList = (function () {
                function MacroList() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MacroList.prototype, "macros", void 0);
                MacroList = __decorate([
                    core_1.Component({
                        selector: 'MacroList',
                        template: "\n    <ul>\n      <li *ngFor=\"#macro of macros\">\n        {{macro.name}}\n      </li>\n    </ul>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MacroList);
                return MacroList;
            })();
            exports_1("MacroList", MacroList);
            ;
        }
    }
});
//# sourceMappingURL=macroList.js.map
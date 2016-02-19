System.register([], function(exports_1) {
    var MacroFilter, MacroFilterComponent;
    return {
        setters:[],
        execute: function() {
            MacroFilter = (function () {
                function MacroFilter() {
                }
                return MacroFilter;
            })();
            exports_1("MacroFilter", MacroFilter);
            ;
            exports_1("MacroFilterComponent", MacroFilterComponent = {
                bindings: {
                    placeholder: '@',
                    filterChange: '&'
                },
                template: "\n    <form>\n      <input class=\"form-control\" placeholder=\"{{::$ctrl.placeholder || 'Filter'}}\" \n        ng-model=\"$ctrl.filterText\" ng-change=\"$ctrl.filterChange({filter: $ctrl.filterText})\">\n    </form>\n\t",
                controller: MacroFilter
            });
        }
    }
});
//# sourceMappingURL=macroFilter.js.map
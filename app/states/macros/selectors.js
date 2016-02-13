System.register(['reselect'], function(exports_1) {
    var reselect_1;
    var macros, macroFilters, macrosByFolder, filteredMacros, filteredFolders;
    // Helper functions
    function filterMacros(macros, macroFilters) {
        return macros.filter(function (macro) { return macro.name.toLowerCase().indexOf(macroFilters.toLowerCase()) > -1; });
    }
    function groupByFolder(macros) {
        var folderList = [];
        var folders = {};
        macros.filter(function (m) { return m.folders.length; })
            .forEach(function (m) {
            m.folders.forEach(function (f) {
                if (!folders[f]) {
                    folders[f] = { name: f, macros: [] };
                }
                folders[f].macros.push(m);
            });
        });
        for (var f in folders) {
            folderList.push(folders[f]);
        }
        return folderList;
    }
    function macrosNoFolder(macros) {
        return macros.filter(function (m) { return !m.folders.length; });
    }
    return {
        setters:[
            function (reselect_1_1) {
                reselect_1 = reselect_1_1;
            }],
        execute: function() {
            // Simple selectors
            exports_1("macros", macros = function (state) { return state.macros; });
            exports_1("macroFilters", macroFilters = function (state) { return state.macroFilters; });
            // Composed selectors
            exports_1("macrosByFolder", macrosByFolder = reselect_1.createSelector(macros, groupByFolder));
            exports_1("filteredMacros", filteredMacros = reselect_1.createSelector(macros, macroFilters, filterMacros));
            exports_1("filteredFolders", filteredFolders = reselect_1.createSelector(macrosByFolder, macroFilters, function (folders, macroFilters) {
                return folders.filter(function (f) { return f.name.toLowerCase().indexOf(macroFilters.toLowerCase()) > -1; });
            }));
        }
    }
});
//# sourceMappingURL=selectors.js.map
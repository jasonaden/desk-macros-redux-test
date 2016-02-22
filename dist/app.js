/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	exports.app = angular.module('app', []);
	var app_component_1 = __webpack_require__(1);
	var store_1 = __webpack_require__(6);
	var macroSelector_1 = __webpack_require__(32);
	var macroFolderSelector_1 = __webpack_require__(33);
	var macroFilter_1 = __webpack_require__(34);
	exports.app
	    .component('deskMacros', app_component_1.DeskMacrosComponent)
	    .component('macroSelector', macroSelector_1.MacroSelectorComponent)
	    .component('macroFolderSelector', macroFolderSelector_1.MacroFolderSelectorComponent)
	    .component('macroFilter', macroFilter_1.MacroFilterComponent)
	    .value('AppStore', store_1.AppStore);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, ['app']);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var macros_1 = __webpack_require__(2);
	var actions_1 = __webpack_require__(3);
	var selectors_1 = __webpack_require__(4);
	var DeskMacros = (function () {
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
	exports.DeskMacros = DeskMacros;
	exports.DeskMacrosComponent = {
	    template: "\n    <div class=\"row\">\n      <div class=\"col-md-3\">\n        <macro-selector macros=\"$ctrl.macros\"></macro-selector>\n      </div>\n      <div class=\"col-md-3\">\n        <macro-folder-selector macros=\"$ctrl.macros\"></macro-folder-selector>\n      </div>\n    </div>\n\t",
	    controller: DeskMacros
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.macroList = [{ "_links": { "self": { "href": "/api/v2/macros/1133012", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133012/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133012/actions", "id": 1133012, "name": "Rave + Thank you! ", "description": null, "position": 1, "enabled": true, "folders": ["Feedback"], "$$url": "/api/v2/macros/1133012", "$$id": "1133012", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133012/actions", "id": 1133012, "name": "Rave + Thank you! ", "description": null, "position": 1, "enabled": true, "folders__json": "[\"Feedback\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133020", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133020/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133020/actions", "id": 1133020, "name": "Rant + Apologies", "description": null, "position": 2, "enabled": true, "folders": ["Feedback"], "$$url": "/api/v2/macros/1133020", "$$id": "1133020", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133020/actions", "id": 1133020, "name": "Rant + Apologies", "description": null, "position": 2, "enabled": true, "folders__json": "[\"Feedback\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1132088", "class": "macro" }, "actions": { "href": "/api/v2/macros/1132088/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1132088/actions", "id": 1132088, "name": "Rant + Escalate", "description": "Sets a label and assigns the case to the Supervisor group", "position": 3, "enabled": true, "folders": ["Feedback"], "$$url": "/api/v2/macros/1132088", "$$id": "1132088", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1132088/actions", "id": 1132088, "name": "Rant + Escalate", "description": "Sets a label and assigns the case to the Supervisor group", "position": 3, "enabled": true, "folders__json": "[\"Feedback\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1199480", "class": "macro" }, "actions": { "href": "/api/v2/macros/1199480/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1199480/actions", "id": 1199480, "name": "Rant + Escalate", "description": null, "position": 4, "enabled": true, "folders": ["Feedback"], "$$url": "/api/v2/macros/1199480", "$$id": "1199480", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1199480/actions", "id": 1199480, "name": "Rant + Escalate", "description": null, "position": 4, "enabled": true, "folders__json": "[\"Feedback\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1132087", "class": "macro" }, "actions": { "href": "/api/v2/macros/1132087/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1132087/actions", "id": 1132087, "name": "Rant + Nothing", "description": "Sets a label, sets the case status to pending, and appends an article", "position": 5, "enabled": true, "folders": ["Feedback"], "$$url": "/api/v2/macros/1132087", "$$id": "1132087", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1132087/actions", "id": 1132087, "name": "Rant + Nothing", "description": "Sets a label, sets the case status to pending, and appends an article", "position": 5, "enabled": true, "folders__json": "[\"Feedback\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1169186", "class": "macro" }, "actions": { "href": "/api/v2/macros/1169186/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1169186/actions", "id": 1169186, "name": "Lost Password or Password Reset", "description": null, "position": 6, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1169186", "$$id": "1169186", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1169186/actions", "id": 1169186, "name": "Lost Password or Password Reset", "description": null, "position": 6, "enabled": true, "folders__json": "[]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133021", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133021/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133021/actions", "id": 1133021, "name": "Hawaii :: Hotels", "description": null, "position": 7, "enabled": true, "folders": ["Hawaii"], "$$url": "/api/v2/macros/1133021", "$$id": "1133021", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133021/actions", "id": 1133021, "name": "Hawaii :: Hotels", "description": null, "position": 7, "enabled": true, "folders__json": "[\"Hawaii\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133039", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133039/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133039/actions", "id": 1133039, "name": "Hawaii :: Alt Lodging", "description": null, "position": 8, "enabled": true, "folders": ["Hawaii"], "$$url": "/api/v2/macros/1133039", "$$id": "1133039", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133039/actions", "id": 1133039, "name": "Hawaii :: Alt Lodging", "description": null, "position": 8, "enabled": true, "folders__json": "[\"Hawaii\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133040", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133040/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133040/actions", "id": 1133040, "name": "Hawaii :: Fine Dining", "description": null, "position": 9, "enabled": true, "folders": ["Hawaii"], "$$url": "/api/v2/macros/1133040", "$$id": "1133040", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133040/actions", "id": 1133040, "name": "Hawaii :: Fine Dining", "description": null, "position": 9, "enabled": true, "folders__json": "[\"Hawaii\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133046", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133046/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133046/actions", "id": 1133046, "name": "Hawaii :: Local Eating", "description": null, "position": 10, "enabled": true, "folders": ["Hawaii"], "$$url": "/api/v2/macros/1133046", "$$id": "1133046", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133046/actions", "id": 1133046, "name": "Hawaii :: Local Eating", "description": null, "position": 10, "enabled": true, "folders__json": "[\"Hawaii\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133047", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133047/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133047/actions", "id": 1133047, "name": "Maui :: Hotels", "description": null, "position": 11, "enabled": true, "folders": ["Maui"], "$$url": "/api/v2/macros/1133047", "$$id": "1133047", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133047/actions", "id": 1133047, "name": "Maui :: Hotels", "description": null, "position": 11, "enabled": true, "folders__json": "[\"Maui\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133048", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133048/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133048/actions", "id": 1133048, "name": "Maui :: Alt Lodging", "description": null, "position": 12, "enabled": true, "folders": ["Maui"], "$$url": "/api/v2/macros/1133048", "$$id": "1133048", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133048/actions", "id": 1133048, "name": "Maui :: Alt Lodging", "description": null, "position": 12, "enabled": true, "folders__json": "[\"Maui\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133050", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133050/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133050/actions", "id": 1133050, "name": "Maui :: Fine Dining", "description": null, "position": 13, "enabled": true, "folders": ["Maui", "Food"], "$$url": "/api/v2/macros/1133050", "$$id": "1133050", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133050/actions", "id": 1133050, "name": "Maui :: Fine Dining", "description": null, "position": 13, "enabled": true, "folders__json": "[\"Maui\",\"Food\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1133100", "class": "macro" }, "actions": { "href": "/api/v2/macros/1133100/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1133100/actions", "id": 1133100, "name": "Maui :: Eating Local", "description": null, "position": 14, "enabled": true, "folders": ["Maui", "Food"], "$$url": "/api/v2/macros/1133100", "$$id": "1133100", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1133100/actions", "id": 1133100, "name": "Maui :: Eating Local", "description": null, "position": 14, "enabled": true, "folders__json": "[\"Maui\",\"Food\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1206317", "class": "macro" }, "actions": { "href": "/api/v2/macros/1206317/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1206317/actions", "id": 1206317, "name": "Snorkeling", "description": null, "position": 16, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1206317", "$$id": "1206317", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1206317/actions", "id": 1206317, "name": "Snorkeling", "description": null, "position": 16, "enabled": true, "folders__json": "[]" } }, { "_links": { "self": { "href": "/api/v2/macros/1206451", "class": "macro" }, "actions": { "href": "/api/v2/macros/1206451/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1206451/actions", "id": 1206451, "name": "Hot Lava", "description": null, "position": 17, "enabled": true, "folders": ["More Info"], "$$url": "/api/v2/macros/1206451", "$$id": "1206451", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1206451/actions", "id": 1206451, "name": "Hot Lava", "description": null, "position": 17, "enabled": true, "folders__json": "[\"More Info\"]" } }, { "_links": { "self": { "href": "/api/v2/macros/1208124", "class": "macro" }, "actions": { "href": "/api/v2/macros/1208124/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1208124/actions", "id": 1208124, "name": "LOST reply", "description": null, "position": 19, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1208124", "$$id": "1208124", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1208124/actions", "id": 1208124, "name": "LOST reply", "description": null, "position": 19, "enabled": true, "folders__json": "[]" } }, { "_links": { "self": { "href": "/api/v2/macros/1224325", "class": "macro" }, "actions": { "href": "/api/v2/macros/1224325/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1224325/actions", "id": 1224325, "name": "Change Case Custom Fields", "description": null, "position": 20, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1224325", "$$id": "1224325", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1224325/actions", "id": 1224325, "name": "Change Case Custom Fields", "description": null, "position": 20, "enabled": true, "folders__json": "[]" } }, { "_links": { "self": { "href": "/api/v2/macros/1229523", "class": "macro" }, "actions": { "href": "/api/v2/macros/1229523/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1229523/actions", "id": 1229523, "name": "bungee", "description": null, "position": 21, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1229523", "$$id": "1229523", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1229523/actions", "id": 1229523, "name": "bungee", "description": null, "position": 21, "enabled": true, "folders__json": "[]" } }, { "_links": { "self": { "href": "/api/v2/macros/1464865", "class": "macro" }, "actions": { "href": "/api/v2/macros/1464865/actions", "class": "macro_action" } }, "$$class": "macro", "$$type": "desk.Macro", "actions": "/api/v2/macros/1464865/actions", "id": 1464865, "name": "Ask Social", "description": null, "position": 22, "enabled": true, "folders": [], "$$url": "/api/v2/macros/1464865", "$$id": "1464865", "$$loaded": true, "$$snapshot": { "actions": "/api/v2/macros/1464865/actions", "id": 1464865, "name": "Ask Social", "description": null, "position": 22, "enabled": true, "folders__json": "[]" } }];


/***/ },
/* 3 */
/***/ function(module, exports) {

	exports.SET_MACROS = "SET_MACROS";
	exports.setMacros = function setMacros(payload) {
	    return {
	        type: exports.SET_MACROS,
	        payload: payload
	    };
	};
	exports.SELECT_MACRO = "SELECT_MACRO";
	function selectMacro(payload) {
	    return {
	        type: exports.SELECT_MACRO,
	        payload: payload
	    };
	}
	exports.selectMacro = selectMacro;
	exports.SET_MACRO_FILTER = "SET_MACRO_FILTER";
	function setMacroFilter(payload) {
	    return {
	        type: exports.SET_MACRO_FILTER,
	        payload: payload
	    };
	}
	exports.setMacroFilter = setMacroFilter;
	exports.SET_FOLDER_FILTER = "SET_FOLDER_FILTER";
	function setFolderFilter(payload) {
	    return {
	        type: exports.SET_FOLDER_FILTER,
	        payload: payload
	    };
	}
	exports.setFolderFilter = setFolderFilter;
	exports.ADD_MACRO_FILTER = "ADD_MACRO_FILTER";
	function addMacroFilter(payload) {
	    return {
	        type: exports.ADD_MACRO_FILTER,
	        payload: payload
	    };
	}
	exports.addMacroFilter = addMacroFilter;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var reselect_1 = __webpack_require__(5);
	// Simple selectors
	exports.macros = function (state) { return state.macros; };
	exports.macroFilter = function (state) { return state.macroFilter; };
	exports.folderFilter = function (state) { return state.folderFilter; };
	// Composed selectors
	exports.macrosByFolder = reselect_1.createSelector(exports.macros, groupByFolder);
	exports.filteredMacros = reselect_1.createSelector(exports.macros, exports.macroFilter, filterMacros);
	exports.filteredFolders = reselect_1.createSelector(exports.macrosByFolder, exports.folderFilter, filterFolders);
	// Helper functions
	function filterMacros(macros, macroFilter) {
	    return macros.filter(function (macro) { return macro.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1; });
	}
	function filterFolders(folders, macroFilter) {
	    return folders.filter(function (f) { return f.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1; });
	}
	function groupByFolder(macros) {
	    var folderList = [];
	    var folders = {};
	    macros.filter(function (m) { return !!m.folders.length; })
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.defaultMemoize = defaultMemoize;
	exports.createSelectorCreator = createSelectorCreator;
	exports.createSelector = createSelector;
	exports.createStructuredSelector = createStructuredSelector;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function defaultEqualityCheck(a, b) {
	  return a === b;
	}
	
	function defaultMemoize(func) {
	  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];
	
	  var lastArgs = null;
	  var lastResult = null;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (lastArgs !== null && args.every(function (value, index) {
	      return equalityCheck(value, lastArgs[index]);
	    })) {
	      return lastResult;
	    }
	    lastArgs = args;
	    lastResult = func.apply(undefined, args);
	    return lastResult;
	  };
	}
	
	function getDependencies(funcs) {
	  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
	
	  if (!dependencies.every(function (dep) {
	    return typeof dep === 'function';
	  })) {
	    var dependencyTypes = dependencies.map(function (dep) {
	      return typeof dep;
	    }).join(', ');
	    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
	  }
	
	  return dependencies;
	}
	
	function createSelectorCreator(memoize) {
	  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    memoizeOptions[_key2 - 1] = arguments[_key2];
	  }
	
	  return function () {
	    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      funcs[_key3] = arguments[_key3];
	    }
	
	    var recomputations = 0;
	    var resultFunc = funcs.pop();
	    var dependencies = getDependencies(funcs);
	
	    var memoizedResultFunc = memoize.apply(undefined, [function () {
	      recomputations++;
	      return resultFunc.apply(undefined, arguments);
	    }].concat(memoizeOptions));
	
	    var selector = function selector(state, props) {
	      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	        args[_key4 - 2] = arguments[_key4];
	      }
	
	      var params = dependencies.map(function (dependency) {
	        return dependency.apply(undefined, [state, props].concat(args));
	      });
	      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
	    };
	
	    selector.recomputations = function () {
	      return recomputations;
	    };
	    return selector;
	  };
	}
	
	function createSelector() {
	  return createSelectorCreator(defaultMemoize).apply(undefined, arguments);
	}
	
	function createStructuredSelector(selectors) {
	  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];
	
	  if (typeof selectors !== 'object') {
	    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
	  }
	  var objectKeys = Object.keys(selectors);
	  return selectorCreator(objectKeys.map(function (key) {
	    return selectors[key];
	  }), function () {
	    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      values[_key5] = arguments[_key5];
	    }
	
	    return values.reduce(function (composition, value, index) {
	      composition[objectKeys[index]] = value;
	      return composition;
	    }, {});
	  });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Library
	// import { createStore, applyMiddleware, Store, Reducer} from 'redux';
	// import createLogger from 'redux-logger';
	// const logger = createLogger();
	// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
	var store_1 = __webpack_require__(7);
	// Reducers
	var reducers_1 = __webpack_require__(31);
	exports.AppStore = store_1.createStore(reducers_1.rootReducer).useValue;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(30));


/***/ },
/* 8 */
/***/ function(module, exports) {



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BehaviorSubject_1 = __webpack_require__(10);
	//store specific operators
	__webpack_require__(24);
	__webpack_require__(28);
	var ActionTypes = {
	    SET_STATE: '@@ngrx/setState',
	    INIT: '@@ngrx/init'
	};
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store(_reducer, initialState) {
	        _super.call(this, _reducer(initialState, { type: ActionTypes.INIT }));
	        this._reducer = _reducer;
	    }
	    Store.prototype.next = function (action) {
	        var currentState = this.value;
	        var newState = this._reducer(currentState, action);
	        _super.prototype.next.call(this, newState);
	    };
	    Store.prototype.select = function (keyOrSelector) {
	        if (typeof keyOrSelector === 'string' ||
	            typeof keyOrSelector === 'number' ||
	            typeof keyOrSelector === 'symbol') {
	            return this.map(function (state) { return state[keyOrSelector]; }).distinctUntilChanged();
	        }
	        else if (typeof keyOrSelector === 'function') {
	            return this.map(keyOrSelector).distinctUntilChanged();
	        }
	        else {
	            throw new TypeError("Store@select Unknown Parameter Type: "
	                + ("Expected type of function or valid key type, got " + typeof keyOrSelector));
	        }
	    };
	    Store.prototype.dispatch = function (action) {
	        this.next(action);
	    };
	    Store.prototype.replaceReducer = function (reducer) {
	        this._reducer = reducer;
	        this.dispatch({ type: ActionTypes.INIT });
	    };
	    Store.prototype.getState = function () {
	        return this.value;
	    };
	    return Store;
	})(BehaviorSubject_1.BehaviorSubject);
	exports.Store = Store;
	exports.createStore = function (reducer, initialState) {
	    return { useValue: new Store(reducer, initialState) };
	};
	
	exports.combineReducers = function (reducers) {
	    var reducerKeys = Object.keys(reducers);
	    return function (state, action) {
	        if (state === void 0) { state = {}; }
	        var hasChanged = false;
	        var nextState = {};
	        for (var i = 0; i < reducerKeys.length; i++) {
	            var key = reducerKeys[i];
	            var reducer = reducers[key];
	            var previousState = state[key];
	            var newState = reducer(previousState, action);
	            nextState[key] = newState;
	            hasChanged = hasChanged || previousState !== newState;
	        }
	        return hasChanged ? nextState : state;
	    };
	};
	exports.compose = function () {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (funcs.length === 0) {
	            return args[0];
	        }
	        var last = funcs[funcs.length - 1];
	        var rest = funcs.slice(0, -1);
	        return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
	    };
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(11);
	var throwError_1 = __webpack_require__(15);
	var ObjectUnsubscribedError_1 = __webpack_require__(23);
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	        this._hasError = false;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this._hasError) {
	            throwError_1.throwError(this._err);
	        }
	        else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	        else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (!subscription) {
	            return;
	        }
	        else if (!subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype._next = function (value) {
	        _super.prototype._next.call(this, this._value = value);
	    };
	    BehaviorSubject.prototype._error = function (err) {
	        this._hasError = true;
	        _super.prototype._error.call(this, this._err = err);
	    };
	    return BehaviorSubject;
	})(Subject_1.Subject);
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(12);
	var Subscriber_1 = __webpack_require__(13);
	var Subscription_1 = __webpack_require__(17);
	var SubjectSubscription_1 = __webpack_require__(22);
	var rxSubscriber_1 = __webpack_require__(18);
	var subscriptionAdd = Subscription_1.Subscription.prototype.add;
	var subscriptionRemove = Subscription_1.Subscription.prototype.remove;
	var subscriptionUnsubscribe = Subscription_1.Subscription.prototype.unsubscribe;
	var subscriberNext = Subscriber_1.Subscriber.prototype.next;
	var subscriberError = Subscriber_1.Subscriber.prototype.error;
	var subscriberComplete = Subscriber_1.Subscriber.prototype.complete;
	var _subscriberNext = Subscriber_1.Subscriber.prototype._next;
	var _subscriberError = Subscriber_1.Subscriber.prototype._error;
	var _subscriberComplete = Subscriber_1.Subscriber.prototype._complete;
	var Subject = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        _super.apply(this, arguments);
	        this.observers = [];
	        this.isUnsubscribed = false;
	        this.dispatching = false;
	        this.errorSignal = false;
	        this.completeSignal = false;
	    }
	    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
	        return this;
	    };
	    Subject.create = function (source, destination) {
	        return new BidirectionalSubject(source, destination);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new BidirectionalSubject(this, this.destination || this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        else if (this.errorSignal) {
	            subscriber.error(this.errorInstance);
	            return;
	        }
	        else if (this.completeSignal) {
	            subscriber.complete();
	            return;
	        }
	        else if (this.isUnsubscribed) {
	            throw new Error('Cannot subscribe to a disposed Subject.');
	        }
	        this.observers.push(subscriber);
	        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	    };
	    Subject.prototype.add = function (subscription) {
	        subscriptionAdd.call(this, subscription);
	    };
	    Subject.prototype.remove = function (subscription) {
	        subscriptionRemove.call(this, subscription);
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.observers = void 0;
	        subscriptionUnsubscribe.call(this);
	    };
	    Subject.prototype.next = function (value) {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.dispatching = true;
	        this._next(value);
	        this.dispatching = false;
	        if (this.errorSignal) {
	            this.error(this.errorInstance);
	        }
	        else if (this.completeSignal) {
	            this.complete();
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.isUnsubscribed || this.completeSignal) {
	            return;
	        }
	        this.errorSignal = true;
	        this.errorInstance = err;
	        if (this.dispatching) {
	            return;
	        }
	        this._error(err);
	        this.unsubscribe();
	    };
	    Subject.prototype.complete = function () {
	        if (this.isUnsubscribed || this.errorSignal) {
	            return;
	        }
	        this.completeSignal = true;
	        if (this.dispatching) {
	            return;
	        }
	        this._complete();
	        this.unsubscribe();
	    };
	    Subject.prototype._next = function (value) {
	        var index = -1;
	        var observers = this.observers.slice(0);
	        var len = observers.length;
	        while (++index < len) {
	            observers[index].next(value);
	        }
	    };
	    Subject.prototype._error = function (err) {
	        var index = -1;
	        var observers = this.observers;
	        var len = observers.length;
	        // optimization -- block next, complete, and unsubscribe while dispatching
	        this.observers = void 0;
	        this.isUnsubscribed = true;
	        while (++index < len) {
	            observers[index].error(err);
	        }
	        this.isUnsubscribed = false;
	    };
	    Subject.prototype._complete = function () {
	        var index = -1;
	        var observers = this.observers;
	        var len = observers.length;
	        // optimization -- block next, complete, and unsubscribe while dispatching
	        this.observers = void 0; // optimization
	        this.isUnsubscribed = true;
	        while (++index < len) {
	            observers[index].complete();
	        }
	        this.isUnsubscribed = false;
	    };
	    return Subject;
	})(Observable_1.Observable);
	exports.Subject = Subject;
	var BidirectionalSubject = (function (_super) {
	    __extends(BidirectionalSubject, _super);
	    function BidirectionalSubject(source, destination) {
	        _super.call(this);
	        this.source = source;
	        this.destination = destination;
	    }
	    BidirectionalSubject.prototype._subscribe = function (subscriber) {
	        var operator = this.operator;
	        return this.source._subscribe.call(this.source, operator ? operator.call(subscriber) : subscriber);
	    };
	    BidirectionalSubject.prototype.next = function (value) {
	        subscriberNext.call(this, value);
	    };
	    BidirectionalSubject.prototype.error = function (err) {
	        subscriberError.call(this, err);
	    };
	    BidirectionalSubject.prototype.complete = function () {
	        subscriberComplete.call(this);
	    };
	    BidirectionalSubject.prototype._next = function (value) {
	        _subscriberNext.call(this, value);
	    };
	    BidirectionalSubject.prototype._error = function (err) {
	        _subscriberError.call(this, err);
	    };
	    BidirectionalSubject.prototype._complete = function () {
	        _subscriberComplete.call(this);
	    };
	    return BidirectionalSubject;
	})(Subject);
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Subscriber_1 = __webpack_require__(13);
	var root_1 = __webpack_require__(20);
	var SymbolShim_1 = __webpack_require__(19);
	var rxSubscriber_1 = __webpack_require__(18);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is
	     * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
	     * of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @returns {Observable} a new observable with the Operator applied
	     * @description creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * @method Symbol.observable
	     * @returns {Observable} this instance of the observable
	     * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     */
	    Observable.prototype[SymbolShim_1.SymbolShim.observable] = function () {
	        return this;
	    };
	    /**
	     * @method subscribe
	     * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @returns {Subscription} a subscription reference to the registered handlers
	     * @description registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var subscriber;
	        if (observerOrNext && typeof observerOrNext === 'object') {
	            if (observerOrNext instanceof Subscriber_1.Subscriber) {
	                subscriber = observerOrNext;
	            }
	            else if (observerOrNext[rxSubscriber_1.rxSubscriber]) {
	                subscriber = observerOrNext[rxSubscriber_1.rxSubscriber]();
	            }
	            else {
	                subscriber = new Subscriber_1.Subscriber(observerOrNext);
	            }
	        }
	        else {
	            var next = observerOrNext;
	            subscriber = Subscriber_1.Subscriber.create(next, error, complete);
	        }
	        subscriber.add(this._subscribe(subscriber));
	        return subscriber;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {any} [thisArg] a `this` context for the `next` handler function
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @returns {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, thisArg, PromiseCtor) {
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        var nextHandler;
	        if (thisArg) {
	            nextHandler = function nextHandlerFn(value) {
	                var _a = nextHandlerFn, thisArg = _a.thisArg, next = _a.next;
	                return next.call(thisArg, value);
	            };
	            nextHandler.thisArg = thisArg;
	            nextHandler.next = next;
	        }
	        else {
	            nextHandler = next;
	        }
	        var promiseCallback = function promiseCallbackFn(resolve, reject) {
	            var _a = promiseCallbackFn, source = _a.source, nextHandler = _a.nextHandler;
	            source.subscribe(nextHandler, reject, resolve);
	        };
	        promiseCallback.source = this;
	        promiseCallback.nextHandler = nextHandler;
	        return new PromiseCtor(promiseCallback);
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source._subscribe(this.operator.call(subscriber));
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * @static
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @returns {Observable} a new cold observable
	     * @description creates a new cold Observable by calling the Observable constructor
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	})();
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var noop_1 = __webpack_require__(14);
	var throwError_1 = __webpack_require__(15);
	var tryOrOnError_1 = __webpack_require__(16);
	var Subscription_1 = __webpack_require__(17);
	var rxSubscriber_1 = __webpack_require__(18);
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    function Subscriber(destination) {
	        _super.call(this);
	        this.destination = destination;
	        this._isUnsubscribed = false;
	        if (!this.destination) {
	            return;
	        }
	        var subscription = destination._subscription;
	        if (subscription) {
	            this._subscription = subscription;
	        }
	        else if (destination instanceof Subscriber) {
	            this._subscription = destination;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () {
	        return this;
	    };
	    Object.defineProperty(Subscriber.prototype, "isUnsubscribed", {
	        get: function () {
	            var subscription = this._subscription;
	            if (subscription) {
	                // route to the shared Subscription if it exists
	                return this._isUnsubscribed || subscription.isUnsubscribed;
	            }
	            else {
	                return this._isUnsubscribed;
	            }
	        },
	        set: function (value) {
	            var subscription = this._subscription;
	            if (subscription) {
	                // route to the shared Subscription if it exists
	                subscription.isUnsubscribed = Boolean(value);
	            }
	            else {
	                this._isUnsubscribed = Boolean(value);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber();
	        subscriber._next = (typeof next === 'function') && tryOrOnError_1.tryOrOnError(next) || noop_1.noop;
	        subscriber._error = (typeof error === 'function') && error || throwError_1.throwError;
	        subscriber._complete = (typeof complete === 'function') && complete || noop_1.noop;
	        return subscriber;
	    };
	    Subscriber.prototype.add = function (sub) {
	        // route add to the shared Subscription if it exists
	        var _subscription = this._subscription;
	        if (_subscription) {
	            _subscription.add(sub);
	        }
	        else {
	            _super.prototype.add.call(this, sub);
	        }
	    };
	    Subscriber.prototype.remove = function (sub) {
	        // route remove to the shared Subscription if it exists
	        if (this._subscription) {
	            this._subscription.remove(sub);
	        }
	        else {
	            _super.prototype.remove.call(this, sub);
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this._isUnsubscribed) {
	            return;
	        }
	        else if (this._subscription) {
	            this._isUnsubscribed = true;
	        }
	        else {
	            _super.prototype.unsubscribe.call(this);
	        }
	    };
	    Subscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        if (destination.next) {
	            destination.next(value);
	        }
	    };
	    Subscriber.prototype._error = function (err) {
	        var destination = this.destination;
	        if (destination.error) {
	            destination.error(err);
	        }
	    };
	    Subscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (destination.complete) {
	            destination.complete();
	        }
	    };
	    Subscriber.prototype.next = function (value) {
	        if (!this.isUnsubscribed) {
	            this._next(value);
	        }
	    };
	    Subscriber.prototype.error = function (err) {
	        if (!this.isUnsubscribed) {
	            this._error(err);
	            this.unsubscribe();
	        }
	    };
	    Subscriber.prototype.complete = function () {
	        if (!this.isUnsubscribed) {
	            this._complete();
	            this.unsubscribe();
	        }
	    };
	    return Subscriber;
	})(Subscription_1.Subscription);
	exports.Subscriber = Subscriber;
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* tslint:disable:no-empty */
	function noop() { }
	exports.noop = noop;
	//# sourceMappingURL=noop.js.map

/***/ },
/* 15 */
/***/ function(module, exports) {

	function throwError(e) { throw e; }
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	function tryOrOnError(target) {
	    function tryCatcher() {
	        try {
	            tryCatcher.target.apply(this, arguments);
	        }
	        catch (e) {
	            this.error(e);
	        }
	    }
	    tryCatcher.target = target;
	    return tryCatcher;
	}
	exports.tryOrOnError = tryOrOnError;
	//# sourceMappingURL=tryOrOnError.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var noop_1 = __webpack_require__(14);
	var Subscription = (function () {
	    function Subscription(_unsubscribe) {
	        this.isUnsubscribed = false;
	        if (_unsubscribe) {
	            this._unsubscribe = _unsubscribe;
	        }
	    }
	    Subscription.prototype._unsubscribe = function () {
	        noop_1.noop();
	    };
	    Subscription.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var unsubscribe = this._unsubscribe;
	        var subscriptions = this._subscriptions;
	        this._subscriptions = void 0;
	        if (unsubscribe) {
	            unsubscribe.call(this);
	        }
	        if (subscriptions != null) {
	            var index = -1;
	            var len = subscriptions.length;
	            while (++index < len) {
	                subscriptions[index].unsubscribe();
	            }
	        }
	    };
	    Subscription.prototype.add = function (subscription) {
	        // return early if:
	        //  1. the subscription is null
	        //  2. we're attempting to add our this
	        //  3. we're attempting to add the static `empty` Subscription
	        if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var sub = subscription;
	        switch (typeof subscription) {
	            case 'function':
	                sub = new Subscription(subscription);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    var subscriptions = this._subscriptions || (this._subscriptions = []);
	                    subscriptions.push(sub);
	                }
	                break;
	            default:
	                throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
	        }
	    };
	    Subscription.prototype.remove = function (subscription) {
	        // return early if:
	        //  1. the subscription is null
	        //  2. we're attempting to remove ourthis
	        //  3. we're attempting to remove the static `empty` Subscription
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	})();
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var SymbolShim_1 = __webpack_require__(19);
	/**
	 * rxSubscriber symbol is a symbol for retreiving an "Rx safe" Observer from an object
	 * "Rx safety" can be defined as an object that has all of the traits of an Rx Subscriber,
	 * including the ability to add and remove subscriptions to the subscription chain and
	 * guarantees involving event triggering (can't "next" after unsubscription, etc).
	 */
	exports.rxSubscriber = SymbolShim_1.SymbolShim.for('rxSubscriber');
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var root_1 = __webpack_require__(20);
	function polyfillSymbol(root) {
	    var Symbol = ensureSymbol(root);
	    ensureIterator(Symbol, root);
	    ensureObservable(Symbol);
	    ensureFor(Symbol);
	    return Symbol;
	}
	exports.polyfillSymbol = polyfillSymbol;
	function ensureFor(Symbol) {
	    if (!Symbol.for) {
	        Symbol.for = symbolForPolyfill;
	    }
	}
	exports.ensureFor = ensureFor;
	var id = 0;
	function ensureSymbol(root) {
	    if (!root.Symbol) {
	        root.Symbol = function symbolFuncPolyfill(description) {
	            return "@@Symbol(" + description + "):" + id++;
	        };
	    }
	    return root.Symbol;
	}
	exports.ensureSymbol = ensureSymbol;
	function symbolForPolyfill(key) {
	    return '@@' + key;
	}
	exports.symbolForPolyfill = symbolForPolyfill;
	function ensureIterator(Symbol, root) {
	    if (!Symbol.iterator) {
	        if (typeof Symbol.for === 'function') {
	            Symbol.iterator = Symbol.for('iterator');
	        }
	        else if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	            // Bug for mozilla version
	            Symbol.iterator = '@@iterator';
	        }
	        else if (root.Map) {
	            // es6-shim specific logic
	            var keys = Object.getOwnPropertyNames(root.Map.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
	                    Symbol.iterator = key;
	                    break;
	                }
	            }
	        }
	        else {
	            Symbol.iterator = '@@iterator';
	        }
	    }
	}
	exports.ensureIterator = ensureIterator;
	function ensureObservable(Symbol) {
	    if (!Symbol.observable) {
	        if (typeof Symbol.for === 'function') {
	            Symbol.observable = Symbol.for('observable');
	        }
	        else {
	            Symbol.observable = '@@observable';
	        }
	    }
	}
	exports.ensureObservable = ensureObservable;
	exports.SymbolShim = polyfillSymbol(root_1.root);
	//# sourceMappingURL=SymbolShim.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module), (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(17);
	var Subscriber_1 = __webpack_require__(13);
	var SubjectSubscription = (function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, observer) {
	        _super.call(this);
	        this.subject = subject;
	        this.observer = observer;
	        this.isUnsubscribed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = void 0;
	        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
	            return;
	        }
	        if (this.observer instanceof Subscriber_1.Subscriber) {
	            this.observer.unsubscribe();
	        }
	        var subscriberIndex = observers.indexOf(this.observer);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	})(Subscription_1.Subscription);
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * an error thrown when an action is invalid because the object
	 * has been unsubscribed
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        _super.call(this, 'object unsubscribed');
	        this.name = 'ObjectUnsubscribedError';
	    }
	    return ObjectUnsubscribedError;
	})(Error);
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Observable_1 = __webpack_require__(12);
	var map_1 = __webpack_require__(25);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(13);
	var tryCatch_1 = __webpack_require__(26);
	var errorObject_1 = __webpack_require__(27);
	/**
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the returned observable
	 *
	 * @param {Function} project the function to create projection
	 * @param {any} [thisArg] an optional argument to define what `this` is in the project function
	 * @returns {Observable} a observable of projected values
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber) {
	        return new MapSubscriber(subscriber, this.project, this.thisArg);
	    };
	    return MapOperator;
	})();
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.thisArg = thisArg;
	        this.count = 0;
	    }
	    MapSubscriber.prototype._next = function (x) {
	        var result = tryCatch_1.tryCatch(this.project).call(this.thisArg || this, x, this.count++);
	        if (result === errorObject_1.errorObject) {
	            this.error(errorObject_1.errorObject.e);
	        }
	        else {
	            this.destination.next(result);
	        }
	    };
	    return MapSubscriber;
	})(Subscriber_1.Subscriber);
	//# sourceMappingURL=map.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var errorObject_1 = __webpack_require__(27);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 27 */
/***/ function(module, exports) {

	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Observable_1 = __webpack_require__(12);
	var distinctUntilChanged_1 = __webpack_require__(29);
	Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(13);
	var tryCatch_1 = __webpack_require__(26);
	var errorObject_1 = __webpack_require__(27);
	function distinctUntilChanged(compare) {
	    return this.lift(new DistinctUntilChangedOperator(compare));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = (function () {
	    function DistinctUntilChangedOperator(compare) {
	        this.compare = compare;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber) {
	        return new DistinctUntilChangedSubscriber(subscriber, this.compare);
	    };
	    return DistinctUntilChangedOperator;
	})();
	var DistinctUntilChangedSubscriber = (function (_super) {
	    __extends(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare) {
	        _super.call(this, destination);
	        this.hasValue = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var result = false;
	        if (this.hasValue) {
	            result = tryCatch_1.tryCatch(this.compare)(this.value, value);
	            if (result === errorObject_1.errorObject) {
	                this.destination.error(errorObject_1.errorObject.e);
	                return;
	            }
	        }
	        else {
	            this.hasValue = true;
	        }
	        if (Boolean(result) === false) {
	            this.value = value;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	})(Subscriber_1.Subscriber);
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 30 */
/***/ function(module, exports) {

	exports.combineReducers = function (reducers) {
	    var reducerKeys = Object.keys(reducers);
	    return function (state, action) {
	        if (state === void 0) { state = {}; }
	        var hasChanged = false;
	        var nextState = {};
	        for (var i = 0; i < reducerKeys.length; i++) {
	            var key = reducerKeys[i];
	            var reducer = reducers[key];
	            var previousState = state[key];
	            var newState = reducer(previousState, action);
	            nextState[key] = newState;
	            hasChanged = hasChanged || previousState !== newState;
	        }
	        return hasChanged ? nextState : state;
	    };
	};
	exports.compose = function () {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (funcs.length === 0) {
	            return args[0];
	        }
	        var last = funcs[funcs.length - 1];
	        var rest = funcs.slice(0, -1);
	        return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
	    };
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var store_1 = __webpack_require__(7);
	var actions_1 = __webpack_require__(3);
	var selectedMacro = function (state, action) {
	    if (state === void 0) { state = null; }
	    switch (action.type) {
	        case actions_1.SELECT_MACRO:
	            return action.payload;
	        default:
	            return state;
	    }
	};
	var macroFilter = function (state, action) {
	    if (state === void 0) { state = ''; }
	    switch (action.type) {
	        case actions_1.SET_MACRO_FILTER:
	            return action.payload;
	        default:
	            return state;
	    }
	};
	var folderFilter = function (state, action) {
	    if (state === void 0) { state = ''; }
	    switch (action.type) {
	        case actions_1.SET_FOLDER_FILTER:
	            return action.payload;
	        default:
	            return state;
	    }
	};
	var macros = function (state, action) {
	    if (state === void 0) { state = []; }
	    switch (action.type) {
	        case actions_1.SET_MACROS:
	            return action.payload.slice(0);
	        default:
	            return state;
	    }
	};
	exports.rootReducer = store_1.combineReducers({
	    macroFilter: macroFilter,
	    folderFilter: folderFilter,
	    macros: macros
	});
	// function selectedMacro(state = null, action): number {
	//   switch (action.type) {
	//     case SELECT_MACRO:
	//       return action.data;
	//     default:
	//       return state;
	//   }
	// }
	// function macroFilter (state = '', action): string {
	//   switch (action.type) {
	//     case SET_MACRO_FILTER:
	//       return action.data;
	//     default:
	//       return state;
	//   }
	// }
	// function folderFilter (state = '', action): string {
	//   switch (action.type) {
	//     case SET_FOLDER_FILTER:
	//       return action.data;
	//     default:
	//       return state;
	//   }
	// }
	// function macros (state = [], action): Object[] {
	//   switch (action.type) {
	// 		case SET_MACROS:
	// 			return action.data.slice(0);
	// 		default:
	// 			return state;
	// 	}
	// }
	// export const rootReducer = combineReducers({
	//   macroFilter,
	//   folderFilter,
	//   macros
	// }) 


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var actions_1 = __webpack_require__(3);
	var selectors_1 = __webpack_require__(4);
	var MacroSelector = (function () {
	    function MacroSelector(AppStore) {
	        this.store = AppStore;
	    }
	    Object.defineProperty(MacroSelector.prototype, "filteredMacros", {
	        get: function () {
	            return selectors_1.filteredMacros(this.store.getState());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MacroSelector.prototype.onFilterChange = function (filter) {
	        this.store.dispatch(actions_1.setMacroFilter(filter));
	    };
	    return MacroSelector;
	})();
	exports.MacroSelector = MacroSelector;
	;
	exports.MacroSelectorComponent = {
	    controller: MacroSelector,
	    bindings: {
	        macros: '<'
	    },
	    template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <macro-filter placeholder=\"Filter Macros\" filter-change=\"$ctrl.onFilterChange(filter)\"></macro-filter>\n      </div>\n      <div class=\"panel-body\">\n        <ul>\n          <li ng-repeat=\"macro in $ctrl.filteredMacros\">{{macro.name}}</li>\n        </ul>\n      </div>\n    </div>\n\t"
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var actions_1 = __webpack_require__(3);
	var selectors_1 = __webpack_require__(4);
	var MacroFolderSelector = (function () {
	    function MacroFolderSelector(AppStore) {
	        this.store = AppStore;
	    }
	    Object.defineProperty(MacroFolderSelector.prototype, "filteredFolders", {
	        get: function () {
	            return selectors_1.filteredFolders(this.store.getState());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MacroFolderSelector.prototype.onFilterChange = function (filter) {
	        this.store.dispatch(actions_1.setFolderFilter(filter));
	    };
	    return MacroFolderSelector;
	})();
	exports.MacroFolderSelector = MacroFolderSelector;
	;
	exports.MacroFolderSelectorComponent = {
	    selector: 'macro-folder-selector',
	    template: "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <macro-filter placeholder=\"Filter Folders\" filter-change=\"$ctrl.onFilterChange(filter)\"></macro-filter>\n      </div>\n      <div class=\"panel-body\">\n        <ul>\n          <li ng-repeat=\"folder in $ctrl.filteredFolders\">{{folder.name}}</li>\n        </ul>\n      </div>\n\t",
	    controller: MacroFolderSelector
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	var MacroFilter = (function () {
	    function MacroFilter() {
	    }
	    return MacroFilter;
	})();
	exports.MacroFilter = MacroFilter;
	;
	exports.MacroFilterComponent = {
	    bindings: {
	        placeholder: '@',
	        filterChange: '&'
	    },
	    template: "\n    <form>\n      <input class=\"form-control\" placeholder=\"{{::$ctrl.placeholder || 'Filter'}}\" \n        ng-model=\"$ctrl.filterText\" ng-change=\"$ctrl.filterChange({filter: $ctrl.filterText})\">\n    </form>\n\t",
	    controller: MacroFilter
	};


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map
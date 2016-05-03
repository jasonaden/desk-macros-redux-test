import {Store} from 'redux';

// INTERFACES
import {IMacro} from '../states';

// ACTIONS
import {setSelectedMacroId, setMacroFilter, getMacroFilter, getFilteredMacros, getSelectedMacro} from '../states';
import {applyMacro} from '../../desk-agent-case-detail/states';

const mapStateToThis = (state) => {
  return {
    macroFilter: getMacroFilter(state),
    filteredMacros: getFilteredMacros(state),
    selectedMacro: getSelectedMacro(state)
    //selectedMacro: getSelectedMacro(state),
    //selectedMacroId: getSelectedMacroId(state),
    //filteredMacros: getFilteredMacros(state),
    //openCaseId: getOpenCaseId(state),
    //applyError: getMacroApplyError(state)
  };
}

const mapDispatchToThis = (dispatch) => {
  return {
    onSelectMacro: (macroId:number) => {
      dispatch(setSelectedMacroId(macroId));
    },
    onFilterChange: (filter:string) => {
      dispatch(setMacroFilter(filter));
    },
    applyMacro: (macro) => {
      dispatch(applyMacro(macro));
    }
  }
}


export class MacroList {

  constructor ($scope, $ngRedux) {
    let unsubscribe = $ngRedux.connect(mapStateToThis, mapDispatchToThis)(this);
    $scope.$on('$destroy', unsubscribe);
  }
  
  getMacroDisplay (macro: IMacro) {
    return macro.name;
  }
  
};

export const MacroListComponent = {
  controller: MacroList,
	template: `
    <filter-list-selector title="Select a macro">
      <filter>
        <filter-list-filter
          filter-change="$ctrl.onFilterChange(filter)"
          placeholder="Filter macros"></filter-list-filter>
      </filter>
      <list>
        <filter-list
          selected-id="$ctrl.macroFilter.selectedMacroId"
          list-items="$ctrl.filteredMacros"
          select-item="$ctrl.onSelectMacro(itemId)"
          item-name="$ctrl.getMacroDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
    <input ng-show='$ctrl.macroFilter.selectedMacroId > -1' type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro($ctrl.selectedMacro)" value="Apply Macro To Case"></input>
    <span class='danger' ng-show='$ctrl.macroFilter.macroApplyError'>{{$ctrl.macroFilter.macroApplyError}}</span>
	`
}

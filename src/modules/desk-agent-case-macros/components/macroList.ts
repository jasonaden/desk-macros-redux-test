import {Store} from 'redux';

// INTERFACES
import {IMacro} from '../states';

// ACTIONS
import {setSelectedMacroId, getMacroApplyError, setMacroFilter, getSelectedMacro, getSelectedMacroId, getFilteredMacros} from '../states';
import {getOpenCaseId} from '../../desk-agent-case-detail/states';
import {applyMacroToCase} from '../../desk-agent-case/states';

const mapStateToThis = (state) => {
  return {
    selectedMacro: getSelectedMacro(state),
    selectedMacroId: getSelectedMacroId(state),
    filteredMacros: getFilteredMacros(state),
    openCaseId: getOpenCaseId(state),
    applyError: getMacroApplyError(state)
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
    applyMacro: (caseId:number, macroId:number) => {
      dispatch(applyMacroToCase({caseId:caseId, macroId:macroId}));
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
          selected-id="$ctrl.selectedMacroId"
          list-items="$ctrl.filteredMacros"
          select-item="$ctrl.onSelectMacro(itemId)"
          item-name="$ctrl.getMacroDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
    <input ng-show='$ctrl.selectedMacro' type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro($ctrl.openCaseId, $ctrl.selectedMacroId)" value="Apply Macro To Case"></input>
    <span class='danger' ng-show='$ctrl.applyError'>{{$ctrl.applyError}}</span>
	`
}

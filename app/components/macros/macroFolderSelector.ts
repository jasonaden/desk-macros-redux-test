
import {Store} from 'redux';
import {setFolderFilter} from '../../states/macroFilter/actions';
import {filteredFolders} from '../../states/macroFilter/selectors';

export class MacroFolderSelector {
  store: Store;
  
  constructor(AppStore) {
    this.store = AppStore;
  }
  
  get filteredFolders () {
    return filteredFolders(this.store.getState())
  }
    
  onFilterChange (filter: string) {
    setFolderFilter(filter)
  }
  
};
export const MacroFolderSelectorComponent = {
  selector: 'macro-folder-selector',
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <macro-filter placeholder="Filter Folders" filter-change="$ctrl.onFilterChange(filter)"></macro-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="folder in $ctrl.filteredFolders">{{folder.name}}</li>
        </ul>
      </div>
	`,
  controller: MacroFolderSelector
}

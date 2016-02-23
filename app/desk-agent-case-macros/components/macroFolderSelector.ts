
import {Store} from '@ngrx/store';
import {setFolderFilter} from '../states/actions';
import {filteredFolders} from '../states/selectors';

export class MacroFolderSelector {
  store: Store<Object>;
  
  constructor(DeskStore) {
    this.store = DeskStore;
  }
  
  get filteredFolders () {
    return filteredFolders(this.store.getState());
  }
    
  onFilterChange (filter: string) {
    this.store.dispatch(setFolderFilter(filter));
  }
  
};

export const MacroFolderSelectorComponent = {
  controller: MacroFolderSelector,
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
	`
}

export const caseMod = angular.module('case', []);

import {CaseSelectorComponent, CaseFilterComponent} from './components';

caseMod
  .component('caseSelector', CaseSelectorComponent)
  .component('caseFilter', CaseFilterComponent);

export const caseMod = angular.module('case', []);

import {CaseSelectorComponent, CaseFilterComponent} from './components/index.js';

caseMod
  .component('caseSelector', CaseSelectorComponent)
  .component('caseFilter', CaseFilterComponent);

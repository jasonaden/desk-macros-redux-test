export const caseMod = angular.module('case', []);

import {CaseSelector, CaseFilter} from './components/';

caseMod
  .component('CaseSelector', CaseSelector)
  .component('CaseFilter', CaseFilter);

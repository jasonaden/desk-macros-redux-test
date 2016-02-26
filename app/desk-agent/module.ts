import {routes} from './config/routes';
import * as comp from './components';

export const deskAgentMod = angular.module('desk.agent', []);

deskAgentMod
  .config(routes)
  .component('deskAgent', comp.DeskAgentComponent);
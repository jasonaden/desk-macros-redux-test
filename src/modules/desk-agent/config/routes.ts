import {deskAgentMod} from '../module';

export const routes = ($stateProvider) => {
  $stateProvider.state('desk.agent', {
    abstract: true
  });
}
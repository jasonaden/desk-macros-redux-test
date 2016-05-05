import {caseMod} from '../module';
import {Case} from '../../desk/resources/case';

export const routes = ($stateProvider) => {
  
  $stateProvider.state('desk.agent.case', {
    abstract: true
  });

}

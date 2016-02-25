import {Store, createStore, combineReducers} from '@ngrx/store';
import {setMacros, macroReducers} from '../desk-agent-case-macros/states';
import {setCases, caseReducers} from '../desk-agent-case/states';
import {caseListReducers} from '../desk-agent-case-list/states';
import {caseDetailReducers} from '../desk-agent-case-detail/states';

export const rootReducer = combineReducers({
  deskAgentCaseMacros: macroReducers,
  deskAgentCase: caseReducers,
  deskAgentCaseDetail: caseDetailReducers,
  deskAgentCaseList: caseListReducers
});

export const DeskStore:Store<Object> = createStore(rootReducer).useValue;

// pre-load from fixture data
import {macroList} from '../data/macros';
import {caseList} from '../data/cases';
DeskStore.dispatch(setMacros(macroList));
DeskStore.dispatch(setCases(caseList));

import {Store, createStore} from '@ngrx/store';
import {macroList} from '../../data/macros';
import {caseList} from '../../data/cases';
import {setMacros} from '../../desk-agent-case-macros/states/actions';
import {setCases} from '../../desk-agent-case/states/actions';
// Reducers
import {rootReducer} from './reducers';

export const DeskStore:Store<Object> = createStore(rootReducer).useValue;
DeskStore.dispatch(setMacros(macroList));
DeskStore.dispatch(setCases(caseList));

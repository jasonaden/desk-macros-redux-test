
import {createSelector} from 'reselect';
import {ICase} from './interfaces';

// Simple selectors
export const cases = (state): ICase[] => state.deskAgentCase.cases;

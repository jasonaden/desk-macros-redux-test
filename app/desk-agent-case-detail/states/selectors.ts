
import {createSelector} from 'reselect';
import {ICase} from '../../desk-agent-case/states/interfaces';

export const openCase = (state):ICase => state.deskAgentCaseDetail.openCase;
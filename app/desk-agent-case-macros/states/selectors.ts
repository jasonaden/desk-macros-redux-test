
import {createSelector} from 'reselect';
import {IMacro} from './interfaces';


// Simple selectors
export const macros = (state): IMacro[] => state.deskAgentCaseMacros.macros;
export const macroFilter = (state): string => state.deskAgentCaseMacros.macroFilter;
export const selectedMacroId = (state): number => state.deskAgentCaseMacros.selectedMacroId;

// Composed selectors
export const filteredMacros: (state) => IMacro[] = createSelector(macros, macroFilter, filterMacros);
export const selectedMacro: (state) => IMacro = createSelector(macros, selectedMacroId, getSelectedMacro);

// Helper functions
function filterMacros (macros: IMacro[], macroFilter: string) {
  return macros.filter(macro => macro.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1);
}

function getSelectedMacro (macros: IMacro[], selectedMacroId: number) {
  return macros.find(macro => macro.id == selectedMacroId);
}

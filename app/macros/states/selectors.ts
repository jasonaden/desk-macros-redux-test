
import {createSelector} from 'reselect';

// Interfaces
interface IMacro {
  id: number,
  name: string,
  folders: String[]
}
interface IFolder {
  name: string
}

// Simple selectors
export const macros = (state): IMacro[] => state.macros.macros;
export const macroFilter = (state): string => state.macros.macroFilter;
export const folderFilter = (state): string => state.macros.folderFilter;
export const selectedMacroId = (state): number => state.macros.selectedMacroId;

// Composed selectors
export const macrosByFolder = createSelector(macros, groupByFolder);
export const filteredMacros: (state) => IMacro[] = createSelector(macros, macroFilter, filterMacros);
export const filteredFolders: (state) => IFolder[] = createSelector(macrosByFolder, folderFilter, filterFolders);
export const selectedMacro: (state) => IMacro = createSelector(macros, selectedMacroId, getSelectedMacro);

// Helper functions
function filterMacros (macros: IMacro[], macroFilter: string) {
  return macros.filter(macro => macro.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1);
}

function filterFolders (folders: IFolder[], folderFilter: string) {
  return folders.filter(f => f.name.toLowerCase().indexOf(folderFilter.toLowerCase()) > -1);
}

function getSelectedMacro (macros: IMacro[], selectedMacroId: number) {
  return macros.find(macro => macro.id == selectedMacroId);
}

function groupByFolder (macros: IMacro[]): Object[] {
  let folderList = [];
  let folders = {};
  macros.filter(m => !!m.folders.length)
  .forEach(m => {
    m.folders.forEach((f: string) => {
      if (!folders[f]) { 
        folders[f] = {name: f, macros: []};
      }
      folders[f].macros.push(m);
    })
  })
  for (let f in folders) {
    folderList.push(folders[f]);
  }
  return folderList;
}

function macrosNoFolder (macros): Object[] {
  return macros.filter(m => !m.folders.length);
}

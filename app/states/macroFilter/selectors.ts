
import {createSelector} from 'reselect';

// Simple selectors
export const macros = (state): Object[] => state.macros;
export const macroFilter = (state): string[] => state.macroFilter;


// Composed selectors
export const macrosByFolder = createSelector(macros, groupByFolder);

export const filteredMacros: (state) => Object[] = createSelector(macros, macroFilter, filterMacros);

export const filteredFolders = createSelector(macrosByFolder, macroFilter, filterFolders);


// Helper functions
function filterMacros (macros, macroFilter) { 
  return macros.filter(macro => macro.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1);
}

function filterFolders (folders, macroFilter) {
  return folders.filter(f => f.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1);
}

function groupByFolder (macros): Object[] {
  let folderList = [];
  let folders = {};
  macros.filter(m => m.folders.length)
  .forEach(m => {
    m.folders.forEach(f => {
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


import {createSelector} from 'reselect';

// Simple selectors
export const macros = (state): Object[] => state.macros;
export const macroFilters = (state): string[] => state.macroFilters;

// Composed selectors
export const macrosByFolder = createSelector(macros, groupByFolder);

export const filteredMacros = createSelector(macros, macroFilters, filterMacros);

export const filteredFolders = createSelector(macrosByFolder, macroFilters, (folders, macroFilters) =>
  folders.filter(f => f.name.toLowerCase().indexOf(macroFilters.toLowerCase()) > -1)
)

// Helper functions
function filterMacros (macros, macroFilters) { 
  return macros.filter(macro => macro.name.toLowerCase().indexOf(macroFilters.toLowerCase()) > -1);
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

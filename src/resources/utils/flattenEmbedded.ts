export function flattenEmbedded (data, headers) {
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map((flatten));
  } else {
    return flatten(data);
  }
  
  function flatten (data) {
    if (data._embedded) {
      for (let key in data._embedded) {
        data[key] = data._embedded[key];
      }
    }
    return data;
  }
}
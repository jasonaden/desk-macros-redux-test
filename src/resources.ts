export {Resource} from './resources/resource';

export {
  IResourceAdapter, 
  IResourceAdapterConfig, 
  IResourceRequestConfig,
  IEntityState
} from './resources/interfaces';

export {ResourceAdapter} from './resources/resource-adapter';

export {flattenEmbedded, generateConfig, joinUrl, parseJson, transform} from './resources/utils';
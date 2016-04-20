
import {action} from './action';
import {IResourceRequestConfig} from '../interfaces';
import {FINDING, ERROR} from '../constants';
import {splitSchema} from '../utils/splitSchema';
import {config} from './action-config';

export function find (config: config, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(FINDING, config.className));
    
    // TODO: This should not be tied to an HTTP request. What if the 
    // data needs to be stored in local storage? Should simply tell 
    // the adapter to load something and pass config data.
    return config.adapter.execute({
      url: config.url, 
      method: 'GET'
    })
    .then(
      res => {
        dispatch(splitSchema(config.schema, config.className, res.data));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.$q.reject(error);
      }
    );
  }
}
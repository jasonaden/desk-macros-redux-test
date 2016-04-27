import {action} from './action';
import {IResourceRequestConfig} from '../interfaces';
import {PATCHING, ERROR} from '../constants';
import {splitSchema} from '../utils/splitSchema';
import {config} from './action-config';

export function update (config: config, payload: any, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(PATCHING, config.className));

    return config.adapter.execute({
      url: config.url, 
      method: 'PATCH',
      data: payload
    })
    .then(
      res => {
        
        alert("Need to implement what to do after UPDATE (UPDATE STORE)");
        dispatch(splitSchema(config.schema, config.className, res.data));
        return res.data;
      },
      error => {
        alert('Error updating!');
        dispatch(action(ERROR, config.className, error));
        return config.$q.reject(error);
      }
    );
  }
}
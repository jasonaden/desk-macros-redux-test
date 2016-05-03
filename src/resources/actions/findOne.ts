

import {action} from './action';
import {IResourceRequestConfig} from '../interfaces';
import {FINDING_ONE, FIND_ONE, ERROR} from '../constants';
import {splitSchema} from '../utils/splitSchema';
import {config} from './action-config';

export function findOne (config: config, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(FINDING_ONE, config.className));
    return config.adapter.execute({
      url: config.url + '/' + args, 
      method: 'GET'
    })
    .then(
      res => {
        dispatch(action(FIND_ONE, config.className.toUpperCase(), res.data));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.$q.reject(error);
      }
    );
  }
}
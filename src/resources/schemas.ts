import {INgRedux} from 'ng-redux';
import {normalize, Schema, arrayOf} from 'normalizr';


import {Case} from './case';

const kase = new Schema('case');
const customer = new Schema('customer');
const message = new Schema('message');
const draft = new Schema('draft');

// If we don't flatten the HAL
// kase.define({
//   _embedded: {
//     customer: customer,
//     draft: draft,
//     message: message
//   }
// })

// Flattening the HAL
kase.define({
  customer: customer,
  draft: draft,
  message: message
})

angular.module('desk')
.run(($ngRedux: INgRedux, Case: Case) => {
  $ngRedux.subscribe(() => {
    const normalized = normalize(Case.state, arrayOf(kase));
    console.log(normalized);
  })
});

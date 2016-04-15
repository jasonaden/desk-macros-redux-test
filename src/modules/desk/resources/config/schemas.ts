import {Schema, arrayOf} from 'normalizr';
import {ApiV2Adapter} from './apiv2-adapter';

// Default options
let getOptions = (overrides = {}) => {
  let options = {
    idAttribute: ApiV2Adapter.generateSlug
  };
  return Object.assign(options, overrides);
}

/**
 * Schema setup for Case
 */
export const caseSchema = new Schema('case', getOptions());
/**
 * Schema setup for Interactions (reply, message, draft)
 */
export const interactionSchema = new Schema('interaction', getOptions());
export const messageSchema = new Schema('message', getOptions());
export const replySchema = new Schema('reply', getOptions());
/**
 * Schema setup for Customer
 */
export const customerSchema = new Schema('customer', getOptions());


interactionSchema.define({
  case: caseSchema
});

customerSchema.define({
  cases: arrayOf(caseSchema)
});

caseSchema.define({
  customer: customerSchema,
  draft: interactionSchema,
  message: interactionSchema,
  replies: arrayOf(interactionSchema)
});

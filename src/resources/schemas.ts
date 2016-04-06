import {INgRedux} from 'ng-redux';
import {normalize, Schema, arrayOf} from 'normalizr';


import {Case} from './case';

/**
 * Schema setup for Case
 */
export const caseSchema = new Schema('case');
/**
 * Schema setup for Interactions (reply, message, draft)
 */
export const interactionSchema = new Schema('interaction');
export const messageSchema = new Schema('message');
export const replySchema = new Schema('reply');
/**
 * Schema setup for Customer
 */
export const customerSchema = new Schema('customer');


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

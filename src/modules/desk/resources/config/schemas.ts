import {Schema, arrayOf} from 'normalizr';

// We're going to use the 'self' value as the slug
export function generateSlug (entity) {
  let key = (entity._links && entity._links.self && entity._links.self.href) || entity.id;
  if (!key) {
    return;
  }
  /*if (key.indexOf('/api/v2') == 0) {
    key = key.slice(7)
  }*/
  return key;
}

// Default options
let getOptions = (overrides = {}) => {
  let options = {
    idAttribute: generateSlug
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
export const draftSchema = new Schema('draft', getOptions());
export const messageSchema = new Schema('message', getOptions());
export const replySchema = new Schema('reply', getOptions());
/**
 * Schema setup for Customer
 */
export const customerSchema = new Schema('customer', getOptions());
export const userSchema = new Schema('user', getOptions());
export const userListSchema = new Schema('USERLIST', getOptions({idAttribute: () => 'USERLIST'}));

export const caseChangesSchema = new Schema('changes', getOptions());
export const caseListSchema = new Schema('CASELIST', getOptions({idAttribute: () => 'CASELIST'}));
export const changesSchema = new Schema('CHANGES', getOptions({idAttribute: () => 'CHANGES'}));

export const noteSchema = new Schema('note', getOptions());
export const noteListSchema = new Schema('NOTESLIST', getOptions({idAttribute: () => 'NOTESLIST'}));

export const labelSchema = new Schema('label', getOptions());
export const labelListSchema = new Schema('LABELSLIST', getOptions({idAttribute: () => 'LABELSLIST'}));

export const genericSchema = new Schema('generic', getOptions());
export const genericListSchema = new Schema('GENERICLIST', getOptions({idAttribute: () => 'GENERICLIST'}));
genericListSchema.define({
  _embedded: {
    entries: arrayOf(genericSchema)
  }
});

noteListSchema.define({
  _embedded: {
    entries: arrayOf(noteSchema)
  }
});

labelListSchema.define({
  _embedded: {
    entries: arrayOf(labelSchema)
  }
});

interactionSchema.define({
  case: caseSchema
});

customerSchema.define({
  cases: arrayOf(caseSchema)
});

caseSchema.define({
  _embedded: {
    customer: customerSchema, 
    draft: draftSchema,
    message: messageSchema, 
    replies: arrayOf(interactionSchema)
  }  
});

caseChangesSchema.define( {
  new: arrayOf(caseSchema),
  changed: arrayOf(caseSchema),
  removed: arrayOf(caseSchema)
});

caseListSchema.define( {
  _embedded: {
    entries: arrayOf(caseSchema)
  }
});

userListSchema.define( {
  _embedded: {
    entries: arrayOf(userSchema)
  }
});

changesSchema.define({
  changed: arrayOf(caseSchema),
  new: arrayOf(caseSchema)
});

export const appSchema = {
  case: caseSchema, 
  interaction: interactionSchema, 
  draft: draftSchema,
  message: messageSchema,
  reply: replySchema,
  customer: customerSchema,
  changes: caseChangesSchema,
  CASELIST: caseListSchema,
  CHANGESLIST: changesSchema,
  USERLIST: userListSchema,
  user: userSchema,
  note: noteSchema,
  NOTESLIST: noteListSchema,
  label: labelSchema,
  LABELSLIST: labelListSchema,
  generic: genericSchema,
  GENERICLIST: genericListSchema
}
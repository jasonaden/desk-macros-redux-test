
import {Case} from '../resources/case';
import {Customer} from '../resources/customer';
import {User} from '../resources/user';

// export const resourceSchema = {
export const caseRelateds = {
    customer: {
        class: 'User',
        uiResource: 'Customer',
    },
    user: {
        class: 'User',
        uiResource: 'User'
    },
    notes: {
        type: 'note',
        uiResource: 'Note'
    }
}

// TODO: Placeholder, didn't look at what's customer has as _links
export const customerRelateds = {
    case: {
        class: 'Case',
        uiResource: 'uiCase'
    }
}

export const relatedToClass = {
    case: 'Case',
    customer: 'User',
    user: 'User' 
}


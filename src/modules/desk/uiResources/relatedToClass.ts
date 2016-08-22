
import {Case} from '../resources/case';
import {Customer} from '../resources/customer';
import {User} from '../resources/user';

// export const resourceSchema = {
export const caseRelateds = {
    customer: {
        class: 'User',
        uiResource: 'uiCustomer',
    },
    user: {
        class: 'User',
        uiResource: 'uiUser'
    },
    notes: {
        class: 'Note',
        uiResource: 'uiNote'
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


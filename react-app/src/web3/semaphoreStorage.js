// The functions in this file handle the storage of identities (keypair,
// identityNullifier, and identityTrapdoor) in the browser's localStorage. The
// identityCommitment is deterministically derived using libsemaphore's
// genIdentityCommitment function, so we don't store it.

import {
    serialiseIdentity,
    unSerialiseIdentity,
} from 'libsemaphore'

const localStorage = window.localStorage

// The storage key depends on the mixer contracts to prevent conflicts
// const postfix = config.chain.contracts.SemaphoreClient.slice(2).toLowerCase()
const postfix = Math.floor(Math.random() * 10000000);
const key = `SU_${postfix}`

const initStorage = () => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '')
    }
}

const storeId = (identity) => {
    localStorage.setItem(key, serialiseIdentity(identity))
}

const retrieveId = () => {
    var d = localStorage.getItem(key) 
    if (d==null){
        d = "";
    }
    return unSerialiseIdentity(d)
}

const hasId = () => {
    const d = localStorage.getItem(key)
    return d != null && d.length > 0
}

export {
    initStorage,
    storeId,
    retrieveId,
    hasId,
}

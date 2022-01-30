
import {
    Identity,
    genIdentity,
    genIdentityCommitment,
    genCircuit,
    serialiseIdentity,
	genWitness,
    genExternalNullifier,
    genProof,
    genPublicSignals,
    genBroadcastSignalParams,
} from 'libsemaphore';

import {
    initStorage,
    storeId,
    retrieveId,
    hasId,
} from './semaphoreStorage';

const initLocalStorage = (id) => {
    initStorage(id);
}

const generateIdentityCommitment = (id) => {
    console.log("in generate identity")
    console.log("id: ", id);
    let identity = "";
    if (hasId(id)) {
        identity = retrieveId(id)
    } else {
        identity = genIdentity()
        storeId(identity, id)
    }
    let identityCommitment = genIdentityCommitment(identity)
    return identityCommitment;
}

const getExternalNullifiers = async (semaphoreContract) => {
    const firstEn = await semaphoreContract.firstExternalNullifier()
    const lastEn = await semaphoreContract.lastExternalNullifier()

    const ens = [ firstEn ]
    let currentEn = firstEn

    while (currentEn.toString() !== lastEn.toString()) {
        currentEn = await semaphoreContract.getNextExternalNullifier(currentEn)
        ens.push(currentEn)
    }

    return ens
}

//returns all the signals and external nullifiers
// const getContractData = async () => {
//     const semaphoreContract = await getSemaphoreContract(context)
//     const semaphoreClientContract = await getSemaphoreClientContract(context)
//     let ens = [];
//     let signals = [];

//     // if (!hasCheckedRegistration) {
//     //     const leaves = await semaphoreClientContract.getIdentityCommitments()
//     //     if (leaves.map((x) => x.toString()).indexOf(identityCommitment.toString()) > -1) {
//     //         setHasRegistered(true)
//     //         setHasCheckedRegistration(true)
//     //     }
//     // }

//     if (externalNullifiers.length === 0) {
//         ens = await getExternalNullifiers(semaphoreContract)
//     }

//     const nextSignalIndex = (await semaphoreClientContract.getNextSignalIndex()).toNumber()

//     for (let i=0; i < nextSignalIndex; i++) {
//         const signal = await semaphoreClientContract.getSignalByIndex(i)
//         const en = await semaphoreClientContract.getExternalNullifierBySignalIndex(i)

//         signals.push({ signal, en })
//     }
//     return {ens, signals};
// }

export {
    initLocalStorage,
    generateIdentityCommitment
}
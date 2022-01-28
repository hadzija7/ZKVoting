import * as ethers from 'ethers'

// const scAbi = require('../../abi/SemaphoreClient.abi.json')
import semaphoreAbi from '@/../../abi/Semaphore.json';
import votingProcessAbi from '@/../../abi/VotingProcess.json';
import testAbi from '@/../../abi/Test.json';
import testBytecode from '@/../../bytecode/Test.json';
import bAbi from '@/../../abi/B.json';
import bBytecode from '@/../../bytecode/B.json';
import oneVoteAbi from '@/../../abi/OneVote.json';


import { ContractFactory } from 'ethers';
import { Contract } from 'ethers';
const votingProcessBytecode = require('@/../../bytecode/VotingProcess.json')

const semaphoreAddress = "0x4e5CdE8dD44B72a0bC742e20f8d5290E144C921a";
const testAddress = "0x54A0239E6f13d1D3ac77a93Ab8dEa49a4b7c40b4";
const oneVoteAddress = "0x24d1f4E8438aD5FAEB83bC099C8Be549275E07D9";

const deployVotingProcess = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    /*const factory = new ContractFactory(votingProcessAbi, votingProcessBytecode, signer);*/

    const semaphore = new Contract(semaphoreAddress, semaphoreAbi, signer);
    console.log("Semaphore contract: ", semaphore);

    const args = [
        "President election", "Really important process", ["Biden", "Trump", "Obama"], semaphore.address
    ];

    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const result = await oneVoteContract.createVotingProcess(...args);
    console.log("Result of create voting process: ", result);
    // If your contract requires constructor args, you can specify them here
    // const contract = await factory.deploy(...args);
}

const deployTestContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const factoryB = new ContractFactory(bAbi, bBytecode, signer);
    const contractB = await factoryB.deploy();

    console.log("Deployed B contract: ", contractB);

    const factory = new ContractFactory(testAbi, testBytecode, signer);
    const contract = await factory.deploy(1, contractB.address);

    console.log("Deployed test contract: ", contract);
}

const getTestContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const test = new Contract(testAddress, testAbi, signer);
    console.log("Test contract: ", test.address);
    await test.incrementState();
    const state = await test.state();   //.then(() => console.log("State: ", state))
    console.log("State: ", state);
}

const getVotingProcess = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const votingProcesses = await oneVoteContract.getProcesses();
    console.log("Voting processes: ", votingProcesses);
    return votingProcesses;
}

// const getProviderAndSigner = async (context) => {
//     const provider = new ethers.providers.Web3Provider(
//         await context.connector.getProvider(config.chain.chainId),
//     )
//     const signer = provider.getSigner()

//     return { provider, signer }
// }

// const getSemaphoreContract = async (context) => {
//     const { provider, signer } = await getProviderAndSigner(context)

//     return new ethers.Contract(
//         config.chain.contracts.Semaphore,
//         semaphoreAbi,
//         signer,
//     )
// }

// const getSemaphoreClientContract = async (context) => {
//     const { provider, signer } = await getProviderAndSigner(context)

//     return new ethers.Contract(
//         config.chain.contracts.SemaphoreClient,
//         scAbi,
//         signer,
//     )
// }

export {
    // getSemaphoreClientContract,
    // getSemaphoreContract,
    deployVotingProcess,
    deployTestContract,
    getTestContract,
    getVotingProcess
}

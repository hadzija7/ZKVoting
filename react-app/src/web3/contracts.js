import * as ethers from 'ethers'
import { Contract } from 'ethers';
import semaphoreAbi from '@/../../abi/Semaphore.json';
import semaphoreNetworks from '@/../../addresses/Semaphore.json';
import oneVoteAbi from '@/../../abi/OneVote.json';
import oneVoteNetworks from '@/../../addresses/OneVote.json';
import votingProcessAbi from '@/../../abi/VotingProcess.json';
// import testAbi from '@/../../abi/Test.json';
// import testBytecode from '@/../../bytecode/Test.json';
// import bAbi from '@/../../abi/B.json';
// import bBytecode from '@/../../bytecode/B.json';
// import oneVoteAddress from '@/../../address/OneVote.json'
// import { ContractFactory } from 'ethers';

// const semaphoreAddress = "0x4e5CdE8dD44B72a0bC742e20f8d5290E144C921a";
// const oneVoteAddress = "0x0BD1F114ca2307fA5919FAa76349688Bd541c6E4";
// const testAddress = "0x54A0239E6f13d1D3ac77a93Ab8dEa49a4b7c40b4";


const semaphoreAddress = semaphoreNetworks[1666700000].address;
const oneVoteAddress = oneVoteNetworks[1666700000].address;

const deployVotingProcess = async (name, description, proposals) => {
    console.log("One Vote testnet address: ", oneVoteAddress);
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const semaphore = new Contract(semaphoreAddress, semaphoreAbi, signer);
    console.log("Semaphore contract: ", semaphore);

    const args = [
        name, description, proposals, semaphore.address
    ];

    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const result = await oneVoteContract.createVotingProcess(...args)
    await result.wait()
    
    console.log("Result of create voting process: ", result);
    return result;
}


const getVotingProcesses = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const votingProcesses = await oneVoteContract.getProcesses();
    console.log("Voting processes: ", votingProcesses);
    return votingProcesses;
}

const getVotingProcess = async (id) => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const votingProcess = await oneVoteContract.getProcess(id);
    
    console.log("Voting process: ", votingProcess);
    return votingProcess;
}

const getVotingProcessContract = async (id) => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const oneVoteContract = new Contract(oneVoteAddress, oneVoteAbi, signer);
    const votingProcessAddress = await oneVoteContract.votingProcesses(id);
    const votingProcessContract = new Contract(votingProcessAddress, votingProcessAbi, signer);
    console.log("Voting process contract: ", votingProcessContract);
    return votingProcessContract;
}

export {
    deployVotingProcess,
    getVotingProcesses,
    getVotingProcess,
    getVotingProcessContract
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


// const deployTestContract = async () => {
//     const { ethereum } = window;
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();

//     const factoryB = new ContractFactory(bAbi, bBytecode, signer);
//     const contractB = await factoryB.deploy();

//     console.log("Deployed B contract: ", contractB);

//     const factory = new ContractFactory(testAbi, testBytecode, signer);
//     const contract = await factory.deploy(1, contractB.address);

//     console.log("Deployed test contract: ", contract);
// }

// const getTestContract = async () => {
//     const { ethereum } = window;
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const test = new Contract(testAddress, testAbi, signer);
//     console.log("Test contract: ", test.address);
//     await test.incrementState();
//     const state = await test.state();   //.then(() => console.log("State: ", state))
//     console.log("State: ", state);
// }
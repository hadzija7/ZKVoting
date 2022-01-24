import { useState } from 'react'
import VotingProcess from './VotingProcess'


const Home = () => {
    const [name, setName] = useState('Josh')

    const [processes, setProcesses] = useState([
        {"name": "Process1", "description": "Speech right", "id": 1},
        {"name": "Process2", "description": "Human right", "id": 2},
        {"name": "Process3", "description": "President election", "id": 3}
    ])

    const handleClick = (name) => {
        console.log("Clicked on the button " + name);
        setName('Alex')
    }


    return (  
        <div className="home">
            <h1>Public voting</h1>
            
            {processes.map((process) => (
                <VotingProcess className="VotingProcess" process = {process}/>
            ))}

        </div>
    );

}
 
export default Home;
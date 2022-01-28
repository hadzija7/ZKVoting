import styles from './VotingProcess.module.css'
import { Link } from 'react-router-dom';

const VotingProcess = (props) => {
    const process = props.votingProcess;
    
    return (  
        <div className={styles.votingProcess}>
            <div className={styles.votingChild}>
                <div style={{textAlign: "left"}}>
                    <h2 className={styles.title}>{process.name}</h2>
                </div>
                <div style={{textAlign: "left", position: "relative", left: "1em"}}>
                    <p>{process.description}</p>
                </div>
            </div>
            <div className={styles.votingChild}
                style={{display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                <Link to="/voting/1" className={styles.votingButton}>Vote</Link>
            </div>
        </div>
    );
}
 
export default VotingProcess
;
import Web3 from "web3";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react"; // useEffect runs the functions first
import "./App.css"
import Electionabi from './contracts/Hello.json'
import Body from './interface.js'

      function App() {
        const [refresh, setrefresh] = useState(0);
        useEffect(() => {
          loadWeb3();
          loadBlockchainData();

          if (refresh === 1) {
            setrefresh(0);
            loadBlockchainData();
          }
          //esl
        },[refresh]);
      
      
      const[hasVoted, sethasVoted] = useState(false) 
      const[curraccount, setCurraccount] = useState("");
      const[loader, setloader] = useState(true); 
      const[Electionsm, SetElectionsm] = useState({});
      const[candidate1, setCandidate1] = useState("");
      const[candidate2, setCandidate2] = useState("");
      const [candidate, setCandidate] = useState("");
      const [account, setAccount] = useState("");



      const loadWeb3 = async () => {
          if (window.ethereum) {
            await window.ethereum.enable();
          } else {
            window.alert(
              "Make your browser an Ethereum Browser. Tip: you can use Metamask"
            );
          }
        };

        const loadBlockchainData = async()=>{
          const web3 = new Web3(window.ethereum);

          const accounts = await web3.eth.getAccounts(); //get account from metamask
          const account = accounts[0]; // stores particular account
          setCurraccount(account);
          
          const networkId = await web3.eth.net.getId(); //fetch network id for the metamask conected network
          // we need address to interact with smart contract

          const  networkData = Electionabi.networks[networkId];

          if(networkData){ 
            const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
        
            const candidate1 = await election.methods.cand(1).call(); // fetch candidates
            const candidate2 = await election.methods.cand(2).call(); // fetch candidates
            const candidateId1 = candidate1.id;
            const candidateId2 = candidate2.id;
            const candidatename1 = candidate1.name;
            const candidatename2 = candidate2.name;
            const candidatevotes1 = candidate1.votes;
            const candidatevotes2 = candidate2.votes;

            setCandidate1(candidate1);
            setCandidate2(candidate2);
            SetElectionsm(election);
            setAccount(accounts[0]);
            setloader(false);
          }else{
              window.alert("the contract not deployed to detected network.")
          }
          return;
        }
        
        const votecandidate = async(candidateid) =>{
          setloader(true);
          await Electionsm
          .methods
          .vote(candidateid)
          .send({from : curraccount})
          .on('transactionhash',()=>{
            console.log("Successfull");
            sethasVoted(true);
          })
          
          setloader(false);

        }
        if(loader){
          return <div className="cont"><div className="loader"></div><h1>Refresh the page to redirect to the site</h1></div>
        }

        

        const onchange = (e)=>{
          setCandidate(e.target.value);
          console.log(e.target.value);
        };
        const onsubmit = (e)=>{
          e.preventDefault();
          if(candidate.id !== 0)
            votecandidate(Number(candidate));
          else
            window.alert("There seems some problem");  
        };
        return (
          <div className="App" id="voting"> 
           {/* <Navbar account={account}/> */}
           <Body />
           <div id="table">
             <h1 className="vote-head">Cast Your vote Here</h1>
             <p className="vote-subh">and <br/> get a reliable voting process and instant, trustworthy result.</p>
           <table>
                  <tr>
                    <th>Id</th>
                    <th>Candidate's Name</th>
                    <th>Votes</th>
                  </tr>
                  <tr>
                  <td>{candidate1.id}</td>
                  <td>{candidate1.name}</td>
                  <td>{candidate1.votes}</td>
                  </tr>
                  <tr>
                  <td>{candidate2.id}</td>
                  <td>{candidate2.name}</td>
                  <td>{candidate2.votes}</td>
                  </tr>
                  
                </table>
           </div>
              <div className="form-area">
                <form onSubmit={onsubmit} >
                        <select name="candidate" className="form-control" onChange={onchange}>
                          <option className="option">
                            Select Candidate
                          </option>
                          <option className="one1" value="1">{candidate1.name}</option>
                          <option className="one1" value="2">{candidate2.name}</option>
                        </select>
                        <button className="button">
                          Click here to Vote {""} {candidate}
                        </button>
                      </form>
                      <p className="add">Your Address: {account.substr(0, 20)}</p>
              </div>

              <footer>
                <p>Voters' vote® is a non-registered trademark of V is for voting , Inc. Copyright © 2021, Voters' vote</p>
              </footer>
                
          </div>
        
        );
      }


export default App;

import React, { Component } from 'react';
import './App.css';
import { Anchor } from 'antd';
import evmf1 from './photos/evmf1.png'
import evmf2 from './photos/evmf2.png'
import evmf3 from './photos/evmf3.png'
import evmf4 from './photos/evmf4.png'
import evmf5 from './photos/evmf5.png'
import App from './App'
import Navbar from './Navbar';
// import voting from './voting.jpg'

const { Link } = Anchor;


    const Body = ({ account }) => {
        return (
           <div className="App">
            <header className="App-header">
                <Anchor affix={true}>
                    <nav className="navbar shadow mb-5">
                        <h2 className="logo"> Voters' Vote </h2>
                        <ul className="navbar-nav">
                            <li className="nav-item text-white"><Link style={{ color: '#FFF' }} className="link" href="#table" title="Vote Here" /></li>
                        </ul>
                    </nav>
                </Anchor>    
            </header>
            <section className="one">
            <div className="one">
            <h1 className="main">V is <br/> for <br/> Voting</h1>
            <p className="voting"> in a safe, free fraudulent and transparent manner.</p>

            </div>
                
            </section>
            <section className="two">
                <div className="two">
                    <h1 className="two-head">Move to a better and efficient way of casting your decisions</h1>
                    <p className="two-subh">
                    Upgrade from manually counting ballots to an online election system without sacrificing the integrity of your vote
                    </p>
                </div>
            </section>
            <section className="photos">
                <div className="container">
                    <h1 className="photo-head">We saw your fading faith in the system</h1>
                    <p className="photo-subh">
                     Given below are some of the news articles focusing on the EVM frauds and how the trust of a VOTER has dwindled over time.
                    </p>
                    <div className="grid">
                        <img src={evmf4} className="emv" />
                        <img src={evmf3} className="emv" />
                        <img src={evmf5} className="emv" />
                        <img src={evmf2} className="emv" />
                        <img src={evmf1} className="emv" />
                    </div>
                </div>
            </section>
            <section className="three">
                <div className="three">
                    <h1 className="three-head">but, we've <br/>A decentralised voting system with control in no single hand</h1>
                    <p className="three-subh">
                    From secure polling software to the management of complex virtual voting events - we provide safety and security at your terms.
                    </p>
                </div>
                <div className="container">
                    <ul className="features">
                    <li className="cont-subh2">
                    Do not worry about people voting twice.
                    </li>
                    <li className="cont-subh2">
                    Send eligible voters to a personalized voting website, no online voting app download required.
                    </li>
                    <li className="cont-subh2">
                    No way there can be any form of vote manipulation.
                    </li>
                    <li className="cont-subh2">
                     Fair and Fraudulent proof Voting.
                    </li>
                    </ul>
                </div>
            </section>
        </div>
        );
      };


export default Body;

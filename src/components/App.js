import React, { Component } from 'react'
import Web3 from 'web3'
//import FGoldToken from '../abis_testnet/FGoldToken.json'
import FGoldToken from '../abis/FGoldToken.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    //const networkId = await web3.eth.net.getId()
    // console.log("XXXXXXXXXXXXXXXXXX")
    // console.log(networkId)
    // Load FGOLD blockchain data
    const fgoldTokenData = FGoldToken.networks[networkId]
    console.log("XXXXXXXXXXXXXXXXXX")
    console.log(networkId)
    console.log(fgoldTokenData.address)
    if(fgoldTokenData) {
      const fgoldToken = new web3.eth.Contract(FGoldToken.abi, fgoldTokenData.address)
      this.setState({ fgoldToken })
      let fgoldTokenBalance = await fgoldToken.methods.balanceOf(this.state.account).call()
      this.setState({ fgoldTokenBalance: fgoldTokenBalance.toString() })
    } else {
      window.alert('FGold Token contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-EVM detected. Only MetaMask currently supposted')
    }
  }

  approveSend = () => {

  }

  sendTokens = (amount, recipient) => {
    this.setState({ loading: true })
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log(amount)
    console.log(recipient)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")

    let tx = {
      from: this.state.account,
      to: this.state.fgoldToken._address,
      data: this.state.fgoldToken.methods.transfer(recipient, amount.toString()).encodeABI(),
      gas: 210000,  
    }
    window.web3.eth.sendTransaction(tx).then(res => {
      console.log("res",res)
      this.setState({ loading: false })
    }).catch(err => {
      console.log("err",err)
      this.setState({ loading: false })
    });

    // this.setState({ loading: true })
    // this.state.fgoldToken.methods.approve(this.state.fgoldToken._address, amount).send({ to: "0x94C9a8d4A6045CAde994Bd974D11170807608990",  }).on('transactionHash', (hash) => {
    //   this.state.fgoldToken.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    //     this.setState({ loading: false })
    //   })
    // })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      fgoldToken: {},
      fgoldTokenBalance: '0',
      toAddress: '0x',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        fgoldTokenBalance={this.state.fgoldTokenBalance}
        toAddress={this.state.toAddress}
        sendTokens={this.sendTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://lootswap.finance/guilds/fool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

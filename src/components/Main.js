import React, { Component } from 'react'
import fgold_coin from '../fgold.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">FGold Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {console.log(window.web3.utils.fromWei(this.props.fgoldTokenBalance, 'Ether'))}
              <td>{window.web3.utils.fromWei(this.props.fgoldTokenBalance, 'Ether')} FGold</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                let recipient
                recipient = this.input2.value.toString()
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.sendTokens(amount, recipient)
              }}>
              <div>
                <label className="float-left"><b>Transfer Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.fgoldTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={fgold_coin} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; fGold
                  </div>
                </div>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(addr) => { this.input2 = addr }}
                  className="form-control form-control-lg"
                  placeholder="0x"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; Address
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Send!</button>
            </form>
            
          </div>
        </div>

      </div>
    );
  }
}

export default Main;

const { assert } = require('chai')

const BaseToken = artifacts.require('BaseToken')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

function ntokens(n) {
  return web3.utils.fromWei(n, 'ether')
}

function showy(toShow) {
  console.log("%%%%%%%%%%%%%")
  console.log(toShow)
}

contract('BaseToken', ([deplo, uno, dos, tres]) => {
  let btoken

  before(async () => {
    btoken = await BaseToken.deployed()
  })

  it('supplied with', async () => {
      //let btoken = await BaseToken.deployed()
      let balance = await btoken.balanceOf(deplo)
      let weiBalance = ntokens(balance)
      assert.equal(weiBalance, '25000', "Balance should be 25k")
  })

  it('can transfer BaseTokens between accounts', async() => {
    let amount = tokens('1000')
    await btoken.transfer(uno, amount, {from: deplo} )
    let acct1Balance = await btoken.balanceOf(uno)
    let acct0Balance = await btoken.balanceOf(deplo)
    let weiBalance = ntokens(acct1Balance)
    assert.equal(weiBalance, '1000', "After transfer, account should have 1k tokens")
  })

  it('account uno can transfer to another account', async() => {
    let amount = tokens('200')
    await btoken.transfer(dos, amount, {from: uno} )
    await btoken.transfer(dos, amount)
    let acct2Balance = await btoken.balanceOf(dos)
    let wei2Balance = fgntokensolds(acct2Balance)
    let wei1Balance = ntokens(await btoken.balanceOf(uno))
    showy(wei2Balance)
    showy(wei1Balance)
    assert.equal(wei2Balance, '200', "After transfer, account 2 should have 200 tokens")
  })
})

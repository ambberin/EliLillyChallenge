const express = require('express')
const path = require('path')
const stocks = require('./stocks')
var cors = require('cors') //added cors library

const app = express()
app.use(express.static(path.join(__dirname, 'static')),cors())

app.get('/stocks', async (req, res, next) => {
  try {
    const stockSymbols = await stocks.getStocks()
    if(stockSymbols.length == 0){
      res.send({error:'Data not found! Please check the stocks data file.'})
    } else {
      res.send({ stockSymbols })
    }
  } catch(err) {
    next(err)
  }
})

//   try {
//     // Return an empty array to simulate no data
//     // const stockSymbols = await stocks.getStocks();
//     const stockSymbols = [];

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  res.send(data)
})

app.listen(3000, () => console.log('Server is running!'))
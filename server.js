// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const { Telegraf } = require('telegraf');
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const express = require('express');
const { url } = require('telegraf/typings/button');
const app = express();
const url = 'https://cointradermonitor.com/preco-bitcoin-brasil';

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;

//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));
//Initialises the express server on the port 30000
app.listen(port, ip);

const bot = new Telegraf(process.env.BOT_TOKEN)
// const bot = new Telegraf(process.env.BOT_TOKEN);
//  bot.telegram.sendMessage(process.env.CHAT_ID,'Bem-vindo(a) ao Bot de Alertas - Todas as Exchanges!');
// bot.telegram.sendMessage(process.env.CHAT_ID,'Bem-vindo(a) ao Bot de Alertas - Todas as Exchanges Brasileiras!');
// bot.start((ctx) => ctx.reply())
// bot.help((ctx) => ctx.reply('Comprar agora!'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.launch()

   async function webcrawler() {

  const browser = await puppeteer.launch(
    {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
  );  
  
  const page = await browser.newPage();
  const proxy = 'https://cors-anywhere.herokuapp.com/';

//turns request interceptor on
await page.setRequestInterception(true);
//if the page makes a  request to a resource type of image then abort that request
page.on('request', request => {
  if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
    request.abort();
  else
    request.continue();
});
  await page.goto(url);
  // Pegar últimos preços do Bitcoin na página da Cointrademonitor
  
    const pageContent = await page.evaluate(() => {
     
      //toda essa função será executada no browser
      // setTimeout(console.log("Aguardando o carregamento da página...") ,10000)
      
      const tdBinance = document.querySelector("#row_bin > td:nth-child(3)")
      const tdNovaDAX = document.querySelector("#row_ndx > td:nth-child(3)")
      const tdBitPreco = document.querySelector("#row_bpc > td:nth-child(3)")
      const tdBitcoinToYou = document.querySelector("#row_bta > td:nth-child(3)")
      const tdMercadoBitcoin = document.querySelector("#row_mbc > td:nth-child(3)")
      const tdFoxbit = document.querySelector("#row_fxb > td:nth-child(3)")
      // const spanBrasilBitcoinOTC = document.querySelector("#row_bbo > td:nth-child(3)");
      const tdFtx = document.querySelector("#row_ftx > td:nth-child(3)")
      const tdBitso = document.querySelector("#row_bso > td:nth-child(3)")
      const tdBitcoinTrade = document.querySelector("#row_btt > td:nth-child(3)")
      const tdBitnuvem = document.querySelector("#row_btn > td:nth-child(3)")
      const tdCoinext = document.querySelector("#row_cnt > td:nth-child(3)")
      const tdBrasilBitcoin = document.querySelector("#row_bbn > td:nth-child(3)")
      const tdBlocktane = document.querySelector("#row_bsa > td:nth-child(3)")
      const tdBitrecife = document.querySelector("#row_brf > td:nth-child(3)")
      const tdPagCripto = document.querySelector("#row_pgc > td:nth-child(3)")
      const tdLiqi = document.querySelector("#row_liq > td:nth-child(3)")
      const tdStonoex = document.querySelector("#row_bsp > td:nth-child(3)")
      const tdWalltime = document.querySelector("#row_wtm > td:nth-child(3)")
      const tdP2PCripto = document.querySelector("#row_p2t > td:nth-child(3)")
      const tdNoxBitcoin = document.querySelector("#row_nox > td:nth-child(3)")
      const tdB2UPro = document.querySelector("#row_bty > td:nth-child(3)")
      const tdflowBTC = document.querySelector("#row_flw > td:nth-child(3)")
      const tdAstroPay = document.querySelector("#row_atp > td:nth-child(3)")
      const tdCitcoin = document.querySelector("#row_ctc > td:nth-child(3)")
      const tdMakesExchange = document.querySelector("#row_mke > td:nth-child(3)")
      const tdUpCambio = document.querySelector("#row_upc > td:nth-child(3)")

      return { 
        Binance: tdBinance != null ? tdBinance.dataset.float : '',
        NovaDAX: tdNovaDAX != null ? tdNovaDAX.dataset.float : '',
        BitPreco: tdBitPreco != null ? tdBitPreco.dataset.float : '',
        BitcoinToYou : tdBitcoinToYou != null ? tdBitcoinToYou.dataset.float : '',
        MercadoBitcoin : tdMercadoBitcoin != null ? tdMercadoBitcoin.dataset.float : '',
        Foxbit : tdFoxbit != null ? tdFoxbit.dataset.float : '',
        Ftx : tdFtx != null ? tdFtx.dataset.float : '',
        Bitso : tdBitso != null ? tdBitso.dataset.float : '',
        BitcoinTrade : tdBitcoinTrade != null ? tdBitcoinTrade.dataset.float : '',
        Bitnuvem : tdBitnuvem != null ? tdBitnuvem.dataset.float : '',
        Coinext : tdCoinext != null ? tdCoinext.dataset.float : '',
        BrasilBitcoin : tdBrasilBitcoin != null ? tdBrasilBitcoin.dataset.float : '',
        Blocktane : tdBlocktane != null ? tdBlocktane.dataset.float : '',
        Bitrecife : tdBitrecife != null ? tdBitrecife.dataset.float : '',
        PagCripto : tdPagCripto != null ? tdPagCripto.dataset.float : '',
        Liqi : tdLiqi != null ? tdLiqi.dataset.float : '',
        Stonoex : tdStonoex != null ? tdStonoex.dataset.float : '',
        Walltime : tdWalltime != null ? tdWalltime.dataset.float : '',
        P2PCripto : tdP2PCripto != null ? tdP2PCripto.dataset.float : '',
        NoxBitcoin : tdNoxBitcoin != null ? tdNoxBitcoin.dataset.float : '',
        B2UPro : tdB2UPro != null ? tdB2UPro.dataset.float : '',
        flowBTC : tdflowBTC != null ? tdflowBTC.dataset.float : '',
        AstroPay : tdAstroPay != null ? tdAstroPay.dataset.float : '',
        Citcoin : tdCitcoin != null ? tdCitcoin.dataset.float : '',
        MakesExchange : tdMakesExchange != null ? tdMakesExchange.dataset.float : '',
        UpCambio : tdUpCambio != null ? tdUpCambio.dataset.float : ''
      }
    })
    // const nodesExchanges = document.getElementsByClassName('exchange_row');
    await browser.close();
    // console.log(`pageContent: ${pageContent.Binance}`);
  return {
    "Binance": pageContent.Binance ,
    "NovaDAX": pageContent.NovaDAX,
    "BitPreco": pageContent.BitPreco,
    "BitcoinToYou": pageContent.BitcoinToYou,
    "MercadoBitcoin" : pageContent.MercadoBitcoin,
    "Foxbit": pageContent.Foxbit,
    "Ftx": pageContent.Ftx,
    "Bitso": pageContent.Bitso,
    "BitcoinTrade": pageContent.BitcoinTrade,
    "Bitnuvem":pageContent.Bitnuvem,
    "Coinext": pageContent.Coinext,
    "BrasilBitcoin": pageContent.BrasilBitcoin,
    "Blocktane": pageContent.Blocktane,
    "Bitrecife": pageContent.Bitrecife,
    "PagCripto": pageContent.PagCripto,
    "Liqi": pageContent.Liqi,
    "Stonoex": pageContent.Stonoex,
    "Walltime": pageContent.Walltime,
    "P2PCripto": pageContent.P2PCripto,
    "NoxBitcoin": pageContent.NoxBitcoin,
    "B2UPro": pageContent.B2UPro,
    "flowBTC": pageContent.flowBTC,
    "AstroPay": pageContent.AstroPay,
    "Citcoin": pageContent.Citcoin,
    "MakesExchange": pageContent.MakesExchange,
    "UpCambio": pageContent.UpCambio
  }
  
   };
  setInterval( async () => {
    const data = await webcrawler();
    const lowerLimit = 50000; //preço muito abaixo do mercado atual R$ 50.000,00
    for (let exchange in data) {
      if (data[exchange] <= lowerLimit)
        bot.telegram.sendMessage(process.env.CHAT_ID,`${exchange} : R$ ${data[exchange]} Oportunidade Imperdível! Acesse agora ${url}`)
      // console.log(`${exchange} : R$ ${data[exchange]}`)
        // console.log(data[exchange]);
      
    }
    // if (data.ask && data.bid){
      // console.log(data);
      // bot.hears('spread', (ctx) => ctx.reply(`Spread : ${calcSpread(data.ask,data.bid)}`));
      // bot.hears('ask', (ctx) => ctx.reply(`Melhor Compra: ${data.ask}`) );
      // bot.hears('bid', (ctx) => ctx.reply(`Melhor Venda: ${data.bid}`) );
      // if ( calcSpread(data.ask,data.bid) > 350 )
      // if ( calcSpread(data.ask,data.bid) > 50000 ){
      // bot.telegram.sendMessage(process.env.CHAT_ID,`Spread: R$ ${calcSpread(data.ask,data.bid).replace('.',',')} \nMelhor Compra: ${data.ask} \nMelhor Venda: ${data.bid} \nOportunidade Imperdível !!! Acesse agora ${url}`)
      // }
      
    // }
    
  }, 60000);

const { Telegraf } = require('telegraf');
const api = require('axios');
const queryString = require('querystring');
const express = require('express');
const app = express();
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;
const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.telegram.sendMessage(process.env.CHAT_ID,'Bem-vindo(a) ao Bot de Alertas - CoinTraderMonitor!');
bot.launch()

//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));
//Initialises the express server on the port 30000
app.listen(port, ip);

// Pegar últimos preços do Bitcoin na página da Cointrademonitor
async function webcrawler(path='/v1/ticker', data, method = 'GET') { 
  try {
    const qs = data ? `?${queryString.stringify(data)}` : '';
    const result = await api({
      method,
      url: `${process.env.API_URL}${path}${qs}`,
    })
    console.log(`${process.env.API_URL}${path}${qs}`)
    return result.data;
  } catch (err) {
    console.log(err);
  }
   };

  setInterval( async () => {
    const data = await webcrawler('/v1/ticker', { exchanges : true } );
    const exchanges = data.exchanges;
    
     if (exchanges){
      for (let exchange in exchanges) {
        let lastPrice = exchanges[exchange].last;
        let exchangeName =  exchanges[exchange].name;
        let code = exchanges[exchange].code;
        if (code!= 'bcb' && lastPrice != '' && lastPrice < process.env.ALERT_LOWER_LIMIT){
          const buyMsg = `${exchangeName} : R$ ${lastPrice} - O mercado ficou doido ! Compre já ! Acesse agora ${process.env.URL}`;
          bot.telegram.sendMessage(process.env.CHAT_ID, buyMsg);
        }
        
          if (code!= 'bcb' && lastPrice != '' && lastPrice > process.env.ALERT_UPPER_LIMIT){
          const sellMsg = `${exchangeName} : R$ ${lastPrice} - O mercado ficou doido ! Venda já ! Acesse agora ${process.env.URL}`;
          bot.telegram.sendMessage(process.env.CHAT_ID, sellMsg);
          }
        
      }
    }
  }, process.env.CRAWLER_INTERVAL);
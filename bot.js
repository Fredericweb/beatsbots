const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors")

const { Telegraf } = require('telegraf')

const bot = new Telegraf('5119976984:AAGcLTIfNPk6Oqbn-U_jn3XNY863Tq8ViXY')

const msg = `
    *******Bienvenue sur zowblazBot********
    /help - pour plus d'info sur les commande du BOT
`;

const msgHelp = `
    /help - pour plus d'info sur les commande du BOT
    /echo - pour retourner un mot à l'ecran (/echo jeux retourne jeux )
`;
const web_link = "https://formappmessenka.herokuapp.com/";
// const link2 ="https://celebrated-torte-184681.netlify.app/"
// const link1 = "https://mproweb.uz/YTless/greenMarket/store/"

bot.start((ctx) =>{
  // bot.telegram.sendPhoto(ctx.chat.id,"https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Images_2015_logo.svg")
  ctx.reply("Bienvenu sur zowblazo bot", {
    reply_markup: {
      inline_keyboard: [[{ text: "Nouveau formulaire Messenka", web_app: { url: web_link } }
    ]]
    },
  })
}
 
);

bot.help((ctx) => {
    ctx.reply(msgHelp)
    
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
bot.launch()
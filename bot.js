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
const web_link = "https://beatsmarket.herokuapp.com/";
const link2 ="https://celebrated-torte-184681.netlify.app/"
const link1 = "https://mproweb.uz/YTless/greenMarket/store/"

bot.start((ctx) =>
  ctx.reply("Bienvenu sur beats markert", {
    reply_markup: {
      inline_keyboard: [[{ text: "0", web_app: { url: web_link } },
      { text: "2", web_app: { url: link2 } },{ text: "1", web_app: { url: link1 } },

    ]]
      
    },
  }),
);

bot.help((ctx) => {
    ctx.reply(msgHelp)
    
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/' ,(req,res)=>{
	res.send('')
})

app.post("/click", (req, res) => {
	let { total ,user } = req.body
	console.log(total);
  totalCart = total*100
  tab = [{ label: 'Casque Beats', amount: 100 * 100 }]
  tab[0].amount = totalCart
  console.log('totalCart = '+totalCart)
	console.log(user)
	bot.telegram.sendInvoice(user.id,{
		    title : "payement",
            description: "Casque Beats",
            payload:"A450-03",
            // start_parameter: 'online_conslutation',
            provider_token:"284685063:TEST:ZTRkOWZkZjRlNTgy",
            currency:"USD",
            photo_url:"https://mproweb.uz/YTless/greenMarket/store/img/pay.jpg",
            // need_name : true,
            // need_phone_number : true,
            // need_email : true,
            // need_shipping_address : true,
            // send_phone_number_to_provider : true,
            // is_flexible: false,
            prices: tab,
            reply_markup: {
                inline_keyboard: [[{ text: "payez "+total +"$US", pay:true }]] 
            }
	})
  bot.use(Telegraf.log())
  bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)) //      

  bot.on('successful_payment', async (ctx, next) => { //     
    await ctx.reply('SuccessfulPayment')
  })
  

})
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
bot.launch()
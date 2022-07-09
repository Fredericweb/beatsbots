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
// const link2 ="https://celebrated-torte-184681.netlify.app/"
// const link1 = "https://mproweb.uz/YTless/greenMarket/store/"

bot.start((ctx) =>
  ctx.reply("Bienvenu sur beats markert", {
    reply_markup: {
      inline_keyboard: [[{ text: "💳Achetez maintenant💳", web_app: { url: web_link } }

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
let c = 0

app.post("/click", (req, res) => {
	let { total, user } = req.body

  const t= total
  if(total>0 && c == 0){
    console.log(t);
	  console.log(user)
    const getInvoice = (e) => {
      const invoice ={
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
        prices: [{label : 'Casques Beats' , amount : e*100}],
        reply_markup: {
            inline_keyboard: [[{ text: "payez "+e +"$US", pay:true }]] 
        }

      
    }
    return invoice
  }
	bot.telegram.sendInvoice(user.id,getInvoice(total)
	)
  bot.use(Telegraf.log())
  bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)) //      

  bot.on('successful_payment', async (ctx, next) => { //     
    await ctx.reply('Paiement effectuée avec succès 👍👍 !!')
  })
  
  }else{
    console.log('marijoyz')
  }
  
  c=1

})
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
bot.launch()
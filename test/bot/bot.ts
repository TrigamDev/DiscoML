import { Client } from "discord.js";

const client = new Client({ intents: [] })
client.login( process.env[ 'TEST_BOT_TOKEN' ] )

client.once( "ready", () => { console.log( "ready" ) } )
const Machine = require("./machine.js")

const PORT = 1066
const KioskConfigPath = "/home/pi/KioskMedia/American-Freedom-Garden/"

Machine.setup(PORT, KioskConfigPath).then((machine)=>{
	console.log("ready!")
}).catch((error)=>{
	console.error(error)
})

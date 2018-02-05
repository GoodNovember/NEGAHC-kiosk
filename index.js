const Machine = require("./machine.js")

const ShouldLaunchKiosk = true
const PORT = 1066
const KioskConfigPath = "/home/pi/KioskMedia/American-Freedom-Garden/"

Machine.setup(PORT, KioskConfigPath, ShouldLaunchKiosk).then((machine)=>{
	console.log("ready!")
}).catch((error)=>{
	console.error(error)
})

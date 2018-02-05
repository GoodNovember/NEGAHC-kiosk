const express = require('express')
const app = express()
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const Omx = require('node-omxplayer')

const player = new Omx()

function setup(port, filePath){
	// filepath points to a directory which contains the config.json
	return new Promise((resolve, reject)=>{
		var interface = {}
		
		player.onerror = function(error){
			console.error(error)
		}
		
		app.use(express.static(path.join(__dirname, 'public')))
		app.use(express.static(filePath))
		
		app.get('/api/',(req, res)=>{
			res.send("hey, from the api")
		})
		
		app.get('/api/data',(req, res)=>{
			loadJSONFile(path.join(filePath,"/config.json")).then(data=>{
				res.send(normalize(filePath, data))
			}).catch(err=>{
				res.send({error:err})
			})
		})
		
		app.get('/api/play',(req, res)=>{
			if(req.query.video){
				res.sendStatus(200)
				playVideo(req.query.video)
			}else{
				res.sendStatus(404)
			}
		})
		
		//launch the server, attaching it to the specified port.
		app.listen(port, function(){
			console.log(`Listening on port: localhost:${port}`)
			LaunchChromeKiosk(`http://localhost:${port}`)
			resolve(interface)
		})

	})
}

function loadJSONFile(filePath){
	return new Promise((resolve, reject)=>{
		fs.readFile(filePath, {encoding:'utf-8'}, (error, fileAsString)=>{
			if(error){
				reject(error)
			}else{
				try{
					var content = JSON.parse(fileAsString)
					resolve(content)
				}catch(e){
					reject(e)
				}
			}
		})
	})
}

function normalize(filePath, obj){
	return {
		title:obj.title,
		files:obj.files.map((file)=>{
			var out = {}
			out.thumb = file.thumb // passed as is
			out.title = file.title // passed as is
			out.path = path.join(filePath, file.path) // creates a fully realized path instead of a relative one (used to play on omxplayer)
			return out
		})
	}
}

function LaunchChromeKiosk(url) {
    exec(`chromium-browser --kiosk --app-auto-launched ${url}`, function(error, stdout, stderr) {
        console.log("stdout: " + stdout)
        console.log("stderr: " + stderr)
        if (error !== null) {
            console.log("exec errror: " + error)
        }
    });
}

function playVideo(filePath){
	//plays the specified file with omxplayer, a video player that works
	//well on raspberry pi.
	
	if(!player.running){
		player.newSource(filePath, "both", false, 1.0)
	}
	
}

module.exports = {
	setup
}

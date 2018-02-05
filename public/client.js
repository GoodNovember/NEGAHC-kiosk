function LoadData(){
	fetch('/api/data').then(result=>{
		return result.json()
	}).then(data=>{
		if(data){
			const title = document.getElementById('title')
			const content = document.getElementById('content')
			title.innerText = data.title
			document.title = data.title
			data.files.map((file)=>{
				console.log(file)
				var elm = document.createElement('div')
				elm.classList.add("kiosk-video")
				var label = document.createElement("div")
				var img = document.createElement("img")
				img.src=file.thumb
				label.innerText = file.title
				elm.appendChild(img)
				elm.appendChild(label)
				elm.addEventListener("click", (event)=>{
					console.log(file.path)
					fetch(`/api/play?video=${file.path}`).catch((error)=>{
						console.error("Video Play Failure:",error)
					})
				})
				content.appendChild(elm)
			})
		}
	}).catch((err)=>{
		console.error(err)
	})
}
LoadData()

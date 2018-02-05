function LoadData(){
	fetch('/api/data').then(result=>{
		return result.json()
	}).then(data=>{
		if(data && !data.error){
			console.log(data)
			const title = document.getElementById('title')
			const content = document.getElementById('content')
			title.innerText = data.title
			document.title = data.title
			
			if(data.background && typeof data.background === "string"){
				document.body.style.background = `url("${data.background}")`
			}
			
			if(data.files && Array.isArray(data.files) && data.files.length > 0){
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
		}else{
			console.error("Data Load Error:", data)
		}
	}).catch((err)=>{
		console.error(err)
	})
}
LoadData()

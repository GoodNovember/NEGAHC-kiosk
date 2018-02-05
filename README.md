# Northeast Georgia History Center Kiosk

Created in early 2018 for the *American Freedom Garden*, but could be
used elsewhere.

Inside `index.js` you will find a variable: `KioskConfigPath` which 
points to a directory which contains a file called `config.json`

Inside the `config.json` file is the following:

```json
	{
		"title":"Large Text Appearing Above The Videos",
		"background":"./path/to/images/bg.jpg",
		"files":[
			{
				"path":"./path/to/videos/video1.mp4",
				"title":"Text to appear under the First Video",
				"thumb":"./path/to/images/thumbnail1.gif"
			},
			{
				"path":"./path/to/videos/video2.mp4",
				"title":"Text to appear under the Second Video",
				"thumb":"./path/to/images/thumbnail2.gif"
			},
			{
				"path":"./path/to/videos/video3.mp4",
				"title":"Text to appear under the Third Video",
				"thumb":"./path/to/images/thumbnail3.gif"
			},
		]
	}
```

## NOTES

- The paths in the `config.json` file are relative to where that file is.
- When running on the RaspberryPI, ensure the videos work well with the `omxplayer`.
- it helps to increase the RaspberryPI's video memory, setting it to 512 appears to work nicely but YMMV.

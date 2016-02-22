WAKENATOR 
==========
[Download for Ubuntu, Windows & OSX](https://github.com/edus44/wakenator/releases)

	
	#For desktop app
	cd desktop
	npm install
	DEBUG=wak* npm start
	
	#For server 
	cd server
	npm install
	DEBUG=wak* node index.js


`sudo apt-get install libappindicator1` is required in Ubuntu Desktop


####TODO
- Automate build process with grunt-gulp
- Working travis.yml with realeases autoupload
- Customizable wake message
- Improve builder.json

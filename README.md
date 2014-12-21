Remote Pi
=======
This app runs on a raspberry Pi allowing you remote access via a webrowser to
 run [Johnny-Five](https://github.com/rwaldron/johnny-five) programs.

![Remote Pi](screenshot.png)

# Getting Started

This takes about half an hour on my Model A+ pi (and you may need to run it a couple of times if the install doesnt finish):
```
npm install
````

Then you need to build the web UI:
```
npm run build
```

Then you'll need to sudo to access the GPIOs:
```
sudo node server
```

Then open a browser to the pi's IP: http://MY_PI_ADDRESS:3000

You're robots code will be running in the browser, but controlling the pins on the pi!

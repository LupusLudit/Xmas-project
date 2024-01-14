Javascript + css + html code for the "mau mau" card game.
Mau mau has many variants, my project is based on the Czech version of the game.
Edit:
In case you are having issues with loading the project dirrectly from the html file, here is the solution.
You might encounter error like this: "index.html:1 Access to script at 'your file path' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.". This is CORS error. It is basicly a security mechanism restricting how web pages can request resources from a different origin.
You can fix this error, by folowing theese steps:

1.Open your cmd/powershell.
2.Install "http-server", type:
```
npm install -g http-server
```
3.Change dirrectory, so we can acces the wanted file via "http-server", type:
```
cd /path to your dirrectory
```
4.Type:
```
http-server
```
5.Ctrl+Click the last available link.

The code should now run smoothly.

I personally recommend to run the code via programs designed to edit code, like InteliJ Idea or VS code (in VS code you can install the LiveServer pluggin and run the project dirrectly from there).

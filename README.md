
# ChatApp

  This project showcase implementation of a chat applications by allowing sending and receiving of messages between two user. It's a front-end only solution build with help of Web Socket and IndexedDB. 


## Demo

Please visit [http://vishalchaturvedi50.github.io/chat-app/](http://vishalchaturvedi50.github.io/chat-app/) for a quick demo of application. The application can be tested in two ways. 

 - Opening  the link side by side in same browser. 
	 - Open the above link in two tabs of same browser. 
	 - In tab 1 : choose current user as **Vishal Chat** and the friend as **John Anderson**. 
	 - In tab 2: choose current user as **John Anderson** and the friend as **Vishal Chat**. 
	 - You can now start sending and receiving messages between two tabs. 
 
 - opening the link in two different places. 
	 - Open the above link at two different devices (viz : one in chrome mobile other in chrome desktop). 
	 - In desktop -  choose current user as **Vishal Chat** and the friend as **John Anderson**. 
	 - In mobile -  choose current user as **John Anderson** and the friend as **Vishal Chat**. 
	 - You can now start sending and receiving messages between two tabs.  

 
  
## Implementation Details

1. The application is build on Angular framework with TypeScript, HTML5, SCSS and is a responsive application.  
2.  The application uses IndexedDB to store the messages locally on user's device. 
3. It also uses a free and open source web socket provided by websocket.in. 
4. The friend list is currently hard coded for the purpose of POC. 

## Running the application

  1. Prerequisite -  Have a latest version of npm installed. 
  2. Clone the repository locally.
  3. Run `npm install`  to install all the project dependency locally. 
  4. Run `npm run-script start` to run the project on http://localhost:4200. 
  5. Run `npm run-script test` to run the test cases. 
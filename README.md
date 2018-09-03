# Journey On

## Creating a Habit-building/Goal-tracking website using the full MERN stack and yarn

### Journey On is a site that allows you to set up a Journey towards an ultimate goal which you want to reach. Utilizing skills in both Front and back end technologies, the app allows the user to create multiple journeys, multiple tasks within those journeys to reach their end goal, and to save resources for themselves to reference along the way to aid in reaching the end of their journey. 

#### In order to help each user along the way they are provided with a personal Kanban board, where they set their tasks for each Journey, and can move each task along to different steps of completion. As tasks are created and deadlines set, they also automatically populate a calendar component built with React-big-calendar. Eventually this calendar will also have the ability to add tasks as well as have styling to help enforce Jerry Seinfeld's famous "Don't Break the Chain" advice for habit building. The user also always has access to a list of resources that they will build along the way to help them achieve their goals.

##### If a user has been away from the site beyond a certain time period (currently set at 5 days), or (coming soon) if they have passed a task deadline without updating their board, a node-cron scheduler uses node-mailer to send an email to them with a link to encourage them to continue on their journey.

##### This Project was built using the following technologies

	* React.js
	* Node.js
	* MongoDB
	* Mongoose
	* Express
	* Axios
	* Bootstrap (Reactstrap) 
	* JWT (JSON Web Token)
	* EXJWT (Express JWT)
	* Nodemailer
	* React Router
	* Bcrypt
	* moment.js
	* dotenv
	* morgan
	* node-cron
	* React-Big-Calendar
	* React-trello
	* Proptypes

##### Future Development Plans

	* More easily transition between multiple journeys
	* Ability to add tasks directly from the calendar
	* Create a full user profile with bio and photo
	* Add photos of journey itself
	* Connections between users
	* Reflection stage - allow the user to write a personal journal entry or public blog post to reflect on the journey after its completion
	* Progress Bar/Timeline across the bottom of all pages tracking your percentage complete based on how many of your total tasks are done
	* Ability to personalize email and text message notifications to send yourself future encouragement or opt in to default encouraging messages.
	* And more to come!


#### To use the application either visit the deployed site on [Heroku](https://journeyonandon.herokuapp.com/) Or follow the download and install instruction below to run your own version on a local server!

* Either download and unzip or git clone this repo, open in your IDE of choice to look at the code, in one terminal start an instance of mongodb by running "mongod" and in another the terminal cd into the "Journey_On" directory and run the following commands
	
	* "yarn install"

	* "yarn start"

* That's it! After it runs through its processes a browser page should automatically open to <http://localhost:3000> with the Express server grabbing any AJAX calls from the client 

* If you choose to make changes to this repo, the front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon. Also, you may wish to look at the second README.md file available within the client folder for instruction on how to deploy your own version of this site to Heroku.

### The Journey On team is made up of Corey Slade, James Etchells, Nick Woodward, Kaseem Jones, and Miguel Damian


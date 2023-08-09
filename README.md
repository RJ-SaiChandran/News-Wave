NewsWave - Personalized News Hub
Welcome to NewsWave, your personalized news hub application that provides you with the latest news articles and allows you to save articles for later reading. This application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and integrates with the NewsAPI to fetch the latest news articles. Users can register, log in, and customize their news feed based on their interests.

Things to have in your computer while using this project
React.js
Node.js
mongoDB

Table of Contents

Features
Technologies Used
Getting Started
Usage
API Endpoints
Authentication
Contributing
License


Features
Browse and read the latest news articles from various categories.
Save interesting articles for later reading.
Customize your news feed based on your interests.
User registration and login functionality.
Secure authentication using bcrypt and sessions.


Technologies Used
Front-end: React.js
Back-end: Node.js (Express.js)
Database: MongoDB
News API: NewsAPI
User Authentication: Bcrypt, Express Session
Styling: CSS and Material-UI


Getting Started

Clone the repository:
git clone https://github.com/your-username/news-wave.git

Navigate to the project directory:
cd news-wave
Install dependencies for both front-end and back-end:
# Install front-end dependencies
cd frontend
npm install

# Install back-end dependencies
cd ../server
npm install

Set Up Environment Variables
Rename the .env.example files in both the client and server directories to .env and update the variables as needed.

OR

Create a new file called .env and add the following line:
API_KEY=your_newsapi_key
Get your API key at https://newsapi.org/


Start the application:
# Start the front-end
cd frontend
npm start

# Start the back-end
cd ../server
If you have nodemon installed locally use: nodemon server.js, else node server.js

The front-end should be accessible at http://localhost:3000, and the back-end at http://localhost:5000.

Usage
Register or log in using the provided forms.
Browse the latest news articles on the home page.
Click on an article to read the full content.
Save articles by clicking the "Save" icon.
Access your saved articles by clicking on "Saved Items" in the navigation.

API Endpoints
GET /articles: Fetch the latest news articles.
GET /articles/latest: Fetch the latest trending news articles.
GET /get-article/:name: Fetch news articles based on a specific category.
POST /save-article: Save an article for later reading.
GET /get-saved-articles: Fetch the user's saved articles.
POST /register: Register a new user.
POST /login: Log in a user.
GET /protected-route: Protected route for authenticated users.

Authentication
User registration and login are implemented using bcrypt for password hashing and Express sessions for maintaining user sessions. Protected routes are available for logged-in users.

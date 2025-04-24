# Guess The Time App

## Origin and Goal
This app is a fun guessing game designed for a wedding event. Users will enter their name along with two guesses—**timeA** and **timeN**—predicting how long the speeches of the bride and groom (A and N) will be. The game will be part of the entertainment, allowing the audience to make their predictions and enjoy the event.

## Tech Stack
- **Frontend**: TypeScript React
- **Backend**: Python FastAPI
- **Database**: MongoDB Atlas (Cloud database)
- **Deployment**: Docker for local deployment (Dockerfiles and docker-compose)
- **Cloud Deployment**: (Coming soon via Vercel and Render)

## Features
- Users can input their name and two guesses for the speech lengths.
- The game records each submission, and users can check their guesses later.
- MongoDB Atlas is used to store the data in the cloud.
- Local deployment using Docker for both frontend and backend services.

## How to Run Locally

1. Clone this repository:
2. cd to the location this repo is stored on your machine and run `docker-compose up --build`
3. Alternatively, if you want to run without Docker, use the following
   - navigate to the server: `cd server`
   - install dependencies: `pip install -r requirements.txt`
   - navigate to the ui: `cd app`
   - install dependencies: `npm install`
5. Open your browser and go to http://localhost:5173 to access the frontend and http://localhost:8000 to interact with the backend API.

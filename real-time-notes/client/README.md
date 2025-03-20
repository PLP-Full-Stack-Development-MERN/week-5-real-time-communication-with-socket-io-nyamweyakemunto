
# Real-Time Collaborative Notes

A real-time collaborative note-taking application built with the MERN stack and Socket.io. It allows multiple users to edit shared notes in real-time, view online users, and collaborate seamlessly.

## Features

- Join a specific "room" via unique URL or code to collaborate on a shared note.
- Real-time updates when another user edits the note.
- Create new notes and edit existing ones.
- Notifications when a user joins or leaves a room.
- View list of online users in each room.


 Tech Stack

- Frontend:React, Context API, Socket.io-client
- Backend: Node.js, Express.js, MongoDB, Mongoose, Socket.io
- Deployment:Render (backend), Vercel (frontend)



nstallation & Running Locally

Prerequisites:

- Node.js & npm installed
- MongoDB installed locally or a MongoDB Atlas URI

 Backend:

1. Navigate to the `server/` folder:
     ```bash
     cd server
      ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   touch .env
   ```

4. Inside `.env`, add:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

Frontend:

1. Navigate to the `client/` folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

---

Deployment

- Backend is deployed on **Render**
- Frontend is deployed on **Vercel**
  
Make sure to:
- Set environment variables like `MONGO_URI` in Render.
- Configure production URLs in your frontend.

---

 Key Real-Time Concepts Used

1. Socket.io WebSockets:
   - Enables bi-directional, low-latency communication between the client and server.
   - Ensures real-time delivery of note changes and user join/leave notifications.

 2. Rooms:
   - Socket.io's room feature groups users together based on a unique room ID.
   - Any message broadcast to a room is only sent to users in that room.

 3. Event-based Communication:
   - Custom events like `join-room`, `note-update`, `user-joined`, `user-left` manage collaboration.

---

 Folder Structure

```
real-time-notes/
├── client/       # React Frontend
└── server/       # Express Backend + Socket.io + MongoDB
```

---

Testing

1. Open multiple browser tabs.
2. Join the same room using the same room code.
3. Test real-time note editing & user join/leave notifications across tabs.

---


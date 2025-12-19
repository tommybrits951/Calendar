# Home Calendar

A warm, family-friendly calendar application for scheduling and managing events. Built with React and Node.js.

## Features

- User authentication (register/login)
- Monthly calendar view with navigation
- Create, edit, and delete events
- Day view with event details
- Today's date highlighting
- Warm, homey UI design

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Tailwind CSS
- date-fns

**Backend:**
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing

## Getting Started
- Create a user account for keeping personized events
### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Calendar
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create environment file:

Create a `.env` file in the `server` directory:
```env
PORT=9000
URI=mongodb://localhost:27017/calendar
ACCESS=your_access_token_secret
REFRESH=your_refresh_token_secret
```

### Running the Application

1. Start MongoDB (if running locally)

2. Start the server:
```bash
cd server
npm run dev
```

3. Start the client:
```bash
cd client
npm run dev
```

4. Open http://localhost:5173 in your browser

## Project Structure

```
Calendar/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.jsx
│   │   ├── components/
│   │   │   ├── Day.jsx
│   │   │   ├── EditEvent.jsx
│   │   │   ├── EventForm.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Month.jsx
│   │   │   └── Register.jsx
│   │   ├── hooks/
│   │   │   └── useDates.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── server/
│   ├── config/
│   │   └── connectDB.js
│   ├── controllers/
│   │   ├── eventController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   └── package.json
└── README.md
```

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users | Register new user |
| POST | /users/auth | Login |
| GET | /users | Refresh token |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /events | Get all user events |
| GET | /events/:id | Get single event |
| POST | /events | Create event |
| PUT | /events/:id | Update event |
| DELETE | /events/:id | Delete event |


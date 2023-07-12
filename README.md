# MERN-CRUD-APP-With-Login-and-Registration
Thank you for providing the dependencies used in your frontend and backend development. Here's an updated version of the ReadMe.md file that includes the frontend and backend dependencies:

```markdown
# MERN Application

This is a MERN (MongoDB, Express, React, Node.js) application that implements a Login, SignUp, logout, and CRUD functionality.

## Backend

The backend of this application is implemented using Node.js, Express.js, and MongoDB. It provides the server-side logic and API endpoints for authentication, user management, and CRUD operations.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/repository-name.git
   ```

2. Change to the server directory:

   ```shell
   cd repository-name/server
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the MongoDB connection:

   - Make sure your MongoDB server is running.
   - Open `index.js` file and modify the following line to match your MongoDB connection URL:

     ```javascript
     mongoose.connect("mongodb://localhost:27017/Crud");
     ```

### Usage

1. Start the backend server:

   ```shell
   npm start
   ```

2. The server will start running on port 4000.

### API Endpoints

- `GET /lists`: Get the list of authentication records.
- `POST /signup`: Create a new authentication record (sign up).
- `POST /login`: Authenticate user credentials.
- `GET /getUsers`: Get the list of users.
- `GET /list`: Get the list of users.
- `POST /createUser`: Create a new user.
- `DELETE /delete/:id`: Delete a user by ID.
- `GET /getUser/:id`: Get a user by ID.
- `PUT /updateUser/:id`: Update a user by ID.

## Frontend

The frontend of this application is implemented using React.js. It provides the user interface for the application.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js

### Installation

1. Change directory to the client folder:

   ```shell
   cd repository-name/client
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

### Usage

1. Start the frontend development server:

   ```shell
   npm run dev
   ```

2. The frontend will start running on a development server and can be accessed at `http://localhost:5173`.

### Dependencies

- axios: ^1.4.0
- bootstrap: ^5.3.0
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.14.1
- require: ^2.4.20
- sweetalert2: ^11.7.12

### Backend Dependencies

- bcrypt: ^5.1.0
- body-parser: ^1.20.2
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- express: ^4.18.2
- express-session: ^1.17.3
- express-validator: ^7.0.1
- mongoose: ^7.3.1
- multer: ^1.4.5-lts.1
- path: ^0.12.7
- require: ^2.4.20

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Please note that you might need to modify the file paths and other configurations based on your project structure and requirements.

---

# **Backend Documentation (`server/README.md`)**

### Stellar Cabs - Backend

This is the **backend API** for **Stellar Cabs**, responsible user  and captain auth. The backend is built using **Node.js** and **Express.js**, with **MongoDB** as the database.

## 🚀 Features

- **User authentication using Auth0**
- **RESTful API with JSON responses**
- **MongoDB for persistent storage**
- **CORS support for frontend integration**
- **Secure environment variables**

## 🛠️ Tech Stack

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables management
- **express-validator** - For input validation

## 📂 Folder Structure

 ```sh
 
    /Backend
    │── /routes # API routes 
    │── /controllers # Route logic 
    │── /models # Mongoose schemas 
    │── /middleware # Authentication and security 
    │──  /DB     # Database connection
    │── /service # For user and caption auth 
    │── app.js # route point
    │── server.js # Entry point 
    │── .env # Environment variables 
    │── README.md # Documentation 
    │── package.json # Dependencies
    
  ```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/codERSunny812/Stellar-Cabs.git
cd Stellar-Cabs/Backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

```ini
PORT=your-backend-port
MONGO_URI=your-mongodb-uri
JWT-SECRET=your-jwt-secret
```

### 4️⃣ Start the Backend Server

```sh
npm start
```

## Endpoints

### 1. Route Information

- **Endpoint:** `GET /users/register`
- **Description:** Check that the user register route is running.
- **Response:**

  ```json
  "this is the user route"
  ```

### 2. Register User

- **Endpoint:** `POST /users/register`
- **Description:** Registers a new user.
- **Request Body:**

```javascript
{
  "firstname":your-first-name,
  "lastname": your-last-name,
  "email": your-email,
  "password": your-password
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "data":
      {
        "fullName":{
        "firstname":your-first-name,
        "lastname":your-last-name
        }
        ,
        "email":your-email,
        "password":your-password,
        "__v":0
        },
        "message":"The user is signed up successfully"
        }
    ```

    -**Validation Error(400):**

```javascript
{
  "errors":
  [{
    "type":"field",
    "value":"testuser7sunny.com",
    "msg":"Invalid email",
    "path":"email",
    "location":"body"
    }]
  }
```

### 3. Login User

- **Endpoint:** `POST /users/login`
- **Description:** Login an user.
- **Request Body:**

```javascript
{
    "email":your-email,
    "password":your-password
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "data":{
        "fullName":{
        "firstname":your-first-name,
        "lastname":your-last-name
        }
        ,"_id":your-unique-id,
        "__v":0
        },"token":your-auth-token,
        "message":"the user is login successfully"
        }
    ```

    -**Validation Error(400):**

```javascript
{
  "errors":[{
    "type":"field",
    "value":"testuser6sunny.com",
    "msg":"Invalid email",
    "path":"email",
    "location":"body"
    }]
}
```

### 4. Profile Route

- **Endpoint:** `GET /users/Profile`
- **Description:** Get the data of the current  loggedIn  user(Profile page).

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "message":"this is the user profile","data":
      {
      
      "fullName":{
      "firstname":your-first-name,
      "lastname":your-last-name
      },
      "_id":your-unique-id,
      "email":your-email-id,
      "__v":0
      }}
    ```

### 5. Logout Route

- **Endpoint:** `GET /users/logout`
- **Description:** Logout a user and blacklist the token provider in the cookie and header.

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "message":"user logged out successfully"
      }
    ```
  
### 6. Register Captioon

- **Endpoint:** `POST /caption/register`
- **Description:** Registers a new caption.
- **Request Body:**

```javascript
{
   "fullName": {
    "firstName":your-first-name,
   "lastName":your-last-name
   },
   "email":your-email-id,
  "password":your-password,
  "socketId":your-socket-id,
  "vechile":{
    "color":your-vechile-color,
    "numberPlate":your-vechile-number-plate,
    "capacity":your-vechile-capacity,
    "model":your-vechile-model,
    "vechileType":your-vechile-category
}
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
        "caption": {
        "fullName": {
            "firstName":your-first-name,
            "lastName":your-last-name
        },
        "email":your-email-id,
        "password":your-password,
        "status": "inactive",
        "vechile": {
           "color":your-vechile-color,
           "numberPlate":your-vechile-number-plate,
           "capacity":your-vechile-capacity,
           "model":your-vechile-model,
           "vechileType":your-vechile-category
        },
        "_id":your-unique-id,
        "__v": 0
    }

}
    ```

- **Validation Error(400):**

```javascript
{
  "errors":
  [{
    "type":"field",
    "value":"testuser7sunny.com",
    "msg":"Invalid email",
    "path":"email",
    "location":"body"
    }]
  }
```

### 7. Login Caption

- **Endpoint:** `POST /caption/login`
- **Description:** Login the caption.
- **Request Body:**

```javascript
{
    "email":your-email,
    "password":your-password
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
        "token": your-jwt-token,
        "caption": {
          "fullName": {
               "firstName":your-first-name,
               "lastName":your-last-name
        },
        "vechile": {
           "color":your-vechile-color,
           "numberPlate":your-vechile-number-plate,
           "capacity":your-vechile-capacity,
           "model":your-vechile-model,
           "vechileType":your-vechile-category
        },
        "_id": your-unique-id,
        "email":your-email,
        "password": your-password,
        "status": "inactive",
        "__v": 0
    }

}
    ```

- **Validation Error(400):**

```javascript
{
  "errors":[{
    "type":"field",
    "value":"testuser6sunny.com",
    "msg":"Invalid email",
    "path":"email",
    "location":"body"
    }]
}
```

### 8. Profile Route of Caption

- **Endpoint:** `GET /caption/profile-caption`
- **Description:** Get the data of the current  loggedIn  caption(Profile page).

- **Response**
  - **Sucess(200)**:

```javascript

   {
    "caption": {
      "fullName": {
           "firstName":your-first-name,
           "lastName":your-last-name
    },
    "vechile": {
       "color":your-vechile-color,
       "numberPlate":your-vechile-number-plate,
       "capacity":your-vechile-capacity,
       "model":your-vechile-model,
       "vechileType":your-vechile-category
    },
    "_id":your-unique-id,
    "email": your-email,
    "password":your-password,
    "status": "inactive",
    "__v": 0
}
```

### 9. Logout Route

- **Endpoint:** `GET /caption/logout`
- **Description:** Logout the caption and blacklist the token provider in the cookie and header.

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "message":"caption logged out successfully"
      }
    ```

# Backend API Documentation

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
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "data":
      {"fullName":
      {
        "firstname":"test",
        "lastname":"user7"
        }
        ,
        "email":"testuser7@sunny.com","password":"$2b$10$CaFa7Gv5pmWXrPjHXhq1C.VWRJVKrcm.O6QWzXXykNZFOh6rTCqby","_id":"6797c890db16df035fc0056c",
        "__v":0
        },"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3Yzg5MGRiMTZkZjAzNWZjMDA1NmMiLCJpYXQiOjE3MzgwMDA1MjksImV4cCI6MTczODA4NjkyOX0.lqWxmkDC0AVNqh52KwLix38S9W1d3LMJ0LYyTi41Vao",
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

### 2. Login User

- **Endpoint:** `POST /users/login`
- **Description:** Login an user.
- **Request Body:**

```javascript
{
    "email": "testuser6@sunny.com",
    "password": "testuser6"
}
```

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "data":{
        "fullName":
        {"firstname":"test",
        "lastname":"user6"
        }
        ,"_id":"6797aeec68391fd353852a47","email":"testuser6@sunny.com","password":"$2b$10$iYXxE5YZ8nLjuqOKOk5ofuLnnhEvRInzDd7gFzWDsXYrH30oRyeNa",
        "__v":0
        },"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3YWVlYzY4MzkxZmQzNTM4NTJhNDciLCJpYXQiOjE3MzgwMDA3NTgsImV4cCI6MTczODA4NzE1OH0.8sSdIRbVtljyr-ql4_c40l8CBtU8U9zqR_SwmkxiLXc",
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

### 3. Profile Route

- **Endpoint:** `GET /users/Profile`
- **Description:** Get the data of the loggedIn  user.

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "message":"this is the user profile","data":
      {"fullName":
      {
      "firstname":"test",
      "lastname":"user6"
      },
      "_id":"6797aeec68391fd353852a47","email":"testuser6@sunny.com",
      "__v":0
      }}
    ```

### 4. Logout Route

- **Endpoint:** `GET /users/logout`
- **Description:** Logout a user.

- **Response**
  - **Sucess(200)**:

    ```javascript

     {
      "message":"user logged out successfully"
      }
    ```

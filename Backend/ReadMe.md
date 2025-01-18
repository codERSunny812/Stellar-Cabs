# Backend API Documentation

## Endpoints

### 1. Route Information

- **Endpoint:** `GET /users/`
- **Description:** Returns information about the user route.
- **Response:**
  ```json
  "this is the user route"
  ```


### 2. Register User

* **Endpoint:** `POST /users/register`
* **Description:** Registers a new user.
* **Request Body:**

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

      "data": {
        "_id": "user_id",
        "fullName": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "jwt_token",
      "message": "the user is sign up successfully"
    }
    ```

    -**Validation Error(400):**

```javascript
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

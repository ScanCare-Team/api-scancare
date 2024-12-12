# Scancare API
## Cloud Architecture
![Cloud Arsitekture](https://github.com/ScanCare-Team/.github/blob/main/assets/Arsitektur%20Backend.drawio%20(1).png)

---

## Get Started

Clone **repository** with command:
```` json
https://github.com/ScanCare-Team/api-scancare
````

## API Documentation – Authentication

### NOTE:
- All url need bearer token expect
-	 All `Content-Type` headers should be `application/json`.


---

## 1. User Registration
**Method:**  
`POST  {{url}}/api/auth/register`	
| Parameter       | Type    | Description                 |
|-----------------|---------|-----------------------------|
| Email           | string  | Valid email                 |
| Password        | string  | Minimum 6 characters        |
| confirmPassword | string  | Must match password         |
| Name            | string  | User's name                 |

### Success Response:
```` json
{
  "status": "success",
  "message": "Pendaftaran berhasil."
}
````

### 400 Bad Request
```` json
{
  "status": "fail",
  "message": "Error validasi (contoh: Email tidak valid)."
}
````

### Error Response:
```` json
{
  "status": "error",
  "message": "Terjadi kesalahan pada server.",
  "error": "Detail error"
}
````

## 2. User Login
**Method:**  
`POST {{url}}/api/auth/login`
| Parameter       | Type    | Description                 |
|-----------------|---------|-----------------------------|
| Email           | string  | Valid email                 |
| Password        | string  | Required, Min. 6 characters |

### Success Response:
```` json
{
  "status": "success",
  "message": "Login berhasil.",
  "data": {
    "email": "string",
    "name": "string",
    "token": "string (JWT token)"
  }
}
````

### 400 Bad Request
```` json
{
  "status": "fail",
  "message": "Password salah atau validasi gagal."
}
````

### Error Response:
```` json
{
  "status": "error",
  "message": "Terjadi kesalahan pada server.",
  "error": "Detail error"
}
```` 
## 3. Get User Data by Email
**Method:**  
`GET {{url}}/api/auth/user/{email}`
| Parameter       | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| Email           | string  | The email of the user whose data is to be fetched. The email should be in a valid format.|

### Success Response:
```` json
{
  "status": "success",
  "user": {
    "email": "example@gmail.com",
    "name": "example",
    "createdAt": "2023-10-12T10:00:00.007Z"
  }
}
````

### 404 Not Found:
```` json
{
  "status": "fail",
  "message": "Pengguna tidak ditemukan."
}
````

### Error Response:
```` json
{
  "status": "error",
  "message": "Terjadi kesalahan pada server.",
  "error": "error_message_here"
}
````

## 4. Update Profile
**Method:**  
`PUT {{url}}/api/auth/user/profile`
| Parameter               | Type    | Description                               |
|-------------------------|---------|-------------------------------------------|
| Email                   | string  | Valid email                               |
| fullName                | string  | Optional, new name                        |
| oldPassword             | string  | optional, current password                |
| newPassword             | string  | Optional, new password, min 6 chars       |
| confirmNewPassword      | string  | Must match newPassword                    |

### Success Response:
```` json
{
  "status": "success",
  "message": "Profil berhasil diperbarui."
} 
````

### Error Response:
```` json
{
  "status": "error",
  "message": "Terjadi kesalahan pada server.",
  "error": "Detail error"
}
````
---

## Link
---
We have deployed the API in our project using the Cloud Run service on the Google Cloud Platform. Here are two links to the results of the deployment:
- Backend URL : https://api-scancare1-173910592123.asia-southeast2.run.app
- Backend for Model ML deployed URL : https://api-scancare-model-ml2-173910592123.asia-southeast2.run.app

---
## Cloud Services Used
![Cloud Service used](https://github.com/ScanCare-Team/.github/blob/main/assets/cloud.png)


## Authors
- [@Asrin111](https://github.com/orgs/ScanCare-Team/people/Asrin111)
- [@dindaa06](https://github.com/orgs/ScanCare-Team/people/dindaa06)
  

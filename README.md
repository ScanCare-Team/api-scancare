# API Documentation – Authentication

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

## 3. Update Profile
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

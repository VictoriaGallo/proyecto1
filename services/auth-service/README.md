# 🔐 Auth Service

Servicio de autenticación construido con **Node.js**, **Express** y **Firebase Authentication**.  
Permite registrar y autenticar usuarios mediante correo y contraseña, devolviendo un token de autenticación.

---

## 🚀 Características

- Registro de usuarios con correo y contraseña  
- Inicio de sesión de usuarios existentes  
- Respuesta en formato JSON con `uid`, `email` y `token`  
- Configuración de variables de entorno para mayor seguridad  
- CORS habilitado para peticiones desde otros servicios o frontends  

---

## 🧩 Requisitos previos

- [Node.js](https://nodejs.org/) v16 o superior  
- [Firebase Project](https://console.firebase.google.com/) con autenticación habilitada por **correo y contraseña**  
- Archivo `.env` con las credenciales de Firebase

---

## ⚙️ Instalación

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/VictoriaGallo/proyecto1.git
   cd auth-service
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:**

   ```env
   PORT=3001
   FIREBASE_API_KEY=tu_api_key
   FIREBASE_AUTH_DOMAIN=tu_auth_domain
   FIREBASE_PROJECT_ID=tu_project_id
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   FIREBASE_APP_ID=tu_app_id
   ```

---

## ▶️ Ejecución del servidor

🔹 **Modo normal:**

```bash
npm start
```

🔹 **Modo desarrollo (con recarga automática):**

```bash
npm run dev
```

El servidor se iniciará en:  
👉 [http://localhost:3001](http://localhost:3001)

---

## 📡 Endpoints

### **GET /**  
Verifica que el servicio esté funcionando.  
**Respuesta:**
```json
"¡Servidor Auth service funcionando!"
```

---

### **POST /crear**  
Registra un nuevo usuario.

**Body (JSON):**
```json
{
  "correo": "usuario@correo.com",
  "contraseña": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "uid": "UID_DEL_USUARIO",
    "email": "usuario@correo.com",
    "token": "TOKEN_JWT"
  }
}
```

**Errores posibles:**
- `400`: Faltan datos o correo ya registrado.

---

### **POST /usuario**  
Autentica un usuario existente.

**Body (JSON):**
```json
{
  "correo": "usuario@correo.com",
  "contraseña": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario autenticado exitosamente",
  "user": {
    "uid": "UID_DEL_USUARIO",
    "email": "usuario@correo.com",
    "token": "TOKEN_JWT"
  }
}
```

**Errores posibles:**
- `400`: Faltan datos.  
- `401`: Credenciales incorrectas.

---

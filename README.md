# 🛠️ Backend – API de Sesiones Universitarias (Node + Express + MongoDB)

Esta es la **API backend** para gestionar estudiantes, sesiones y tareas.

---

## 🧰 Pila tecnológica

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (local o Atlas)
- [Mongoose](https://mongoosejs.com/)
- TypeScript

---

## ✅ Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18+)
- Un servidor MongoDB local o remoto

---

## 🚀 Instrucciones de configuración

### 1. Accede a la carpeta del backend

````bash
cd backend

### 2. Instalar las dependencias

```bash
npm install

### 3. Crear el archivo de entorno

- Crear un Archivo .env:
```bash
touch .env

- Agregue lo siguiente:
MONGODB_URL = "mongodb://127.0.0.1:27017/"
MONGODB_DATABASE = "session"
PORT = 8080

### 4. Crear la base de datos

```bash
npm run db:create

### 5. Iniciar el servidor backend

```bash
npm run dev
````

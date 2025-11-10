
# Proyecto Alzheimer - Plataforma de apoyo y gestión

Equipo: **NovaTech**

*Autores: Nicolas Cuellar, Juan de Dios Rodriguez, Maira Balanta, Laura Gallo y Santiago Duque.*

*Universidad Autonoma de Occidente*

*Proyecto Informatico 2025*

## Descripción general

Este proyecto es una **plataforma web integral** diseñada para ofrecer apoyo a personas con Alzheimer y a sus cuidadores.  
Su arquitectura modular permite una fácil escalabilidad y mantenimiento, integrando distintos servicios mediante un **API Gateway** desarrollado con **Node.js** y **Express**.

El sistema está orientado a mejorar la **calidad de vida de los pacientes** y optimizar la **comunicación entre familiares, cuidadores y profesionales de salud**, mediante una aplicación moderna, accesible y confiable.

---

## Arquitectura del proyecto

El proyecto está basado en una arquitectura de **microservicios**, orquestada con **Docker Compose**.  
Cada componente cumple una función específica dentro del ecosistema:

- **api-gateway/** → Punto de entrada principal a los servicios. Gestiona las peticiones externas y enruta a los microservicios correspondientes.
- **frontend/** → Interfaz de usuario (React o framework equivalente).
- **backend/** → Servicios dedicados a la gestión de usuarios, memoria, recordatorios y análisis.
- **database/** → Contenedor con base de datos relacional o NoSQL.
- **docker-compose.yml** → Archivo de configuración para el despliegue simultáneo de todos los servicios.

---

## Tecnologías utilizadas

### Backend / Gateway
- Node.js 18+
- Express
- Axios
- http-proxy-middleware
- Morgan
- CORS
- dotenv

### Infraestructura
- Docker & Docker Compose
- Microservicios
- Entorno de desarrollo con `nodemon`

### (Opcional)
- React / Redux para frontend
- Base de datos firebase

---

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/proyecto1.git
cd proyecto1
```

### 2. Configurar variables de entorno

En el archivo .env de cada servicio, define las variables necesarias, por ejemplo:
```bash
PORT=3000
API_URL=http://localhost:3000
```

### 3. Levantar los servicios con Docker
```bash
docker-compose up --build
```
Esto iniciará todos los servicios (API Gateway, frontend, backend, base de datos, etc.) automáticamente.

### 4. Acceso
Frontend: http://localhost:5173

API Gateway: http://localhost:3000

 ## Scripts disponibles
Dentro de api-gateway/ puedes usar los siguientes comandos:
```bash
# Ejecutar el servidor en modo desarrollo
npm run dev

# Ejecutar pruebas
npm test
```
## Objetivos del proyecto

- Ofrecer una herramienta digital de **apoyo cognitivo y seguimiento de rutinas** para pacientes con Alzheimer.
- Facilitar la gestión de **información médica y recordatorios diarios**.
- Implementar un sistema modular, escalable y accesible.

## Futuras mejoras

- Integración con IA para asistencia personalizada.

- Notificaciones inteligentes.

- Aplicación móvil (React Native / Flutter).

- Panel de control para cuidadores y médicos.


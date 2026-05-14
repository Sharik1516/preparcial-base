# Preparcial 2 — API REST para Planificación de Viajes (NestJS)

Proyecto desarrollado con NestJS y MongoDB para la gestión de planes de viaje utilizando arquitectura modular, validación con DTOs y lógica de caché local para países consumidos desde la API externa RestCountries.

---

# Tecnologías utilizadas

- NestJS
- TypeScript
- MongoDB
- Mongoose
- Docker
- Axios / HttpModule
- class-validator
- class-transformer

---

# Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/Sharik1516/preparcial-base.git
```

## 2. Entrar al proyecto

```bash
cd preparcial-base
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Instalar dependencias necesarias

```bash
npm install @nestjs/mongoose mongoose
npm install @nestjs/axios axios
npm install class-validator class-transformer
```

---

# Configuración de MongoDB con Docker

## 1. Verificar que Docker Desktop esté ejecutándose

## 2. Crear contenedor MongoDB

```bash
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:6.0
```

## 3. Verificar que Mongo esté activo

```bash
docker ps
```
Debe aparecer un contenedor con:
```bash
mongo:6.0
```

---

# Ejecución del proyecto

## 1. Modo desarrollo
```bash
npm run start:dev
```
Resultado esperado:
```bash
Nest application successfully started
```

---

# Arquitectura del proyecto

La aplicación sigue una arquitectura modular basada en NestJS.

Cliente \
&ensp;&ensp;&ensp;↓ \
Controller \
&ensp;&ensp;&ensp;↓ \
Service \
&ensp;&ensp;&ensp;↓ \
Provider / Model \
&ensp;&ensp;&ensp;↓ \
MongoDB / API externa 

# Estructura de módulos

src/ \
│ \
├── countries/ \
│   ├── entities/ \
│   ├── providers/ \
│   ├── countries.module.ts \
│   └── countries.service.ts \
│ \
├── travel-plans/ \
│   ├── dto/ \
│   ├── entities/ \
│   ├── travel-plans.controller.ts \
│   ├── travel-plans.module.ts \
│   └── travel-plans.service.ts \
│ \
├── app.module.ts \
└── main.ts

# Explicación de la arquitectura

**CountriesModule**

Este módulo maneja toda la lógica de países y caché local.

**Responsabilidades**
+ Buscar países en MongoDB
+ Consumir RestCountries API
+ Persistir países localmente
+ Evitar llamadas repetidas a la API externa

**Importante**
- Este módulo NO expone endpoints HTTP públicos.
- Toda su funcionalidad es utilizada internamente mediante inyección de dependencias.

**TravelPlansModule**

Es el módulo público de la aplicación.

**Responsabilidades**
+ Crear planes de viaje
+ Consultar planes
+ Eliminar planes
+ Validar DTOs
+ Comunicarse con CountriesService

**Flujo de caché de países**

Cuando se crea un TravelPlan:

TravelPlansService \
&emsp;&emsp;↓ \
CountriesService \
&emsp;&emsp;↓ \
&emsp;MongoDB \
&emsp;&emsp;↓ \
&ensp;¿Existe el país? \
&ensp;&ensp;↓&emsp;&emsp;↓ \
&ensp;SI&emsp;&emsp;NO \
&ensp;&ensp;↓&emsp;&emsp;↓ \
Retornar&emsp;&emsp;Consultar API \
caché&emsp;&emsp;RestCountries \
&emsp;&emsp;&emsp;&emsp;&ensp;↓ \
&emsp;&emsp;&emsp;Guardar en Mongo \
&emsp;&emsp;&emsp;&emsp;&ensp;↓ \
&emsp;&emsp;&emsp;Retornar país

**Endpoints disponibles**

| Método | Endpoint          | Descripción              |
| ------ | ----------------- | ------------------------ |
| POST   | /travel-plans     | Crear plan de viaje      |
| GET    | /travel-plans     | Obtener todos los planes |
| GET    | /travel-plans/:id | Obtener plan por id      |
| DELETE | /travel-plans/:id | Eliminar plan            |

**Validaciones implementadas**

Se utilizan DTOs y ValidationPipe global.

**Validaciones incluidas**
+ title obligatorio
+ Fechas válidas
+ countryCode obligatorio
+ countryCode de exactamente 3 caracteres

---

# Ejemplos para Postman

## 1. Crear Travel Plan
**Endpoint**
```bash
POST http://localhost:3000/travel-plans
```
**Body JSON**
```bash
{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-10",
  "countryCode": "COL"
}
```

## 2. Obtener todos los planes
**Endpoint**
```bash
GET http://localhost:3000/travel-plans
```

## 3. Obtener plan por ID
**Endpoint**
```bash
GET http://localhost:3000/travel-plans/<ID>
```

## 4. Eliminar plan
**Endpoint**
```bash
DELETE http://localhost:3000/travel-plans/<ID>
```

## 5. Ejemplo de validación incorrecta
**Body inválido**
```bash
{
  "title": "",
  "startDate": "hola",
  "endDate": "mañana",
  "countryCode": "COLOMBIA"
}
```

**Resultado esperado**
```bash
400 Bad Request
```

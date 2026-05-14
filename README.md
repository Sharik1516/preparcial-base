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
exit
```

## 2. Entrar al proyecto

```bash
cd preparcial-base
exit
```

## 3. Instalar dependencias

```bash
npm install
exit
```

## 4. Instalar dependencias necesarias

```bash
npm install @nestjs/mongoose mongoose
npm install @nestjs/axios axios
npm install class-validator class-transformer
exit
```

---

# Configuración de MongoDB con Docker

## 1. Verificar que Docker Desktop esté ejecutándose

## 2. Crear contenedor MongoDB

```bash
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:6.0
exit
```

## 3. Verificar que Mongo esté activo

```bash
docker ps
exit
```
Debe aparecer un contenedor con:
```bash
mongo:6.0
exit
```

---

# Ejecución del proyecto

## 1. Modo desarrollo
```bash
npm run start:dev
exit
```
Resultado esperado:
```bash
Nest application successfully started
exit
```

---

# Arquitectura del proyecto

La aplicación sigue una arquitectura modular basada en NestJS.

Cliente
   ↓
Controller
   ↓
Service
   ↓
Provider / Model
   ↓
MongoDB / API externa

# Estructura de módulos

src/
│
├── countries/
│   ├── entities/
│   ├── providers/
│   ├── countries.module.ts
│   └── countries.service.ts
│
├── travel-plans/
│   ├── dto/
│   ├── entities/
│   ├── travel-plans.controller.ts
│   ├── travel-plans.module.ts
│   └── travel-plans.service.ts
│
├── app.module.ts
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
TravelPlansService
        ↓
CountriesService
        ↓
MongoDB
        ↓
¿Existe el país?
   ↓             ↓
 SI              NO
 ↓               ↓
Retornar     Consultar API
caché        RestCountries
                  ↓
            Guardar en Mongo
                  ↓
             Retornar país

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
exit
```
**Body JSON**
```bash
{
  "title": "Viaje a Colombia",
  "startDate": "2026-06-01",
  "endDate": "2026-06-10",
  "countryCode": "COL"
}
exit
```

## 2. Obtener todos los planes
**Endpoint**
```bash
GET http://localhost:3000/travel-plans
exit
```

## 3. Obtener plan por ID
**Endpoint**
```bash
GET http://localhost:3000/travel-plans/<ID>
exit
```

## 4. Eliminar plan
**Endpoint**
```bash
DELETE http://localhost:3000/travel-plans/<ID>
exit
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
exit
```

**Resultado esperado**
```bash
400 Bad Request
exit
```

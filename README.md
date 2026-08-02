# La Palabra del Día

Una aplicación web inspirada en juegos de palabras diarios como Wordle, desarrollada como proyecto universitario utilizando una arquitectura Full Stack.

El objetivo del proyecto es ofrecer una experiencia simple e intuitiva donde los usuarios pueden resolver una palabra diaria, mantener una sesión persistente y consultar sus estadísticas personales.

> **Nota:** Este proyecto corresponde a una versión adaptada para presentación académica. La versión pública mantiene elementos visuales y de humor que fueron reemplazados temporalmente por una interfaz más formal.

---

## ✨ Características

* Registro e inicio de sesión de usuarios.
* Autenticación mediante **JWT**.
* Persistencia de sesión utilizando **Cookies HTTP**.
* Sincronización automática de estadísticas entre cliente y servidor.
* Estadísticas personales por usuario.
* Diseño completamente responsive.
* Arquitectura Frontend + Backend desacoplada.
* API REST propia.
* Base de datos relacional utilizando MySQL.

---

## 🛠 Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express
* Sequelize
* MySQL
* JWT (JSON Web Tokens)
* bcrypt

---

## 📂 Estructura del proyecto

```text
├── client
│   ├── components
│   ├── pages
│   ├── contexts
│   ├── services
│   ├── utils
│   └── assets
│
└── api
    ├── controllers
    ├── routes
    ├── middleware
    ├── models
    ├── services
    └── config
```

---

## 🔐 Autenticación

La aplicación implementa un sistema de autenticación basado en **JSON Web Tokens (JWT)**.

El flujo de autenticación es el siguiente:

1. El usuario inicia sesión.
2. El servidor valida las credenciales.
3. Se genera un JWT firmado.
4. El token se almacena en una Cookie HTTP.
5. Cada solicitud protegida verifica automáticamente la validez del token.
6. Si el token continúa siendo válido, la sesión permanece iniciada.

Este mecanismo permite mantener la sesión del usuario incluso después de recargar la página.

---

## 📊 Sistema de estadísticas

Cada usuario posee un conjunto de estadísticas personales almacenadas en la base de datos.

Entre ellas se registran datos como:

* Partidas jugadas.
* Victorias.
* Derrotas.
* Racha actual.
* Mejor racha.

Las estadísticas se sincronizan automáticamente entre el cliente y el servidor para mantener la información consistente independientemente del dispositivo utilizado.

---

## 📱 Diseño Responsive

Toda la interfaz fue diseñada utilizando Tailwind CSS con un enfoque **Mobile First**, permitiendo una correcta visualización tanto en dispositivos móviles como en computadoras.

---

## Objetivos del proyecto

Este proyecto fue desarrollado con el propósito de aplicar conceptos de desarrollo Full Stack, incluyendo:

* Desarrollo de APIs REST.
* Arquitectura MVC.
* Manejo de autenticación segura.
* Persistencia de sesiones.
* Diseño responsive.
* Comunicación entre frontend y backend.
* Manejo de bases de datos relacionales.
* Organización modular del código.

---

## Autor

Desarrollado por **Fabián Barzola** como proyecto universitario utilizando React, TypeScript, Node.js, Express y MySQL.

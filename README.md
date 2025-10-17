# SetiToDo

Aplicación móvil híbrida para gestión de tareas desarrollada con Ionic y Angular, con sistema de autenticación completo mediante Firebase.

## 📑 Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Estructura de Carpetas](#estructura-de-carpetas)
  - [Decisiones Arquitectónicas](#decisiones-arquitectónicas)
- [Git Flow Implementado](#git-flow-implementado)
  - [Estructura de Ramas](#estructura-de-ramas)
  - [¿Por Qué Implementamos Git Flow?](#por-qué-implementamos-git-flow)
  - [Convenciones de Commits](#convenciones-de-commits)
- [Instalación y Desarrollo](#instalación-y-desarrollo)
- [Configuración de Firebase](#configuración-de-firebase)
- [Historial de Commits - Git Flow](#-historial-de-commits---git-flow)

---

## Descripción del Proyecto

SetiToDo es una aplicación de gestión de tareas que permite a los usuarios registrarse, autenticarse y organizar sus actividades de manera eficiente. El proyecto está construido con tecnologías modernas y sigue principios de arquitectura limpia para garantizar mantenibilidad y escalabilidad.

## Funcionalidades

- Registro de usuarios con validación personalizada
- Inicio de sesión con Firebase Authentication
- Gestión de tareas (crear, completar, eliminar)
- Protección de rutas mediante guards
- Diseño responsive optimizado para dispositivos móviles
- Notificaciones en tiempo real con Material Snackbar

## Stack Tecnológico

- **Ionic 8**: Framework híbrido para aplicaciones móviles multiplataforma
- **Angular 20**: Framework web modular con arquitectura basada en componentes
- **Firebase Authentication**: Gestión de usuarios y autenticación segura
- **Angular Material**: Sistema de componentes UI siguiendo Material Design
- **Bootstrap 5**: Framework CSS para diseño responsive
- **TypeScript**: Lenguaje tipado para mayor robustez del código
- **RxJS**: Programación reactiva para manejo de estados y eventos asíncronos

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura limpia basada en capas para separar responsabilidades y facilitar el mantenimiento:

### Estructura de Carpetas

```
src/
├── app/
│   ├── core/                    # Funcionalidad central de la aplicación
│   │   ├── guards/              # Protección de rutas (authGuard)
│   │   ├── services/            # Servicios singleton (AuthService)
│   │   ├── models/              # Interfaces y modelos de datos (User)
│   │   ├── interfaces/          # Contratos de servicios (IAuthService)
│   │   └── validators/          # Validadores personalizados (email, password-match)
│   ├── shared/                  # Componentes y módulos reutilizables
│   │   ├── components/          # Componentes compartidos (auth-layout)
│   │   └── shared.module.ts     # Módulo de exportación de componentes comunes
│   ├── auth/                    # Módulo de autenticación
│   │   ├── login/               # Página de inicio de sesión
│   │   └── register/            # Página de registro
│   └── home/                    # Página principal de la aplicación
└── environments/                # Configuración por entorno (dev/prod)
```

### Decisiones Arquitectónicas

**1. Separación Core/Shared/Features**
- `core/`: Servicios singleton y funcionalidad esencial cargada una sola vez
- `shared/`: Componentes y módulos reutilizables en múltiples features
- `auth/`, `home/`: Features modulares con lazy loading

**Beneficio**: Reducción del bundle inicial, mejor organización del código y facilita el trabajo en equipo al tener responsabilidades claras.

**2. Validators Personalizados**
- `email.validator.ts`: Valida que el correo tenga formato correcto con dominio .com
- `password-match.validator.ts`: Validación cruzada entre campos de contraseña

**Beneficio**: Reutilización de lógica de validación y mejor experiencia de usuario con feedback en tiempo real.

**3. Componente Auth-Layout Reutilizable**
- Layout compartido entre login y register usando `<ng-content>`
- Estilos glassmorphism con gradientes y animaciones

**Beneficio**: Reducción de código duplicado (DRY principle) y consistencia visual entre páginas de autenticación.

**4. Patrón Repository con Interfaces**
- `IAuthService` define el contrato del servicio
- `AuthService` implementa la interfaz

**Beneficio**: Facilita testing con mocks y permite cambiar la implementación sin afectar los componentes (Dependency Inversion Principle).

**5. Functional Guards**
- `authGuard` implementado como función standalone usando `inject()`

**Beneficio**: Sintaxis moderna de Angular, menor boilerplate y mejor tree-shaking.

---

## Git Flow Implementado

Este proyecto utiliza Git Flow como estrategia de ramificación para mantener un flujo de trabajo organizado y permitir despliegues controlados.

### Estructura de Ramas

```
master (producción)
  ↑
qa (testing/QA)
  ↑
develop (desarrollo activo)
  ↑
feature/* (nuevas funcionalidades)
```

### ¿Por Qué Implementamos Git Flow?

**1. Separación de Ambientes**
- `master`: Código estable listo para producción
- `qa`: Código en fase de testing antes de producción
- `develop`: Integración continua de nuevas features
- `feature/*`: Desarrollo aislado de funcionalidades específicas

**Beneficio en nuestro proyecto**: Al ser una aplicación móvil con autenticación, necesitamos garantizar que el código en producción esté completamente probado. QA nos permite validar la integración con Firebase antes de afectar a usuarios reales.

**2. Historial de Cambios Claro**
- Commits semánticos siguiendo Conventional Commits (feat, fix, docs, etc.)
- Merges documentados entre ramas

**Beneficio en nuestro proyecto**: Facilita el tracking de cambios en el sistema de autenticación y permite revertir features específicas sin afectar otras funcionalidades.

**3. Trabajo Colaborativo**
- Desarrollo paralelo de features sin conflictos
- Code review antes de merge a develop

**Beneficio en nuestro proyecto**: Permite escalar el equipo de desarrollo manteniendo la calidad del código.

### Convenciones de Commits

| Tipo | Uso en el Proyecto |
|------|-------------------|
| `feat:` | Nuevas funcionalidades (login, registro, tareas) |
| `fix:` | Corrección de bugs |
| `style:` | Cambios de estilos CSS/SCSS |
| `refactor:` | Mejoras de código sin cambiar funcionalidad |
| `docs:` | Actualizaciones de documentación |
| `chore:` | Configuración y tareas de mantenimiento |

---

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Ejecutar linter
npm run lint
```

---

## Configuración de Firebase

Las credenciales de Firebase están configuradas en los archivos de environment:
- `src/environments/environment.ts` - Desarrollo
- `src/environments/environment.prod.ts` - Producción

**Proyecto Firebase**: setitodo
**App ID**: 1:262598191869:web:YOUR_APP_ID

> **Nota**: Para efectos de esta prueba técnica, los archivos de environment fueron incluidos en el repositorio. Sin embargo, es importante mencionar que esto es una **mala práctica** en proyectos reales. Los archivos de configuración con credenciales sensibles deben estar en `.gitignore` y gestionarse mediante variables de entorno o servicios de secrets management (AWS Secrets Manager, Azure Key Vault, etc.).

---

## 📋 Historial de Commits - Git Flow

### Auth:
- Sistema completo de login y registro
  - Firebase Authentication configurado
  - Guards para protección de rutas
  - Validadores personalizados (email con @.com, password match)
  - Diseño responsive con Material y Bootstrap
  - Notificaciones con MatSnackBar para mejor UX móvil
  - Arquitectura limpia (core, shared, features)
  - Componente auth-layout reutilizable con glassmorphism
  - Formularios reactivos con validación cruzada
  - Visualización de contraseña con iconos eye
  - Integración completa con Firebase Auth (login, registro, logout)
  - Modelo de usuario y servicio con patrón repository
  - Rutas protegidas con functional guards

### Documentación:
- README técnico profesional
  - Explicación detallada de arquitectura limpia implementada
  - Justificación de decisiones técnicas (validators, guards, components)
  - Beneficios específicos de Git Flow para el proyecto
  - Documentación de estructura de carpetas y responsabilidades
  - Stack tecnológico completo con descripciones
  - Enfoque para evaluación técnica profesional
  - Nota sobre mala práctica de incluir environments en repositorio
  - Índice de contenidos clickeable para mejor navegación

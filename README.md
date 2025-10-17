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
- [Compilación para Móvil](#compilación-para-móvil)
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
- **Apache Cordova 12**: Runtime nativo para empaquetado en Android e iOS
- **Firebase Authentication**: Gestión de usuarios y autenticación segura
- **Firebase Firestore**: Base de datos NoSQL en tiempo real
- **Firebase Remote Config**: Feature flags y configuración remota para A/B testing
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
│   │   ├── services/            # Servicios singleton (AuthService, TodoService, FeatureFlagService)
│   │   ├── models/              # Interfaces y modelos de datos (User, Task)
│   │   ├── interfaces/          # Contratos de servicios (IAuthService)
│   │   └── validators/          # Validadores personalizados (email, password-match)
│   ├── shared/                  # Componentes y módulos reutilizables
│   │   ├── components/          # Componentes compartidos
│   │   │   ├── auth-layout/     # Layout para login/register con glassmorphism
│   │   │   └── task-modal/      # Modal para crear/editar tareas
│   │   └── shared.module.ts     # Módulo de exportación de componentes comunes
│   ├── auth/                    # Módulo de autenticación
│   │   ├── login/               # Página de inicio de sesión
│   │   └── register/            # Página de registro con validaciones
│   ├── pages/                   # Páginas principales de la aplicación
│   │   ├── tabs/                # Navegación por tabs (Home, Tareas, Perfil)
│   │   ├── todo-list/           # Lista de tareas con CRUD completo
│   │   └── profile/             # Perfil de usuario con feature flags
│   └── home/                    # Página de inicio con resumen de tareas
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

## Compilación para Móvil

Esta aplicación está configurada para ser compilada y ejecutada en dispositivos Android e iOS utilizando Apache Cordova.

### Plataformas Soportadas

- **Android**: API 24+ (Android 7.0 Nougat o superior)
- **iOS**: iOS 13.0 o superior (requiere macOS y Xcode)

### Guía de Compilación Completa

Para instrucciones detalladas sobre cómo compilar y ejecutar la aplicación en Android e iOS, consulta el archivo **[BUILD.md](BUILD.md)** que incluye:

- Requisitos previos para cada plataforma
- Configuración de Firebase para Android e iOS
- Instrucciones paso a paso para compilar
- Comandos para ejecutar en emuladores y dispositivos físicos
- Generación de APK/IPA para producción
- Solución de problemas comunes

### Comandos Rápidos

**Android**:
```bash
# Compilar proyecto web
npm run build

# Ejecutar en emulador
cordova run android --emulator

# Ejecutar en dispositivo
cordova run android --device

# Generar APK release
cordova build android --release
```

**iOS** (solo macOS):
```bash
# Compilar proyecto web
npm run build

# Ejecutar en simulador
cordova run ios --emulator

# Ejecutar en dispositivo
cordova run ios --device

# Abrir en Xcode
open platforms/ios/Setitodo.xcworkspace
```

### Archivos de Configuración Firebase

Para que la aplicación funcione correctamente en dispositivos móviles, necesitas agregar los archivos de configuración de Firebase:

**Android**: `platforms/android/app/google-services.json`
**iOS**: `platforms/ios/Setitodo/Resources/GoogleService-Info.plist`

Consulta [BUILD.md](BUILD.md) para instrucciones detalladas sobre cómo obtener y configurar estos archivos.

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

### ToDo List (Gestión de Tareas):
- Sistema completo de CRUD de tareas
  - Modelo de datos Task (description, startTime, endTime, repeatDays, completed)
  - TodoService con Firebase Firestore para persistencia en tiempo real
  - Integración por usuario (cada usuario ve solo sus tareas)
  - Modal de creación/edición de tareas con Angular Material
  - Timepicker personalizado con ngx-material-timepicker y tema morado
  - Selección de días de repetición con checkboxes estilizados
  - Validación de formularios reactivos con feedback visual
  - Lista de tareas con checkboxes para marcar como completadas
  - Chips visuales mostrando días de repetición (Lun, Mar, Mié, etc.)
  - Diseño responsive con cards de Material Design
  - Estados de carga y manejo de errores con try-catch
  - Navegación por tabs integrada (Home, Tareas, Perfil)
  - Filtrado automático de tareas completadas en la vista Home
  - Visualización de primeras 5 tareas pendientes en Home
  - Truncado de descripciones largas a 25 caracteres en Home
  - Botón flotante (FAB) para agregar nuevas tareas
  - Eliminación de campo "title" para simplificar UX

### Perfil de Usuario:
- Página de perfil completa con información del usuario
  - Visualización de datos de Firebase Auth (displayName, email, uid)
  - Avatar con icono de usuario y gradiente morado
  - Cards de información con diseño glassmorphism
  - Botón de cierre de sesión con confirmación
  - Feature Flags con Firebase Remote Config
    - FeatureFlagService integrado para A/B testing
    - Parámetro "featureflag" (Boolean) controlado desde Firebase Console
    - Tarjeta de "Configuración" mostrada/ocultada dinámicamente
    - Caché inteligente: 0ms en desarrollo, 1 hora en producción
    - Inicialización con valores por defecto (false)
    - Manejo robusto de errores con fallback automático
  - Diseño responsive optimizado para móviles
  - Navegación integrada en sistema de tabs

### Compilación Móvil (Android/iOS):
- Migración completa de Capacitor a Apache Cordova
  - Configuración multi-plataforma en config.xml
  - Package ID: com.ktarch.setitodo
  - Android: Min SDK 24, Target SDK 35, AndroidX habilitado
  - iOS: Deployment target 13.0, Swift 5.0, WKWebView configurado
  - Plugins nativos instalados (FirebaseX, StatusBar, Splashscreen, Device)
  - Firebase configurado con appId web correcto
  - BUILD.md con guía completa de compilación (481 líneas)
    - Requisitos previos para Android (JDK, Android Studio, Gradle)
    - Requisitos previos para iOS (Xcode, CocoaPods, ios-deploy)
    - Instrucciones paso a paso para ambas plataformas
    - Comandos para emuladores y dispositivos físicos
    - Generación de APK/IPA para producción
    - Configuración de google-services.json (Android)
    - Configuración de GoogleService-Info.plist (iOS)
    - Sección completa de solución de problemas
  - README actualizado con sección de compilación móvil
  - Comandos rápidos documentados para desarrollo ágil

# SetiToDo

Es una app realizada con Ionic y Angular que nos permite registrar nuestras tareas o actividades de una manera divertida.

## Funcionalidades

Podremos:

- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Iniciar sesión con correo y contraseña (Firebase)
- Registrarse como nuevo usuario

## Tecnologías

- **Ionic 8**: Framework para desarrollo de aplicaciones móviles híbridas
- **Angular 20**: Framework de desarrollo web
- **Firebase**: Plataforma para autenticación de usuarios
- **Angular Material**: Componentes de interfaz
- **Bootstrap 5**: Estilos y diseño responsive

---

## 📚 Guía de Git Flow - Explicación Simple

### ¿Qué es Git Flow?

Imagina que estás escribiendo un libro con varios capítulos. Git Flow es como tener diferentes cuadernos para organizar tu trabajo:

1. **Cuaderno Principal (master)** - Es tu libro terminado y publicado. Solo pones aquí las versiones finales.
2. **Cuaderno de Borrador (develop)** - Aquí escribes y mejoras tus capítulos día a día.
3. **Cuaderno de Revisión (qa)** - Aquí otra persona revisa tu trabajo antes de publicarlo.
4. **Hojas Sueltas (feature/*)** - Para escribir cada capítulo nuevo por separado.

### Ramas del Proyecto

```
master (producción - lo que ven los usuarios)
  ↑
  qa (revisión antes de publicar)
  ↑
  develop (donde trabajamos todos los días)
  ↑
  feature/* (cada nueva función)
```

### ¿Por qué usar Git Flow?

✅ **Organización**: Todo en su lugar, como cajones ordenados
✅ **Seguridad**: Si algo sale mal, no afecta lo que ya funciona
✅ **Trabajo en equipo**: Varias personas pueden trabajar sin estorbarse
✅ **Historial claro**: Puedes ver qué se hizo y cuándo
✅ **Versiones**: Puedes volver a una versión anterior si es necesario

---

## 🔄 Cómo Trabajar con Git Flow (Paso a Paso)

### Paso 1: Empezar una nueva función

```bash
# 1. Ve al cuaderno de borrador
git checkout develop

# 2. Asegúrate de tener la última versión
git pull origin develop

# 3. Crea una hoja nueva para tu función
git checkout -b feature/nombre-de-tu-funcion
```

**Ejemplo real:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/agregar-tareas
```

### Paso 2: Trabajar en tu función

```bash
# 1. Haz tus cambios en el código (edita archivos)

# 2. Guarda los cambios
git add .

# 3. Escribe qué hiciste
git commit -m "feat: agregar botón para crear nuevas tareas"
```

### Paso 3: Terminar la función

```bash
# 1. Vuelve al cuaderno de borrador
git checkout develop

# 2. Une tu trabajo con el borrador
git merge feature/agregar-tareas

# 3. Sube los cambios
git push origin develop
```

### Paso 4: Enviar a revisión

```bash
# 1. Ve al cuaderno de revisión
git checkout qa

# 2. Trae todo el trabajo del borrador
git merge develop

# 3. Súbelo para que lo revisen
git push origin qa
```

### Paso 5: Publicar (después de aprobar)

```bash
# 1. Ve al cuaderno principal
git checkout master

# 2. Trae el trabajo revisado
git merge qa

# 3. Ponle una etiqueta de versión
git tag -a v1.0.0 -m "Versión 1.0.0"

# 4. Publica todo
git push origin master --tags
```

---

## 📝 Tipos de Mensajes en los Commits

Como escribir una nota clara sobre lo que hiciste:

| Tipo | ¿Cuándo usarlo? | Ejemplo |
|------|----------------|---------|
| `feat:` | Agregaste algo nuevo | `feat: agregar botón de eliminar tarea` |
| `fix:` | Arreglaste un error | `fix: corregir error al guardar tareas` |
| `style:` | Cambiaste colores o diseño | `style: cambiar color del botón a azul` |
| `refactor:` | Mejoraste el código sin cambiar qué hace | `refactor: simplificar función de login` |
| `docs:` | Actualizaste documentación | `docs: agregar instrucciones de instalación` |
| `test:` | Agregaste pruebas | `test: agregar prueba para login` |
| `chore:` | Tareas de mantenimiento | `chore: actualizar dependencias` |

### Ejemplos completos:

```bash
git commit -m "feat: implementar registro de usuarios con Firebase"
git commit -m "fix: corregir validación de correo electrónico"
git commit -m "style: mejorar diseño de la página de login"
git commit -m "docs: actualizar README con instrucciones de GitFlow"
```

---

## 🚀 Comandos Rápidos

### Ver en qué rama estás:
```bash
git branch
```

### Ver todas las ramas:
```bash
git branch -a
```

### Cambiar de rama:
```bash
git checkout nombre-rama
```

### Ver qué cambios tienes:
```bash
git status
```

### Ver historial de cambios:
```bash
git log --oneline
```

---

## 💡 Consejos Importantes

1. **Siempre trabaja en develop o en una feature**, nunca directamente en master
2. **Haz commits pequeños y frecuentes**, es mejor guardar poco a poco
3. **Escribe mensajes claros**, para que otros (y tú en el futuro) entiendan qué hiciste
4. **Prueba tu código antes de hacer commit**, asegúrate de que funciona
5. **Haz pull antes de push**, para tener los últimos cambios

---

## 🛠️ Instalación y Desarrollo

### Instalar dependencias:
```bash
npm install
```

### Iniciar servidor de desarrollo:
```bash
npm start
```

### Compilar para producción:
```bash
npm run build
```

### Ejecutar pruebas:
```bash
npm test
```

### Ejecutar linter:
```bash
npm run lint
```

---

## 📱 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/              # Módulos de autenticación
│   │   ├── login/         # Página de inicio de sesión
│   │   └── register/      # Página de registro
│   ├── core/              # Servicios y funcionalidad central
│   │   ├── guards/        # Protección de rutas
│   │   ├── services/      # Servicios (auth, etc.)
│   │   ├── models/        # Modelos de datos
│   │   └── validators/    # Validadores personalizados
│   ├── shared/            # Componentes compartidos
│   │   └── components/    # Componentes reutilizables
│   └── home/              # Página principal
└── environments/          # Configuración de entornos
```

---

## 🔐 Configuración de Firebase

Las credenciales de Firebase están en:
- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.prod.ts` (producción)

---

## 📄 Licencia

Este proyecto es de uso educativo.

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

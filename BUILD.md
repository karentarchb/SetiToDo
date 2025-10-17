# Guía de Compilación - SetiToDo

Esta guía proporciona instrucciones detalladas para compilar y ejecutar la aplicación SetiToDo en dispositivos y emuladores Android e iOS utilizando Apache Cordova.

## 📑 Índice

- [Requisitos Previos](#requisitos-previos)
  - [Para Android](#para-android)
  - [Para iOS](#para-ios)
- [Configuración Inicial](#configuración-inicial)
- [Compilación para Android](#compilación-para-android)
  - [Configurar Firebase para Android](#configurar-firebase-para-android)
  - [Compilar el Proyecto](#compilar-el-proyecto-android)
  - [Ejecutar en Emulador](#ejecutar-en-emulador-android)
  - [Ejecutar en Dispositivo Físico](#ejecutar-en-dispositivo-físico-android)
  - [Generar APK para Producción](#generar-apk-para-producción)
- [Compilación para iOS](#compilación-para-ios)
  - [Configurar Firebase para iOS](#configurar-firebase-para-ios)
  - [Agregar Plataforma iOS](#agregar-plataforma-ios)
  - [Compilar el Proyecto](#compilar-el-proyecto-ios)
  - [Ejecutar en Simulador](#ejecutar-en-simulador-ios)
  - [Ejecutar en Dispositivo Físico](#ejecutar-en-dispositivo-físico-ios)
- [Solución de Problemas](#solución-de-problemas)

---

## Requisitos Previos

### Para Android

**Sistema Operativo**: Windows, macOS o Linux

**Software necesario**:

1. **Node.js y npm** (v18 o superior)
   ```bash
   node --version
   npm --version
   ```

2. **Java Development Kit (JDK) 17**
   - Descargar desde: https://www.oracle.com/java/technologies/downloads/#java17
   - Configurar variable de entorno `JAVA_HOME`

   Windows:
   ```cmd
   setx JAVA_HOME "C:\Program Files\Java\jdk-17"
   setx PATH "%PATH%;%JAVA_HOME%\bin"
   ```

   macOS/Linux:
   ```bash
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. **Android Studio**
   - Descargar desde: https://developer.android.com/studio
   - Instalar SDK de Android (API 35 recomendado)
   - Configurar variables de entorno:

   Windows:
   ```cmd
   setx ANDROID_HOME "C:\Users\USUARIO\AppData\Local\Android\Sdk"
   setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools"
   ```

   macOS/Linux:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH
   ```

4. **Gradle**
   - Se instala automáticamente con Android Studio
   - Verificar instalación: `gradle --version`

5. **Cordova CLI**
   ```bash
   npm install -g cordova
   ```

**Verificar instalación**:
```bash
cordova requirements android
```

### Para iOS

**Sistema Operativo**: macOS (obligatorio)

**Software necesario**:

1. **Node.js y npm** (v18 o superior)

2. **Xcode** (versión 14 o superior)
   - Descargar desde App Store
   - Instalar Command Line Tools:
   ```bash
   xcode-select --install
   ```

3. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   pod setup
   ```

4. **ios-deploy** (para dispositivos físicos)
   ```bash
   npm install -g ios-deploy
   ```

5. **Cordova CLI**
   ```bash
   npm install -g cordova
   ```

**Verificar instalación**:
```bash
cordova requirements ios
```

---

## Configuración Inicial

1. **Clonar el repositorio**:
```bash
git clone https://github.com/karentarchb/SetiToDo.git
cd SetiToDo
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Compilar el proyecto web**:
```bash
npm run build
```

Este comando genera los archivos estáticos en la carpeta `www/`, que es la que Cordova empaqueta para las plataformas nativas.

---

## Compilación para Android

### Configurar Firebase para Android

1. **Ir a Firebase Console**: https://console.firebase.google.com

2. **Seleccionar proyecto "setitodo"**

3. **Agregar app Android** (si no existe):
   - Click en "Agregar app" → Android
   - Nombre del paquete: `com.ktarch.setitodo`
   - Alias de la app: `Setitodo`
   - Click en "Registrar app"

4. **Descargar `google-services.json`**:
   - En la consola de Firebase, descargar el archivo
   - Colocarlo en: `platforms/android/app/google-services.json`

   ```bash
   # Si la carpeta no existe, crear primero
   mkdir -p platforms/android/app
   # Copiar el archivo descargado
   cp ~/Downloads/google-services.json platforms/android/app/
   ```

### Compilar el Proyecto Android

1. **Verificar que la plataforma Android está agregada**:
```bash
cordova platform ls
```

Si no está agregada:
```bash
cordova platform add android
```

2. **Compilar para Android**:
```bash
cordova build android
```

Este comando genera el APK en:
`platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Ejecutar en Emulador Android

1. **Listar emuladores disponibles**:
```bash
emulator -list-avds
```

2. **Iniciar emulador**:
```bash
emulator -avd Pixel_5_API_35 &
```

3. **Ejecutar la app en el emulador**:
```bash
cordova run android --emulator
```

O directamente sin especificar emulador (Cordova elige el primero disponible):
```bash
cordova emulate android
```

### Ejecutar en Dispositivo Físico Android

1. **Habilitar "Opciones de desarrollador"** en el dispositivo:
   - Ir a Configuración → Acerca del teléfono
   - Tocar 7 veces sobre "Número de compilación"
   - Volver a Configuración → Opciones de desarrollador
   - Activar "Depuración USB"

2. **Conectar dispositivo por USB**

3. **Verificar que el dispositivo es detectado**:
```bash
adb devices
```

4. **Ejecutar la app en el dispositivo**:
```bash
cordova run android --device
```

### Generar APK para Producción

1. **Compilar en modo release**:
```bash
cordova build android --release
```

2. **Firmar el APK** (opcional, para distribución):
```bash
# Generar keystore (solo la primera vez)
keytool -genkey -v -keystore setitodo-release.keystore -alias setitodo -keyalg RSA -keysize 2048 -validity 10000

# Firmar APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore setitodo-release.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk setitodo

# Optimizar con zipalign
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk setitodo-release.apk
```

---

## Compilación para iOS

### Configurar Firebase para iOS

1. **Ir a Firebase Console**: https://console.firebase.google.com

2. **Seleccionar proyecto "setitodo"**

3. **Agregar app iOS**:
   - Click en "Agregar app" → iOS
   - ID del paquete de iOS: `com.ktarch.setitodo`
   - Alias de la app: `Setitodo`
   - Click en "Registrar app"

4. **Descargar `GoogleService-Info.plist`**:
   - En la consola de Firebase, descargar el archivo
   - Colocarlo en: `platforms/ios/Setitodo/Resources/GoogleService-Info.plist`

   ```bash
   # Esperar a agregar la plataforma primero
   # Luego copiar el archivo:
   cp ~/Downloads/GoogleService-Info.plist platforms/ios/Setitodo/Resources/
   ```

### Agregar Plataforma iOS

**Nota**: Este paso solo funciona en macOS.

```bash
cordova platform add ios
```

### Compilar el Proyecto iOS

1. **Compilar para iOS**:
```bash
cordova build ios
```

2. **Instalar pods** (dependencias nativas):
```bash
cd platforms/ios
pod install
cd ../..
```

### Ejecutar en Simulador iOS

1. **Listar simuladores disponibles**:
```bash
xcrun simctl list devices
```

2. **Ejecutar en simulador**:
```bash
cordova run ios --emulator
```

O especificar un simulador:
```bash
cordova run ios --emulator --target="iPhone-15"
```

### Ejecutar en Dispositivo Físico iOS

1. **Abrir Xcode**:
```bash
open platforms/ios/Setitodo.xcworkspace
```

2. **Configurar equipo de desarrollo**:
   - En Xcode, ir a Project Navigator → Setitodo
   - Seleccionar target "Setitodo"
   - En "Signing & Capabilities"
   - Seleccionar tu equipo en "Team"

3. **Conectar dispositivo iOS por USB**

4. **Seleccionar dispositivo** en Xcode (barra superior)

5. **Ejecutar** (⌘ + R) o desde terminal:
```bash
cordova run ios --device
```

**Nota**: Necesitas una cuenta de desarrollador de Apple (gratuita o de pago) para ejecutar en dispositivos físicos.

---

## Solución de Problemas

### Android

**Problema**: `JAVA_HOME is not set`
```bash
# Windows
setx JAVA_HOME "C:\Program Files\Java\jdk-17"

# macOS/Linux
export JAVA_HOME=$(/usr/libexec/java_home)
```

**Problema**: `Android SDK not found`
```bash
# Verificar ruta del SDK
echo $ANDROID_HOME

# Configurar manualmente si es necesario
export ANDROID_HOME=$HOME/Library/Android/sdk
```

**Problema**: `Gradle build failed`
```bash
# Limpiar build de Gradle
cd platforms/android
./gradlew clean
cd ../..

# Volver a compilar
cordova build android
```

**Problema**: `google-services.json missing`
- Asegurarse de que el archivo está en: `platforms/android/app/google-services.json`
- Si no existe, descargarlo de Firebase Console

### iOS

**Problema**: `xcode-select: error`
```bash
sudo xcode-select --reset
xcode-select --install
```

**Problema**: `CocoaPods not found`
```bash
sudo gem install cocoapods
pod setup
```

**Problema**: `Provisioning profile error`
- Abrir Xcode
- Ir a Preferences → Accounts
- Agregar Apple ID
- En el proyecto, seleccionar el equipo correcto

**Problema**: `GoogleService-Info.plist not found`
- Asegurarse de que el archivo está en: `platforms/ios/Setitodo/Resources/GoogleService-Info.plist`
- Si no existe, agregarlo manualmente desde Xcode

### General

**Problema**: `www folder not found`
```bash
# Compilar el proyecto Angular/Ionic primero
npm run build
```

**Problema**: Plugins no se instalan
```bash
# Remover y volver a agregar plataforma
cordova platform rm android
cordova platform add android

# o para iOS
cordova platform rm ios
cordova platform add ios
```

**Problema**: Cambios no se reflejan
```bash
# Limpiar cache y recompilar
rm -rf www/
npm run build
cordova clean
cordova build android  # o ios
```

---

## Comandos Rápidos

### Android
```bash
# Desarrollo completo en emulador
npm run build && cordova run android --emulator

# Desarrollo completo en dispositivo
npm run build && cordova run android --device

# Release
npm run build && cordova build android --release
```

### iOS
```bash
# Desarrollo completo en simulador
npm run build && cordova run ios --emulator

# Desarrollo completo en dispositivo
npm run build && cordova run ios --device

# Abrir en Xcode
open platforms/ios/Setitodo.xcworkspace
```

---

## Información del Proyecto

- **ID del paquete**: `com.ktarch.setitodo`
- **Versión**: `1.0.0`
- **Plataformas soportadas**: Android (API 24+), iOS (13.0+)
- **Firebase Project**: `setitodo`
- **Cordova Android**: `14.0.1`
- **Cordova iOS**: Se agregará en macOS

---

## Recursos Adicionales

- [Documentación de Cordova](https://cordova.apache.org/docs/en/latest/)
- [Guía de Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/)
- [Guía de iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)
- [Firebase para Android](https://firebase.google.com/docs/android/setup)
- [Firebase para iOS](https://firebase.google.com/docs/ios/setup)

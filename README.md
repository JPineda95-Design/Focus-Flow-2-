# FocusFlow v20

Aplicación de productividad y bienestar con diseño Bento Grid y principios de Behavioral Design.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en http://localhost:3000

## Producción

```bash
# Compilar para producción
npm run build

# Previsualizar build
npm run preview
```

## Estructura del proyecto

```
focusflow/
├── index.html              # Entrada HTML con fuentes Google
├── vite.config.js          # Configuración de Vite
├── package.json
└── src/
    ├── main.jsx            # Punto de entrada React
    └── FocusFlow.jsx       # Aplicación completa (v20)
```

## Tecnologías

- React 18
- Vite 5
- lucide-react (iconos)
- CSS-in-JS (estilos inline + `<style>` tag con variables CSS)

## Planes de suscripción

La app incluye un sistema de monetización ético con tres niveles:
- **Flow Básico** — Gratuito
- **Flow Pro** — €7/mes (7 días gratis)
- **Zen Pass** — €149 pago único (lifetime)

Para cambiar el plan por defecto, edita en `FocusFlow.jsx`:
```js
const [userPlan, setUserPlan] = useState("free"); // "free" | "pro" | "lifetime"
```

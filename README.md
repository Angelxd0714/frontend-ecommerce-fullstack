# 🛒 E-commerce Frontend – React + TypeScript + Vite

Este proyecto representa el **frontend** de una tienda en línea simulada, desarrollado con **React**, **TypeScript** y **Vite**, e integrado con la pasarela de pagos **[Wompi](https://www.wompi.co/)**. Cuenta con funcionalidades reales como catálogo de productos, carrito de compras, y checkout con Wompi.

---

## ⚙️ Tecnologías utilizadas

- ⚛️ [React](https://reactjs.org/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 💳 [Wompi](https://www.wompi.co/) para pagos
- 🎨 (Opcional) [Mantine](https://mantine.dev/) para estilos
- 🧪 [ESLint](https://eslint.org/) con configuración avanzada
- 📦 [PNPM / Yarn / NPM] como gestor de paquetes

---

## ✨ Funcionalidades principales

- 🛍️ Visualización de productos y categorías
- 🧺 Carrito de compras con almacenamiento local
- 🔐 Validaciones básicas de formularios
- 💳 Checkout integrado con **Wompi**
- 🧪 Componentes modulares y tipados
- ⚡ Hot Reload con Vite

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ecommerce-frontend.git
cd ecommerce-frontend

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


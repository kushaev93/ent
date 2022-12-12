# WillFid

Vue 3 Project
Node 16.17.0
Yarn 1.22.15

## Установка проекта

```bash
Склонируйте проект, затем:
yarn
# or
npm install
```

### ЗАпуск проекта в режиме разработчика

```bash
yarn quasar dev -m ssr
```

### Lint

```bash
yarn lint
# or
npm run lint
```

### Сборка проекта

```bash
yarn quasar build -m ssr
```

### Пример ecosystem для pm2

```bash
module.exports = {
  apps: [
    {
      name: 'Shop-Dev',
      instances: '1', // Or a number of instances
      script: './dist/ssr/index.js',
      port: 9009
    }
  ]
}
```

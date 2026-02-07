# MPP Rocket League - Monorepo

Un monorepo contenant l'application client et serveur pour MPP Rocket League.

## Structure

- `mpp-rl-client/` - Application Vue.js frontend
- `mpp-rl-server/` - API Node.js/Express backend

## Prérequis

- Node.js >= 18.0.0
- Yarn >= 3.0.0

## Installation

```bash
# Installer toutes les dépendances
yarn install
```

## Scripts disponibles

### Développement

```bash
# Démarrer client et serveur en mode développement
yarn dev

# Démarrer uniquement le client
yarn dev:client

# Démarrer uniquement le serveur
yarn dev:server
```

### Build

```bash
# Builder client et serveur
yarn build

# Builder uniquement le client
yarn build:client

# Builder uniquement le serveur
yarn build:server
```

### Tests et qualité

```bash
# Lancer les tests
yarn test

# Linter tout le code
yarn lint

# Formatter tout le code
yarn format

# Vérification des types TypeScript
yarn type-check
```

### Utilitaires

```bash
# Nettoyer les node_modules
yarn clean

# Démarrer le serveur en production
yarn start
```

## Workspaces

Ce projet utilise Yarn Workspaces pour gérer les dépendances partagées et les scripts inter-packages.

- Toutes les dépendances communes sont hissées à la racine
- Chaque workspace peut avoir ses propres dépendances spécifiques
- Les scripts peuvent être exécutés globalement ou par workspace

## Contribution

1. Cloner le repo
2. Installer les dépendances avec `yarn install`
3. Développer avec `yarn dev`
4. Tester avec `yarn test`
5. Formater avec `yarn format`
6. Builder avec `yarn build`

## Licence

ISC

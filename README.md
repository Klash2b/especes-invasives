/!\ Version non finale /!\

# especes-invasives

> Application permettant de signaler des espèces invasives et savoir lorsque l'on se trouve dans une zone protégée.

<!-- ![Demo screenshot](demo.png) -->

## Première configuration

Cloner le repo puis executer les commandes suivantes depuis \especes-invasives\ :

```sh
npm install
npm run build
cd cordova_app
cordova platform remove android
cordova platform add android
cordova run # ou build
```

## Tests sur navigateur

```bash
# execution avec hot reload sur localhost:8080
npm run serve
```

## Tests sur emulateur / mobile

À partir de la racine :

```sh
# execution sur emulateur / mobile
npm run cordova_run # ou cordova_build
```

## Déploiement en production

À partir de la racine :

```sh
# build pour la production
npm run build
```



<!-- ## Plugins

- cordova-plugin-dialogs
- cordova-plugin-vibration
- cordova-plugin-geolocation
- cordova-plugin-flashlight
- cordova-plugin-camera
- phonegap-nfc
- cordova-plugin-statusbar
- cordova-plugin-headercolor -->

# especes-invasives

> Application permettant de signaler des espèces invasives et savoir lorsque l'on se trouve dans une zone protégée.

<!-- ![Demo screenshot](demo.png) -->

## Configuration 

```bash
# execution avec hot reload sur localhost:8080
npm run serve

# build pour la production
npm run build
```

## Premier build

Executez les commandes :

```sh
npm install
npm run build
cd cordova_app
cordova platform add android
cordova run # ou build
```

## Prochains build Cordova

À partir de la racine :

```sh
npm run cordova_run # ou cordova_build
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

// Page permettant le signalement d'espèces invasives
<template>
  <v-container text-center>
    <!-- Message s'affichant si aucune donnée n'a été téléchargée et permettant
    à l'utilisateur de relancer la page une fois la connexion internet rétablie -->
    <v-row dense v-show="this.especes == null">
      <div>
        Pas de connexion internet, impossible de charger les fiches espèces !
      </div>
      <v-btn @click="getData()">Reload Page</v-btn>
    </v-row>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-autocomplete
        v-model="select"
        :items="especes"
        :rules="[(v) => !!v || $t('report.form.speciesWarning')]"
        outlined
        color="indigo"
        style="min-height: 96px"
        :label="$t('report.form.speciesField')"
        prepend-icon="pets"
        required
      ></v-autocomplete>

      <v-textarea
        v-model="description"
        auto-grow
        outlined
        color="indigo"
        :label="$t('report.form.descField')"
        style="min-height: 96px"
        rows="1"
        prepend-icon="description"
      ></v-textarea>

      <v-text-field
        v-model="imagePath"
        readonly
        outlined
        color="indigo"
        :label="$t('report.form.picField')"
        style="min-height: 96px"
        :rules="[(v) => !!v || $t('report.form.picWarning')]"
        prepend-icon="camera_alt"
      ></v-text-field>

      <img v-if="imagePath !== ''" :src="imagePath" />
      <v-btn color="indigo" class="ma-2 white--text" @click="takePicture">
        <v-icon left>add_a_photo</v-icon
        >{{ $t("report.form.takePhotoButton") }}</v-btn
      >
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="success"
        depressed
        @click="sendForm"
        >{{ $t("report.form.sendButton") }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn text @click="$refs.form.reset()" color="error">
        {{ $t("report.form.resetButton") }}
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
const axios = require("axios");
import { nativeAlert } from "../libs/index";

export default {
  name: "report",
  data() {
    return {
      especes: null, // Variable récupérant les données depuis la BDD Locale et contenant tous les noms des espèces invasives
      select: null, // Variable permettant d'initialiser le 'select' avec le nom d'une espèce signalée depuis une fiche
      description: "",
      imagePath: "",

      form: false,
      isLoading: false,
    };
  },
  beforeMount() {
    // On récupère les données de l'API externe avant d'afficher les noms des espèces
    this.getData();
  },
  created() {
    // On remplis la variable 'especes' avec le contenu de la BDD LocalStorage
    this.especes = JSON.parse(localStorage.getItem("especesDB"));
  },
  mounted() {
    // Permet d'initialiser le 'select' avec le nom d'une espèce signalée depuis une fiche
    if (this.$route.params.ficheName != null) {
      this.select = this.$route.params.ficheName;
    }
  },
  methods: {
    // Fonction permettant de récupérer les données de
    // l'API externe et de les stocker dans la BDD LocalStorage
    getData() {
      axios
        .get(
          "https://gaia.oec.fr/getdata.php?do=get_especes_inv&key=fea9a667df9db40499ebf94e5b6a07f6"
        )
        .then((response) =>
          localStorage.setItem(
            "especesDB",
            JSON.stringify(
              response.data.result.data.map(
                (especes) => especes.nom_scientifique
              )
            )
          )
        );
      this.especes = JSON.parse(localStorage.getItem("especesDB"));
    },
    // Fonction utilisant le plugin cordova
    // camera et permettant de prendre une photo
    takePicture() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          quality: 70,
          destinationType: Camera.DestinationType.FILE_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          saveToPhotoAlbum: false,
          encodingType: Camera.EncodingType.JPG,
          mediaType: Camera.MediaType.PICTURE,
          targetWidth: 1024,
          targetHeight: 1024,
          direction: 1,
        });
      } else {
        this.error();
      }
    },
    // Fonction permettant de récupérer le chemin de l'image
    // prise en photo et d'envoyer ce chemin dans l'input dédié
    setPicture(imagePath) {
      this.imagePath = imagePath;
    },
    // Fonctions permettant d'envoyer une alerte avec
    // les informations des erreurs rencontrées
    error() {
      nativeAlert(this.$t("error"));
    },
    locError() {
      nativeAlert(
        this.$t("report.pos.positionNotAvailable"),
        this.$t("report.pos.title")
      );
    },
    setOptionCamera(srcType) {
      return {
        quality: 70,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: srcType,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        encodingType: Camera.EncodingType.JPG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 1024,
        targetHeight: 1024,
        direction: 1,
      };
    },
    // Fonction permettant de valider le formulaire
    validate() {
      this.$refs.form.validate();
    },
    // Fonction permettant de réinitialiser le formulaire
    reset() {
      this.imagePath = "";
      this.$refs.form.reset();
    },
    // Fonction permettant d'envoyer le formulaire
    sendForm() {
      // On récupère la géolocalisation de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.successLoc,
          this.locError,
          {
            enableHighAccuracy: true,
            timeout: 3000,
          }
        );
      } else {
        this.locError();
      }
    },
    // Si la localisation a aboutit
    successLoc(pos) {
        nativeAlert(
          "UUID de l'appareil : " +
            device.uuid +
            "\nEspèce : " +
            this.select +
            "\nDescription : " +
            (this.description || "Aucune description") +
            "\nPhoto : " +
            this.imagePath +
            "\nLatitude : " +
            pos.coords.latitude +
            "\nLongitude : " +
            pos.coords.longitude,
          this.$t("report.pos.title")
        );
    },
  },
};
</script>

<style scoped>
img {
  width: 50%;
  display: block;
  margin: auto;
}
</style>

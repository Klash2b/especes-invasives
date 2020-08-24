// Require Cordova plugin : cordova-plugin-camera
<template>
  <v-container text-center>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-autocomplete
        v-model="select"
        :items="items"
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
import { nativeAlert } from "../libs/index";

export default {
  name: "report",
  data() {
    return {
      select: null,
      description: "",
      imagePath: "",

      items: [
        "Acrothamne de Preiss",
        "Flocon pédonculé blanc",
        "Algue à crochets",
        "Algue chevelue rouge",
        "Crabe bleu américain",
        "Raisin de mer",
        "Caulerpe à feuilles d’if",
        "Algue chou-fleur",
        "Huître creuse",
        "Poisson flûte",
        "Poisson ballon",
        "Lophocladia lallemendii",
        "Microcosmus squamiger",
        "Méduse américaine",
        "Ostréopsis",
        "Blennie pilicorne",
        "Crabe plat des oursins",
        "Huître perlière rayée",
        "Serpenton à selles",
        "Rascasse volante de l’océan Indien",
        "Sargasse japonaise",
        "Poisson-lapin à queue tronquée",
        "Poisson-lapin à ventre strié ",
        "Ascidie blanche plissée",
        "Poisson pierre commun ",
        "Womersleyelle sétacée",
      ],

      form: false,
      isLoading: false,
    };
  },
  mounted() {},
  methods: {
    // Use the camera plugin to capture image
    takePicture() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {});
      } else {
        this.error();
      }
    },
    setPicture(imagePath) {
      this.imagePath = imagePath;
    },
    error() {
      nativeAlert(this.$t("error"));
    },
    locError() {
      nativeAlert(
        this.$t("report.pos.positionNotAvailable"),
        this.$t("report.pos.title")
      );
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.imagePath = "";
      this.$refs.form.reset();
    },
    sendForm() {
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
    successLoc(pos) {
      nativeAlert(
        "Espèce : " +
          this.select +
          "\nDescription : " +
          this.description +
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

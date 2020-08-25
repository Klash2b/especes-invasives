// Require Cordova plugin :

<template>
  <v-container text-center>
    <v-btn>Paramètres</v-btn>
    <v-btn
      depressed
      height="64px"
      width="64px"
      @click="swapLanguage('fr')"
      class="btnLangFrance"
    >
      <v-img contain height="64px" width="64px" :src="images.france"></v-img>
    </v-btn>
    <v-btn
      depressed
      height="64px"
      width="64px"
      @click="swapLanguage('it')"
      class="btnLangItaly"
    >
      <v-img contain height="64px" width="64px" :src="images.italy"></v-img>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      images: {
        france: require("../assets/images/squareFrance.png"),
        italy: require("../assets/images/squareItaly.png"),
      },
    };
  },
  methods: {
    swapLanguage(selectedLang) {
      if (this.$i18n.locale !== selectedLang) {
        this.$i18n.locale = selectedLang;
        // console.log("La langue a bien été changée en " + selectedLang + " !");
      }
    },
  },
};
</script>

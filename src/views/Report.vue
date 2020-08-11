// Require Cordova plugin : cordova-plugin-camera
<template>
  <v-container text-center>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <img v-if="imagePath !== ''" :src="imagePath" />
      <v-btn @click="takePicture">{{ $t("consult.takePhoto") }}</v-btn>

      <br />

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4 mt-8"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4 mt-8" @click="reset">
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { nativeAlert } from "../libs/index";

export default {
  name: "report",
  data() {
    return {
      imagePath: "",

      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  methods: {
    // Use the camera plugin to capture image
    takePicture() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {});
      } else {
        // If the navigator.camera is not available display generic error to the user.
        this.error();
      }
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imagePath) {
      this.imagePath = imagePath;
    },
    error() {
      nativeAlert(this.$t("error"));
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
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

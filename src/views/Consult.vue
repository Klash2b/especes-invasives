// Require Cordova plugin :

<template>
  <v-container fluid>
    <!-- <v-snackbar v-model="showOperationStatus">{{ operationStatus }}</v-snackbar> -->
    <!-- <v-subheader>
      {{ fiches.length }} records
      <v-spacer></v-spacer>
      <v-btn text @click="loadJson">load json</v-btn>
      <v-btn text @click="deleteAll()">
        Delete all<v-icon color="lighten-1">delete</v-icon>
      </v-btn>
    </v-subheader> -->
    <v-row dense>
      <v-col v-for="fiche in fiches" :key="fiche.id" :cols="fiche.flex">
        <v-card @click="cardClick(fiche)">
          <v-img
            :src="fiche.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="fiche.name"></v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="displayCard" max-width="500px">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :src="ficheSrc"
        >
          <v-card-title> {{ ficheName }}</v-card-title>
        </v-img>

        <v-card-text class="font-italic text-right mb-n6">{{
          ficheSpecie
        }}</v-card-text>

        <v-card-text class="text--primary text-justify">
          <div class="title indigo--text">Clé d'identification</div>
          {{ ficheIdText }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="indigo"
            text
            @click="
              $router.push({ name: 'Report', params: { ficheName: ficheName } })
            "
          >
            Signaler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const axios = require("axios");
import { nSQL } from "nano-sql";
import { getMode } from "cordova-plugin-nano-sqlite/lib/sqlite-adapter";

export default {
  name: "consult",
  data() {
    return {
      displayCard: false,
      showOperationStatus: false,
      operationStatus: "",
      fiches: [],
      ficheName: "",
      ficheSrc: "",
      ficheSpecie: "",
      ficheIdText: "",
    };
  },
  mounted() {
    document.addEventListener(
      typeof cordova !== "undefined" ? "deviceready" : "DOMContentLoaded",
      () => {
        let model = [
          { key: "id", type: "int", props: ["pk", "ai"] },
          { key: "name", type: "string" },
          { key: "src", type: "string" },
          { key: "specie", type: "string" },
          { key: "idText", type: "string" },
          { key: "flex", type: "int" },
        ];

        nSQL("fichedb")
          .config({
            mode: getMode(),
          })
          .model(model)
          .connect();

        nSQL().onConnected(() => {
          this.refreshData();
        });
      },
      this.loadJson(),
    );
  },
  methods: {
    async refreshData() {
      let rows = await nSQL("fichedb")
        .query("select")
        .exec();
      if (rows.length == 0) this.fiches = [];
      else this.fiches = rows;
    },
    loadJson() {
      axios.get("fiches_especes.json", {}).then((response) => {
        nSQL()
          .loadJS("fichedb", response.data, false)
          .then(() => {
            this.refreshData().then(() => {
              this.showOperationStatus = true;
              this.operationStatus = `JSON loaded`;
            });
          });
      });
    },
    // deleteFiche(fiche) {
    //   nSQL("fichedb")
    //     .query("delete")
    //     .where(["id", "=", fiche.id])
    //     .exec()
    //     .then((rows) => {
    //       this.showOperationStatus = true;
    //       this.operationStatus = `${rows.length} rows deleted`;
    //       this.refreshData();
    //     });
    // },
    // deleteAll() {
    //   nSQL("fichedb")
    //     .query("delete")
    //     .exec()
    //     .then((result) => {
    //       if (result[0].msg) {
    //         this.showOperationStatus = true;
    //         this.operationStatus = result[0].msg;
    //       }
    //       this.refreshData();
    //     });
    // },
    cardClick(fiche) {
      this.ficheName = fiche.name;
      this.ficheSrc = fiche.src;
      this.ficheSpecie = fiche.specie;
      this.ficheIdText = fiche.idText;
      this.displayCard = true;
    },
  },
  // computed: {
  //   cards() {
  //     return [
  //       {
  //         name: "Crabe bleu américain",
  //         src:
  //           "https://doris.ffessm.fr/var/doris/storage/images/media/images/callinectes_sapidus-ym02/2858985-3-fre-FR/callinectes_sapidus-ym02_image600.jpg",
  //         specie: "Callinectes sapidus",
  //         idText:
  //           "Carapace avec 2 dents frontales triangulaires et 9 dents latérales, la dernière étant très longue\nCrabe de grande taille, la largeur de la carapace peut dépasser 23 cm\nDernière paire de pattes terminée en palette aplatie\nAbdomen des mâles étroit et en forme de T\nCouleur plus ou moins bleue.",
  //         flex: 6,
  //       },
  //       {
  //         name: "Algue chou-fleur",
  //         specie: "Codium fragile",
  //         idText:
  //           "Codium fragile est une algue verte à vert foncé de taille moyenne (pouvant atteindre 30 cm de haut), dont la consistance est semblable à celle d’une éponge – douce et spongieuse. Elle est constituée d’axes présentant une dichotomie régulière (en forme de Y). Sa surface peut être recouverte d’une multitude de poils qui lui donne cet aspect duveteux et caractéristique des Codium. Sous une loupe, sa surface formée de petites vésicules terminées par une pointe la distingue des Codium de Méditerranée.",
  //         src:
  //           "https://doris.ffessm.fr/var/doris/storage/images/images/petit-specimen-de-profil-23090/197729-1-fre-FR/codium_fragile-11_image600.jpg",
  //         flex: 6,
  //       },
  //     ];
  //   },
  // },
};
</script>

// Page affichant la liste des espèces invasives
<template>
  <v-container fluid>
    <!-- Message s'affichant si aucune donnée n'a été téléchargée et permettant
    à l'utilisateur de relancer la page une fois la connexion internet rétablie -->
    <v-row dense v-show="this.fiches == null">
      <div>
        Pas de connexion internet, impossible de charger les fiches espèces !
      </div>
      <v-btn @click="getData()">Reload Page</v-btn>
    </v-row>
    <v-row dense>
      <!-- Permet d'afficher chaque fiche contenue dans la variable fiches
      qui est remplie par la BDD LocalStorage qui est elle-même remplie 
      par l'API externe -->
      <v-col v-for="fiche in fiches" :key="fiche.id_taxon" :cols="6">
        <!-- Au clic, on lance la fonction 'cardClick' en passant la fiche en cours en paramètre
        afin d'afficher les données relatives à la fiche sur laquelle on a cliquer -->
        <v-card @click="cardClick(fiche)">
          <v-img
            :src="fiche.photos[0].url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="fiche.nom_scientifique"></v-card-title>
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

        <v-card-text class="text--primary text-justify" v-if="ficheNameVerna">
          <div class="title indigo--text">Nom Vernaculaire</div>
          {{ ficheNameVerna }}
        </v-card-text>

        <v-card-text
          class="text--primary text-justify"
          v-if="ficheEmbranchement"
        >
          <div class="title indigo--text">Embranchement</div>
          {{ ficheEmbranchement }}
        </v-card-text>

        <v-card-text class="text--primary text-justify" v-if="ficheFamille">
          <div class="title indigo--text">Famille</div>
          {{ ficheFamille }}
        </v-card-text>

        <v-card-text class="text--primary text-justify" v-if="ficheClasse">
          <div class="title indigo--text">Classe</div>
          {{ ficheClasse }}
        </v-card-text>

        <v-card-text class="text--primary text-justify" v-if="ficheOrdre">
          <div class="title indigo--text">Ordre</div>
          {{ ficheOrdre }}
        </v-card-text>

        <v-card-text class="text--primary text-justify" v-if="ficheGenre">
          <div class="title indigo--text">Genre</div>
          {{ ficheGenre }}
        </v-card-text>

        <v-card-text class="text--primary text-justify" v-if="ficheOrigine">
          <div class="title indigo--text">Origine</div>
          {{ ficheOrigine }}
        </v-card-text>

        <v-card-actions>
          <!-- Permet de rediriger l'utilisateur sur la page de signalement
          en pré-remplissant le select avec le nom de l'espèce en cours -->
          <v-btn
            color="indigo"
            text
            @click="
              $router.push({ name: 'report', params: { ficheName: ficheName } })
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

export default {
  name: "consult",
  data() {
    return {
      fiches: null, // Variable récupérant les données depuis la BDD Locale et contenant toutes les infos sur les fiches
      displayCard: false, // Booléen permettant d'afficher ou de cacher le modal lié à une fiche
      showOperationStatus: false,
      // Initialisation de variables permettant d'afficher les informations relatives
      // à la fiche en cours de visionnement dans le modal dédié
      ficheName: "",
      ficheSrc: "",
      ficheSpecie: "",
      ficheNameVerna: "",
      ficheEmbranchement: "",
      ficheFamille: "",
      ficheClasse: "",
      ficheOrdre: "",
      ficheGenre: "",
      ficheOrigine: "",
    };
  },
  beforeMount() {
    // On récupère les données de l'API externe avant d'afficher les fiches
    this.getData();
  },
  created() {
    // On remplis la variable 'fiches' avec le contenu de la BDD LocalStorage
    this.fiches = JSON.parse(localStorage.getItem("fichesDB"));
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
            "fichesDB",
            JSON.stringify(response.data.result.data)
          )
        );
      this.fiches = JSON.parse(localStorage.getItem("fichesDB"));
    },
    // Fonction permettant d'initialiser le modal avec les données
    // spécifiques à la fiche sur laquelle l'utilisateur clique
    cardClick(fiche) {
      this.ficheName = fiche.nom_scientifique;
      this.ficheSrc = fiche.photos[0].url;
      this.ficheSpecie = fiche.regne;
      this.ficheNameVerna = fiche.nom_vernaculaire;
      this.ficheEmbranchement = fiche.embranchement;
      this.ficheFamille = fiche.famille;
      this.ficheClasse = fiche.classe;
      this.ficheOrdre = fiche.ordre;
      this.ficheGenre = fiche.genre;
      this.ficheOrigine = fiche.origine;
      this.displayCard = true;
    },
  },
};
</script>

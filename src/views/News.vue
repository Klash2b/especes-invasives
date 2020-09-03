// Page affichant les actualités
<template>
  <v-container>
    <!-- Message s'affichant si aucune donnée n'a été téléchargée et permettant
    à l'utilisateur de relancer la page une fois la connexion internet rétablie -->
    <v-row dense v-show="this.articles == null">
      <div>
        Pas de connexion internet, impossible de charger les fiches espèces !
      </div>
      <v-btn @click="getData()">Reload Page</v-btn>
    </v-row>
    <v-flex>
      <!-- Permet d'afficher chaque article contenu dans la variable articles
      qui est remplie par la BDD LocalStorage qui est elle-même remplie 
      par l'API externe -->
      <div v-for="article in articles" :key="article.id">
        <v-card class="mb-6 mt-2">
          <!-- Permet d'initialiser l'image de l'article avec une image
          prédéfinie si aucune image n'est renseignée dans l'article -->
          <v-img
            v-if="!article.image"
            height="200px"
            v-bind:src="'aliemLogo.jpg'"
          ></v-img>
          <v-img
            v-if="article.image"
            height="200px"
            v-bind:src="article.image"
          ></v-img>
          <v-card-title>
            <span>{{ article.title }}</span>
          </v-card-title>
          <v-card-text>
            <!-- Permet de tronquer le texte de la
            description de l'article après 130 caractères -->
            {{ article.description | truncate(130) }}
          </v-card-text>
          <v-card-actions>
            <v-chip small color="secondary" class="white--text">
              <!-- Permet de formater le timestamp reçu depuis l'API
              externe afin de l'afficher d'une manière plus humaine -->
              {{ formatDate(article.date) }}
            </v-chip>
            <v-spacer></v-spacer>

            <v-btn
              small
              replace
              color="indigo"
              class="white--text"
              v-bind:href="article.url"
              >Voir plus</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "news",
  data() {
    return {
      articles: null, // Variable récupérant les données depuis la BDD Locale et contenant toutes les infos sur les articles
    };
  },
  beforeMount() {
    // On récupère les données de l'API externe avant d'afficher les articles
    this.getData();
  },
  created() {
    // On remplis la variable 'articles' avec le contenu de la BDD LocalStorage
    this.articles = JSON.parse(localStorage.getItem("articlesDB"));
  },
  methods: {
    // Fonction permettant de récupérer les données de
    // l'API externe et de les stocker dans la BDD LocalStorage
    getData() {
      axios
        .get("http://aliem.arobase.corsica/json_cal_news.php")
        .then((response) =>
          localStorage.setItem("articlesDB", JSON.stringify(response.data.news))
        );
      this.articles = JSON.parse(localStorage.getItem("articlesDB"));
    },
    // Fonction qui permet de formater le timestamp reçu depuis
    // l'API externe afin de l'afficher d'une manière plus humaine
    formatDate(timestamp) {
      let milliseconds = timestamp * 1000;
      let dateObject = new Date(milliseconds);
      let humanDateFormat = dateObject.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return humanDateFormat;
    },
  },
};
</script>

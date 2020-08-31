// Require Cordova plugin :

<template>
  <v-container>
    <v-flex>
      <div v-for="article in articles" :key="article.id">
        <v-card class="mb-6 mt-2">
          <v-img height="200px" v-bind:src="article.image"></v-img>
          <v-card-title>
            <span>{{ article.title }}</span>
          </v-card-title>
          <v-card-text>
            {{ article.description | truncate(130)}}
          </v-card-text>
          <v-card-actions>
            <v-chip small color="secondary" class="white--text">
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
      articles: null,
    };
  },
  mounted() {
    axios
      .get("http://aliem.arobase.corsica/json_cal_news.php")
      .then((response) => (this.articles = response.data.news));
  },
  methods: {
    formatDate(timestamp){
      let milliseconds = timestamp * 1000
      let dateObject = new Date(milliseconds)
      let humanDateFormat = dateObject.toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})
      return humanDateFormat
    }
  },
};
</script>

// Require Cordova plugin :

<template>
  <v-container>
    <v-flex>
      <div v-for="article in articles" :key="article.title">
        <v-card class="mb-6 mt-2">
          <v-img height="200px" v-bind:src="article.imgSrc"></v-img>
                <v-card-title>
                  <span>{{ article.title }}</span>
                </v-card-title>
          <v-card-text>
            {{ article.description }}
          </v-card-text>
          <v-card-actions>
            <!-- <v-chip small color="secondary" class="white--text">
              {{ article.chip }}
            </v-chip> -->
            <v-spacer></v-spacer>

            <v-btn
              small
              replace
              color="info"
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
export default {
  name: "news",
  data() {
    return {
      articles: [
        {
          id: 1,
          title: "Article 1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corrupti adipisci ut dicta",
          imgSrc:
            "https://doris.ffessm.fr/var/doris/storage/images/media/images/callinectes_sapidus-ym02/2858985-3-fre-FR/callinectes_sapidus-ym02_image600.jpg",
          chip: "srcName",
          url: "",
        },
        {
          id: 2,
          title: "Article 2",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corrupti adipisci ut dicta",
          imgSrc:
            "https://doris.ffessm.fr/var/doris/storage/images/images/petit-specimen-de-profil-23090/197729-1-fre-FR/codium_fragile-11_image600.jpg",
          chip: "srcName",
          url: "",
        },
        {
          id: 3,
          title: "Article 3",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corrupti adipisci ut dicta",
          imgSrc:
            "https://doris.ffessm.fr/var/doris/storage/images/media/images/callinectes_sapidus-ym02/2858985-3-fre-FR/callinectes_sapidus-ym02_image600.jpg",
          chip: "srcName",
          url: "",
        },
      ],
    };
  },
  methods: {},
};
</script>

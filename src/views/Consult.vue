// Require Cordova plugin :

<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card @click="cardClick(card)">
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.name"></v-card-title>
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
          :src="cardSrc"
        >
          <v-card-title> {{ cardName }}</v-card-title>
        </v-img>

        <v-card-text class="font-italic text-right mb-n6">{{ cardSpecie }}</v-card-text>

        <v-card-text class="text--primary text-justify">
          <div class="title indigo--text">Clé d'identification</div>
          {{ cardIdText }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="indigo" text>
            Signaler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "consult",
  data() {
    return {
      displayCard: false,
    };
  },
  methods: {
    cardClick(card) {
      this.cardName = card.name;
      this.cardSrc = card.src;
      this.cardSpecie = card.specie;
      this.cardIdText = card.idText;
      this.displayCard = true;
    },
  },
  computed: {
    cards() {
      return [
        {
          name: "Crabe bleu américain",
          src: "https://doris.ffessm.fr/var/doris/storage/images/media/images/callinectes_sapidus-ym02/2858985-3-fre-FR/callinectes_sapidus-ym02_image600.jpg",
          specie: "Callinectes sapidus",
          idText: "Carapace avec 2 dents frontales triangulaires et 9 dents latérales, la dernière étant très longue\nCrabe de grande taille, la largeur de la carapace peut dépasser 23 cm\nDernière paire de pattes terminée en palette aplatie\nAbdomen des mâles étroit et en forme de T\nCouleur plus ou moins bleue.",
          flex: 6,
        },
        {
          name: "Algue chou-fleur",
          specie: "Codium fragile",
          idText: "Codium fragile est une algue verte à vert foncé de taille moyenne (pouvant atteindre 30 cm de haut), dont la consistance est semblable à celle d’une éponge – douce et spongieuse. Elle est constituée d’axes présentant une dichotomie régulière (en forme de Y). Sa surface peut être recouverte d’une multitude de poils qui lui donne cet aspect duveteux et caractéristique des Codium. Sous une loupe, sa surface formée de petites vésicules terminées par une pointe la distingue des Codium de Méditerranée.",
          src: "https://doris.ffessm.fr/var/doris/storage/images/images/petit-specimen-de-profil-23090/197729-1-fre-FR/codium_fragile-11_image600.jpg",
          flex: 6,
        },
      ];
    },
  },
};
</script>

// Page d'accueil
<template>
  <v-container text-center>
    <div class="home">
      <img class="logo" src="aliemLogo.jpg" />
      <img class="logo" src="arobaseLogo.png" />
      <h4>{{ $t("title") }}</h4>
      <v-btn @click="openMenu" class="mt-10">{{ $t("showMenu") }}</v-btn>
    </div>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "home",
  methods: {
    openMenu: () => {
      // When user tap the button dispatch an event into the dom.
      // Its will trigger the drawer Open event in (componnents/Drawer.vue)
      document.dispatchEvent(new CustomEvent("toggleDrawer", {}));
    },
  },
  // Permet de récupérer les données des API externes au lancement de l'application
  // et de les stocker dans la base de donnée locale LocalStorage
  mounted() {
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
    axios
      .get(
        "https://gaia.oec.fr/getdata.php?do=get_especes_inv&key=fea9a667df9db40499ebf94e5b6a07f6"
      )
      .then((response) =>
        localStorage.setItem(
          "especesDB",
          JSON.stringify(
            response.data.result.data.map((especes) => especes.nom_scientifique)
          )
        )
      );
    axios
      .get("http://aliem.arobase.corsica/json_cal_news.php")
      .then((response) =>
        localStorage.setItem("articlesDB", JSON.stringify(response.data.news))
      );
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img.logo {
  width: 300px;
  padding: 10px;
}
</style>

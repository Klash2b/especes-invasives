<template>
  <v-container text-center>
    <div class="home">
      <img class="logo" src="aliemLogo.jpg" />
      <img class="logo" src="arobaseLogo.png" />
      <h4>{{$t("title")}}</h4>
      <v-btn @click="openMenu" class="mt-10">{{$t("showMenu")}}</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  methods: {
    openMenu: () => {
      // When user tap the button dispatch an event into the dom.
      // Its will trigger the drawer Open event in (componnents/Drawer.vue)
      document.dispatchEvent(new CustomEvent("toggleDrawer", {}));
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img.logo{
    width: 300px;
    padding: 10px;
  }
</style>

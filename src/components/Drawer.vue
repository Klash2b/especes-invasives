<template>
  <div>
    <v-toolbar class="indigo" flat />

    <v-list-item
      v-for="(item, i) in items"
      :key="`item_${i}`"
      :to="item.action"
    >
      <v-list-item-icon>
        <v-icon v-text="item.icon" outlined></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "drawer",
  data: function() {
    return {};
  },
  computed: {
    items() {
      return [
        // Menu latéral (Drawer)
        // icon: icône material design
        // text: le texte à afficher
        // action: la route sur laquelle aller
        { icon: "home", text: this.$t("drawer.home"), action: "/" },
        { icon: "description", text: this.$t("drawer.news"), action: "news" },
        {
          icon: "find_in_page",
          text: this.$t("drawer.consult"),
          action: "consult",
        },
        {
          icon: "linked_camera",
          text: this.$t("drawer.report"),
          action: "report",
        },
        {
          icon: "image_search",
          text: this.$t("drawer.identify"),
          action: "identify",
        },
        { icon: "person", text: this.$t("drawer.profile"), action: "profile" },
        {
          icon: "settings",
          text: this.$t("drawer.settings"),
          action: "settings",
        }
      ];
    },
  },
};
</script>

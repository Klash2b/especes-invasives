<template>
  <div>
    <v-snackbar v-model="showOperationStatus">{{ operationStatus }}</v-snackbar>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <v-subheader>
            {{ persons.length }} records
            <v-spacer></v-spacer>
            <v-btn text @click="loadCsv">load json</v-btn>
            <v-btn text @click="deleteAll()">
              Delete all<v-icon color="lighten-1">delete</v-icon>
            </v-btn>
          </v-subheader>
          <template v-for="(person, index) in persons">
            <v-divider :inset="true" :key="index"></v-divider>

            <v-list-item :key="'person' + index" avatar>
              <v-list-item-avatar>
                <img :src="person.avatar" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ person.animal_name }}</v-list-item-title>
                <v-list-item-subtitle>{{ person.animal_sc_name }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ person.location }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon ripple @click="deletePerson(person)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
const axios = require("axios");
import { nSQL } from "nano-sql";
import { getMode } from "cordova-plugin-nano-sqlite/lib/sqlite-adapter";

export default {
  name: "TestDB",
  data() {
    return {
      showOperationStatus: false,
      operationStatus: "",
      persons: [],
    };
  },
  mounted() {
    document.addEventListener(
      typeof cordova !== "undefined" ? "deviceready" : "DOMContentLoaded",
      () => {
        let model = [
          { key: "id", type: "int", props: ["pk", "ai"] },
          { key: "animal_name", type: "string" },
          { key: "animal_sc_name", type: "string" },
          { key: "location", type: "string" },
          { key: "avatar", type: "string" },
        ];

        nSQL("persondb")
          .config({
            mode: getMode(),
          })
          .model(model)
          .connect();

        nSQL().onConnected(() => {
          this.refreshData();
        });
      }
    );
  },
  methods: {
    async refreshData() {
      let rows = await nSQL("persondb")
        .query("select")
        .exec();
      if (rows.length == 0) this.persons = [];
      else this.persons = rows;
    },
    loadCsv() {
      axios.get("MOCK_DATA.json", {}).then((response) => {
        nSQL()
          .loadJS("persondb", response.data, false)
          .then(() => {
            this.refreshData().then(() => {
              this.showOperationStatus = true;
              this.operationStatus = `JSON loaded`;
            });
          });
      });
    },
    deletePerson(person) {
      nSQL("persondb")
        .query("delete")
        .where(["id", "=", person.id])
        .exec()
        .then((rows) => {
          this.showOperationStatus = true;
          this.operationStatus = `${rows.length} rows deleted`;
          this.refreshData();
        });
    },
    deleteAll() {
      nSQL("persondb")
        .query("delete")
        .exec()
        .then((result) => {
          if (result[0].msg) {
            this.showOperationStatus = true;
            this.operationStatus = result[0].msg;
          }
          this.refreshData();
        });
    },
  },
};
</script>

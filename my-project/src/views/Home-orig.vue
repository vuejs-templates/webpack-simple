<template>
    <h1 class="title">{{$route.params.setor}}</h1>
</template>

<script>
import { db } from "../db.js";
const setor = db.ref("setores");
export default {
  name: "home",
  data: function() {
    return {
      banco: [],
      modalActive: false,
      mat: "",
      nome: "",
      setor: null,
      //id: this.$route.query.setor
    };
  },
  mounted() {
    /*
    função usada para carregar o organico inicia, caso o mÊs esteja Vazio, 
    */
    if (Boolean(this.$route.query.setor) == false) {
      return (this.id = "cpd");
    } else {
      this.id = this.$route.query.setor;
    }
  },
  computed: {
    id() {
        return this.$route.params.setor
     /* if (this.setor == null) {
        return (this.modalActive = true);
      }*/
    }
  },
  methods: {
          addColab() {
      this.modalActive = false;
      const obj = { dia: "", hora: "" };
      return db
        .ref("organico/" + this.$route.query.setor/* + "/" + this.$route.query.mes*/)
        .push({
          mat: this.mat,
          nome: this.nome,
          edit: false,
          domingos: [obj, obj, obj, obj, obj]
        });
      //.then(this.clearAdd());
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$rtdbBind("banco", setor.child(id));
      }
    }
  }
};
</script>

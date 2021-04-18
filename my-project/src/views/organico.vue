<template>
<div class="home">
  <div class="columns">
    <div class="column">
      <div class="card">
        <header class="card-header">
          <div class="card-header-title">
            <p>Novo Colaborador</p>
          </div>
        </header>
        <div class="card-content">
          <section>
            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Matricula"
                  v-model="mat"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Nome do Colaborador"
                  v-model="nome"
                />
              </div>
            </div>
          </section>
        </div>
        <footer class="card-footer">
          <div class="buttons card-footer-item">
            <button class="button is-success" @click="addColab()">
              Salvar
            </button>
            <button class="button is-danger">Limpar</button>
          </div>
        </footer>
      </div>
    </div>
    <div class="column">
      <li v-for="c in banco">
        <ul>
          {{c.mat}} || {{c.nome}}
        </ul>
      </li>
    </div>
  </div>
</div>

</template>

<script>
import { db } from "../db.js";
import moment from 'moment'
const setor = db.ref("setores");
export default {
  name: "organico",
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
    },
    week:function(){
        var weeks = []
              var i = weeks.length
            while (i < 52){
                  weeks.push({ dia: moment({y:2021}).add(i++,"week").format(), hora: Date.now() })
              }
              return weeks
    }
  },
  methods: {
          addColab() {
      return db
        .ref('setores/' + this.$route.params.setor + '/organico')
        .push({
          mat: this.mat,
          nome: this.nome,
          edit: false,
          domingos: this.week
        })
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

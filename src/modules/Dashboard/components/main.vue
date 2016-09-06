<template lang="html">
 <div class="">
   <h1>Dashboard... {{ charts }}</h1>
   <ul>
     <li v-for="chart in charts">{{ chart }}</li>
   </ul>
 </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    // charts: []
  },
  ready () {
    console.log('teste: ', this.$store.state)
  },
  attached () {},
  methods: {},
  components: {},
  vuex: {
    getters: {
      charts: state => state.Dashboard.charts
    }
  }
}
</script>

<style lang="css">
</style>

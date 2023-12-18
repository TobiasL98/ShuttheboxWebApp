<script>

export default{
  data(){
    return{
      num: 0
    }
  },
  methods:{
    count(){
      this.num++
    }
  }
}

</script>

<template>
	<h1 v-on:click="count()">num ist: {{ num }}</h1>
</template>

<script setup lang="ts">
import square from './squareControl.vue'
// objects.forEach(object => {
//     object.correlation = correlation.filter(corr => corr.id_object_from === object.id)
// })
import {ref} from 'vue'
const objects = ref('');
import { get_objects } from './providers/correlation_provider';
function update()
{
  get_objects((result)=>{
      objects.value = result;
  })
}
update()
</script>
<template>
  <div class="bottom-bar">
    <button @click="update" class="button">Update</button>
  </div>
  <div class="container">
      <square :object="object" v-for="object of objects" :key="object" />
  </div>
</template>

<style>
.bottom-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: white;
  border-top:1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button{
  width: 100px;
  height: 30px;
  border: 1px solid black;
  background-color: white;
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}

.container{
    margin-top: 10px;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: center;
    gap: .5rem;
    margin-bottom: 50px;
}
body{
  margin:0px;
  background-color: gray;
}
</style>
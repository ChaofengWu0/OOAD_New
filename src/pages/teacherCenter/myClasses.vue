<template>
  <div class="my_class_container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "myClasses"
}
</script>

<style scoped>
*{
margin: 0;
  padding: 0;
  border: 0;
}

.my_classes_container{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: gray;
}

</style>
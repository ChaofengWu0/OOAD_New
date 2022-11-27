<template>
  <div className="my_class_container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "myClasses"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

.my_class_container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: white;
}

</style>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'App'
}
</script>

<style lang="scss">
.jumbotron {
  padding: 30px 60px !important;
  margin: 50px 50px 50px 50px !important;
  background-color: #800020 !important;
  color: white !important;
  opacity: 0.9 !important;
}

body {
  background-image: url("golden-leaves.jpg") !important;
}

hr {
  background-color: white;
}

h4 {
  color: navy;
}

.card-footer {
  color: navy;
}

.buttons {
  display: flex;
}

.custom-button {
  flex-grow: 1;
}

input[type=text],
textarea {
  &:focus {
    outline: 0 !important;
    border: 1px solid navy !important;
  }
}

.margin-bottom-15 {
  margin-bottom: 15px !important;
}

.navy-text {
  color: navy !important;
}
</style>

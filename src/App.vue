<template>
  <div>
    <div v-if="isInternetExplorer" class="internet-explorer">
      <alert-circle-icon size="7x" class="red"></alert-circle-icon>
      <h2>Sorry, this website is not available with Internet Explorer.</h2>
      <h3>If you do not already have Google Chrome, <a href="https://www.google.com/chrome/" target="_blank">Download it here.</a></h3>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script type="text/javascript">
import Bowser from "bowser";
import { AlertCircleIcon } from "vue-feather-icons";

export default {
  name: 'App',
  data: () => ({
    isInternetExplorer: false
  }),
  metaInfo: {
    title: "Krieger Wedding RSVP",
    meta: [
      { name: "description", content: "RSVP for Molly & Ian's wedding." },
      { name: "keywords", content: "krieger,wedding,rsvp,RSVP,tillis" }
    ]
  },
  components: { AlertCircleIcon },
  mounted() {
    const browser = Bowser.getParser(window.navigator.userAgent);
    this.isInternetExplorer = browser
        .getBrowserName(true)
        .includes("Internet Explorer".toLowerCase());
  }
}
</script>

<style lang="scss">
.jumbotron {
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

@media (max-width: 768px) {
  .buttons  {
    flex-grow: 0;
    flex-wrap: wrap;
  }
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

.internet-explorer {
  background-color: white;
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.red {
  color: red;
}
</style>

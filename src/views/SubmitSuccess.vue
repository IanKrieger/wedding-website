<template>
  <b-jumbotron class="no-background">
    <template v-slot:header class="navy">Time to Celebrate!</template>

    <template v-slot:lead>
      You have successfully RSVP'd to the wedding! <br/>
      Close this window, or click the button below to change your reservation.
    </template>

    <h2 style="color: navy">Time left to change RSVP:</h2>
    <h3 style="color: navy">{{ timeLeft }}</h3>

    <b-button variant="outline-secondary" class="max-width" @click="submitRedirect">Change my RSVP details.</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  name: "SubmitSuccess",
  mounted() {
    this.$confetti.start();

    let self = this;
    setInterval(function () {
      const timeLeft = new Date("Dec 1, 2020 00:00:00").getTime();

      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = timeLeft - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      self.timeLeft = `${days} Days : ${hours} Hours :${minutes} Mins : ${seconds} Secs.`
    }, 100);
  },
  data: () => ({
    timeLeft: 0
  }),
  methods: {
    submitRedirect() {
      this.$confetti.stop();
      this.$router.replace({name: "FindPerson"})
    }
  }
}
</script>

<style scoped lang="scss">
.no-background {
  opacity: 1 !important;
  background-color: white !important;
  border: 1px solid navy !important;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.lead {
  color: navy !important;
  text-align: center !important;
}

.display-3 {
  color: navy !important;
  text-align: center !important;
}

.max-width {
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 10px !important;
}
</style>
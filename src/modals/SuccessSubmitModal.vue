<template>
  <b-modal id="modal-success" centered title="RSVP Submitted!" @show="showConfetti" @ok="hideConfetti" @close="hideConfetti">
    <p>It's time to celebrate! You have submitted your RSVP!</p>
    <p>We can't wait to see <strong>{{ groupString }} at the wedding!</strong></p>
  </b-modal>
</template>

<script>
export default {
  name: "SuccessSubmitModal",
  props: {
    groupList: {
      value: []
    }
  },
  computed: {
    groupString() {
      let resultString = "";

      if (this.groupList.length == 1) {
        resultString = this.groupList[0].split(" ");
      } else {
        this.groupList.forEach(name => {
          resultString += ` ${name.split(" ")},`
        });
      }

      return resultString;
    }
  },
  methods: {
    showConfetti() {
      this.$confetti.start();
    },
    hideConfetti() {
      this.$confetti.stop();
    }
  }
}
</script>

<style scoped>

</style>
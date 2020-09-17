<template>
  <b-modal id="modal-attending" hide-footer centered title="Already Attending!">
    <p>Looks like you are already attending. If you need to change something, click the "Change My RSVP" button below.</p>
    <b-button class="mt-3" variant="outline-success" block @click="hideModal">Nevermind!</b-button>
    <b-button class="mt-2" variant="outline-danger" block @click="overrideModal">Change my RSVP.</b-button>
  </b-modal>
</template>

<script>
export default {
  name: "AlreadyAttendingModal",
  methods: {
    hideModal() {
      this.$bvModal.hide('modal-attending');
    },
    overrideModal() {
      this.$emit("change-reservation");
      this.$bvModal.hide('modal-attending');
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <b-link v-b-modal.modal-center class="link-override"> Click this if you are having trouble with the RSVP form.
    </b-link>

    <b-modal id="modal-center" centered title="Extra Information">
      <p> If you can't seem to find yourself on the RSVP list or someone from your party is missing, contact Ian & Molly
        and we will get you squared away.</p>
      <ul>
        <li>Email: <a href="mailto: iandkrieger@gmail.com">iandkrieger@gmail.com</a></li>
        <li>Phone: <a href="tel:440-867-3149">(440) 867-3149</a></li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CantFindPersonModal"
}
</script>

<style scoped>
.link-override {
  color: white;
}
</style>
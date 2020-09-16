<template>
  <b-modal
      id="add-modal"
      title="Add My Plus One"
      @ok.prevent="handleOk"
      @close.prevent="handleClose"
  >
    <form ref="form" @submit.stop.prevent="savePlusOne">
      <b-form-group
          label="First Name"
          label-for="add-fname-input"
          invalid-feedback="First Name is required"
      >
        <b-form-input
            id="add-fname-input"
            v-model="plusOneFirstName"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Last Name"
          label-for="add-lname-input"
          invalid-feedback="Last Name is required"
      >
        <b-form-input
            id="add-lname-input"
            v-model="plusOneLastName"
            required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "AddPlusOneModal",
  data: () => ({
    plusOneFirstName: "",
    plusOneLastName: ""
  }),
  methods: {
    savePlusOne() {
      let fname = this.plusOneFirstName.trim();
      let lname = this.plusOneLastName.trim();
      let name = fname + " " + lname;

      this.$emit('plus-one-added', name);

      this.$nextTick(() => {
        this.$bvModal.hide('add-modal');
      })
    },
    handleOk() {
      this.savePlusOne();
    },
    handleClose() {
      this.plusOneFirstName = "";
      this.plusOneLastName = "";

      this.$nextTick(() => {
        this.$bvModal.hide('add-modal');
      })
    }
  }
}
</script>

<style scoped>

</style>
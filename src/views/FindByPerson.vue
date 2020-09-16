<template>
  <b-jumbotron>
    <template v-slot:header>Welcome to Molly & Ian's RSVP website.</template>

    <template v-slot:lead>
      If you are a family or a couple, only type in one name and we'll find everyone associated with your party.
    </template>

    <hr class="my-4">

    <b-form @submit.prevent="searchStoreForPerson">
      <b-form-group
          id="input-group-1"
          label="First Name"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="searchDetails.firstName"
            required
            placeholder="First Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-2"
          label="Last Name"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="searchDetails.lastName"
            required
            placeholder="Last Name"
        >
        </b-form-input>
      </b-form-group>

      <b-button type="submit" pill class="margin-bottom-15">Find Me!</b-button>
    </b-form>

    <cant-find-person-modal></cant-find-person-modal>
  </b-jumbotron>
</template>

<script>
import CantFindPersonModal from "@/modals/CantFindPersonModal";
export default {
  name: "FindByPerson",
  components: { CantFindPersonModal },
  data: () => ({
    searchDetails: {
      firstName: "",
      lastName: ""
    }
  }),
  methods: {
    searchStoreForPerson()  {
      this.$emit("search-store", this.searchDetails);
    }
  }
}
</script>

<style scoped>

</style>
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
    <already-attending-modal @change-reservation="changeReservation"></already-attending-modal>
  </b-jumbotron>
</template>

<script>
import CantFindPersonModal from "@/modals/CantFindPersonModal";
import {API, graphqlOperation} from 'aws-amplify';
import {getAttending} from "@/graphql/queries";
import {createAttending, updateAttending} from "@/graphql/mutations";
import constObj from "@/constants/const";
import AlreadyAttendingModal from "@/modals/AlreadyAttendingModal";
import Amplify from 'aws-amplify';

import awsmobile from "@/aws-exports";

Amplify.configure(awsmobile);

export default {
  name: "FindByPerson",
  components: {AlreadyAttendingModal, CantFindPersonModal},
  data: () => ({
    searchDetails: {
      firstName: "",
      lastName: ""
    },
    overrideReservation: false
  }),
  methods: {
    async searchStoreForPerson() {
      let person = this.searchDetails.firstName.trim() + " " + this.searchDetails.lastName.trim();
      let invitee = constObj.invitee.find(item => item.name.includes(person))
      let dbInvitee = await API.graphql(graphqlOperation(getAttending, {input: { id: invitee.id }}));

      console.log(invitee);

      if (dbInvitee && dbInvitee.isAttending) {
        this.$bvModal.show('modal-attending');
      } else if (!invitee) {
        this.makeToast(
            'danger',
            "Sorry, but we couldn't find you on our reservation list. Check the spelling of your name, or try a different variation.",
            `Unable to find ${this.sanitizedFullName}`
        );
      } else if (this.overrideReservation && dbInvitee) {
        await API.graphql(graphqlOperation(updateAttending, {
          input: {
            id: invitee.id,
            isAttending: false,
            submitObject: null
          }
        }));

        this.$emit("invitee-found", {
          partyDetails: invitee,
          searchDetails: this.searchDetails
        });
      } else {
        await API.graphql(graphqlOperation(
            createAttending, {input: {id: invitee.id, isAttending: false, submitObject: null}}));
        this.$emit("invitee-found", {
          partyDetails: invitee,
          searchDetails: this.searchDetails
        });
      }
    },
    changeReservation() {
      this.overrideReservation = true;
    }
  }
}
</script>

<style scoped>

</style>
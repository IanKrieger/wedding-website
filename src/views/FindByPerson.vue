<template>
  <b-jumbotron class="flex-display">
    <template v-slot:header class="mobile-display">RSVP for Molly & Ian's Wedding.</template>

    <template v-slot:lead>
      <div>
        Type in your first name and last name below. Once you are done press "Find Me!"
      </div>
      <div>
        If you are a family or a couple, only type in one name and we'll find everyone associated with your party.
      </div>
    </template>

    <hr>

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

      <b-button type="submit" pill class="margin-bottom-15" :disabled="buttonDisabled">
        <b-icon icon="search" style="margin-right: 5px"></b-icon>
        <b-spinner small v-if="buttonLoading"></b-spinner>
        <span v-if="buttonLoading" style="margin-left: 5px">Finding...</span>
        <span v-if="!buttonLoading">Find Me!</span>
      </b-button>
    </b-form>

    <cant-find-person-modal></cant-find-person-modal>
    <already-attending-modal @change-reservation="changeReservation"></already-attending-modal>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      Something unexpected happened. Try again, or come back later.
    </b-alert>
  </b-jumbotron>
</template>

<script>
import CantFindPersonModal from "@/modals/CantFindPersonModal";
import {API, graphqlOperation} from 'aws-amplify';
import {getAttending} from "@/graphql/queries";
import {createAttending, updateAttending} from "@/graphql/mutations";
import obj from "@/constants/const";
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
    overrideReservation: false,
    attending: {
      id: 0,
      isAttending: false,
      emailAddress: "",
      displayName: "",
      personDetails: null
    },
    showAlert: false,
    buttonDisabled: false,
    buttonLoading: false
  }),
  methods: {
    async searchStoreForPerson() {
      let person = this.searchDetails.firstName.trim() + " " + this.searchDetails.lastName.trim();
      let invitee = obj.find(item => item.name.toLowerCase().includes(person.toLowerCase()))
      this.buttonDisabled = true;
      this.buttonLoading = true;

      let dbInvitee = null;
      if (invitee) {
        await API.graphql(graphqlOperation(getAttending, {id: `${invitee.id}`}))
            .then(resp => {
              dbInvitee = resp.data.getAttending

              if (dbInvitee) {
                this.attending = dbInvitee;
              }
              console.log(JSON.stringify(dbInvitee));
            }).catch(e => {
              console.log(e);
              this.showAlert = true;
              this.buttonDisabled = false;
              this.buttonLoading = false;
            });
      } else {
        this.makeToast(
            'danger',
            `Unable to find a reservation for ${person}. Try a different variation of your name.`
            + '\n If that does not work, reach out to us using the contact info found below the "Find Me!" button.',
            `Unable to find ${person}.`
        );
        this.buttonDisabled = false;
        this.buttonLoading = false;
      }

      if (dbInvitee && dbInvitee.isAttending && !this.overrideReservation) {
        this.buttonLoading = false;
        this.buttonDisabled = true;
        this.$bvModal.show('modal-attending');
      } else if (this.overrideReservation && dbInvitee) {
        await this.updateExistingInvitee(invitee);
      } else if (dbInvitee && !dbInvitee.isAttending) {
        await this.$router.push(`/submit/${dbInvitee.id}`)
      } else {
        await this.createInvitee(invitee);
      }
    },
    changeReservation() {
      this.overrideReservation = true;
      this.updateExistingInvitee(this.attending);
    },
    async updateExistingInvitee(invitee) {
      await API.graphql(graphqlOperation(updateAttending, {
        input: {
          id: `${invitee.id}`,
          isAttending: false,
          emailAddress: null,
          displayName: this.searchDetails.lastName,
          personDetails: null
        }
      })).then(resp => {
        console.log(resp)
        this.$router.push(`/submit/${invitee.id}`);
      }).catch(e => {
        console.log(e);
        this.showAlert = true;
        this.buttonDisabled = false;
        this.buttonLoading = false;
      });
    },
    async createInvitee(invitee) {
      await API.graphql(graphqlOperation(
          createAttending, {
            input: {
              id: `${invitee.id}`,
              isAttending: false,
              emailAddress: null,
              displayName: this.searchDetails.lastName,
              personDetails: null
            }
          })).then(resp => {
        console.log(JSON.stringify(resp));
        this.$router.push(`/submit/${invitee.id}`)
      }).catch(e => {
        this.showAlert = true;
        this.buttonDisabled = false;
        this.buttonLoading = false;
        console.log(e);
      });
    },
    makeToast(variant = null, message, title) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .display-3 {
    font-size: 3.0em;
  }

  .lead {
    font-size: 1.0em;
  }
}

hr {
  flex-grow: 1;
}
</style>
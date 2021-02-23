<template>
  <b-modal id="modal-postponed" no-close-on-esc no-close-on-backdrop hide-header-close size="xl" hide-footer>
    <p class="paragraph">
      Molly & Ian regret to inform you that due to the current COVID-19
      restrictions in the state of Ohio we will be postponing our reception.
      We are working on finalizing the details of a new date.
      Please provide us your name & email so we can send you the new reception details,
      as well as provide a way to watch the wedding ceremony on a live stream.
    </p>
    <b-form ref="form" @submit.prevent="handleSubmit">
      <b-form-group
          label="First Name"
          label-for="fname-input"
          invalid-feedback="First Name is required"
      >
        <b-form-input
            id="fname-input"
            v-model.trim="fname"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Last Name"
          label-for="lname-input"
          invalid-feedback="Last Name is required"
      >
        <b-form-input
            id="lname-input"
            v-model.trim="lname"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
      >
        <b-form-input
            id="email-input"
            v-model.trim="email"
            type="email"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" :disabled="isDisabled">
        <check-square-icon v-if="isDisabled" size="1.0x"></check-square-icon>
        <send-icon v-if="!success && !isDisabled" size="1.0x"></send-icon>
        <span v-if="isDisabled">Successfully Submitted!</span>
        <span v-if="!success && !isDisabled">Submit.</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import {API, graphqlOperation} from 'aws-amplify';
import Amplify from 'aws-amplify';

import awsmobile from "@/aws-exports";
import {getContactDetails} from "@/graphql/queries";
import {createContactDetails} from "@/graphql/mutations";
import {SendIcon, CheckSquareIcon}  from "vue-feather-icons";

Amplify.configure(awsmobile);

export default {
  name: "PostponedModal",
  components: { SendIcon, CheckSquareIcon },
  data: () => ({
    fname: "",
    lname: "",
    email: "",
    isDisabled: false,
    foundInDb: false,
    success: false
  }),
  methods: {
    async handleSubmit() {
      this.isDisabled = true;
      await API.graphql(graphqlOperation(getContactDetails, {id: this.fullKey}))
        .then(resp => {
          let contact = resp.data.getContactDetails;

          if (contact) {
            this.foundInDb = true;
          } else {
            this.submitNewPerson();
          }
        }).catch(e => {
          this.isDisabled = false;
          console.log(e);
        });
    },
    async submitNewPerson() {
      await API.graphql(graphqlOperation(
          createContactDetails, {
            input: {
              id: this.fullKey,
              fullName: `${this.fname}:${this.lname}`,
              email: `${this.email}`
            }
          })).then(resp => {
            this.success = true;
            console.log(resp);
      }).catch(e => {
        this.isDisabled = false;
        this.success = false;
        console.log(e);
      });
    }
  },
  computed: {
    fullKey() {
      return `${this.fname.toLowerCase()}:${this.lname.toLowerCase()}:${this.email.toLowerCase()}`
    }
  }
}
</script>

<style>
 span {
   margin-left: 10px;
 }

 .modal-header {
   padding: 0 !important;
 }

 .paragraph {
   font-weight: 400;
   font-size: 18px;
 }
</style>
<template>
  <div>
    <find-by-person
        v-if="personNotFound"
        @invitee-found="searchStoreForPerson"
    >
    </find-by-person>
    <person-can-rsvp
        v-else
        :search-details="searchDetails"
        :party-details="partyDetails"
        @submit-success="submitSuccess"
    >
    </person-can-rsvp>
    <router-view></router-view>
    <success-submit-modal :group-list="partyDetails.groupList"></success-submit-modal>
  </div>
</template>

<script type="text/javascript">
import FindByPerson from "@/views/FindByPerson";
import PersonCanRsvp from "@/views/PersonCanRsvp";

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import SuccessSubmitModal from "@/modals/SuccessSubmitModal";

Amplify.configure(awsconfig);

export default {
  name: 'App',
  components: {SuccessSubmitModal, PersonCanRsvp, FindByPerson},
  data: () => ({
    personNotFound: {
      value: true
    },
    partyDetails: {
      name: "Test Person",
      id: 0,
      isAttending: false,
      hasPlusOne: false,
      groupList: ["Test Person"]
    },
    searchDetails: {
      firstName: "",
      lastName: ""
    }
  }),
  methods: {
    searchStoreForPerson(object) {
      this.searchDetails = object.searchDetails;
      this.partyDetails = object.partyDetails;

      this.personNotFound = false;
    },
    makeToast(variant = null, message, title) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    submitSuccess() {
      this.$bvModal.show('modal-attending');
    }
  },
  computed: {
    sanitizedFullName() {
      return this.searchDetails.firstName.trim() + " " + this.searchDetails.firstName.trim();
    }
  }
}
</script>

<style lang="scss">
.jumbotron {
  padding: 30px 60px !important;
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

.custom-button {
  flex-grow: 1;
}

input[type=text],
textarea {
  &:focus {
    outline: 0 !important;
    border-color: gold !important;
  }
}

.margin-bottom-15 {
  margin-bottom: 15px !important;
}

.navy-text {
  color: navy !important;
}
</style>

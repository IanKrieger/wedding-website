<template>
  <div>
    <find-by-person
        v-if="personNotFound"
        @search-store="searchStoreForPerson"
    >
    </find-by-person>
    <person-can-rsvp
        v-else
        :search-details="searchDetails"
        :party-details="partyDetails"
    >
    </person-can-rsvp>

    <already-attending-modal></already-attending-modal>
  </div>
</template>

<script type="text/javascript">
import FindByPerson from "@/views/FindByPerson";
import PersonCanRsvp from "@/views/PersonCanRsvp";
import AlreadyAttendingModal from "@/modals/AlreadyAttendingModal";
export default {
  name: 'App',
  components: { AlreadyAttendingModal, PersonCanRsvp, FindByPerson },
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
    searchStoreForPerson(searchDetails) {
      // todo: graphql?, move method
      this.searchDetails = searchDetails;
      let partyDetails = this.partyDetails;

      if (partyDetails && !partyDetails.isAttending) {
        this.personNotFound = false;
        this.partyDetails = partyDetails;
      } else if (partyDetails && partyDetails.isAttending) {
        this.$bvModal.show('modal-attending');
      } else {
        this.makeToast(
            'danger',
            "Sorry, but we couldn't find you on our reservation list. Check the spelling of your name, or try a different variation.",
            `Unable to find ${this.sanitizedFullName}`
        );
      }
    },
    makeToast(variant = null, message, title) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
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

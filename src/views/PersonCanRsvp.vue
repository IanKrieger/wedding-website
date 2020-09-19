<template>
  <b-jumbotron>
    <template v-slot:header>{{ welcomeMessage }}</template>

    <template v-if="partyDetails.hasPlusOne" v-slot:lead>
      You are allowed to bring a guest, let us know who you are bringing.
      <b-button v-b-modal.add-modal>Add my plus one.</b-button>
    </template>

    <hr class="my-4">

    <b-form @submit.prevent="submitForm">
      <b-card-group deck>
        <b-card
            v-for="(member, index) in partyDetails.groupList" :key="index"
            class="mb-2"
            :title="member"
        >
          <b-card-body>
            <b-form-group
                :id="'member-detail-' + index"
                label="Dietary Restrictions"
                label-for="textarea"
                class="navy-text"
            >
              <b-form-textarea
                  :id="'textarea-member-' + index"
                  placeholder="Enter Dietary Restrictions"
                  rows="5"
                  no-resize
              ></b-form-textarea>
            </b-form-group>

            <div class="buttons">
              <b-button @click.prevent="acceptDecline(member,'accept')" variant="outline-secondary"
                        class="custom-button">Joyfully Accept!
              </b-button>
              <b-button @click.prevent="acceptDecline(member,'decline')" variant="outline-secondary"
                        class="custom-button">Regretfully Decline.
              </b-button>
            </div>
          </b-card-body>

          <b-card-footer v-if="findInTable(member)">
            {{ findInTable(member) }}
          </b-card-footer>
        </b-card>
      </b-card-group>

      <b-form-group
          id="input-group-3"
          label="Email address (not required, but just in case):"
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="attending.emailAddress"
            type="email"
            placeholder="Email address"
        ></b-form-input>
      </b-form-group>

      <hr class="my-4">

      <b-button type="submit" class="margin-bottom-15">Submit.</b-button>
    </b-form>

    <cant-find-person-modal></cant-find-person-modal>
    <add-plus-one-modal></add-plus-one-modal>
    <already-attending-modal @change-reservation="changeReservation"></already-attending-modal>
  </b-jumbotron>
</template>

<script>
import CantFindPersonModal from "@/modals/CantFindPersonModal";
import AddPlusOneModal from "@/modals/AddPlusOneModal";
import {API, graphqlOperation} from 'aws-amplify';
import {updateAttending} from "@/graphql/mutations";
import {getAttending} from "@/graphql/queries";
import AlreadyAttendingModal from "@/modals/AlreadyAttendingModal";
import Amplify from 'aws-amplify';
import obj from "@/constants/const";
import awsmobile from "@/aws-exports";

Amplify.configure(awsmobile);

export default {
  name: "PersonCanRsvp",
  components: {AlreadyAttendingModal, AddPlusOneModal, CantFindPersonModal},
  async mounted() {
    let id = this.$route.params.id;

    await API.graphql(graphqlOperation(
        getAttending, {id: `${id}`}
    )).then(async resp => {
      console.log(resp);
      this.attending = resp.data.getAttending;
      this.partyDetails = obj.find(item => item.id + "" === id);
      console.log(JSON.stringify(this.partyDetails));
    }).catch(e => console.log(e))
  },
  data: () => ({
    tableDetails: {
      tableItems: []
    },
    attending: {
      id: 0,
      isAttending: false,
      emailAddress: "",
      displayName: "",
      personDetails: null
    },
    partyDetails: {
      id: 0,
      name: "",
      hasPlusOne: false,
      groupList: []
    }
  }),
  computed: {
    welcomeMessage() {
      if (this.partyDetails && this.partyDetails.groupList.length !== 0) {
        return `${this.attending.displayName}, party of ${this.partyDetails.groupList.length}`;
      } else {
        return "Welcome!";
      }
    }
  },
  methods: {
    findInTable(person) {
      let details = this.tableDetails.tableItems.find(item => item.person === person);

      if (details !== undefined) {
        return details.status;
      } else {
        return null;
      }
    },
    acceptDecline(person, status) {
      let hasAccepted = this.tableDetails.tableItems.find(item => item.person === person);

      if (status === "accept") {
        if (hasAccepted === undefined) {
          this.tableDetails.tableItems.push({person: person, status: "Accepted Invitation"})
        } else {
          hasAccepted.status = "Accepted Invitation";
        }
      } else {
        if (hasAccepted === undefined) {
          this.tableDetails.tableItems.push({person: person, status: "Declined Invitation"})
        } else {
          hasAccepted.status = "Declined Invitation";
        }
      }
    },
    async submitForm() {
      let groupDetails = this.partyDetails.groupList;

      let personDetails = [];

      let canSubmit = false;
      for (let i = 0; i < groupDetails.length; i++) {
        let name = groupDetails[i];
        let val = document.getElementById("textarea-member-" + i).value;
        let status = this.findInTable(name);

        if (status) {
          personDetails.push({
            name: name,
            dietaryRestrictions: val ? val : "None",
            status: status
          })

          canSubmit = true;
        } else {
          this.makeToast(
              'danger',
              "All party members must accept or decline the invitation.",
              "More Information Required."
          );

          canSubmit = false;
        }
      }

      if (canSubmit) {

        let submitObject = {
          id: `${this.attending.id}`,
          isAttending: true,
          emailAddress: this.attending.emailAddress,
          personDetails: personDetails
        }

        await this.submitReservation(submitObject);
        console.log(JSON.stringify(submitObject));
      }
    },
    async changeReservation() {
      await API.graphql(graphqlOperation(
          updateAttending,
          {
            input: {
              id: `${this.partyDetails.id}`,
              isAttending: false,
              emailAddress: null,
              personDetails: null
            }
          })
      ).then(resp => {
        console.log(resp);
        this.$router.replace({ name: "FindPerson" });
      }).catch(e => console.log(e));
    },
    async submitReservation(submitObject) {
        let data = null
        await API.graphql(graphqlOperation(
            getAttending, {id: `${submitObject.id}`}
        )).then(resp => {
          data = resp.data.getAttending;
        }).catch(e => console.log(e));

        if (data && !data.isAttending) {
          await API.graphql(graphqlOperation(
              updateAttending,
              {
                input: submitObject
              })
          ).then(resp => {
            console.log(JSON.stringify(resp));
            this.$router.push({ name: "Success"})
          }).catch(e => console.log(e));
        } else {
          this.$bvModal.show("modal-attending");
        }
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

</style>
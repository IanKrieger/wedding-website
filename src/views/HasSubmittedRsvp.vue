<template>
  <div>
    <b-jumbotron class="no-background">
      <h3 style="color: black; text-align: center; margin-bottom: 10px">
        <strong>{{ tableItems.length }} / {{ inviteeLength }}</strong> have RSVP'd <br/>
        <strong>{{ accepted }}</strong> have accepted.
        <br/>
        <strong>{{ declined }}</strong> have declined.
      </h3>
      <div v-if="tableItems.length > 0">
        <b-table striped hover :items="tableItems" outlined></b-table>
      </div>
      <div v-else>
        <h1 style="text-align: center; size: 200px; color: black"> Nothing Here Yet. 🤷‍️</h1>
      </div>
    </b-jumbotron>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      Something unexpected happened. Try again, or come back later.
    </b-alert>
  </div>
</template>

<script>
import {API, graphqlOperation} from 'aws-amplify';
import {listAttendings} from "@/graphql/queries";
import Amplify from 'aws-amplify';
import obj from "@/constants/const";

import awsmobile from "@/aws-exports";

Amplify.configure(awsmobile);

export default {
  name: "HasSubmittedRsvp",
  async mounted() {
    await API.graphql(graphqlOperation(listAttendings))
        .then(resp => {
          let data = resp.data.listAttendings.items;
          this.attendingResult = data.filter(person => person.isAttending);
          console.log(JSON.stringify(data));
        }).catch(e => {
          console.log(e);
          this.showAlert = true;
        });
  },
  data: () => ({
    attendingResult: null,
    inviteeLength: obj.length,
    showAlert: false
  }),
  computed: {
    tableItems() {
      let tableItems = [];
      if (this.attendingResult) {
        this.attendingResult.forEach(attendee => {
          attendee.personDetails.forEach(person => {
            tableItems.push({
              name: person.name,
              dietary_restrictions: person.dietaryRestrictions,
              invitation_status: person.status
            });
          });
        });
      }
      return tableItems;
    },
    accepted() {
      let accepted = 0;
      if (this.tableItems) {
        let len = this.tableItems
            .filter(item => item.invitation_status && item.invitation_status === "Accepted Invitation")
            .length;

        if (len) {
          accepted = len;
        }
      }
      return accepted;
    },
    declined() {
      let decline = 0;
      if (this.tableItems) {
        let len = this.tableItems
            .filter(item => item.invitation_status && item.invitation_status + "" === "Declined Invitation").length;
        if (len) {
          decline = len;
        }
      }
      return decline;
    }
  }
}
</script>

<style scoped>
.no-background {
  opacity: 1 !important;
  background-color: white !important;
  border: 1px solid black !important;
}
</style>
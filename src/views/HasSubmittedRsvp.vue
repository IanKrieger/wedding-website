<template>
  <div>
    <div v-if="tableItems.length > 0">
      <b-table striped hover :items="tableItems"></b-table>
    </div>
    <div v-else>
      <h1 style="text-align: center; size: 200px"> Nothing Here Yet. 🤷‍️</h1>
    </div>
  </div>
</template>

<script>
import {API, graphqlOperation} from 'aws-amplify';
import {listAttendings} from "@/graphql/queries";
import Amplify from 'aws-amplify';

import awsmobile from "@/aws-exports";

Amplify.configure(awsmobile);

export default {
  name: "HasSubmittedRsvp",
  async mounted() {
    await API.graphql(graphqlOperation(listAttendings))
        .then(resp => {
          this.attendingResult = resp.filter(person => person.isAttending);
        }).catch(e => console.log(e));
  },
  data: () => ({
    attendingResult: null
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
    }
  }
}
</script>

<style scoped>

</style>
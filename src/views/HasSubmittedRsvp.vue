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
import { API, graphqlOperation } from 'aws-amplify';
import { listAttendings} from "@/graphql/queries";

export default {
  name: "HasSubmittedRsvp",
  async mounted() {
    let result = await API.graphql(graphqlOperation(listAttendings))
    result.filter(person => person.isAttending);
    this.attendingResult = result;
  },
  data: () => ({
    attendingResult: null
  }),
  computed: {
    tableItems() {
      let tableItems = [];
      this.attendingResult.forEach(attendee => {
        attendee.personDetails.forEach(person => {
          tableItems.push({
            name: person.name,
            dietary_restrictions: person.dietaryRestrictions,
            invitation_status: person.status
          });
        });
      });

      return tableItems;
    }
  }
}
</script>

<style scoped>

</style>
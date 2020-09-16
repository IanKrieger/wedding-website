<template>
  <div>
    <b-jumbotron v-if="personNotFound">
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

      <b-link v-b-modal.modal-center class="link-override"> Click this if you are having trouble with the RSVP form.
      </b-link>
    </b-jumbotron>
    <b-jumbotron v-else>
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
            label="Email address:"
            label-for="input-3"
        >
          <b-form-input
              id="input-3"
              v-model="submitDetails.emailAddress"
              type="email"
              required
              placeholder="Email address"
          ></b-form-input>
        </b-form-group>

        <hr class="my-4">

        <b-button type="submit" class="margin-bottom-15">Submit.</b-button>
      </b-form>

      <b-link v-b-modal.modal-center class="link-override"> Click this if you are having trouble with the RSVP form.
      </b-link>
    </b-jumbotron>

    <b-modal id="modal-center" centered title="Extra Information">
      <p> If you can't seem to find yourself on the RSVP list or someone from your party is missing, contact Ian & Molly
        and we will get you squared away.</p>
      <ul>
        <li>Email: <a href="mailto: iandkrieger@gmail.com">iandkrieger@gmail.com</a></li>
        <li>Phone: <a href="tel:440-867-3149">(440) 867-3149</a></li>
      </ul>
    </b-modal>

    <b-modal id="modal-attending" centered title="Already Attending!">
      <p>Looks like you are already attending. If this is a mistake or you need to change something, reach out to Ian & Molly</p>
      <ul>
        <li>Email: <a href="mailto: iandkrieger@gmail.com">iandkrieger@gmail.com</a></li>
        <li>Phone: <a href="tel:440-867-3149">(440) 867-3149</a></li>
      </ul>
    </b-modal>

    <b-modal
        id="add-modal"
        title="Add My Plus One"
        @ok.prevent="handleOk"
        @close.prevent="handleClose"
    >
      <form ref="form" @submit.stop.prevent="savePlusOne">
        <b-form-group
            label="First Name"
            label-for="add-fname-input"
            invalid-feedback="First Name is required"
        >
          <b-form-input
              id="add-fname-input"
              v-model="plusOneFirstName"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            label="Last Name"
            label-for="add-lname-input"
            invalid-feedback="Last Name is required"
        >
          <b-form-input
              id="add-lname-input"
              v-model="plusOneLastName"
              required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'App',
  data: () => ({
    searchDetails: {
      firstName: "",
      lastName: "",
    },
    personNotFound: {
      value: true
    },
    partyDetails: {
      name: "",
      id: 0,
      isAttending: false,
      hasPlusOne: false,
      groupList: []
    },
    submitDetails: {
      emailAddress: "",
    },
    tableDetails: {
      tableItems: []
    },
    plusOneFirstName: "",
    plusOneLastName: ""
  }),
  methods: {
    searchStoreForPerson() {
      // todo: s3?
      let partyDetails = this.$store.getters.getInvitee(this.sanitizedFullName);

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
    submitForm() {
      let groupDetails = this.partyDetails.groupList;

      let submitObject = {
        personDetails: [],
        emailAddress: this.submitDetails.emailAddress
      }

      let canSubmit = false;
      for (let i = 0; i < groupDetails.length; i++) {
        let name = groupDetails[i];
        let val = document.getElementById("textarea-member-" + i).value;
        let status = this.findInTable(name);

        if (status) {
          submitObject.personDetails.push({
            name: name,
            dietaryRestrictions: val != null ? val : "None",
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
        // TODO link up serverless DB
      }
    },
    findInTable(person) {
      let details = this.tableDetails.tableItems.find(item => item.person === person);

      if (details !== undefined) {
        return details.status;
      } else {
        return null;
      }
    },
    savePlusOne() {
      let fname = this.plusOneFirstName.trim();
      let lname = this.plusOneLastName.trim();
      let name = fname + " " + lname;

      this.partyDetails.groupList.push(name);
      this.partyDetails.hasPlusOne = false;

      this.$nextTick(() => {
        this.$bvModal.hide('add-modal');
      })
    },
    handleOk() {
      this.savePlusOne();
    },
    handleClose() {
      this.plusOneFirstName = "";
      this.plusOneLastName = "";

      this.$nextTick(() => {
        this.$bvModal.hide('add-modal');
      })
    }
  },
  computed: {
    sanitizedFullName() {
      let fName = this.searchDetails.firstName.trim();
      let lName = this.searchDetails.lastName.trim();

      return fName + " " + lName;
    },
    welcomeMessage() {
      if (this.partyDetails) {
        if (this.partyDetails) {
          return `${this.searchDetails.lastName}, party of ${this.partyDetails.groupList.length}`;
        } else if (this.partyDetails.isAttending) {
          return `You have already sent your RSVP, please email us if something has changed: <a href = "mailto: abc@example.com">Email</a>`;
        } else {
          return null;
        }
      } else {
        return null;
      }
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

.link-override {
  color: white;
}

.margin-bottom-15 {
  margin-bottom: 15px !important;
}

.navy-text {
  color: navy !important;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        invitees: [
            {
                name: "Molly Tillis",
                id: 1,
                isAttending: false,
                hasPlusOne:  true,
                groupList: ["Molly Tillis"]
            },
            {
                name: "Ian Krieger,Another Person",
                id: 2,
                isAttending: false,
                groupList: ["Ian Krieger", "Another Person"]
            },
            {
                name: "Ian One,Ian Two,Ian Three,Ian Four,IanVariant One",
                id: 3,
                isAttending: false,
                groupList: ["Ian One", "Ian Two", "Ian Three", "Ian Four"]
            }
        ]
    },
    mutations: {
        modifyInvitee (state, payload) {
            let invitee = state.invitees.find(item  => item.id === payload.id);
            invitee.isAttending = payload.attending;
        }
    },
    getters: {
        getInvitee: (state) => (name) => {
            return state.invitees.find(item  => item.name.toLowerCase().includes(String(name).toLowerCase()));
        },
        getInviteeById: (state) => (id) => {
            console.log(id)
            return state.invitees.find(item  => item.id === id);
        }
    }
})
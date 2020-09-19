import Vue from "vue";
import VueRouter from "vue-router";
import HasSubmittedRsvp from "@/views/HasSubmittedRsvp";
import FindByPerson from "@/views/FindByPerson";
import PersonCanRsvp from "@/views/PersonCanRsvp";
import SubmitSuccess from "@/views/SubmitSuccess";

Vue.use(VueRouter);

const routes = [
    {
        path: "/rsvp",
        name: "RSVP",
        component: HasSubmittedRsvp
    },
    {
        path: "/",
        name: "FindPerson",
        component: FindByPerson
    },
    {
        path: "/submit/:id",
        name: "SubmitRsvp",
        component: PersonCanRsvp
    },
    {
        path: "/success",
        name: "Success",
        component: SubmitSuccess
    }
]

const router = new VueRouter({
    routes
});

export default router;
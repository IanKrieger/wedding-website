import Vue from "vue";
import VueRouter from "vue-router";
import HasSubmittedRsvp from "@/views/HasSubmittedRsvp";

Vue.use(VueRouter);

const routes = [
    {
        path: "/rsvplist",
        name: "RsvpList",
        component: HasSubmittedRsvp
    }
]

const router = new VueRouter({
    routes
});

export default router;
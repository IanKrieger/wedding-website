const invitee = [
    {
        personId: 1,
        name: "Ian Krieger",
        hasPlusOne: false,
        groupList: ["Ian Krieger"]
    },
    {
        personId: 2,
        name: "Ian One,Another Person",
        hasPlusOne: false,
        groupList: ["Ian Krieger", "Another Person"]
    },
    {
        personId: 3,
        name: "Ian Two,Ian Three,Ian Four,Ian Five",
        hasPlusOne: false,
        groupList: ["Ian Two","Ian Three","Ian Four","Ian Five"]
    },
    {
        personId: 4,
        name: "Ian Six",
        hasPlusOne: true,
        groupList: ["Ian Krieger"]
    }
]

export default {
    invitee: invitee
};


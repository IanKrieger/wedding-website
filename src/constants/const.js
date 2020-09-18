const invitee = [
    {
        id: 1,
        name: "Ian Krieger",
        hasPlusOne: false,
        groupList: ["Ian Krieger"]
    },
    {
        id: 2,
        name: "Ian One,Another Person",
        hasPlusOne: false,
        groupList: ["Ian Krieger", "Another Person"]
    },
    {
        id: 3,
        name: "Ian Two,Ian Three,Ian Four,Ian Five",
        hasPlusOne: false,
        groupList: ["Ian Two","Ian Three","Ian Four","Ian Five"]
    },
    {
        id: 4,
        name: "Ian Six",
        hasPlusOne: true,
        groupList: ["Ian Krieger"]
    }
]

export default {
    invitee: invitee
};


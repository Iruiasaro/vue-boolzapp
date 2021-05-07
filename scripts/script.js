let app = new Vue({
    el: "#root",

    data: {
        usersList: globalUsersList,
        activeContact: 0,
        searchContact: "",
        invioMsg: "",
    },

    methods: {
        contatcSelected(contatto) {
            this.activeContact = this.ricercaContatto()[contatto];
        },
        ricercaContatto() {
            let filtList = this.usersList.filter((contact) => {
                return contact.name.toLowerCase().includes(this.searchContact.toLowerCase());
            })
            return filtList;
        },

        timeDate(dateString) {
            let dateFromString = moment(dateString, "DD/MM/YYYY HH/mm/ss").format("HH:mm");
            return dateFromString;
        },

        addMessage() {
            let sentMsg =
            {
                status: 'sent',
                date: moment(),
                text: this.invioMsg,
            }
            if (this.invioMsg) {
                let contactSelect = this.activeContact;
                contactSelect.messages.push(sentMsg);
                this.invioMsg = "";

                setTimeout(() => {
                    let receivedMsg =
                    {
                        status: 'received',
                        text: "Ok!",
                        date: moment(),
                    }
                    contactSelect.messages.push(receivedMsg);
                    contactSelect.ultimoAccesso = this.timeDate(receivedMsg.date);
                }, 1000);
            }
        },
            visualizzaMsg(contatto) {
                const msgChatContact = contatto.messages[contatto.messages.length - 1]
                return msgChatContact;
            },

            cleanX() {
                this.searchContact = "";
            },
        },
    mounted() {
        this.activeContact = this.usersList[0];
    }
})

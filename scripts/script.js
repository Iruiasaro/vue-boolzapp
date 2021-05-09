const app = new Vue({
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
        // ricerca contatto e filtra una nuova lista
        ricercaContatto() {
            const filtList = this.usersList.filter((contact) => {
                return contact.name.toLowerCase().includes(this.searchContact.toLowerCase());
            })
            return filtList;
        },
            
        //funzione Data
        timeDate(dateString) {
            const dateReturn = moment(dateString, "DD/MM/YYYY HH/mm/ss").format("HH:mm");
            return dateReturn;
        },

        addMessage() {
            const sentMsg =
            {
                status: 'sent',
                date: moment(),
                text: this.invioMsg,
            }
            if (this.invioMsg) {
                const contactSelect = this.activeContact;
                contactSelect.messages.push(sentMsg);
                this.invioMsg = "";

                //set timeOut per risposta automatica
                setTimeout(() => {
                    const receivedMsg =
                    {
                        status: 'received',
                        text: "Ok!",
                        date: moment(),
                    }
                    contactSelect.messages.push(receivedMsg);
                    contactSelect.ultimoAccesso = this.timeDate(receivedMsg.date);
                }, 100);
            };

            this.bottomScroll()
        },

        visualizzaMsg(contatto) {
            const msgChatContact = contatto.messages[contatto.messages.length - 1]
            return msgChatContact;
        },

        //pulisce barra di ricerca contatto rubrica
        cleanX() {
            this.searchContact = "";
        },
        
        //allinea la chat all'ultimo messaggio 
        bottomScroll() {
            setTimeout(() => {
                this.$refs.wrapperChat.scrollTop = this.$refs.wrapperChat.scrollHeight
            }, 100);
        },
    },

    mounted() {
        this.activeContact = this.usersList[0];
    }
})

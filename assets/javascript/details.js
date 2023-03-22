const { createApp } = Vue

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

createApp({
    data() {
        return {
            dataEvents: [],
            card: {}
        }
    },
    created() {

        fetch(urlApi)
            .then(response => response.json())
            .then(data => {
                // console.log(data.events)
                this.dataEvents = data.events
                console.log(this.dataEvents)

                const id = new URLSearchParams(location.search).get("id")
                this.card = this.dataEvents.find(elemento => elemento._id == id)
                console.log(this.card)
            })
            .catch(error => console.log(error))
    },
    methods: {

    },
    computed: {

    }
}).mount("#app")

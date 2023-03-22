const { createApp } = Vue

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

createApp({
    data() {
        return {
            dataEvents: [],
            dataCheck: [],
            inputCheck: [],
            stringSearch: "",
            resultFilter:[]
        }
    },
    created() {

        fetch(urlApi)
            .then(response => response.json())
            .then(data => {
                // console.log(data.events)
                this.dataEvents = data.events.filter(elemento => new Date(elemento.date) < new Date(data.currentDate))
                console.log(this.dataEvents)

                let arrayCate = this.dataEvents.map(evento => evento.category)

                this.dataCheck = arrayCate.filter((item, index) => {
                    return arrayCate.indexOf(item) === index;
                })
                console.log(this.dataCheck)
            })
    },
    methods: {

    },
    computed: {

        filterCheck: function () {
            let filterCategory = this.inputCheck.length == 0 ? this.dataEvents : this.dataEvents.filter(elemento => this.inputCheck.includes(elemento.category))
            this.resultFilter = this.stringSearch == "" ? filterCategory : filterCategory.filter(elemento => elemento.name.toLowerCase().includes(this.stringSearch.toLowerCase().trim()))
        }
    }
}).mount("#app")

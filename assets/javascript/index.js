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
                this.dataEvents = data.events
                // console.log(this.dataEvents)

                let arrayCate = this.dataEvents.map(evento => evento.category)
                console.log(arrayCate)

                this.dataCheck = arrayCate.filter((item, index) => {
                    return arrayCate.indexOf(item) === index;
                })
                // console.log(this.dataCheck)                
            })
            .catch(error=> console.log(error))
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


// Segunda forma de hacer la funcion de filtros cruzados
// filterCheck: function () {
//     let filterCategory = this.inputCheck.length == 0 ? this.dataEvents : this.dataEvents.filter(elemento => this.inputCheck.includes(elemento.category))
//     return this.stringSearch == "" ? filterCategory : filterCategory.filter(elemento => elemento.name.toLowerCase().includes(this.stringSearch.toLowerCase().trim()))
// }
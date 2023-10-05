let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(urlApi)

    .then(response => response.json())
    .then(data => {
        console.log(data)

        const eventos = data.events
        console.log(eventos)

        const tables = document.getElementById("table1")
        cargarTabla1(eventos, tables)

        const tables2 = document.getElementById("table2")
        const tables3 = document.getElementById("table3")
        introducirTabla2(eventos.filter(elemento => elemento.estimate), tables2)
        introducirTabla2(eventos.filter(elemento => elemento.assistance), tables3)

    })
    .catch(error => console.log(error))

function cargarTabla1(array, contendor) {

    let mayorCapacidad = array.reduce((evento1, evento2) => {
        if (evento1.capacity > evento2.capacity) return evento1
        return evento2
    })
    console.log(mayorCapacidad)

    let mayorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1, evento2) => {
        if ((evento1.assistance / evento1.capacity) > (evento2.assistance / evento2.capacity)) return evento1
        return evento2
    })
    console.log(mayorAttendance)

    let menorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1, evento2) => {
        if ((evento1.assistance / evento1.capacity) < (evento2.assistance / evento2.capacity)) return evento1
        return evento2
    })
    console.log(menorAttendance)

    let trContenedor = document.createElement('tr')
    trContenedor.innerHTML = `
        <td>${mayorAttendance.name}: ${mayorAttendance.assistance / mayorAttendance.capacity * 100}%</td>
        <td>${menorAttendance.name}: ${menorAttendance.assistance / menorAttendance.capacity * 100}%</td>
        <td>${mayorCapacidad.name}: ${mayorCapacidad.capacity}</td>`
    contendor.appendChild(trContenedor)
}

function calcularGanancias(array, nombrecategoria) {

    let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total, evento) => {
        if (evento.assistance != undefined) return total += evento.price * evento.assistance
        return total += evento.price * evento.estimate
    }, 0)
    return arrayFiltrado
}

function introducirTabla2(array, contenedor) {
    //  arreglo de categorias unicas
    let categorias = [... new Set(array.map(elemento => elemento.category))]

    let fragmento = document.createDocumentFragment()

    for (let categoria of categorias) {
        let trContenedor = document.createElement('tr')
        trContenedor.innerHTML = `<td>${categoria}</td>
        <td>${calcularGanancias(array, categoria)}</td>
        <td>${calcularAsistencia(array, categoria)}%</td>`
        fragmento.appendChild(trContenedor)
    }
    contenedor.appendChild(fragmento)

}

function calcularAsistencia(array, nombrecategoria) {

    let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total, evento) => {
        if (evento.assistance != undefined) return total += evento.assistance / evento.capacity
        return total += evento.estimate / evento.capacity
    }, 0)
    return (arrayFiltrado * 100 / array.filter(elemento => elemento.category == nombrecategoria).length).toFixed(2)
}
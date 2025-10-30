

let cardTransaction = document.getElementById("cardTransaction")
let clescardTransaction = document.getElementById("clescardTransaction")
let nouvelleTransaction = document.getElementById("nouvelleTransaction")
let btnanullerTransaction = document.getElementById("btnanullerTransaction")
let ligthmode = document.getElementById("ligthmode")
let darkmode = document.getElementById("darkmode")
let mybody = document.getElementById("mybody")
let btntocard = document.getElementById("tocard")
let btntolist = document.getElementById("tolist")
let card_operations = document.getElementById('cards')
// dark mode
///////////////////////////////////////////////
if (localStorage.getItem("mode") == "darkmode")
    switchDarkMode(ligthmode, darkmode);
////////////////////////////////////////////////////

console.log(localStorage.getItem("mode"))


function openCardNouvelleTransaction() {
    cardTransaction.classList.remove("d-none")
    nouvelleTransaction.classList.add("d-none")
    btnanullerTransaction.classList.remove("d-none")
}

function closeCardNouvelleTransaction() {
    cardTransaction.classList.add("d-none")
    nouvelleTransaction.classList.remove("d-none")
    nouvelleTransaction.classList.remove("d-none")
    btnanullerTransaction.classList.add("d-none")
} function anullerTransaction() {
    cardTransaction.classList.add("d-none")
    nouvelleTransaction.classList.remove("d-none")
    nouvelleTransaction.classList.remove("d-none")
    btnanullerTransaction.classList.add("d-none")
}

function switchDarkMode(ligthmode, darkmode) {
    ligthmode.classList.add("d-none")
    darkmode.classList.remove("d-none")
    localStorage.setItem("mode", 'darkmode')
    mybody.classList.add("darkmode")
}
function switchLigthMode(ligthmode, darkmode) {
    darkmode.classList.add("d-none")
    ligthmode.classList.remove("d-none")
    localStorage.setItem("mode", 'ligthmode')
    mybody.classList.remove("darkmode")
}

btntocard.addEventListener("click", function () {
    card_operations.classList.add("row")
    card_operations.classList.add("row-cols-auto")
    btntolist.classList.remove('d-none')
    btntocard.classList.add('d-none')
    cards = document.getElementsByClassName('bg-opacity-75')
    Array.from(cards).forEach(card => {
        card.classList.add("w-45");
        card.classList.remove("w-95");
    });
})
btntolist.addEventListener("click", function () {
    card_operations.classList.remove("row")
    card_operations.classList.remove("row-cols-auto")
    btntolist.classList.add('d-none')
    btntocard.classList.remove('d-none')
    cards = document.getElementsByClassName('bg-opacity-75')
    Array.from(cards).forEach(card => {
        card.classList.add("w-95");
        card.classList.remove("w-45");
    });
})

nouvelleTransaction.addEventListener("click", function () {
    openCardNouvelleTransaction();
})

clescardTransaction.addEventListener("click", function () {
    closeCardNouvelleTransaction();
})

btnanullerTransaction.addEventListener("click", function () {
    anullerTransaction();

})


ligthmode.addEventListener("click", function () {
    switchDarkMode(ligthmode, darkmode)
})

darkmode.addEventListener("click", function () {
    switchLigthMode(ligthmode, darkmode)
})


function viderChomps() {
    document.getElementById('montant').value = ""
    document.getElementById('discription').value = ""
}

function get_Montant() {
    return document.getElementById('montant').value;
}
// get Discription de operation 
function get_Discription() {
    return document.getElementById('discription').value;
}
// get type de operation Dépense ou Revenu
function get_Type() {
    return document.getElementById('type').value;
}

// verifier le champ de input Mantant
function verifier_Montant() {
    if (get_Montant() > 0) {
        document.getElementById('montant').classList.remove('bg-danger')
        return 1
    }else {
         document.getElementById('montant').classList.add('bg-danger')
           return 0
    }
}
// verifier le champ de input Discription

function verifier_Discription() {
    if (get_Discription().length > 0) {
        document.getElementById('discription').classList.remove('bg-danger')
        return 1
    }else {
         document.getElementById('discription').classList.add('bg-danger')
           return 0
    }
}

//  cree un objet 
function creer_objet(mantant, description, type) {
    let date = new Date()
    let objet = {
        id: 1,
        mantant: mantant,
        description: description,
        type: type,
        date: " " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    }
    return objet
}

// charger les donne atraver  localStorage
function charger_les_donnees(my_key) {
    let array_to_string = localStorage.getItem(my_key) || '[]'
    let myarray = JSON.parse(array_to_string)
    return myarray
}

// sauvegarder les donnees sur local Storage
function enregistrer_les_donnees(my_key, objet) {
    let myarray = charger_les_donnees(my_key)
    myarray.push(objet);
    let array_to_string = JSON.stringify(myarray)
    localStorage.setItem(my_key, array_to_string)
}

//  enregistrer la transaction  sur local Storage
function enregistrer_transaction(my_key) {
    if (verifier_Montant() && verifier_Discription()) {
        let objet = creer_objet(get_Montant(), get_Discription(), get_Type())
        enregistrer_les_donnees(my_key, objet)
        update_montants(my_key)
        viderChomps()
        closeCardNouvelleTransaction()
        // set_cards_in_html("Baztami", document.getElementById('cards'))
    }
}

function calculer_montant_Dépense(my_key) {
    let myarray = charger_les_donnees(my_key)
    let somme_Dépense = 0
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].type == "Dépense")
            somme_Dépense += parseInt(myarray[index].mantant)
    return somme_Dépense
}

function calculer_montant_Revenu(my_key) {
    let myarray = charger_les_donnees(my_key)
    let somme_Revenu = 0
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].type == "Revenu")
            somme_Revenu += parseInt(myarray[index].mantant)
    return somme_Revenu
}
function calculer_montant_Actual(my_key) {
    return calculer_montant_Revenu(my_key) - calculer_montant_Dépense(my_key)
}




function set_MontantActual(my_key) {
    document.getElementById('MontantActual').textContent = calculer_montant_Actual(my_key)
}

function set_MontantRevenu(my_key) {
    document.getElementById('MontantEntrer').textContent = calculer_montant_Revenu(my_key)
}

function set_MontantDépense(my_key) {
    document.getElementById('MontantSortie').textContent = calculer_montant_Dépense(my_key)
}

let my_key = "Baztami"
// function update_montants(my_key) {
set_MontantActual(my_key)
set_MontantRevenu(my_key)
set_MontantDépense(my_key)
// }

function update_montants(my_key) {
    set_MontantActual(my_key)
    set_MontantRevenu(my_key)
    set_MontantDépense(my_key)
}





// function set_cards_in_html(my_key, card_operations) {
card_operations = document.getElementById('cards')
let myarray = charger_les_donnees(my_key)
for (let index = 0; index < myarray.length; index++) {
    let card = document.createElement('div');
    if (myarray[index].type == "Revenu") {
        card.className = 'card text-white  w-95 m-2  bg-success col   bg-opacity-75';
        card.innerHTML = ' <div class="row   card-body   fw-bold ">   <div class="col"> +' + myarray[index].mantant + '</div>  <div class="col "> ' + myarray[index].date + '</div><div class="col green-500"> ' + myarray[index].description + '£</div><div class="col-md-1"> <i id="' + myarray[index].id + '"  class="bi bi-pencil-square"></i></div><div class="col-md-1"> <i class="bi bi-trash3-fill"></i></div></div>'
    } else {
        card.className = 'card text-white  w-95 m-2 bg-danger col bg-opacity-75';
        card.innerHTML = ' <div class="row  card-body   fw-bold ">   <div class="col"> -' + myarray[index].mantant + '</div>  <div class="col "> ' + myarray[index].date + '</div><div class="col green-500"> ' + myarray[index].description + ' £</div><div class="col-md-1"> <i class="bi bi-pencil-square"></i></div><div class="col-md-1"> <i class="bi bi-trash3-fill"></i></div></div>'
    }
    card_operations.appendChild(card)
}
// }

function modifier_card(my_key, id, type, montant, description) {
    let myarray = charger_les_donnees(my_key)
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].id == id) {
            myarray[index].type = type
            myarray[index].description = description
            myarray[index].montant = montant
        }
}

















// localStorage.clear()
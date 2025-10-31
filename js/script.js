let my_key = "Baztami"

let cardTransaction = document.getElementById("cardTransaction")
let clescardTransaction = document.getElementById("clescardTransaction")
let nouvelleTransaction = document.getElementById("nouvelleTransaction")
let btnsauvgarder_modification = document.getElementById("sauvgarder_modification")
let btnsave = document.getElementById("btnsave")
let btnajout = document.getElementById("btnajout")
let btnanullerTransaction = document.getElementById("btnanullerTransaction")
let ligthmode = document.getElementById("ligthmode")
let darkmode = document.getElementById("darkmode")
let mybody = document.getElementById("mybody")
let btntocard = document.getElementById("tocard")
let btntolist = document.getElementById("tolist")
let card_operations = document.getElementById('cards')
let validation_supprission = document.getElementById('validation_supprission')
let closevalidation = document.getElementById('closevalidation')
let header = document.getElementById('header')

// dark mode
///////////////////////////////////////////////
if (localStorage.getItem("mode") == "darkmode")
    switchDarkMode(ligthmode, darkmode);
////////////////////////////////////////////////////

console.log(localStorage.getItem("mode"))

function openCardNouvelleTransaction() {
    btnsave.classList.add("d-none")
    btnajout.classList.remove('d-none')
    cardTransaction.classList.remove("d-none")
    nouvelleTransaction.classList.add("d-none")
    btnanullerTransaction.classList.remove("d-none")
    vider_champs()
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
    header.classList.add("text-white")
}
function switchLigthMode(ligthmode, darkmode) {
    darkmode.classList.add("d-none")
    ligthmode.classList.remove("d-none")
    localStorage.setItem("mode", 'ligthmode')
    mybody.classList.remove("darkmode")
    header.classList.remove("text-white")

}


closevalidation.addEventListener("click", function () {
    validation_supprission.classList.add('d-none')
})
nouvelleTransaction.addEventListener("click", function () {
    openCardNouvelleTransaction();
})

clescardTransaction.addEventListener("click", function () {
    closeCardNouvelleTransaction();
})

btnanullerTransaction.addEventListener("click", function () {
    anullerTransaction();
    vider_champs

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
//set montant
function set_Montant(montant) {
    document.getElementById('montant').value = montant;
}
// set Discription de operation 
function set_Discription(discription) {
    document.getElementById('discription').value = discription;
}
// set type de operation Dépense ou Revenu
function set_Type(type) {
    document.getElementById('type').value = type;
}

// verifier le champ de input Montant
function verifier_Montant() {
    if (get_Montant() > 0) {
        document.getElementById('montant').classList.remove('border-danger')
        return 1
    } else {
        document.getElementById('montant').classList.add('border-danger')
        return 0
    }
}
// verifier le champ de input Discription

function verifier_Discription() {
    if (get_Discription().length > 0) {
        document.getElementById('discription').classList.remove('border-danger')
        return 1
    } else {
        document.getElementById('discription').classList.add('border-danger')
        return 0
    }
}

//  cree un objet 
function creer_objet(montant, description, type) {
    let date = new Date()
    let autoID = localStorage.getItem("autoID")
    if (!autoID) {
        localStorage.setItem("autoID", 1)
    }
    let objet = {
        id: autoID = localStorage.getItem("autoID"),
        montant: montant,
        description: description,
        type: type,
        date: " " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    }
    localStorage.setItem("autoID", ++autoID)
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
        vider_champs()
        closeCardNouvelleTransaction()
        methodefultter(localStorage.getItem("filtrer"))
    }

}

function calculer_montant_Dépense(my_key) {
    let myarray = charger_les_donnees(my_key)
    let somme_Dépense = 0
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].type == "Dépense")
            somme_Dépense += parseInt(myarray[index].montant)
    return somme_Dépense
}

function calculer_montant_Revenu(my_key) {
    let myarray = charger_les_donnees(my_key)
    let somme_Revenu = 0
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].type == "Revenu")
            somme_Revenu += parseInt(myarray[index].montant)
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


function update_montants(my_key) {
    set_MontantActual(my_key)
    set_MontantRevenu(my_key)
    set_MontantDépense(my_key)
}



function set_cards_in_html(my_key) {
    card_operations = document.getElementById('cards')
    document.getElementById('cards').innerHTML = ""
    let myarray = charger_les_donnees(my_key)
    for (let index = 0; index < myarray.length; index++) {
        let card = document.createElement('div');
        if (myarray[index].type == "Revenu") {
            card.className = ' card bg-success text-white   bg-opacity-50';
            card.innerHTML = ' <div class="card-header d-flex  justify-content-around"> <i   role="button"  onclick="button_modifier(' + myarray[index].id + ')" class="bi bi-pencil-square"></i> <i class="bi bi-trash3-fill" role="button"  onclick="button_supprimer(' + myarray[index].id + ')"  > ' + `</i> </div><div class=" "><ul class="list-group  "><li class="bg-opacity-75 list-group-item text-white  bg-success border-success"><strong>+</strong> <span class="   fw-bold">  ${myarray[index].montant}</span><strong> MAD</strong></li><li class="list-group-item text-white  bg-success border-success bg-opacity-75"><strong>Type :</strong> <span class="">${myarray[index].type}</span></li><li class="list-group-item  text-white bg-opacity-75  bg-success border-success"><strong>Date :</strong> <span>${myarray[index].date}</span></li></ul><div class="card-text mt-3"><strong>Description :</strong><p class="small ">${myarray[index].description} .</p></div></div>`

        } else {

            card.className = ' card bg-danger  text-white     bg-opacity-50';
            card.innerHTML = ' <div class="card-header d-flex  justify-content-around"> <i   role="button"  onclick="button_modifier(' + myarray[index].id + ')" class="bi bi-pencil-square"></i> <i class="bi bi-trash3-fill" role="button"  onclick="button_supprimer(' + myarray[index].id + ')"  > ' + `</i> </div><div class=""><ul class="list-group bg-danger "><li class="list-group-item text-white bg-opacity-75  bg-danger border-danger"><strong>-</strong> <span class="   fw-bold"> ${myarray[index].montant}</span> <strong> MAD</strong></li><li class="list-group-item text-white bg-opacity-75 bg-danger border-danger"><strong>Type :</strong> <span class="">${myarray[index].type}</span></li><li class="list-group-item  text-white bg-opacity-75 bg-danger border-danger"><strong>Date :</strong> <span>${myarray[index].date}</span></li></ul><div class="card-text mt-3"><strong>Description :</strong><p class="small ">${myarray[index].description} .</p></div></div>`

        }
        card_operations.appendChild(card)
    }
    update_montants(my_key)
}


function methodefultter(type_fultter) {
    card_operations = document.getElementById('cards')
    document.getElementById('cards').innerHTML = ""
    let myarray = charger_les_donnees(my_key)
    for (let index = 0; index < myarray.length; index++) {
        let card = document.createElement('div');
        if (myarray[index].type == type_fultter && type_fultter == "Revenu") {
            card.className = ' card bg-success text-white     bg-opacity-75';
            card.innerHTML = ' <div class="card-header d-flex  justify-content-around"> <i   role="button"  onclick="button_modifier(' + myarray[index].id + ')" class="bi bi-pencil-square"></i> <i class="bi bi-trash3-fill" role="button"  onclick="button_supprimer(' + myarray[index].id + ')"  > ' + `</i> </div><div class="  bg-opacity-75 "><ul class="list-group  "><li class="bg- list-group-item text-white  bg-success border-success"><strong>+</strong> <span class="   fw-bold">  ${myarray[index].montant}</span><strong> MAD</strong></li><li class="list-group-item text-white  bg-success border-success"><strong>Type :</strong> <span class="">${myarray[index].type}</span></li><li class="list-group-item  text-white  bg-success border-success"><strong>Date :</strong> <span>${myarray[index].date}</span></li></ul><div class="card-text mt-3"><strong>Description :</strong><p class="small ">${myarray[index].description} .</p></div></div>`
            card_operations.appendChild(card)
        } else if (myarray[index].type == type_fultter && type_fultter == "Dépense") {

            card.className = ' card bg-danger  text-white    bg-opacity-75';
            card.innerHTML = ' <div class="card-header d-flex  justify-content-around"> <i   role="button"  onclick="button_modifier(' + myarray[index].id + ')" class="bi bi-pencil-square"></i> <i class="bi bi-trash3-fill" role="button"  onclick="button_supprimer(' + myarray[index].id + ')"  > ' + `</i> </div><div class=""><ul class="list-group bg-danger "><li class="list-group-item text-white  bg-danger border-danger"><strong>-</strong> <span class="   fw-bold"> ${myarray[index].montant}</span> <strong> MAD</strong></li><li class="list-group-item text-white  bg-danger border-danger"><strong>Type :</strong> <span class="">${myarray[index].type}</span></li><li class="list-group-item  text-white  bg-danger border-danger"><strong>Date :</strong> <span>${myarray[index].date}</span></li></ul><div class="card-text mt-3"><strong>Description :</strong><p class="small ">${myarray[index].description} .</p></div></div>`
            card_operations.appendChild(card)
        }

    }
    if (type_fultter == "Tous") set_cards_in_html(my_key)
    else if (!localStorage.getItem("filtrer"))
        set_cards_in_html(my_key)
    update_montants(my_key)
}




function fultter() {
    type_fultter = document.getElementById("type_fultter").value
    localStorage.setItem("filtrer", type_fultter)
    methodefultter(type_fultter)
}




function button_supprimer(id) {
    console.log("modifier " + id)
    validation_supprission.classList.remove('d-none')
    localStorage.setItem("id_supprimer", id)
}



function vider_champs() {
    document.getElementById('montant').value = 0
    document.getElementById('discription').value = ''
}


function supprimer() {
    let id = localStorage.getItem('id_supprimer')
    let myarray = charger_les_donnees(my_key)
    let newarray = []
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].id != id)
            newarray.push(myarray[index])
    let array_to_string = JSON.stringify(newarray)
    localStorage.setItem(my_key, array_to_string)
    validation_supprission.classList.add("d-none")
    methodefultter(localStorage.getItem("filtrer"))
    localStorage.removeItem('id_supprimer')
}



function button_modifier(id) {
    console.log("modifier " + id)
    let myarray = charger_les_donnees(my_key)
    cardTransaction.classList.remove("d-none")
    btnsave.classList.remove("d-none")
    btnajout.classList.add('d-none')
    localStorage.setItem("id_modifier", id)
    for (let index = 0; index < myarray.length; index++)
        if (myarray[index].id == id) {
            set_Type(myarray[index].type)
            set_Discription(myarray[index].description)
            set_Montant(parseInt(myarray[index].montant))
        }
}

function sauvgarder_modification(my_key) {
    let myarray = charger_les_donnees(my_key)
    let id = localStorage.getItem("id_modifier")
    let verifierdiscription = verifier_Discription()
    if (verifier_Montant() && verifierdiscription) {
        for (let index = 0; index < myarray.length; index++)
            if (myarray[index].id == id) {
                myarray[index].description = get_Discription()
                myarray[index].type = get_Type()
                myarray[index].montant = get_Montant()
                console.log(myarray[index])
            }

        let array_to_string = JSON.stringify(myarray)
        localStorage.setItem(my_key, array_to_string)
        cardTransaction.classList.add("d-none")
        btnsave.classList.add("d-none")
        btnajout.classList.remove('d-none')
        methodefultter(localStorage.getItem("filtrer"))
        localStorage.removeItem('id_modifier')
        vider_champs()
    }
}




// ::::::::::::::::::::::::::::::::::::::::: 
if (!localStorage.getItem("filtrer"))
    set_cards_in_html(my_key)
else {
    methodefultter(localStorage.getItem("filtrer"))
    document.getElementById('type_fultter').value = localStorage.getItem("filtrer")
}

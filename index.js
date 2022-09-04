let num1 = Math.ceil(Math.random()*10);
let num2 = Math.ceil(Math.random()*10);
let QElem = document.getElementById("question");
let formElem = document.getElementById("form");
let personForm = document.getElementById("personForm");
let removeAllPersonForm = document.getElementById('removeAllPerson');

let inputElem = document.getElementById("input")
let scoreElem = document.getElementById("score")
QElem.innerHTML = `Q. What is ${num1} multiply by ${num2}?`;
let answer = num1*num2;

var personList = [];

personList = JSON.parse(localStorage.getItem("personLists"));

if(personList == null){
    personList =[];
    console.log('Item is null');
}


let namesBody = document.getElementById("namesBody");



personList.forEach(function(person){
    
    let tr = document.createElement("tr");

    let trName = document.createElement("td");
    let trCountry = document.createElement("td");
    let trAge = document.createElement("td");
    let trScore = document.createElement("td");
    
    trName.innerHTML = person.name;
    trCountry.innerHTML = person.country;
    trAge.innerHTML = person.age;
    

    tr.appendChild(trName);
    tr.appendChild(trCountry);
    tr.appendChild(trAge);

    namesBody.appendChild(tr);

    console.log('===========>>'+person.name);
});

personForm.addEventListener("submit",(e)=>{
    
    let personNameValue = document.getElementById("personName");
    let personCountryValue = document.getElementById("country");
    let personAgeValue = document.getElementById("age");

    let person = {
        'id': 0,
        'name': personNameValue.value,
        'country': personCountryValue.value,
        'age': personAgeValue.value,
        'score': 0,
    };
    
    
    setPersonLocalStorage(person);

});

function setPersonLocalStorage(person){
    
    let personListLocalStorage = JSON.parse(localStorage.getItem("personLists"));
    if(personListLocalStorage != null){
        
        person.id =0;
        personList.push(person);
        localStorage.setItem("personLists", JSON.stringify(personList));

    }else{
        personList =[];
        personList.push(person);
        localStorage.setItem("personLists", JSON.stringify(personList));
    }
}

removeAllPersonForm.addEventListener("submit",(e)=>{
    
    localStorage.removeItem('personLists');

});
//==========================================================


let score = JSON.parse(localStorage.getItem("score"));
if (!score){
    score = 0;
}

scoreElem.innerHTML = `score: ${score}`




formElem.addEventListener("submit",(e)=>{
   
    let userANS= +inputElem.value;
    if(userANS == answer){
        score++;
    }

    setlocalStorage();
});

function setlocalStorage(){
    localStorage.setItem("score", JSON.stringify(score));
    scoreElem.innerHTML = `score: ${score}`
    console.log(score);
}




const selectCountry = document.getElementById("#country");


function addPlayer(e){
    e.preventDefault();

    const playerDeets={
         mName:document.getElementById("name"),
         modalAge:document.getElementById("age")
    }
    

    fetch('http://localhost:3000/players'),{
        method:'POST',
        body: JSON.stringify(playerDeets),
        Headers:{
            "content.type":"application/JSON"       
        }
    }
    .then(res => {
        console.log(res)
    });
    


}

document.addEventListener('DOMContentLoaded',()=>{
    
    let selectCountry = document.getElementById("country");
    

    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        for(let x =0; x< data.length; x++){

            let optionValue = data[x].name.common;
            let newOption = document.createElement("option");
            
            newOption.value = optionValue;
            newOption.text = optionValue;

            selectCountry.appendChild(newOption);
        }
        
     });
    const addDetails = document.getElementById("addPlayer");
    //addDetails.addEventListener('submit',addPlayer);
});

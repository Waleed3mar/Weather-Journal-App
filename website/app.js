/* Global Variables */
const api = "&appid=a01b0a677def0a97ea279b0e8bd50bf2";
const urrl = "http://api.openweathermap.org/data/2.5/weather?zip="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

let zipCode = document.getElementById("zip").value;
const feelings = document.getElementById("feelings").value;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[GET FUNCTION]
const getWeather = async (url = "") => {
    const request = await fetch(url);
    try {
        const res = await request.json();
        return res;
    } catch (errors) {
        console.log('error' + errors)
    }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[POST FUNCTION]
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        
        const newData = await response.json();
        return newData;

    } catch (errors) {
        console.log('error' + errors)
    };
}

let datDiv = document.getElementById("date");
let tmpDiv = document.getElementById("temp");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[UPDATE UI FUNCTION]
const updateUI = async () => {
    const update = await fetch('/getData');

    try {
        const updateNew = await update.json();
        document.getElementById("date").innerHTML = `The Date is: ${updateNew.date}`;
        document.getElementById("content").innerHTML =`You Feel: ${updateNew.content}`;
        document.getElementById("temp").innerHTML = `Temp Now is: ${updateNew.temp} C`;

        
    } catch (errors) {
        console.log('error' + errors);
    }
}


let btn = document.getElementById("generate")
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[Start!]
btn.addEventListener('click', preformAction)
function preformAction() {
    let zipCode = document.getElementById("zip").value;
    let contDiv = document.getElementById("feelings").value;
    let uni = "&units=metric"
    if (!zipCode){
        alert("Please Enter a Zip-Code!");
    }
    else{
    getWeather(urrl+zipCode+api+uni)
    .then(function(data){
        postData("/addWeather",{
            date: newDate,
            temp:data.main.temp,
            content: contDiv,
        })
    })
    .then(() => updateUI());
}}
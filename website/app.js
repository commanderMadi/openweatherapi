/* Global Variables */
const userResponse = document.getElementById('feelings'); 
const zipCode = document.getElementById('zip');
const mapURI = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '0e0df1e9abe3bac527f6595867c4fa61';
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();

generateBtn.addEventListener('click', function(e) {
    userResponse.innerHTML = '';
    zipCode.innerHTML = '';
    getThenPost();
})
const getData = async (url = '') => {
    const req = await fetch(url);
    try {
        const jsonData = await req.json();
        return jsonData;
    } catch(error) {
        console.log(error);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const jsonData = await res.json();
    } catch(error) {
        console.log(error);
    }
}

const getThenPost = () => {
    getData(`${mapURI}zip=${zipCode.value}&appid=${apiKey}`)
    .then(data => {
        console.log(data);
        postData('/add',{
            temperature: data.main.temp,
            date: newDate,
            userResponse: userResponse.value
        });
        updateUserInterface('/all')
    })
};

const updateUserInterface = async (url='') => {
    const req = await fetch(url);
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
    } catch (error) {
        console.log(error);
    }
    
}
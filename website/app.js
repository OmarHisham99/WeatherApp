// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=31edc88decfc6b6bbe7f21bc33cca809"; 
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',trigger); 

/* Function called by event listener */
function trigger(){
    const zipValue = document.getElementById('zip').value; 
    const feeling = document.getElementById('feelings').value; 

    let d = new Date(); 
    let newDate = d.getMonth()+1 + '/' + d.getDate() +'/' + d.getFullYear(); 
    getWeather(baseUrl+zipValue+apiKey)
    .then(function(info){
        console.log(info); 
        postData('/add',{date: newDate, temp: info.main.temp ,content: feeling})
    })
    .then(()=>{
        updateUi(); 
    })
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
    try{
        const res = await fetch(url); 
        const info = await res.json(); 
        //console.log(info); 
        return info ; 
    }
    catch(error){
        console.log(error); 
    }
};
/* Function to POST data */
const postData = async(url='',data={})=>{
    const response = await fetch(url, {
        method : 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type':'application/json', 
        }, 
        body:JSON.stringify(data), 
    });
    try{
        const newData = await response.json(); 
        console.log(newData); 
        return newData ; 
    }
    catch(error){
        console.log("error",error); 
    }
}

/* Function to GET Project Data */
const updateUi = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
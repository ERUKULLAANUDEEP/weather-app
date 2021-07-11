console.log("In app.js");
const description = document.querySelector("#description");
const place = document.querySelector("#place");
const weather = async (input) =>{
    if(!location) {
        return 'Provide valid location'; 
    }
    const data = await fetch(`http://localhost:3000/weather?location=${input}`);
    const jsonData = await data.json();
    return jsonData;
};

document.querySelector('form').addEventListener('submit',(e)=>
{  e.preventDefault();
    description.textContent = "Loading..";

    const location = document.querySelector('input').value;
    console.log("location:", location.value);
    weather(location).then(data=>{
        place.textContent = data.place;
        description.textContent = data.description;
        if(data.error) {
            description.textContent = data.error;
        }
        console.log("responseData:", data);
    }).catch(err=>{
        description.textContent = err;
        console.log("Error:", err);
    });
    

})
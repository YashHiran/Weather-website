console.log('Client side javascript is Loading.......');


const weatherForm = document.querySelector('form');
const search = document.getElementById('searchId');
const msg1 = document.querySelector('#p1');
const msg2 = document.querySelector('#p2'); 

// msg1.textContent ='from javascript'; 

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();


    msg1.textContent = 'Loading..........';
    msg2.textContent = '';


    fetch('/weather?address=' + search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error;                 
            console.log(data.error);
        }else{
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
            console.log(data.location);
            console.log(data.forecast);            
        }
    })
})

});


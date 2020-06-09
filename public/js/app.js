// this is the client side javascript to get the weather and forecast formthe http
// we wii be using a similiar that of using rest api
console.log('CLIENT SERVER IS LOADED')
const weather=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')
weather.addEventListener('submit',(e)=>{
    e.preventDefault()

    const loc=search.value

    fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)    
        }
        else{   
            m1.textContent=data.loc
            m2.textContent=data.forecast
        }
    })
})
})

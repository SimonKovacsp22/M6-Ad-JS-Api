const options = {
	method: 'GET',
	headers: {
		Authorization: "Bearer 563492ad6f91700001000001349c26a0ba2c4a9782bc856456e8e537"
	}
};
let photosContainer = document.querySelector('.photos-container')

let idNumber = 0
let alert = document.querySelector('.alert')
let loadedNumberOfImgs = 0


 const getPictures = function(keyWord){
fetch(`https://api.pexels.com/v1/search?query=[${keyWord}]`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        return response
    })
    .then(pictures =>{ 
        loadedNumberOfImgs =  pictures.photos.length
        alert.innerHTML = `loaded ${loadedNumberOfImgs} images`
        for (let index = 0; index < pictures.photos.length; index++) {
            const photo = pictures.photos[index]
            photosContainer.innerHTML += ` <div id="${idNumber}p" class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src=${photo.src.medium} >
              <div class="card-body">
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div
                  class="d-flex justify-content-between align-items-center"
                >
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary hide-button"
                    >
                      Hide
                    </button>
                  </div>
                  <small class="text-muted">${photo.id}</small>
                </div>
              </div>
            </div>
          </div>`
            
          idNumber++
          hideFunc()
        }

    })
	.catch(err => console.error(err));
 }

 let loadImagesBtn = document.querySelector('.jumbotron div p:nth-child(3) a:nth-child(1)')
 let loadSecImagesBtn = document.querySelector('.jumbotron div p:nth-child(3) a:nth-child(2)')

 const hideFunc = function () {
    let hideBtns = document.querySelectorAll('.hide-button')
    let number =0
    for (let index = 0; index < hideBtns.length; index++) {
        btn = hideBtns[index];
        let photo = document.getElementById(`${number}p`)
         btn.addEventListener('click',()=>{
           photo.classList.add('hidden-photo')  
         })
         number++
    }
       
       
    
}

 loadImagesBtn.addEventListener('click', () =>{
     let inputValue = document.querySelector('input').value
     
     addAnimate()
     idNumber=0
     photosContainer.innerHTML=""
     getPictures(`${inputValue}`)
     const myTimeout = setTimeout(removeAnimate,5000)
     
     
    
     
 })
 
 

 loadSecImagesBtn.addEventListener('click',() => {
    addAnimate()
     idNumber=0
     photosContainer.innerHTML = ""
     getPictures('kitchen')
     const myTimeout = setTimeout(removeAnimate,5000)
 })

removeAnimate = function() {
    alert.classList.remove('animate')
}

addAnimate = function() {
    alert.classList.add('animate')
}



 
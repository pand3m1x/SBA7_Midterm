//add API 
//add ul link event listener and storage 

// fetch('https://spoo.me/api/v1')


const shortenItBtn = document.getElementById("shortenItBtn");
const shortenedLinks = document.getElementById("shortenedLinks");
  
shortenItBtn.addEventListener("click", shortenLink);

function shortenLink(){
  let urlInput = document.getElementById("url").value;
  console.log("shortening link");

  if (urlInput === ""){
    alert ("please enter a url")
    return;
    // how to check for legit URL?
  }

  if (urlInput) {
    const linkShort = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    linkShort.push({  }) // new link
    
  }
}

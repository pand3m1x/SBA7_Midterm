// Shorten any valid URL []
// See a list of their shortened links, even after refreshing the browser []
// Copy the shortened link to their clipboard in a single click []
// Receive an error message when the form is submitted if: []
// The input field is empty []
// View the optimal layout for the interface depending on their device’s screen size []
// See hover and focus states for all interactive elements on the page []

// fetch('https://spoo.me/api/v1')
// import {API_KEY} from "./secret.js"

fetch('https://spoo.me/api/v1/shorten', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        long_url: 'https://example.com'
    })
})
.then(response => response.json())
.then(data => console.log(data));

const shortenItBtn = document.getElementById("shortenItBtn");
const shortenedLinks = document.getElementById("shortenedLinks");
  
shortenItBtn.addEventListener("click", shortenLink);

function shortenLink(){
  let urlInput = document.getElementById("url").value;
  console.log("Short Stack coming up");

  if (urlInput === ""){
    alert ("please enter a url")
    return;
    // how to check for legit URL?
  }

  if (urlInput) {
    console.log(JSON.parse(localStorage.getItem("shortenedLinks")))
    const linkShort = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    linkShort.push({url:urlInput}) // new link
    localStorage.setItem("shortenedLinks", JSON.stringify(linkShort))

  renderLinks();
  console.log("Shortened!")
  }
}

function renderLinks() {
  const linkShort = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
  shortenedLinks.innerHTML = "";

  linkShort.forEach((link,index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    console.log(link)
    const a = document.createElement("a");
    a.href = link.url
    a.innerText = link.url
li.appendChild(a)

  const copyBtn = document.createElement("button");
  copyBtn.innerText ="Copy";

  copyBtn.addEventListener("click", function(){
    copyLink(index);
  })

  li.appendChild(copyBtn)

  shortenedLinks.append(li)
})
}
renderLinks();
console.log("Link added")

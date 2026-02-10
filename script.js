// Shorten any valid URL []
// See a list of their shortened links, even after refreshing the browser []
// Copy the shortened link to their clipboard in a single click []
// Receive an error message when the form is submitted if: []
// The input field is empty []
// View the optimal layout for the interface depending on their device’s screen size []
// See hover and focus states for all interactive elements on the page []

// fetch('https://spoo.me/api/v1')
import {API_KEY} from "./secret.js"

const shortenItBtn = document.getElementById("shortenItBtn");
const links = document.getElementById("links");
  
shortenItBtn.addEventListener("click", shortenLink);

async function shortenLink(){
  let urlInput = document.getElementById("url").value.trim();
  console.log("Short Stack coming up");

  if (urlInput === ""){
    alert ("please enter a url")
    return;
    // how to check for legit URL?
  }

  try { //lesson 8 mod 6 post request
  const response = await
  fetch ("https://spoo.me/api/v1/shorten", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${API_KEY}`
    },
    body: JSON.stringify({
        long_url: urlInput
    })
  
});

  const data = await response.json();

  console.log("API fetch status:", data);

  const shortUrl = data.short_URL || data.shortURL;

  const storedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];

  storedLinks.push({
    original:urlInput,
    short:shortUrl,
  })

  localStorage.setItem(
    "links",
    JSON.stringify(storedLinks)
  );

  renderLinks();

  }
  catch (error){
    console.error("Failed to shorten links:",error)
    alert("Problems in the kitchen!")
  }
}

// This is what adds li under the URL maker container, within the #space div ((Need to figure out how to add both original and shortened))
function renderLinks() {
  const linkShort = JSON.parse(localStorage.getItem("links")) || [];
  links.innerHTML = "";

  linkShort.forEach((link,index) => {
    const li = document.createElement("li");
    li.dataset.index = index;
    console.log(link)
    const a = document.createElement("a");
    a.href = link.short;
    a.innerText = link.short;
li.appendChild(a)

  const copyBtn = document.createElement("button");
  copyBtn.innerText ="Copy";

  copyBtn.addEventListener("click", () => {
    const copyLink = a.innerText;
    navigator.clipboard.writeText(copyLink)
    alert("Copied the text: " + copyLink);
    console.log("link copied")
  });

  li.appendChild(copyBtn)

  links.append(li)
})
}
renderLinks();
console.log("Link added")

//          Beyond          .˚⊹. ࣪𓉸 ࣪⊹˚..˚⊹. ࣪𓉸 ࣪⊹˚..˚⊹. ࣪𓉸 ࣪⊹˚.         the grave

// Originally writen with the fetch request
// fetch('https://spoo.me/api/v1/shorten', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         long_url: 'https://example.com'
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))

  // if (urlInput) {
  //   console.log(JSON.parse(localStorage.getItem("links")))
  //   const linkShort = JSON.parse(localStorage.getItem("links")) || [];
  //   linkShort.push({url:urlInput}) // new link
  //   localStorage.setItem("links", JSON.stringify(linkShort))
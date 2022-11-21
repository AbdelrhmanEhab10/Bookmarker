var bookMarkName = document.getElementById("bookMarkName");
var websiteUrl = document.getElementById("websiteUrl");

var bookMarkContainer;

if (localStorage.getItem("usersWebsites") != null)
{
    bookMarkContainer = JSON.parse (localStorage.getItem("usersWebsites")); 

    output.classList.remove('d-none');

    displayWebsite(bookMarkContainer);
}
else
{
    bookMarkContainer = [];
}
function addWebsite()
{
    var website = 
        {
            name : bookMarkName.value,
            url : websiteUrl.value,
        }
    if (bookMarkName.value === "" && websiteUrl.value === "")
    {
        alert ("Fill the form please")
        localStorage.setItem("usersWebsites", JSON.stringify(bookMarkContainer))
    }
    else if (validSiteName() && validSiteUrl())
    {
        output.classList.remove('d-none');
        bookMarkContainer.push(website);
        localStorage.setItem("usersWebsites", JSON.stringify(bookMarkContainer))
        clearForm();
        displayWebsite(bookMarkContainer);
    }
   
}
function clearForm(){
    bookMarkName.value="";
    websiteUrl.value="";
}
function displayWebsite (list)
{
    var websites = ``;
    for (let i = 0; i < bookMarkContainer.length; i++) 
    {
        websites+= `
        <div class="d-flex justify-content-between w-75 p-5 my-3 bg-light mx-auto">
        <h2> ${bookMarkContainer [i].name} </h2> 
        <div>
        <a target= "_blank" class="btn btn-warning" href="${addhttp(bookMarkContainer [i].url)}"> visit </a>
        <button onclick="deleteWebsite(${i});" class="btn btn-danger">delete</button>
        </div>
        </div>
        `
    }
    document.getElementById("output").innerHTML = websites;
}

function deleteWebsite(deleteindex)
{
    bookMarkContainer.splice(deleteindex , 1);
    localStorage.setItem("usersWebsites", JSON.stringify(bookMarkContainer))
    displayWebsite(bookMarkContainer);
}
function validSiteName()
{
    var validName = false;
    var regex = /^[A-Z][a-z]{1,9}$/
    if (regex.test(bookMarkName.value) == true)
    {
        document.getElementById("unvalidName").style.display="none"
        validName = true;
    }
    else
    {
        document.getElementById("unvalidName").style.display="block"
        validName = false;
    }
    return validName;
}
function validSiteUrl()
{
    var validUrl = false;
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (regex.test(websiteUrl.value) == true )
    {
        document.getElementById("unvalidUrl").style.display="none"
        validUrl = true;
    }
    else
    {
        document.getElementById("unvalidUrl").style.display="block"
        validUrl = false;
    }
    return validUrl;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }













    

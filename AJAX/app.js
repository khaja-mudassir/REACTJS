document.getElementById("button").addEventListener("click", loadData);


function loadData(){
    // Create an XHR OBJECT

    const xhr = new XMLHttpRequest();

    // OPEN

    xhr.open("GET", "data.txt", true);

    // Onlode
    xhr.onload = function(){
        if(this.status === 200){
          document.getElementById("output").innerHTML = `<h1>${this.response}</h1>`
        }
        if(this.status === 400){
            document.getElementById("output").innerHTML = `<h1>Not FOund</h1>`
        }
    }

    xhr.send();
}
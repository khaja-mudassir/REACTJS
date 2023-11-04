const btn = document.querySelector(".clear-tasks");

// btn = document.addEventListener("click", runEvent);

btn.addEventListener("click", runEvent);

// btn.addEventListener("mousedown", runEvent);

function runEvent(e){
    // console.log(e);
    console.log(`EVENT TYPE : ${e.type}`)
}
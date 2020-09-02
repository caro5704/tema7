let filter = "alle";
let container = document.querySelector("#liste");
let temp = document.querySelector("template");
let personer;

const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

async function hentdata() {
    const respons = await fetch(link);
    personer = await respons.json();
    visPersoner();
    addEventListenersToButtons();
}

function visPersoner() {
    console.log(personer);
    container.textContent = "";
    //løb igennem array "dyr"
    personer.feed.entry.forEach(person => {
        if (filter == "alle" || filter == person.gsx$kategori.$t.toLocaleLowerCase()) {
            console.log(person);
            let klon = temp.cloneNode(true).content;
            klon.querySelector("h2").textContent = person.gsx$navn.$t;
            klon.querySelector(".kort").textContent = person.gsx$kort.$t;
            klon.querySelector(".pris").textContent = person.gsx$pris.$t + ",-";
            klon.querySelector("img").src = "imgs/small/" + person.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("article").addEventListener("click", () => visDetaljer(person));
            container.appendChild(klon);
        }
    })
}


function visDetaljer(person) {
    console.log(person);
    popop.style.display = "block";
    popop.querySelector("img").src = "imgs/small/" + person.gsx$billede.$t + "-sm.jpg";
    popop.querySelector("h2").textContent = person.gsx$navn.$t;
    popop.querySelector(".oprindelse").textContent = person.gsx$oprindelse.$t;
    popop.querySelector(".lang").textContent = person.gsx$lang.$t;
    popop.querySelector(".pris").textContent = person.gsx$pris.$t + ",-";


}

document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    })
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })

    this.classList.add("valgt");
    visPersoner();
}

hentdata();

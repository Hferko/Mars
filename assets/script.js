window.onload = (event) => {
	AOS.init({
		delay: 200,	
		duration: 1500  
	});
    Szamlalo.init( 5 )
    
};


var Szamlalo = (function () {

    var ido1
    var intervallum
  
    const init = (hatralevo_nap = 1) => {
      let plusz_ms = hatralevo_nap * 24 * 60 * 60 * 1000
      let ido1_ms = new Date().getTime() + plusz_ms	  
      ido1 = new Date(ido1_ms)
  
      interval = setInterval(() => {
        frissit();
      }, 1000)
  
    }
  
    const stop = () => {
      clearInterval(intervallum)
    }
  
    const kulobseg = () => {
      let ido0 = new Date()
      let diff = Math.round( (ido1.getTime() - ido0.getTime() ) / 1000)
  
      let mperc = diff % 60
      diff = (diff - mperc) / 60
      let perc = diff % 60
      diff = (diff - perc) / 60
      let ora = diff % 24
      diff = (diff - ora) / 24
      let nap = diff
      return { nap, ora, perc, mperc }
    }
  
    const frissit = () => {
      let {nap, ora, perc, mperc} = kulobseg ()
      try {
        document.getElementById( 'szamlalo_nap' ).innerHTML = nap
        document.getElementById( 'szamlalo_ora' ).innerHTML = ora
        document.getElementById( 'szamlalo_perc' ).innerHTML = perc
        document.getElementById( 'szamlalo_mperc' ).innerHTML = mperc
      } catch { }
    }
  
    return {
      init, stop
    }
  })()
  
/*A fenti "Szamlalo"-nak két belső változója van: 
    ido1 : ez annak az időpillanatnak a dátum objektuma ami a visszaszámolás végét jelzi; 
    az init(hatralevo_nap) metódussal kap értéket
    intervallum : a setInterval által visszaadott intervallum indexe 

Van két nem publikus metódusa:
    kulonbseg() : az ido1 időpillanathoz képest egy objektumban visszaadja a hátralévő időt a következő formában: 
    { nap, ora, perc, mperc }
    frissit() : a kulonbseg() -ből kapott objektum elemeit behelyettesíti a weboldal HTML elemeinek tartalmába

És van két publikus metúdusa:
    init( hatralevo_nap ) : paraméter értékének megfelelően beállítja az ido1 időpontot az adott pillanathoz képeset, majd elindít egy intervallum - ot, mely a frissit() metódust hívja meg 1 másodpercenként
    stop() : leállítja az intervallumot és ezzel a számlálást
*/


/*  -------------------------------------------------------------------
javascript-el figyeljük hogy egy scroll esemény után hol áll az ablak
és ha nem a dokumentum legtetején van a nézőpont, 
akkor hozzáadjuk a .scrolled class-t. Ellenkező esetben elvesszük.
Vagyis ha bármennyit legörgetünk akkor lesz egy sötét háttere a navigációs sávnak,
így biztosan mindenhol olvasható lesz a menüpontok fehér felirata. */

function handleScroll (){
  let navArea = document.getElementById("navArea");
    if (window.pageYOffset > 0){
      navArea.classList.add("scrolled");
    }
    else{
      navArea.classList.remove("scrolled");
    }
}

window.onscroll = handleScroll

// a képek:

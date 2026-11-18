// Enkel veileder (beslutningstre). Kjører lokalt i nettleseren, ingen nettverkskall, ingen nøkler.
(function () {
  "use strict";
  var T = {
    start: { q: "Hva vil du gjøre?", c: [
      ["Koble et display til en kontroller", "disp1"],
      ["Bruke et batteri fra en annen sykkel eller sparkesykkel", "bat1"],
      ["Finne ut hva ledningene i en plugg er", "led1"],
      ["Få en motor til å gå med en annen kontroller", "mot1"],
      ["Jeg har deler fra en delesparkesykkel (Voi o.l.)", "voi"]
    ]},
    voi: { a: "Stopp her. Delesparkesykler og delene deres eies av operatøren. Å ta dem kan være tyveri, og å kjøpe dem kan være heleri. Kontakt selskapet, så henter de den. Se seksjonen «Sparkesykler».", link: "#sparkesykler" },

    disp1: { q: "Er display og kontroller fra samme produsent og system (for eksempel begge King-Meter/KM5S, begge KT, begge Bafang)?", c: [
      ["Ja, samme system", "disp2"], ["Nei, forskjellige merker", "dispNei"], ["Vet ikke", "dispVet"]
    ]},
    dispNei: { a: "Da er det sannsynlig at de ikke snakker samme protokoll, selv om pluggen passer. Du kan prøve kontrolleren uten display (mange KT-kontrollere går med bryterledningen koblet til batteripluss, men da med begrenset funksjon), eller kjøpe et display som er laget for kontrolleren din.", link: "#display" },
    dispVet: { q: "Står det modellnummer på både display og kontroller (merkelapp, strekkode eller trykk på kretskort)?", c: [
      ["Ja", "dispModell"], ["Nei", "dispUkjent"]
    ]},
    dispModell: { a: "Søk opp manualen til begge modellene og sjekk hvilken protokoll de oppgir (for eksempel «KM5S», «KT», «Bafang UART»). Står det ikke, regn med at de ikke passer. På KM529 forteller strekkoden spenningen: siffer 2 = 24 V, 3 = 36 V, 4 = 48 V.", link: "#display" },
    dispUkjent: { a: "Uten modellnummer er det mest gjetting. Kartlegg pinnene med multimeter (jord, pluss, bryter), men ikke koble dataledninger før du vet at protokollen stemmer. Feilkode 30 på et King-Meter-display betyr kommunikasjonsfeil.", link: "#multimeter" },
    disp2: { q: "Har du sjekket at displayet er laget for samme spenning som batteriet?", c: [
      ["Ja", "disp3"], ["Nei", "dispSpenning"]
    ]},
    dispSpenning: { a: "Gjør det først. Les merkelappen eller strekkoden (KM529: 2 = 24 V, 3 = 36 V, 4 = 48 V). Et display for 36 V på et 48 V-system kan bli ødelagt.", link: "#display" },
    disp3: { q: "Har pluggene samme antall pinner og samme type (for eksempel Julet 5-pinners)?", c: [
      ["Ja", "disp4"], ["Nei", "dispAdapter"]
    ]},
    dispAdapter: { a: "Du kan lage en overgang, men da må hver pinne kartlegges med multimeter i begge ender. Lag en tabell: funksjon, farge, pinnenummer. Husk at TX på displayet skal til RX på kontrolleren og omvendt.", link: "#multimeter" },
    disp4: { a: "Mål likevel før du kobler: finn jord (0 Ω mot batteriminus), og sjekk med strøm på at pluss og bryterledningen sitter der du tror. Samme plugg kan ha ulik pinnerekkefølge hos ulike leverandører.", link: "#plugger" },

    bat1: { q: "Står antall celler i serie eller spenning på batteriet (for eksempel 36 V/10S, 48 V/13S)?", c: [
      ["Ja", "bat2"], ["Nei", "batUkjent"]
    ]},
    batUkjent: { a: "Mål spenningen over polene. Fulladet 36 V-pakke er ca. 42 V, 48 V ca. 54,6 V og 52 V ca. 58,8 V. Men spenningen alene avslører ikke om pakken er helt ladet. Uten merking og uten kjent lader bør du ikke bruke batteriet.", link: "#batteri" },
    bat2: { q: "Har du en lader laget for nøyaktig denne pakken (riktig ladespenning, for eksempel 54,6 V for 13S)?", c: [
      ["Ja", "bat3"], ["Nei", "batLader"]
    ]},
    batLader: { a: "Skaff riktig lader før du bruker batteriet. Feil ladespenning kan overlade cellene og gi brann. Står det 42 V på laderen, er den for 36 V-batterier.", link: "#batteri" },
    bat3: { q: "Er batteriet helt: ingen bulker, sprekker, oppsvulming, lukt eller fuktskade?", c: [
      ["Ja, ser helt ut", "bat4"], ["Nei, eller usikker", "batSkadet"]
    ]},
    batSkadet: { a: "Ikke bruk det. Lever det til gjenvinningsstasjonen (se sortere.no). Skadde litiumbatterier kan ta fyr uten forvarsel.", link: "#sikkerhet" },
    bat4: { q: "Kommer batteriet fra en merkesparkesykkel (Xiaomi, Ninebot e.l.) med dataledninger i tillegg til pluss og minus?", c: [
      ["Ja", "batData"], ["Nei, bare pluss og minus", "batOk"]
    ]},
    batData: { a: "Kontrolleren i noen slike sparkesykler forventer data fra batteriet. Det varierer per modell om batteriet virker med en annen kontroller, eller kontrolleren med et annet batteri. Sjekk at kontrolleren du skal bruke tåler spenningen og strømmen, og bruk sikring.", link: "#batteri" },
    batOk: { a: "Sjekk at kontrolleren tåler pakkens fulladede spenning, at BMS-en tåler strømmen kontrolleren trekker, og sett en sikring på pluss nær batteriet. Første test med hjulet løftet.", link: "#sjekkliste" },

    led1: { q: "Er batteriet koblet fra?", c: [
      ["Ja", "led2"], ["Nei", "ledFra"]
    ]},
    ledFra: { a: "Start med batteriet frakoblet. Mål motstand og gjennomgang først, spenning etterpå. Mål aldri motstand på en krets med strøm i.", link: "#multimeter" },
    led2: { q: "Har du funnet jord (pinnen med ca. 0 Ω mot batteriminus på kontrolleren)?", c: [
      ["Ja", "led3"], ["Nei", "ledJord"]
    ]},
    ledJord: { a: "Still multimeteret på gjennomgang eller Ω. Hold én spiss på kontrollerens batteriminus og prøv hver pinne. Den som piper eller viser nær 0 Ω, er jord. Merk den med teip.", link: "#multimeter" },
    led3: { q: "Hvor mange ledninger, og hvor tykke?", c: [
      ["3 tykke", "ledFase"], ["5 tynne (fra motor)", "ledHall"], ["3 tynne (gass)", "ledGass"], ["4–6 tynne (display)", "ledDisp"]
    ]},
    ledFase: { a: "Det er motorfasene. Mål motstand mellom dem to og to: alle par skal gi omtrent like lav verdi. Mål også fra hver fase til motorhuset: skal være uendelig (ingen forbindelse).", link: "#multimeter" },
    ledHall: { a: "Trolig hallsensorer: 5 V, jord og tre signaler. Koble til kontrolleren, slå på, og drei hjulet sakte. Hver signalledning skal veksle mellom ca. 0 V og ca. 5 V.", link: "#multimeter" },
    ledGass: { a: "Trolig 5 V, jord og signal. Med strøm på: mål signal mot jord og vri på gassen. Typisk lav spenning i ro (rundt 0,8 V) som stiger mot ca. 4 V. Verdiene varierer.", link: "#multimeter" },
    ledDisp: { a: "Displaykabel. Finn jord først, så pluss med strøm på (ofte full batterispenning). Bryterledningen får ofte batterispenning når displayet slår seg på. De to siste er data (RX/TX). Ikke koble pluss inn på en dataledning.", link: "#display" },

    mot1: { q: "Tåler kontrolleren batteriets fulladede spenning?", c: [
      ["Ja", "mot2"], ["Nei / vet ikke", "motSpenning"]
    ]},
    motSpenning: { a: "Les merkelappen på kontrolleren. Er den for 36 V og batteriet er 48 V, kan kondensatorer og transistorer bli ødelagt. Bytt kontroller eller batteri.", link: "#passer" },
    mot2: { q: "Har motoren hallsensorer (5 tynne ledninger) og kontrolleren hallinngang?", c: [
      ["Ja, begge", "motHall"], ["Motoren har ikke hall / kontrolleren mangler inngang", "motSensorlos"]
    ]},
    motHall: { a: "Koble fase til fase og hall til hall, med 5 V og jord riktig. Rekkefølgen på faser og hallsignaler må ofte prøves (seks kombinasjoner) eller læres med kontrollerens selvlæringsfunksjon hvis den har det. Hjulet løftet, lav gass, slipp straks hvis motoren hakker, brummer eller blir varm.", link: "#multimeter" },
    motSensorlos: { a: "Noen kontrollere kan kjøre sensorløst, men starter ofte dårlig fra stillestående. Sjekk om din kan det. Alternativt en kontroller som støtter motoren, for eksempel en VESC.", link: "#display" }
  };

  var root = document.getElementById("hjelper");
  if (!root) return;
  var history = [];

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }

  function render(id) {
    var n = T[id];
    root.innerHTML = "";
    if (history.length) {
      root.appendChild(el("p", { "class": "trail" }, "Steg " + (history.length + 1)));
    }
    if (n.q) {
      var q = el("p", { "class": "q", tabindex: "-1" }, n.q);
      root.appendChild(q);
      var box = el("div", { "class": "choices", role: "group", "aria-label": "Svaralternativer" });
      n.c.forEach(function (ch) {
        var b = el("button", { type: "button", "class": "primary" }, ch[0]);
        b.addEventListener("click", function () { history.push(id); render(ch[1]); });
        box.appendChild(b);
      });
      root.appendChild(box);
      if (history.length) q.focus();
    } else {
      var a = el("p", { "class": "q", tabindex: "-1" }, "Forslag: " + n.a);
      root.appendChild(a);
      if (n.link) {
        var p = el("p");
        var l = el("a", { href: n.link }, "Les mer i den aktuelle delen av siden");
        p.appendChild(l);
        root.appendChild(p);
      }
      a.focus();
    }
    var nav = el("div", { "class": "choices" });
    if (history.length) {
      var back = el("button", { type: "button" }, "Tilbake");
      back.addEventListener("click", function () { render(history.pop()); });
      nav.appendChild(back);
      var restart = el("button", { type: "button" }, "Start på nytt");
      restart.addEventListener("click", function () { history = []; render("start"); });
      nav.appendChild(restart);
    }
    root.appendChild(nav);
  }

  // Valider treet: alle lenker peker til noder som finnes.
  Object.keys(T).forEach(function (k) {
    (T[k].c || []).forEach(function (ch) {
      if (!T[ch[1]]) console.error("Veileder: mangler node", ch[1]);
    });
  });

  render("start");
})();

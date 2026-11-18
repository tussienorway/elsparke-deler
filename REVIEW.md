# Kritisk gjennomgang av første utkast

Gjennomgangen er gjort som en streng ekstern anmelder (19. november 2026), etter første utkast av `index.html`, `style.css` og `app.js`. Hvert punkt har alvorlighetsgrad og status.

Merk: Gjennomgangen er gjort av samme assistent som skrev utkastet, med en bevisst kritisk rolle. Den er ikke gjort av ChatGPT eller en annen ekstern tjeneste.

## Faktafeil og upresisheter

1. **Høy – KM529-menyen lar deg sette fartsgrense 12–40 km/t, men siden sa ingenting om det.** Det er akkurat den typen innstilling som gjør en elsykkel om til en moped etter loven. *Fikset:* lagt til punkt under KM529 og under regler, med kilde [2].
2. **Middels – «Strekkoden forteller spenningen» var for vagt.** Leseren vet ikke hvilket siffer. *Fikset:* presisert at det er sifferet for batterispenning i strekkodebeskrivelsen i manualen, og at du bør sjekke manualen for nøyaktig plassering.
3. **Middels – Xiaomi og Ninebot ble beskrevet som én ting.** Kildene viser ulike pakkehoder (55 AA hos Xiaomi, 5A A5 hos Ninebot). *Fikset:* skilt dem fra hverandre.
4. **Lav – «ren motordrift opp til 6 km/t» for elsykkel** er riktig etter Vegvesenet, men KM529 har en «push»-funksjon på 6 km/t. *Fikset:* nevnt at gåhjelp på 6 km/t er det som er lov.

## Manglende sikkerhetsinformasjon

5. **Høy – Ingenting om å koble to batterier sammen.** Folk som bygger av deler prøver ofte å parallellkoble eller seriekoble pakker med ulik spenning eller ladenivå. Det kan gi svært høye strømmer og brann. *Fikset:* egen advarsel i batteridelen og i sjekklisten.
6. **Høy – Ingenting om gnist ved tilkobling (forlading av kondensatorer) på 48 V og over.** *Fikset:* lagt til i sikkerhet og multimeterdelen (B), med anbefaling om antigniststikk/forladingsmotstand som generelt råd, merket som praksis og ikke kildebelagt.
7. **Middels – Siden oppfordrer til egenbygg, mens DSB fraråder å modifisere.** Det var ikke sagt rett ut. *Fikset:* lagt til en ærlig setning om dette i batteridelen.
8. **Middels – Hallsensortesten «med kontrolleren koblet til» forklarte ikke hvordan man måler på en tilkoblet plugg.** *Fikset:* forklart baksidemåling (målenål inn bak tetningen langs ledningen), og at hjulet skal snurres for hånd med gassen urørt.
9. **Lav – Mangler råd om lade- og utladeport.** Noen batterier har egen ladeport som går gjennom BMS-en på en annen måte enn utgangen. *Fikset:* kort punkt, merket som «varierer».

## Uklare steg

10. **Middels – Multimeter steg A: «mål fra hver pinne til batteriminus» antar at kontrolleren er tilgjengelig.** *Fikset:* lagt til alternativ: mål mellom pinnene i pluggen og bruk tykk svart ledning som referanse.
11. **Lav – Pinnenummerering er beskrevet fra én kilde.** *Beholdt,* men tydeliggjort at du skal tegne din egen.

## Manglende innhold

12. **Middels – Ordlisten mangler LiFePO4, sikring og forlading.** *Fikset.*
13. **Lav – Ingen forklaring på hva du gjør hvis displayet ikke passer.** *Fikset:* «Hva nå?»-punkt (kjør uten display, kjøp matchende display, eller bytt til åpen kontroller).

## Lenker

14. **Middels – Alle eksterne lenker sjekket med curl.** Alle svarer 200, unntatt topeparts.com som gir 403 til kommandolinjeverktøy (bot-blokkering). Den ble åpnet og lest med en vanlig henting og finnes. Ingen 404. ManualsLib ble droppet som kilde (403 og tung reklame), og den originale PDF-en fra profibike.nl brukes i stedet. farligeprodukter.no svarte 500 med www, men 200 uten, så lenken bruker formen uten www.
15. **Lav – Mange kilder er forhandlere eller hobbyforum, ikke produsenter.** *Fikset:* lagt til en merknad i kildelisten om kildetype.

## Tilgjengelighet og teknikk

16. **Middels – Fotnotelenkene «[1]» leses opp som «lenke 1» uten mening.** *Fikset:* `aria-label="Kilde 1"` osv.
17. **Lav – Mangler favicon, gir 404 i konsollen.** *Fikset:* inline SVG-favicon.
18. **Lav – Veilederen flyttet ikke fokus til svaret for skjermlesere.** Var allerede håndtert med `aria-live` og fokus. Bekreftet.
19. **Lav – Tabeller på mobil.** Allerede pakket i rullbar boks. Bekreftet.

## Ikke fikset / bevisst valgt bort

- **«Pub-sjargong».** Brukeren nevnte «pub-publikumsjargong på old school club». Siden holder et enkelt, praktisk språk fordi sikkerhetsinformasjon må være entydig. Tonen kan gjøres røffere senere.
- **Ekte AI-chat.** Krever en API-nøkkel og en server. Den statiske siden har i stedet en lokal veileder uten nøkler.
- **Hiley-display og LED-panelet fra bildet.** Ingen verifiserbare koblingsskjema funnet. Merket som usikkert.

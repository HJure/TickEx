# **TickEx**
## Opis
Glavni cilj TickEx web aplikacije je omogućiti korisnicima jednostavnu kupovinu i razmjenu karata za razna događanja.

## FUNKCIONALNI ZAHTJEVI
-------------------------------------------------------------------
-Aplikacija prikazuje dostupne događaje i  ulaznice  
-OAuthentication registracija (potvrda e-mailom)  
-Dohvaćanje podataka o koncertu pomoću javnih usluga (izvođač, žanr, slika izvođača)  
-Dohvaćanje podataka o prognozi za oglas čiji se  događaj odvija unutar 15 dana od danas  
-Praćenje povijesti razmjene i omogućivanje pregleda prošlih transakcija  
-* Aukcije karata (nema potvrde) uz početnu cijenu i duljinu trajanja, nije moguće brisati aukciju (Upozorenje)  
-* Recenzije korisnika 1-5 zvjezdica  
-* Korisnici mijenjaju digitalne ulaznice
-* "Dodavanje novaca na račun"  
-------------------------------------------------------------------
VLASNIK ULAZNICE

-Stvara oglas za prodaju s detaljima vrsta, naziv, datum i mjesto (obavezno) te opcionalno broj sjedala i vrsta ulaznice  
-Oglas za razmjenu radi s istim detaljima kao i za prodaju uz dodatnu opciju željene karte
-Ažuriranje i uklanjanje vlastitih postavljanih oglasa  
-------------------------------------------------------------------
TRAŽITELJ ULAZNICE

-Definiranje događaja/žanrova koji mu se sviđaju.  
-Pregled aktivnih događaja uz opciju filtriranja  
-Mogućnost "lajkanja" oglasa i izbacivanja nezanimljivih iz pregleda.  
-Obavijest o novim oglasima koji se sviđaju korisniku putem e-maila ili obavijesti u aplikaciji  
-Prikaz mogućih lanaca zamjene 
------------------------------------------------------------------
ADMINISTRATOR

-Generiranje izvješća i aktivnostima korisnika, razmjenama i prijavama lažnog oglašavanja  
-Upravljanje korisničkim računima, rješavanje sporova i primjerena deaktivacija računa  
-------------------------------------------------------------------
ZAMJENA KARATA

-Ukoliko se 2 korisnika slože za zamjenu dobivaju obavijest za konačnu potvrdu(s vrem. ogranicenjem)  
-Obavijest svim korisnicima unutar lanca zamjene  
-------------------------------------------------------------------

## NEFUNKCIONALNI ZAHTJEVI  

-Responsive design  
-Koristenje OAutentifikacije  
-Koristenje servisa za prognozu   
-Koristenje servisa za podatke o glazbenicima  

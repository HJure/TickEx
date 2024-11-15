# Programsko inženjerstvo

# [TickEx stranica](https://aplikacija.onrender.com/)
# Opis projekta
Ovaj projekt je rezultat timskog rada u sklopu projektnog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Cilj projekta je riješiti vječni problem prodaje karata za neki događaj. Svakoj osobi se može dogoditi da se razboli, ima iznenadnu obvezu ili jednostavno ne želi ići na neki događaj, 
ali već ima kartu na koju je potrošio novce. Jedini način za riješiti se te karte je zivkati prijatelje i tražiti ljude koji bi ju kupili što je jednostavno previše posla.
Web aplikacija TickEx omogućuje svojim korisnicima jednostavnu prodaju i zamjenu svojih karata ili kupnje novih.  

Osim rješavanja problema karata, pomoću ovog projekta želimo steći iskustvo u razvoju web aplikacije praćenjem autentičnog procesa razvoja programske potpore. 
Želimo steći iskustvo u raznim tehnologijama poput razvoja backenda u Java frameworku SpringBoot, razvoj frontenda u React library-ju, korištenje i komunikacija s relacijskom bazom podataka 
PostgreSQL, korištenje mikrousluga i programima za izradu dokumentacije poput AstahUML-a. Osim tehnologija, bitno nam je dobiti iskustvo rada u timu i međusobnoj komunikaciji s budućim
kolegama
  
# Funkcijski zahtjevi  
- Aplikacija prikazuje dostupne događaje i ulaznice  
- Registracija korisnika  
- Login pomoću OAuth
- Dohvaćanje podataka o koncertu pomoću javnih usluga (izvođač, žanr, slika izvođača)  
- Dohvaćanje podataka o prognozi za oglas čiji se događaj odvija unutar 15 dana od danas  
- Praćenje povijesti razmjene i omogućivanje pregleda prošlih transakcija  
- Aukcije karata (nema potvrde) uz početnu cijenu i duljinu trajanja, nije moguće brisati aukciju (Upozorenje)  
- Recenzije korisnika 1-5 zvjezdica


### VLASNIK ULAZNICE
- Stvara oglas za prodaju s detaljima vrsta, naziv, datum i mjesto (obavezno) te opcionalno broj sjedala i vrsta ulaznice
- Oglas za razmjenu radi s istim detaljima kao i za prodaju uz dodatnu opciju željene karte
- Ažuriranje i uklanjanje vlastitih postavljanih oglasa (košarica)

### TRAŽITELJ ULAZNICE  
- Definiranje događaja/žanrova koji mu se sviđaju.
- Pregled aktivnih događaja uz opciju filtriranja
- Mogućnost "lajkanja" oglasa i izbacivanja nezanimljivih iz pregleda.
- Obavijest o novim oglasima koji se sviđaju korisniku putem e-maila ili obavijesti u aplikaciji
- Prikaz mogućih lanaca zamjene

###  ADMINISTRATOR
- Generiranje izvješća o aktivnostima korisnika, razmjenama i prijavama lažnog oglašavanja
- Upravljanje korisničkim računima, rješavanje sporova i primjerena deaktivacija računa

### ZAMJENA KARATA
- Ukoliko se 2 korisnika slože za zamjenu, dobivaju obavijest za konačnu potvrdu (s vremenskim ograničenjem)
- Obavijest svim korisnicima unutar lanca zamjene



# Tehnologije  
Frontend: [React](https://react.dev/)  
Backend: [Java SpringBoot](https://spring.io/projects/spring-boot)  
Baza podataka: [PostgreSQL](https://www.postgresql.org/)  


# Instalacija  
### Pokretanje frontend sučelja

Potrebno je instalirati Node.js i npm. Potrebno se pozicionirati u frontend direktorij i u terminalu pokrenuti sljedeću naredbu:

$ npm i -D

Tako će se instalirati sve ovisnosti (dependencies) potrebne za pokretanje aplikacije.  

Pokretanje se vrši sa:  

$ npm start run


### Pokretanje backend servisa

Potrebno je instalirati JDK 17 i Apache Maven. Potrebno se pozicionirati u /progi-project i u terminalu pokrenuti sljedeću naredbu:

$ mvn clean spring-boot:run  

### Konfiguracija backenda

> Baza koja se koristi, potrebno je hostati bazu

spring.datasource.url=jdbc:postgresql://localhost:5432/tickex  

> Username za bazu

spring.datasource.username=${DB_USERNAME:postgres}  

> Password za bazu

spring.datasource.password=${DB_PASS:postgres}   

> Port za server

server.port=${PORT:8080}   





# Članovi tima 
> Popis članova tima/linkovi/ glavni doprinos
- [Karlo Bašić](https://github.com/karlobasic)
  - Vođa tima, baza podataka
- [Ivan Đurić](https://github.com/djuIvan)
  - Backend
- [Laura Barišić](https://github.com/laurabarisic)
  - Backend i frontend
- [David Kovčo](https://github.com/strujkoFER)
  - Backend
- [Irma Zečević](https://github.com/irmazecevic)
  - Frontend 
- [Laura Lučin](https://github.com/strahimir)
  - Frontend
- [Jure Herceg](https://github.com/HJure)
  - Baza podataka, dokumentacija

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajednice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvaćenih kodeks ponašanja za rad u zajednici otvorenog koda.

# 📝 Licenca
Važeća (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebljeni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija

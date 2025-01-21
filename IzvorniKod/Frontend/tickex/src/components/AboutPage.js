import React from 'react';
import '../style/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Više informacija o aplikaciji „TickEx“</h1>
      <p className="about-description">
        „TickEx“ je platforma koja omogućava jednostavno, brzo i sigurno razmjenjivanje ulaznica za koncerte, predstave, sportske događaje i druge manifestacije. Evo nekoliko ključnih informacija koje će vam pomoći da iskoristite sve prednosti naše aplikacije:
      </p>

      <div className="about-section">
        <h2 className="about-subtitle">1. Jednostavno postavljanje oglasa za ulaznice</h2>
        <p>
          Kao vlasnik ulaznice, možete kreirati oglas za prodaju ili zamjenu ulaznice s detaljima o događaju, datumu, mjestu i vrsti ulaznice (npr. VIP, obična).
          Oglas možete jednostavno ažurirati ili ukloniti u bilo kojem trenutku.
          Sve objavljene ulaznice imaju datum isteka koji se temelji na datumu događaja, čime se automatski uklanjaju nakon isteka.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">2. Traženje i filtriranje ulaznica</h2>
        <p>
          Kao tražitelj ulaznice, možete filtrirati oglase prema vrstama događaja ili žanrovima koji vas zanimaju.
          Pratite i označite oglase koji vas zanimaju kako biste ih kasnije lakše pronašli.
          Ako se pojavi lanac razmjena ulaznica, možete se uključiti i sudjelovati u procesu.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">3. Razmjena ulaznica</h2>
        <p>
          Naša aplikacija omogućuje jedan-na-jedan razmjenu ili čak lanac razmjena gdje više korisnika može zamijeniti svoje ulaznice.
          Kada izražavate interes za ulaznicom, druga strana može potvrditi zamjenu unutar vremenskog okvira. Ovaj proces omogućuje transparentnu i sigurnu razmjenu.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">4. Obavijesti i ažuriranja</h2>
        <p>
          Primit ćete obavijesti o novim oglasima koji odgovaraju vašim preferencijama putem kategorije "ZA VAS" na stranici vašeg profila.
          Također ćete biti obaviješteni kada je postignuta potvrda zamjene od strane drugih korisnika.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">5. Vremenska prognoza za događaje</h2>
        <p>
          Za svaki događaj unutar 15 dana od trenutnog datuma, aplikacija automatski prikazuje vremensku prognozu za lokaciju događaja, tako da možete planirati svoj dolazak.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">6. Sigurnost i povjerenje</h2>
        <p>
          Naša platforma osigurava sigurno okruženje za objavljivanje i razmjenu ulaznica, minimizirajući rizik od prijevara i nesporazuma.
          Administrator sustava može rješavati sporove, pratiti aktivnosti korisnika i osigurati sigurnost cijelog procesa razmjene.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">7. Pristup putem različitih uređaja</h2>
        <p>
          Aplikacija je responzivna i može se koristiti na svim uređajima (računala, mobilni telefoni i tableti). Osim toga, aplikacija je jednostavna za korištenje i optimizirana za najbolje korisničko iskustvo na svim veličinama ekrana.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">8. Kako se registrirati?</h2>
        <p>
          Da biste koristili sve funkcionalnosti, potrebno je registrirati se putem e-maila i lozinke. Aktivacijom računa putem linka u e-mailu, imat ćete pristup svim mogućnostima aplikacije.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">9. Zašto se prijaviti?</h2>
        <p>
          Prijavom na platformu možete postaviti oglase za razmjenu ulaznica, komunicirati s drugim korisnicima i osigurati da vaše transakcije budu sigurne i jednostavne.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

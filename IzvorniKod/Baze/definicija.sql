CREATE DATABASE TickEx;

CREATE TABLE KORISNIK
(
  idKor SERIAL,
  email VARCHAR(320) NOT NULL,
  imeKor VARCHAR(50) NOT NULL,
  prezKor VARCHAR(50) NOT NULL,
  datumUla DATE DEFAULT CURRENT_DATE NOT NULL,
  statusKor BOOLEAN DEFAULT TRUE NOT NULL, /*true znaci da je korisnik aktivan, false da je izbačen */
  ocjena DECIMAL(3,2) DEFAULT 0.00 NOT NULL CHECK (ocjena >= 0.00 AND ocjena <= 5.00),
  PRIMARY KEY (idKor),
  UNIQUE (email)
);

CREATE TABLE VRSTA_DOGADAJA
(
  idDog SERIAL,
  nazVrDog VARCHAR(50) NOT NULL,
  PRIMARY KEY (idDog)
);

CREATE TABLE zainteresiran
(
  idKor INT NOT NULL,
  idDog INT NOT NULL,
  PRIMARY KEY (idKor, idDog),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idDog) REFERENCES VRSTA_DOGADAJA(idDog)
);

CREATE TABLE prijavljuje
(
  prijavljujeIdKor INT NOT NULL,
  prijavljenIdKor INT NOT NULL,
  razlog VARCHAR(250) NOT NULL,
  PRIMARY KEY (prijavljujeIdKor, prijavljenIdKor),
  FOREIGN KEY (prijavljujeIdKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (prijavljenIdKor) REFERENCES KORISNIK(idKor)
);

CREATE TABLE ocjenjuje
(
  ocjenjujeIdKor INT NOT NULL,
  ocijenjenIdKor INT NOT NULL,
  ocjena INT NOT NULL,
  PRIMARY KEY (ocjenjujeIdKor, ocijenjenIdKor),
  FOREIGN KEY (ocjenjujeIdKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (ocijenjenIdKor) REFERENCES KORISNIK(idKor)
);

CREATE TABLE deaktivira
(
  deaktiviraIdKor INT NOT NULL,
  deaktiviranIdKor INT NOT NULL,
  PRIMARY KEY (deaktiviraIdKor, deaktiviranIdKor),
  FOREIGN KEY (deaktiviraIdKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (deaktiviranIdKor) REFERENCES KORISNIK(idKor)
);

CREATE TABLE OGLAS
(
  idOgl SERIAL,
  nazDog VARCHAR(50) NOT NULL,
  nazIzv VARCHAR(50),
  mjesto VARCHAR(50) NOT NULL,
  datum DATE NOT NULL,
  brSje INT,
  vrsUla VARCHAR(50),
  status VARCHAR(20) DEFAULT 'nepoznato' NOT NULL,
  vrijemeObrisano TIMESTAMP DEFAULT NULL,
  idDog INT NOT NULL,
  idKor INT NOT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (idDog) REFERENCES VRSTA_DOGADAJA(idDog),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor)
);


CREATE TABLE PRODAJA
(
  cijena INT NOT NULL,
  idOgl INT NOT NULL,
  idKupac INT DEFAULT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl),
  FOREIGN KEY (idKupac) REFERENCES KORISNIK(idKor)
);

CREATE TABLE RAZMJENA
(
  zeljeniNazOgl VARCHAR(50) NOT NULL,
  zeljenoMjesto VARCHAR(50) NOT NULL,
  zeljeniDatum DATE NOT NULL,
  zeljeniBrSje INT,
  zeljenaVrsUla VARCHAR(50),
  idOgl INT NOT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl)
);

CREATE TABLE AUKCIJA
(
  pocCijena INT NOT NULL,
  trajanje DATE NOT NULL,
  idOgl INT NOT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl)
);

CREATE TABLE svida
(
  idKor INT NOT NULL,
  idOgl INT NOT NULL,
  PRIMARY KEY (idKor, idOgl),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl)
);

CREATE TABLE sudjeluje
(
  idSudj SERIAL NOT NULL,
  idKor INT[] NOT NULL,
  idOgl INT[] NOT NULL,
  odgovor BOOLEAN[],
  PRIMARY KEY (idSudj)
);

CREATE TABLE nudi
(
  ponuda INT NOT NULL,
  idKor INT NOT NULL,
  idOgl INT NOT NULL,
  PRIMARY KEY (idKor, idOgl),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idOgl) REFERENCES AUKCIJA(idOgl)
);

CREATE TABLE sakri
(
  idKor INT NOT NULL,
  idOgl INT NOT NULL,
  PRIMARY KEY (idKor, idOgl),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl)
);

CREATE TABLE prihvaca
(
  idKor INT NOT NULL,
  idOgl INT NOT NULL,
  PRIMARY KEY (idKor, idOgl),
  FOREIGN KEY (idKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idOgl) REFERENCES OGLAS(idOgl)
);

INSERT INTO KORISNIK(email,imeKor,prezKor) VALUES 
('anaanic143@gmail.com','Ana','Anic') , ('karlobasic184@gmail.com','Karlo','Basic');

INSERT INTO VRSTA_DOGADAJA (nazVrDog) VALUES ('Glazba'),('Nogomet'),('Kazaliste'),('Kino'),('Tenis'),('Festival'),('Tematski park');

INSERT INTO zainteresiran (idKor,idDog) VALUES (2,1),(2,2),(2,5),(1,1),(1,3),(1,4);

CREATE FUNCTION update_average_ocjena()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE KORISNIK
    SET ocjena = (SELECT AVG(ocjena) FROM ocjenjuje WHERE ocijenjenIdKor = NEW.ocijenjenIdKor)
    WHERE idKor = NEW.ocijenjenIdKor;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_average_ocjena
AFTER INSERT ON ocjenjuje
FOR EACH ROW
EXECUTE FUNCTION update_average_ocjena();

INSERT INTO ocjenjuje (ocjenjujeIdKor, ocijenjenIdKor, ocjena)
VALUES (1, 2, 4);

INSERT INTO ocjenjuje (ocjenjujeIdKor, ocijenjenIdKor, ocjena)
VALUES (2, 1, 3);

CREATE FUNCTION update_oglas_prodano()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.idKupac IS NOT NULL THEN
    UPDATE OGLAS
    SET status = 'prodano'
    WHERE idOgl = NEW.idOgl;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_oglas_prodano
AFTER INSERT OR UPDATE ON PRODAJA
FOR EACH ROW
EXECUTE FUNCTION update_oglas_prodano();

CREATE FUNCTION update_oglas_status()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT status FROM OGLAS WHERE idOgl = NEW.idOgl) = 'prodano' THEN
    RETURN NEW; 
  END IF;
  
  IF EXISTS (SELECT 1 FROM PRODAJA WHERE idOgl = NEW.idOgl) THEN
    UPDATE OGLAS
    SET status = 'u prodaji'
    WHERE idOgl = NEW.idOgl;

  ELSIF EXISTS (SELECT 1 FROM AUKCIJA WHERE idOgl = NEW.idOgl) THEN
    UPDATE OGLAS
    SET status = 'aukcija'
    WHERE idOgl = NEW.idOgl;

  ELSIF EXISTS (SELECT 1 FROM RAZMJENA WHERE idOgl = NEW.idOgl) THEN
    UPDATE OGLAS
    SET status = 'razmjena'
    WHERE idOgl = NEW.idOgl;

  ELSE
    UPDATE OGLAS
    SET status = 'nepoznato'
    WHERE idOgl = NEW.idOgl;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_status_on_prodaja
AFTER INSERT OR UPDATE OR DELETE ON PRODAJA
FOR EACH ROW
EXECUTE FUNCTION update_oglas_status();

CREATE TRIGGER trg_update_status_on_aukcija
AFTER INSERT OR UPDATE OR DELETE ON AUKCIJA
FOR EACH ROW
EXECUTE FUNCTION update_oglas_status();

CREATE TRIGGER trg_update_status_on_razmjena
AFTER INSERT OR UPDATE OR DELETE ON RAZMJENA
FOR EACH ROW
EXECUTE FUNCTION update_oglas_status();

INSERT INTO OGLAS (nazDog, mjesto, datum, brSje, vrsUla, idDog, idKor)
VALUES 
('Orasar', 'Zagreb', '2024-12-05', 7, 'Normal', 3, 1),
('Avengers', 'Zagreb', '2024-12-23', 35, 'Normal', 4, 1),
('Real Madrid vs Barcelona', 'Madrid', '2024-11-25', 654, NULL, 2, 2),
('Federer vs Nadal', 'London', '2024-11-12', NULL, NULL, 5, 2),
('Taylor Swift koncert', 'Ljubljana', '2024-12-21', 15, 'Normal', 1, 1);

CREATE FUNCTION check_buyer_seller_different()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT idKor FROM OGLAS WHERE idOgl = NEW.idOgl) = NEW.idKupac THEN
    RAISE EXCEPTION 'Kupac ne smije biti prodavac';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_buyer_seller
BEFORE INSERT OR UPDATE ON PRODAJA
FOR EACH ROW
EXECUTE FUNCTION check_buyer_seller_different();

INSERT INTO PRODAJA (cijena, idOgl, idKupac)
VALUES 
(30, 1, NULL),          
(24, 2, 2),          
(73, 3, 1),             
(146, 4, NULL),             
(150, 5, NULL);

CREATE FUNCTION add_to_zainteresiran()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM zainteresiran
    WHERE idKor = NEW.idKor
      AND idDog = (SELECT idDog FROM OGLAS WHERE idOgl = NEW.idOgl)
  ) THEN
    INSERT INTO zainteresiran (idKor, idDog)
    VALUES (NEW.idKor, (SELECT idDog FROM OGLAS WHERE idOgl = NEW.idOgl));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_add_to_zainteresiran
AFTER INSERT ON svida
FOR EACH ROW
EXECUTE FUNCTION add_to_zainteresiran();

CREATE FUNCTION prevent_self_like()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.idKor = (SELECT idKor FROM OGLAS WHERE idOgl = NEW.idOgl) THEN
    RAISE EXCEPTION 'Nemoguce lajkati svoj oglas';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_self_like_trigger
BEFORE INSERT ON svida
FOR EACH ROW
EXECUTE FUNCTION prevent_self_like();

CREATE FUNCTION check_oglas_status_for_svida()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM OGLAS
    WHERE idOgl = NEW.idOgl
      AND status IN ('u prodaji', 'razmjena', 'aukcija')
  ) THEN
    RAISE EXCEPTION 'Oglas vise nije aktivan';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_status_before_insert
BEFORE INSERT ON svida
FOR EACH ROW
EXECUTE FUNCTION check_oglas_status_for_svida();

CREATE FUNCTION remove_invalid_svida_entries()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status NOT IN ('u prodaji', 'razmjena', 'aukcija') THEN
    DELETE FROM svida
    WHERE idOgl = NEW.idOgl;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/*
CREATE TRIGGER trg_remove_invalid_svida
AFTER UPDATE OF status ON OGLAS
FOR EACH ROW
EXECUTE FUNCTION remove_invalid_svida_entries();
*/

INSERT INTO svida(idKor,idOgl) VALUES (1,4);

INSERT INTO OGLAS (nazDog, mjesto, datum, idKor, idDog) VALUES ('Arsenal', 'London', '2025-01-05', 1, 2);
INSERT INTO OGLAS (nazDog, mjesto, datum, idKor, idDog) VALUES ('Barcelona', 'Barcelona', '2025-01-05', 2, 2);
INSERT INTO OGLAS (nazDog, mjesto, datum, idKor, idDog) VALUES ('Real', 'Madrid', '2025-01-05', 3, 1);
INSERT INTO OGLAS (nazDog, mjesto, datum, idKor, idDog) VALUES ('Man Utd', 'Manchester', '2025-01-05', 4, 2);

INSERT INTO RAZMJENA (zeljeniNazOgl, zeljenoMjesto, zeljeniDatum, idOgl) VALUES ('Barcelona', 'Barcelona', '2025-01-05', 6);
INSERT INTO RAZMJENA (zeljeniNazOgl, zeljenoMjesto, zeljeniDatum, idOgl) VALUES ('Real', 'Madrid', '2025-01-05', 7);
INSERT INTO RAZMJENA (zeljeniNazOgl, zeljenoMjesto, zeljeniDatum, idOgl) VALUES ('Man Utd', 'Manchester', '2025-01-05', 8);
INSERT INTO RAZMJENA (zeljeniNazOgl, zeljenoMjesto, zeljeniDatum, idOgl) VALUES ('Arsenal', 'London', '2025-01-05', 9);






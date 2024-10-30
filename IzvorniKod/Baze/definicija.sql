CREATE DATABASE TickEx;

CREATE TABLE KORISNIK
(
  idKor SERIAL,
  email VARCHAR(320) NOT NULL,
  PRIMARY KEY (idKor),
  UNIQUE (email)
);

CREATE TABLE VRSTA_DOGADAJA
(
  idDog SERIAL,
  nazVrDog VARCHAR(50) NOT NULL,
  PRIMARY KEY (idDog)
);

CREATE TABLE OGLAS
(
  idOgl SERIAL,
  nazDog VARCHAR(50) NOT NULL,
  mjesto VARCHAR(50) NOT NULL,
  datum DATE NOT NULL,
  brSje INT,
  vrsUla VARCHAR(50),
  status BOOLEAN DEFAULT FALSE NOT NULL, /*false znaci da jos nije prodan */
  cijena INT NOT NULL,
  idProdavac INT NOT NULL,
  idDog INT NOT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (idProdavac) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (idDog) REFERENCES VRSTA_DOGADAJA(idDog)
);

INSERT INTO KORISNIK(email) VALUES ('anaanic143@gmail.com') , ('karlobasic184@gmail.com');

INSERT INTO VRSTA_DOGADAJA (nazVrDog) VALUES ('Glazba'),('Nogomet'),('Kazaliste'),('Kino'),('Tenis');

INSERT INTO OGLAS(nazDog,mjesto,datum,brSje,vrsUla,cijena,idProdavac,idDog) 
VALUES ('Taylor Swift koncert', 'Ljubljana','12.12.2024',15,'Normal',150,1,1);

INSERT INTO OGLAS(nazDog,mjesto,datum,brSje,vrsUla,cijena,idProdavac,idDog) 
VALUES ('Orasar', 'Zagreb','5.12.2024',7,'Normal',30,1,3);

INSERT INTO OGLAS(nazDog,mjesto,datum,brSje,vrsUla,cijena,idProdavac,idDog) 
VALUES ('Avengers', 'Zagreb','23.12.2024',35,'Normal',24,1,4);

INSERT INTO OGLAS(nazDog,mjesto,datum,brSje,cijena,idProdavac,idDog) 
VALUES ('Real Madrid vs Barcelona', 'Madrid','25.11.2024',654,73,2,2);

INSERT INTO OGLAS(nazDog,mjesto,datum,cijena,idProdavac,idDog) 
VALUES ('Federer vs Nadal', 'London','12.11.2024',146,2,5);






CREATE DATABASE TickEx;

CREATE TABLE KORISNIK
(
  idKor SERIAL,
  email VARCHAR(320) NOT NULL,
  PRIMARY KEY (idKor),
  UNIQUE (email)
);

CREATE TABLE OGLAS
(
  idOgl SERIAL,
  vrsDog VARCHAR(50) NOT NULL,
  nazDog VARCHAR(50) NOT NULL,
  mjesto VARCHAR(50) NOT NULL,
  datum DATE NOT NULL,
  brSje INT,
  vrsUla VARCHAR(50),
  status BOOLEAN DEFAULT FALSE NOT NULL, /*false znaci da jos nije prodan */
  cijena INT NOT NULL,
  kupujeidKor INT,
  prodajeidKor INT NOT NULL,
  PRIMARY KEY (idOgl),
  FOREIGN KEY (kupujeidKor) REFERENCES KORISNIK(idKor),
  FOREIGN KEY (prodajeidKor) REFERENCES KORISNIK(idKor),
  CONSTRAINT istiKupacProdavac CHECK (kupujeidKor != prodajeidKor)
);




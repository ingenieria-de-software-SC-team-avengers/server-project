-- Database: proyectosw1

-- DROP DATABASE proyectosw1;

CREATE DATABASE proyectosw1
    WITH 
    OWNER = cristhian
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
CREATE TABLE rols(
	id SERIAL PRIMARY KEY,
	rol VARCHAR(20) NOT NULL
);

INSERT INTO rols (rol) VALUES ('Admin'),('Cliente');
	
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(40) NOT NULL UNIQUE,
	namecomplete VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	ci INT NOT NULL,
	idrol INT NOT NULL,
	FOREIGN KEY (idrol) REFERENCES rols(id) 
);

INSERT INTO users (username, namecomplete, email, password, ci, idrol) VALUES ('Cristhian', 'Cristhian Vargas Quiroz', 'cristhian@gmail.com', 'estudiar', 9636927, 1);

create table dataSensors(
	id serial primary key,
	valor int not null,
	fecha timestamp not null,
	idUser int not null,
	foreign key (idUser) references users(id)
);

insert into dataSensors (valor, fecha,idUser) values (38,now(),2)
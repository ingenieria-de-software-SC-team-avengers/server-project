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

create table clinica(
	id serial primary key,
	nombre varchar(100) not null,
	direccion varchar(100) not null
);

insert into clinica(nombre,direccion) 
values('San martin de porres','5to anillo Av moscu'),
('Prosalud','calle heroes del chaco Av Mariscal #23'),
('El bajio', 'Av villa ortuño 6to anillo'),
('Perpetuo socorro','Av roca y coronado 3er anillo interno')

CREATE TABLE doctors(
	id serial primary key,
	nombre varchar(50) not null,
	matricula varchar(20) not null,
	especialidad varchar(50) not null,
	idClinic int not null,
	foreign key (idClinic) REFERENCES clinica(id)
);

insert into doctors(nombre,matricula,especialidad,idClinic,telefono)
values('Ariel Rios Vargas','L-188','Pediatria',1,78588493),
('Mirtha Vizcarra Torres','L-545','Pediatria',1,78412562),
('Bruno Alvarado Fernandes','L-632','Medicina general',1,75124536),
('Alberto Roque Quispe','L-245','Pediatria',2,65894512),
('Karen Cosio Avalos','L-3556','Madecina general',2,69325147),
('Wendy Fuentes Cosio','L-745','Pediatria',2,78412593),
('Alison Vargas Trujillo','L-821','Pediatria',3,78124569),
('Javier Villca Torrez','L-1247','Medicina general',3,67895412),
('Veronica Alturizaga Camacho','L-962','Pediatria',4,71002548),
('Cristhian Luis Fernandes Caceres','L-7846','Pediatria',4,69741258)

create table consultaMedica(
	id serial primary key,
	fecha timestamp not null,
	nroreserva serial not null,
	idUser int not null,
	idDoctor int not null,
	foreign key (idUser) REFERENCES users(id),
	foreign key (idDoctor) references doctors(id)
);

insert into consultaMedica(fecha,nroreserva,idUser,idDoctor,client,email,telefono)
values('now()',1547,3,15,'Cristhian Vargas Quiroz','cristhianingsis@gmail.com',78588196)
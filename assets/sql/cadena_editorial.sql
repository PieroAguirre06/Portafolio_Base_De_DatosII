/* ======================================================
   BASE DE DATOS: CADENA EDITORIAL (AMPLIADA)
   GESTOR: MICROSOFT SQL SERVER
   ====================================================== */

USE master;
GO

IF DB_ID('CadenaEditorial') IS NOT NULL
    DROP DATABASE CadenaEditorial;
GO

CREATE DATABASE CadenaEditorial;
GO

USE CadenaEditorial;
GO

/* ---------- 1. TABLA SUCURSAL ---------- */
CREATE TABLE Sucursal (
    IdSucursal     INT IDENTITY(1,1) NOT NULL,
    CodigoSucursal VARCHAR(10)  NOT NULL,
    Domicilio      VARCHAR(150) NOT NULL,
    Telefono       VARCHAR(20)  NOT NULL,
    CONSTRAINT PK_Sucursal PRIMARY KEY (IdSucursal),
    CONSTRAINT UQ_Sucursal_Codigo UNIQUE (CodigoSucursal)
);
GO

/* ---------- 2. TABLA EMPLEADO ---------- */
CREATE TABLE Empleado (
    IdEmpleado INT IDENTITY(1,1) NOT NULL,
    Nombre     VARCHAR(50)  NOT NULL,
    Apellidos  VARCHAR(100) NOT NULL,
    NIF        VARCHAR(20)  NOT NULL,
    Telefono   VARCHAR(20)  NOT NULL,
    IdSucursal INT          NOT NULL,
    CONSTRAINT PK_Empleado PRIMARY KEY (IdEmpleado),
    CONSTRAINT UQ_Empleado_NIF UNIQUE (NIF),
    CONSTRAINT FK_Empleado_Sucursal FOREIGN KEY (IdSucursal)
        REFERENCES Sucursal(IdSucursal)
);
GO

/* ---------- 3. TABLA REVISTA ---------- */
CREATE TABLE Revista (
    IdRevista      INT IDENTITY(1,1) NOT NULL,
    Titulo         VARCHAR(150) NOT NULL,
    NumeroRegistro VARCHAR(30)  NOT NULL,
    Periodicidad   VARCHAR(30)  NOT NULL,
    Tipo           VARCHAR(50)  NOT NULL,
    CONSTRAINT PK_Revista PRIMARY KEY (IdRevista),
    CONSTRAINT UQ_Revista_Registro UNIQUE (NumeroRegistro)
);
GO

/* ---------- 4. TABLA SUCURSAL_REVISTA (N:M) ---------- */
CREATE TABLE SucursalRevista (
    IdSucursal INT NOT NULL,
    IdRevista  INT NOT NULL,
    CONSTRAINT PK_SucursalRevista PRIMARY KEY (IdSucursal, IdRevista),
    CONSTRAINT FK_SR_Sucursal FOREIGN KEY (IdSucursal)
        REFERENCES Sucursal(IdSucursal),
    CONSTRAINT FK_SR_Revista FOREIGN KEY (IdRevista)
        REFERENCES Revista(IdRevista)
);
GO

/* ---------- 5. TABLA PERIODISTA ---------- */
CREATE TABLE Periodista (
    IdPeriodista INT IDENTITY(1,1) NOT NULL,
    Nombre       VARCHAR(50)  NOT NULL,
    Apellidos    VARCHAR(100) NOT NULL,
    NIF          VARCHAR(20)  NOT NULL,
    Telefono     VARCHAR(20)  NOT NULL,
    Especialidad VARCHAR(100) NOT NULL,
    CONSTRAINT PK_Periodista PRIMARY KEY (IdPeriodista),
    CONSTRAINT UQ_Periodista_NIF UNIQUE (NIF)
);
GO

/* ---------- 6. TABLA ARTICULO ---------- */
CREATE TABLE Articulo (
    IdArticulo       INT IDENTITY(1,1) NOT NULL,
    Titulo           VARCHAR(200) NOT NULL,
    FechaPublicacion DATE         NOT NULL,
    IdPeriodista     INT          NOT NULL,
    IdRevista        INT          NOT NULL,
    CONSTRAINT PK_Articulo PRIMARY KEY (IdArticulo),
    CONSTRAINT FK_Articulo_Periodista FOREIGN KEY (IdPeriodista)
        REFERENCES Periodista(IdPeriodista),
    CONSTRAINT FK_Articulo_Revista FOREIGN KEY (IdRevista)
        REFERENCES Revista(IdRevista)
);
GO

/* ---------- 7. TABLA SECCION FIJA ---------- */
CREATE TABLE SeccionFija (
    IdSeccion INT IDENTITY(1,1) NOT NULL,
    Titulo    VARCHAR(100) NOT NULL,
    Extension INT          NOT NULL,
    IdRevista INT          NOT NULL,
    CONSTRAINT PK_SeccionFija PRIMARY KEY (IdSeccion),
    CONSTRAINT FK_SeccionFija_Revista FOREIGN KEY (IdRevista)
        REFERENCES Revista(IdRevista)
);
GO

/* ---------- 8. TABLA EJEMPLAR ---------- */
CREATE TABLE Ejemplar (
    IdEjemplar         INT IDENTITY(1,1) NOT NULL,
    Fecha              DATE NOT NULL,
    NumeroPaginas      INT  NOT NULL,
    EjemplaresVendidos INT  NOT NULL,
    IdRevista          INT  NOT NULL,
    CONSTRAINT PK_Ejemplar PRIMARY KEY (IdEjemplar),
    CONSTRAINT FK_Ejemplar_Revista FOREIGN KEY (IdRevista)
        REFERENCES Revista(IdRevista)
);
GO

INSERT INTO Sucursal (CodigoSucursal, Domicilio, Telefono) VALUES
('SUC001','Av. Arequipa 1010, Lima','01-4101001'),
('SUC002','Av. Brasil 1250, Lima','01-4101002'),
('SUC003','Av. Javier Prado 2200, Lima','01-4101003'),
('SUC004','Av. La Marina 1500, Lima','01-4101004'),
('SUC005','Av. Angamos 1800, Lima','01-4101005'),
('SUC006','Av. Colonial 1450, Callao','01-4101006'),
('SUC007','Av. Universitaria 3200, Lima','01-4101007'),
('SUC008','Av. Primavera 450, Lima','01-4101008'),
('SUC009','Av. Benavides 1750, Lima','01-4101009'),
('SUC010','Av. Alfonso Ugarte 950, Lima','01-4101010'),
('SUC011','Av. Grau 850, Lima','01-4101011'),
('SUC012','Av. Tacna 720, Lima','01-4101012'),
('SUC013','Av. Canadá 1250, Lima','01-4101013'),
('SUC014','Av. República de Panamá 3300, Lima','01-4101014'),
('SUC015','Av. Tomás Marsano 1800, Lima','01-4101015'),
('SUC016','Av. Caminos del Inca 650, Lima','01-4101016'),
('SUC017','Av. Petit Thouars 1450, Lima','01-4101017'),
('SUC018','Av. Prolongación Iquitos 900, Lima','01-4101018'),
('SUC019','Av. Nicolás de Piérola 1100, Lima','01-4101019'),
('SUC020','Av. Elmer Faucett 1200, Callao','01-4101020'),
('SUC021','Av. Salaverry 2350, Lima','01-4101021'),
('SUC022','Av. Aviación 2800, Lima','01-4101022'),
('SUC023','Av. Guardia Civil 1250, Lima','01-4101023'),
('SUC024','Av. Pachacútec 1900, Lima','01-4101024'),
('SUC025','Av. Del Ejército 850, Lima','01-4101025');
GO

INSERT INTO Empleado (Nombre, Apellidos, NIF, Telefono, IdSucursal) VALUES
('Carlos','Ramirez Torres','NIF100001','999100001',1),
('Ana','Flores Diaz','NIF100002','999100002',1),
('Luis','Gonzales Ruiz','NIF100003','999100003',2),
('Maria','Torres Leon','NIF100004','999100004',2),
('Jorge','Salazar Paredes','NIF100005','999100005',3),
('Patricia','Vega Campos','NIF100006','999100006',3),
('Ricardo','Mendoza Silva','NIF100007','999100007',4),
('Sofia','Rojas Medina','NIF100008','999100008',5),
('Fernando','Castro Leon','NIF100009','999100009',6),
('Lucia','Navarro Ruiz','NIF100010','999100010',7),
('Diego','Herrera Diaz','NIF100011','999100011',8),
('Carmen','Vargas Cruz','NIF100012','999100012',9),
('Andres','Morales Perez','NIF100013','999100013',10),
('Elena','Salazar Medina','NIF100014','999100014',11),
('Pablo','Paredes Leon','NIF100015','999100015',12),
('Rosa','Sanchez Castro','NIF100016','999100016',13),
('Miguel','Torres Vargas','NIF100017','999100017',14),
('Isabel','Rojas Mendoza','NIF100018','999100018',15),
('Alberto','Vega Campos','NIF100019','999100019',16),
('Teresa','Molina Reyes','NIF100020','999100020',17),
('Hugo','Castillo Luna','NIF100021','999100021',18),
('Karla','Rios Delgado','NIF100022','999100022',18),
('Bruno','Ponce Ayala','NIF100023','999100023',19),
('Silvia','Ramos Quispe','NIF100024','999100024',20),
('Marco','Luna Herrera','NIF100025','999100025',21),
('Nadia','Chavez Ortiz','NIF100026','999100026',22),
('Raul','Cordova Paredes','NIF100027','999100027',22),
('Cecilia','Benites Ruiz','NIF100028','999100028',23),
('Ivan','Salas Mendoza','NIF100029','999100029',24),
('Lorena','Peralta Diaz','NIF100030','999100030',24),
('Fabian','Meza Rojas','NIF100031','999100031',25),
('Daniela','Caceres Leon','NIF100032','999100032',1),
('Renato','Ochoa Silva','NIF100033','999100033',2),
('Brenda','Fuentes Soto','NIF100034','999100034',3),
('Gustavo','Zamora Pino','NIF100035','999100035',4),
('Monica','Espinoza Rios','NIF100036','999100036',5),
('Alonso','Tello Castro','NIF100037','999100037',6),
('Viviana','Rojas Parra','NIF100038','999100038',7),
('Cristian','Bravo Cueva','NIF100039','999100039',8),
('Melissa','Arellano Cruz','NIF100040','999100040',9),
('Diego','Bustamante Leon','NIF100041','999100041',10),
('Rocio','Palomino Vega','NIF100042','999100042',11),
('Sergio','Alvarado Nina','NIF100043','999100043',12),
('Tatiana','Valdivia Rojas','NIF100044','999100044',13),
('Emilio','Yupanqui Torres','NIF100045','999100045',14),
('Pilar','Neyra Campos','NIF100046','999100046',15),
('Renzo','Cabrera Lujan','NIF100047','999100047',16),
('Kiara','Huaman Yactayo','NIF100048','999100048',17),
('Felipe','Vilca Mamani','NIF100049','999100049',19),
('Nataly','Quispe Huaman','NIF100050','999100050',21);
GO

INSERT INTO Revista (Titulo, NumeroRegistro, Periodicidad, Tipo) VALUES
('Tecnologia Hoy','REG-001','Mensual','Tecnologia'),
('Mundo Digital','REG-002','Mensual','Tecnologia'),
('Ciencia Actual','REG-003','Mensual','Ciencia'),
('Economia Global','REG-004','Semanal','Economia'),
('Salud y Vida','REG-005','Mensual','Salud'),
('Cultura Peruana','REG-006','Quincenal','Cultura'),
('Actualidad Nacional','REG-007','Semanal','Politica'),
('Negocios Hoy','REG-008','Mensual','Negocios'),
('Tecnologias Emergentes','REG-009','Mensual','Tecnologia'),
('Educacion Digital','REG-010','Mensual','Educacion'),
('Turismo y Aventura','REG-011','Quincenal','Turismo'),
('Deporte Total','REG-012','Semanal','Deportes'),
('Historia Viva','REG-013','Mensual','Historia'),
('Arte y Diseño','REG-014','Mensual','Arte'),
('Finanzas Personales','REG-015','Mensual','Finanzas'),
('Gastronomia Peruana','REG-016','Quincenal','Gastronomia'),
('Emprendedores','REG-017','Mensual','Negocios'),
('Ciencia Peruana','REG-018','Mensual','Ciencia'),
('Sociedad Actual','REG-019','Semanal','Sociedad'),
('Programacion Web','REG-020','Mensual','Tecnologia'),
('Innovacion Tech','REG-021','Mensual','Tecnologia'),
('Medio Ambiente Hoy','REG-022','Quincenal','Ecologia'),
('Psicologia y Vida','REG-023','Mensual','Salud'),
('Motor y Velocidad','REG-024','Mensual','Automotriz'),
('Viajes y Sabores','REG-025','Quincenal','Turismo');
GO

INSERT INTO SucursalRevista (IdSucursal, IdRevista) VALUES
(1,1),(1,2),(1,5),(1,9),(1,20),
(2,3),(2,4),(2,6),(2,21),
(3,7),(3,8),(3,10),(3,22),
(4,11),(4,12),(4,24),
(5,13),(5,14),(5,23),
(6,15),(6,16),(6,25),
(7,17),(7,18),(7,20),
(8,19),(8,21),(8,1),
(9,2),(9,3),(9,22),
(10,4),(10,5),(10,11),
(11,6),(11,7),(11,13),
(12,8),(12,9),(12,14),
(13,10),(13,12),(13,15),
(14,16),(14,17),(14,18),
(15,19),(15,20),(15,24),
(16,21),(16,22),(16,23),
(17,24),(17,25),(17,1),
(18,2),(18,3),(18,4),
(19,5),(19,6),(19,7);
GO

INSERT INTO Periodista (Nombre, Apellidos, NIF, Telefono, Especialidad) VALUES
('Alberto','Navarro Ruiz','NIF200001','998200001','Tecnologia'),
('Beatriz','Castro Leon','NIF200002','998200002','Economia'),
('Carlos','Mendoza Silva','NIF200003','998200003','Politica'),
('Diana','Flores Torres','NIF200004','998200004','Ciencia'),
('Eduardo','Ramirez Soto','NIF200005','998200005','Deportes'),
('Fabiola','Quispe Ramos','NIF200006','998200006','Cultura'),
('Gustavo','Herrera Diaz','NIF200007','998200007','Salud'),
('Helena','Vargas Cruz','NIF200008','998200008','Educacion'),
('Ivan','Morales Perez','NIF200009','998200009','Tecnologia'),
('Julia','Salazar Medina','NIF200010','998200010','Turismo'),
('Kevin','Paredes Leon','NIF200011','998200011','Negocios'),
('Laura','Sanchez Castro','NIF200012','998200012','Arte'),
('Manuel','Torres Vargas','NIF200013','998200013','Historia'),
('Natalia','Rojas Mendoza','NIF200014','998200014','Gastronomia'),
('Oscar','Vega Campos','NIF200015','998200015','Finanzas'),
('Paola','Molina Reyes','NIF200016','998200016','Sociedad'),
('Rafael','Ortega Ruiz','NIF200017','998200017','Tecnologia'),
('Sandra','Delgado Silva','NIF200018','998200018','Ciencia'),
('Tomas','Medina Flores','NIF200019','998200019','Deportes'),
('Veronica','Cruz Navarro','NIF200020','998200020','Educacion'),
('Wilson','Chacon Bravo','NIF200021','998200021','Ecologia'),
('Ximena','Yauri Quispe','NIF200022','998200022','Psicologia'),
('Yamil','Huertas Ponce','NIF200023','998200023','Automotriz'),
('Zulema','Vilchez Ramos','NIF200024','998200024','Turismo'),
('Andres','Paredes Soto','NIF200025','998200025','Tecnologia'),
('Bruno','Quiroz Salas','NIF200026','998200026','Ciencia'),
('Carla','Mejia Torres','NIF200027','998200027','Economia'),
('Dario','Lozano Perez','NIF200028','998200028','Politica'),
('Erika','Vasquez Rios','NIF200029','998200029','Salud'),
('Franco','Barrios Leon','NIF200030','998200030','Cultura');
GO

INSERT INTO Articulo (Titulo, FechaPublicacion, IdPeriodista, IdRevista) VALUES
('El futuro de la inteligencia artificial','2026-01-10',1,1),
('Transformacion digital empresarial','2026-01-15',2,4),
('Nuevos avances cientificos','2026-02-05',4,3),
('Tecnologia y sociedad moderna','2026-02-12',9,2),
('Innovacion en las empresas','2026-02-20',11,8),
('El desarrollo de la ciencia peruana','2026-03-01',18,18),
('Educacion digital en el siglo XXI','2026-03-08',8,10),
('Turismo sostenible en el Peru','2026-03-15',10,11),
('Nuevas tendencias deportivas','2026-03-20',5,12),
('La cultura peruana contemporanea','2026-03-25',6,6),
('Historia de Lima moderna','2026-04-01',13,13),
('Diseño y creatividad digital','2026-04-05',12,14),
('Consejos para mejorar las finanzas','2026-04-10',15,15),
('Gastronomia peruana internacional','2026-04-15',14,16),
('Retos de la sociedad actual','2026-04-20',16,19),
('Programacion web moderna','2026-05-01',17,20),
('Salud y tecnologia','2026-05-10',7,5),
('Actualidad nacional','2026-05-15',3,7),
('Nuevos modelos de negocios','2026-05-20',2,17),
('Tecnologias emergentes','2026-05-25',20,9),
('Machine learning en Peru','2026-01-20',25,21),
('Cambio climatico en los Andes','2026-01-25',21,22),
('Ansiedad en la era digital','2026-02-01',22,23),
('Autos electricos en el mercado','2026-02-08',23,24),
('Rutas gastronomicas del Peru','2026-02-15',24,25),
('Ciberseguridad empresarial','2026-02-22',1,21),
('Blockchain y finanzas','2026-03-02',27,4),
('El rol del estado en la economia','2026-03-05',28,7),
('Avances en medicina regenerativa','2026-03-12',29,5),
('Teatro peruano actual','2026-03-18',30,6),
('Desarrollo de videojuegos','2026-03-22',9,1),
('Historia del arte peruano','2026-03-28',12,14),
('Emprendimiento juvenil','2026-04-02',11,17),
('Nutricion y deporte','2026-04-08',5,12),
('Reciclaje y economia circular','2026-04-12',21,22),
('Neurociencia aplicada','2026-04-18',26,3),
('Viajes por el sur del Peru','2026-04-22',10,11),
('Tendencias de moda','2026-04-26',6,6),
('Inversiones para principiantes','2026-05-02',15,15),
('Gastronomia molecular','2026-05-06',14,16),
('El futuro del trabajo','2026-05-12',16,19),
('Apis y microservicios','2026-05-18',17,20),
('Ciencia de datos','2026-05-22',26,18),
('Historia del Peru republicano','2026-05-28',13,13),
('Deportes extremos','2026-06-02',19,12),
('Salud mental en jovenes','2026-06-08',29,23),
('Marketing digital','2026-06-12',11,8),
('Periodismo de investigacion','2026-06-18',3,7),
('Computacion cuantica','2026-06-22',25,9),
('Ecoturismo en la amazonia','2026-06-28',24,25),
('Automoviles autonomos','2026-07-02',23,24),
('Astronomia en el Peru','2026-07-08',4,18),
('Innovacion en educacion','2026-07-12',8,10),
('Fintech en Latinoamerica','2026-07-18',27,4),
('Arte digital','2026-07-22',12,14),
('Politicas publicas de salud','2026-07-28',29,5),
('Literatura peruana actual','2026-08-02',30,6),
('Inteligencia artificial etica','2026-08-08',1,21),
('Deporte y sociedad','2026-08-12',19,12),
('Cambio climatico y economia','2026-08-18',21,22);
GO

INSERT INTO SeccionFija (Titulo, Extension, IdRevista) VALUES
('Editorial',2,1),('Noticias',6,1),('Investigacion',8,1),('Innovacion',5,1),
('Editorial',2,2),('Tendencias',7,2),('Reseñas',4,2),
('Editorial',2,3),('Investigacion',8,3),('Noticias',6,3),('Ciencia',7,3),
('Editorial',2,4),('Mercados',5,4),('Analisis',6,4),
('Editorial',2,5),('Salud',6,5),('Bienestar',5,5),
('Editorial',2,6),('Cultura',8,6),
('Editorial',2,7),('Politica',7,7),('Opinion',5,7),
('Editorial',2,8),('Negocios',6,8),
('Editorial',2,9),('Tecnologia',8,9),
('Editorial',2,10),('Educacion',7,10),
('Editorial',2,11),('Turismo',6,11),
('Editorial',2,12),('Deportes',7,12),('Entrevistas',5,12),
('Editorial',2,13),('Historia',8,13),
('Editorial',2,14),('Arte',6,14),
('Editorial',2,15),('Finanzas',7,15),
('Editorial',2,16),('Gastronomia',6,16),
('Editorial',2,17),('Emprendimiento',7,17),
('Editorial',2,18),('Ciencia',8,18),
('Editorial',2,19),('Sociedad',6,19),
('Editorial',2,20),('Programacion',7,20),
('Editorial',2,21),('Innovacion',7,21),('Startups',5,21),
('Editorial',2,22),('Ecologia',8,22),
('Editorial',2,23),('Psicologia',7,23),
('Editorial',2,24),('Motor',6,24),
('Editorial',2,25),('Viajes',7,25);
GO

INSERT INTO Ejemplar (Fecha, NumeroPaginas, EjemplaresVendidos, IdRevista) VALUES
-- Revista 1 (Tecnologia Hoy)
('2026-01-15',50,5000,1),('2026-02-15',52,4500,1),
('2026-03-15',48,6000,1),('2026-04-15',54,5500,1),
-- Revista 2 (Mundo Digital)
('2026-01-20',45,4200,2),('2026-02-20',47,4800,2),
('2026-03-20',49,5100,2),('2026-04-20',50,5300,2),
-- Revista 3 (Ciencia Actual)
('2026-01-25',60,3800,3),('2026-02-25',62,4100,3),
('2026-03-25',58,4500,3),('2026-04-25',64,4700,3),
-- Revista 4 (Economia Global)
('2026-01-05',40,7000,4),('2026-01-12',42,6500,4),
('2026-01-19',44,6800,4),('2026-01-26',46,7200,4),
-- Revista 5 (Salud y Vida)
('2026-02-10',55,5200,5),('2026-03-10',57,4900,5),
('2026-04-10',53,5400,5),('2026-05-10',58,5600,5),
-- Revista 6 (Cultura Peruana)
('2026-01-30',65,3500,6),('2026-02-28',66,3700,6),
('2026-03-30',64,3900,6),('2026-04-30',68,4100,6),
-- Revista 7 (Actualidad Nacional)
('2026-01-08',38,8000,7),('2026-01-15',39,7800,7),
('2026-01-22',40,8200,7),('2026-01-29',41,8500,7),
-- Revista 8 (Negocios Hoy)
('2026-02-05',44,4300,8),('2026-03-05',46,4600,8),
('2026-04-05',45,4900,8),('2026-05-05',48,5100,8),
-- Revista 9 (Tecnologias Emergentes)
('2026-01-18',49,5100,9),('2026-02-18',51,5300,9),
('2026-03-18',50,5500,9),('2026-04-18',53,5700,9),
-- Revista 10 (Educacion Digital)
('2026-01-22',53,4700,10),('2026-02-22',55,4900,10),
('2026-03-22',54,5100,10),('2026-04-22',56,5300,10),
-- Revista 11 (Turismo y Aventura)
('2026-02-15',58,3900,11),('2026-03-15',60,4100,11),
('2026-04-15',59,4300,11),('2026-05-15',61,4500,11),
-- Revista 12 (Deporte Total)
('2026-01-06',36,8500,12),('2026-01-13',37,8200,12),
('2026-01-20',38,8800,12),('2026-01-27',39,9000,12),
-- Revista 13 (Historia Viva)
('2026-02-01',61,3600,13),('2026-03-01',63,3800,13),
('2026-04-01',62,4000,13),('2026-05-01',64,4200,13),
-- Revista 14 (Arte y Diseño)
('2026-02-08',54,4400,14),('2026-03-08',56,4600,14),
('2026-04-08',55,4800,14),('2026-05-08',57,5000,14),
-- Revista 15 (Finanzas Personales)
('2026-02-12',47,4800,15),('2026-03-12',49,5000,15),
('2026-04-12',48,5200,15),('2026-05-12',50,5400,15),
-- Revista 16 (Gastronomia Peruana)
('2026-02-16',59,4100,16),('2026-03-16',61,4300,16),
('2026-04-16',60,4500,16),('2026-05-16',62,4700,16),
-- Revista 17 (Emprendedores)
('2026-02-22',43,5000,17),('2026-03-22',45,5200,17),
('2026-04-22',44,5400,17),('2026-05-22',46,5600,17),
-- Revista 18 (Ciencia Peruana)
('2026-03-02',64,3800,18),('2026-04-02',66,4000,18),
('2026-05-02',65,4200,18),('2026-06-02',67,4400,18),
-- Revista 19 (Sociedad Actual)
('2026-03-06',41,7500,19),('2026-04-06',43,7700,19),
('2026-05-06',42,7900,19),('2026-06-06',44,8100,19),
-- Revista 20 (Programacion Web)
('2026-03-12',46,4900,20),('2026-04-12',48,5100,20),
('2026-05-12',47,5300,20),('2026-06-12',49,5500,20),
-- Revista 21 (Innovacion Tech)
('2026-03-15',52,6200,21),('2026-04-15',54,6400,21),
('2026-05-15',53,6600,21),('2026-06-15',55,6800,21),
-- Revista 22 (Medio Ambiente Hoy)
('2026-03-20',56,3500,22),('2026-04-20',58,3700,22),
('2026-05-20',57,3900,22),('2026-06-20',59,4100,22),
-- Revista 23 (Psicologia y Vida)
('2026-03-25',50,4200,23),('2026-04-25',52,4400,23),
('2026-05-25',51,4600,23),('2026-06-25',53,4800,23),
-- Revista 24 (Motor y Velocidad)
('2026-04-01',60,5800,24),('2026-05-01',62,6000,24),
('2026-06-01',61,6200,24),('2026-07-01',63,6400,24),
-- Revista 25 (Viajes y Sabores)
('2026-04-05',55,4600,25),('2026-05-05',57,4800,25),
('2026-06-05',56,5000,25),('2026-07-05',58,5200,25);
GO

SELECT * FROM Sucursal;

SELECT Titulo, Periodicidad FROM Revista;

SELECT Titulo FROM Revista WHERE Periodicidad = 'Mensual';

SELECT Nombre, Apellidos FROM Empleado WHERE IdSucursal = 1;

SELECT Nombre, Apellidos FROM Periodista WHERE Especialidad = 'Tecnologia';

SELECT Titulo FROM Revista ORDER BY Titulo ASC;

SELECT * FROM Ejemplar WHERE EjemplaresVendidos > 5000;

SELECT Titulo, Extension FROM SeccionFija WHERE Extension > 7;

SELECT s.CodigoSucursal, e.Nombre, e.Apellidos
FROM Empleado e
INNER JOIN Sucursal s ON e.IdSucursal = s.IdSucursal
ORDER BY s.CodigoSucursal;

SELECT s.CodigoSucursal, r.Titulo
FROM SucursalRevista sr
INNER JOIN Sucursal s ON sr.IdSucursal = s.IdSucursal
INNER JOIN Revista r ON sr.IdRevista = r.IdRevista
ORDER BY s.CodigoSucursal;

SELECT a.Titulo AS Articulo, p.Nombre + ' ' + p.Apellidos AS Periodista, r.Titulo AS Revista
FROM Articulo a
INNER JOIN Periodista p ON a.IdPeriodista = p.IdPeriodista
INNER JOIN Revista r ON a.IdRevista = r.IdRevista;

SELECT s.CodigoSucursal, COUNT(e.IdEmpleado) AS TotalEmpleados
FROM Sucursal s
LEFT JOIN Empleado e ON s.IdSucursal = e.IdSucursal
GROUP BY s.CodigoSucursal;

SELECT s.CodigoSucursal, COUNT(sr.IdRevista) AS TotalRevistas
FROM Sucursal s
LEFT JOIN SucursalRevista sr ON s.IdSucursal = sr.IdSucursal
GROUP BY s.CodigoSucursal;

SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS PromedioVentas
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;

SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendidos
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;

SELECT p.Nombre + ' ' + p.Apellidos AS Periodista, COUNT(a.IdArticulo) AS TotalArticulos
FROM Periodista p
LEFT JOIN Articulo a ON p.IdPeriodista = a.IdPeriodista
GROUP BY p.Nombre, p.Apellidos;

SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > 5000;

SELECT r.Titulo AS Revista, sf.Titulo AS Seccion, sf.Extension
FROM SeccionFija sf
INNER JOIN Revista r ON sf.IdRevista = r.IdRevista
ORDER BY r.Titulo;

SELECT r.Titulo, SUM(sf.Extension) AS TotalPaginasSecciones
FROM Revista r
INNER JOIN SeccionFija sf ON r.IdRevista = sf.IdRevista
GROUP BY r.Titulo;

SELECT SUM(EjemplaresVendidos) AS TotalGeneral FROM Ejemplar;

SELECT TOP 1 r.Titulo, SUM(e.EjemplaresVendidos) AS Total
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo
ORDER BY Total DESC;

SELECT TOP 1 r.Titulo, SUM(e.EjemplaresVendidos) AS Total
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.TituloORDER BY Total ASC;

SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > (SELECT AVG(EjemplaresVendidos) FROM Ejemplar);

SELECT p.Nombre, p.Apellidos, COUNT(a.IdArticulo) AS Total
FROM Periodista p
INNER JOIN Articulo a ON p.IdPeriodista = a.IdPeriodista
GROUP BY p.Nombre, p.Apellidos
HAVING COUNT(a.IdArticulo) > 1;

SELECT r.Titulo FROM Revista r
WHERE NOT EXISTS (SELECT 1 FROM Articulo a WHERE a.IdRevista = r.IdRevista);

SELECT s.CodigoSucursal, COUNT(sr.IdRevista) AS Total
FROM Sucursal s
INNER JOIN SucursalRevista sr ON s.IdSucursal = sr.IdSucursal
GROUP BY s.CodigoSucursal
HAVING COUNT(sr.IdRevista) > 1;

SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS Total,
       RANK() OVER (ORDER BY SUM(e.EjemplaresVendidos) DESC) AS Posicion
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;

SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS Total,
       CAST(SUM(e.EjemplaresVendidos) * 100.0 / (SELECT SUM(EjemplaresVendidos) FROM Ejemplar) AS DECIMAL(5,2)) AS Porcentaje
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;

SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS Total,
       CASE 
           WHEN SUM(e.EjemplaresVendidos) >= 25000 THEN 'Alto'
           WHEN SUM(e.EjemplaresVendidos) >= 18000 THEN 'Medio'
           ELSE 'Bajo'
       END AS Clasificacion
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;

SELECT Fecha, EjemplaresVendidos,
       SUM(EjemplaresVendidos) OVER (ORDER BY Fecha) AS Acumulado
FROM Ejemplar
ORDER BY Fecha;

SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > 4500;

SELECT TOP 1 r.Titulo, e.NumeroPaginas
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
ORDER BY e.NumeroPaginas DESC;

SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS Total,
       CASE 
           WHEN SUM(e.EjemplaresVendidos) > (SELECT AVG(EjemplaresVendidos)*4 FROM Ejemplar) THEN 'Por encima'
           WHEN SUM(e.EjemplaresVendidos) = (SELECT AVG(EjemplaresVendidos)*4 FROM Ejemplar) THEN 'Igual'
           ELSE 'Por debajo'
       END AS Comparacion
FROM Revista r
INNER JOIN Ejemplar e ON r.IdRevista = e.IdRevista
GROUP BY r.Titulo;


SELECT Nombre, Apellidos, Especialidad FROM Periodista
WHERE Especialidad IN ('Tecnologia','Ciencia');

SELECT Nombre, Apellidos, Especialidad FROM Periodista
WHERE Especialidad IN ('Tecnologia','Ciencia','Educacion','Economia');


SELECT TOP 1 r.Titulo, COUNT(sf.IdSeccion) AS TotalSecciones
FROM Revista r
INNER JOIN SeccionFija sf ON r.IdRevista = sf.IdRevista
GROUP BY r.Titulo
ORDER BY TotalSecciones DESC;


SELECT MONTH(Fecha) AS Mes, YEAR(Fecha) AS Anio,
       SUM(EjemplaresVendidos) AS TotalVendidos
FROM Ejemplar
GROUP BY YEAR(Fecha), MONTH(Fecha)
ORDER BY Anio, Mes;

SELECT 
    r.Titulo AS Revista,
    (SELECT COUNT(*) FROM Articulo a WHERE a.IdRevista = r.IdRevista) AS TotalArticulos,
    (SELECT COUNT(*) FROM SeccionFija sf WHERE sf.IdRevista = r.IdRevista) AS TotalSecciones,
    ISNULL((SELECT SUM(e.EjemplaresVendidos) FROM Ejemplar e WHERE e.IdRevista = r.IdRevista),0) AS TotalVentas,
    ISNULL((SELECT AVG(e.EjemplaresVendidos) FROM Ejemplar e WHERE e.IdRevista = r.IdRevista),0) AS PromedioVentas
FROM Revista r
ORDER BY r.Titulo;









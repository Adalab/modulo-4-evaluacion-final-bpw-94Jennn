CREATE DATABASE Evaluacion;
USE Evaluacion;

CREATE TABLE Alumnado(
	ID INT auto_increment primary key,
    Nombre VARCHAR (50) not null,
    Edad INT not null,
    Curso VARCHAR (20) not null
    );
    
INSERT INTO Alumnado (Nombre, Edad, Curso) VALUES
('Juan', 3, 'Primero'),
('Valeria', 10, 'Sexto'),
('David', 7, 'Tercero');

create database livraria;
use livraria;

create table Autor(
	idAutor int auto_increment primary key,
    nome varchar(45) not null
);

create table Livro (
idLivro int auto_increment primary key,
FkidAutor int, 
nome varchar(40),
autor varchar(40),
genero varchar(15)Not null,
sinopse varchar(45)
);

alter table Livro 
add foreign key 
Livro (FkidAutor) references Autor (idAutor);

create table Estoque (
idEstoque int primary key auto_increment,
FkidLivro int,
preco_compra decimal(5,1),
 qtd_estoque int
);



alter table Estoque 
add foreign key 
Estoque (FkidLivro) references Livro(idLivro);

create table Venda(
FkidEstoque int,
FkidLivro int,
idVenda int primary key auto_increment,  
preco_venda decimal(5,1),
data_venda timestamp
);

alter table Venda 
add foreign key Venda(FkidEstoque) references Estoque(idEstoque);
alter table Venda 
add foreign key Venda (FkidLivro) references Livro(idLivro);




show tables;

 




 

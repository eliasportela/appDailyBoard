create sequence seq_city
MINVALUE 1
START with 1
INCREMENT by 1
CACHE 10;

create table state(
id_state integer,
name_state varchar(64),
id_country integer,
fg_ativo integer default 1,
primary key (id_state)
)

create table city (
id_city serial,
name_city varchar(64),
img_city varchar(128),
id_state INTEGER,
fg_ativo INTEGER,
primary key (id_city),
foreign key (id_state) references state (id_state)
);

create table place(
id_place serial,
id_city integer,
name_place varchar(64),
ds_place varchar(256),
img_place varchar(128),
fg_ativo integer default 1,
primary key(id_place),
foreign key(id_city) references city (id_city)
)

insert into state values (1,'Minas Gerais',1,1)
insert into city values(nextval('seq_city'), 'Franca',null,1)

insert into city values
(nextval('seq_city'), 'São Paulo','sp.jpg',1,1),
(nextval('seq_city'), 'Florianópolis','floripa.jpg',1,1),
(nextval('seq_city'), 'Curitiba','curi.jpg',1,1),
(nextval('seq_city'), 'Belo Horizonte','bh.jpg',1,1);

select * from city
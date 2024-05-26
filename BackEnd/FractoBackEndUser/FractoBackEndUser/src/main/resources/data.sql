DROP TABLE IF EXISTS APPOINTMENT;
create table appointment(id int primary key,username varchar(50),doctorname varchar(50), date varchar(50),timings varchar(50), status varchar(50));
insert into appointment values(10,'Tejas','Dr. Himanshu Gupta','27-02-2023','10:00','Yes');
insert into appointment values(11,'Varun','Dr. Himanshu Gupta','27-02-2023','12:00','Yes');
insert into appointment values(12,'Varun','Dr. Sumit Makkar','27-02-2023','12:00','Pending');


DROP TABLE IF EXISTS Users;
create table users(username varchar(50) primary key,email varchar(50),password varchar(50));
insert into users values('Varun','varun-si@gmail.com','var123');

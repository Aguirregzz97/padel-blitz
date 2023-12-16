CREATE TABLE `tournaments` (
	`id` serial AUTO_INCREMENT,
	`owner_id` varchar(256),
	`name` varchar(256),
	`country` varchar(256),
	`city` varchar(256),
	`banner` varchar(2084),
	`categories` enum('Primera','Segunda','Tercera','Cuarta','Quinta','Sexta','Septima','Octava'),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now())
);

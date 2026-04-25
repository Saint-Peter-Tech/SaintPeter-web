Create database SaintPeter;
Use SaintPeter;

Create table empresas
(id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj_empresa char(14) NOT NULL UNIQUE,
telefone_empresa char(11) NOT NULL UNIQUE,
razao_social VARCHAR(100) NOT NULL UNIQUE,
email_empresa VARCHAR(45) NOT NULL UNIQUE
)AUTO_INCREMENT = 2;

Create table usuarios
(id_usuario INT PRIMARY KEY AUTO_INCREMENT,
fk_adm int,
fk_empresa int NOT NULL,
nome_usuario VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,

constraint fk_admUser
	foreign key(fk_adm)
		references usuarios(id_usuario),
        
constraint fk_empresaUser
	foreign key(fk_empresa)
		references empresas(id_empresa)
);

Create table hospitais
(id_hospital INT PRIMARY KEY AUTO_INCREMENT,
fk_empresa INT NOT NULL,
nome_hospital VARCHAR(50) NOT NULL,
cnpj_hospital CHAR(14) NOT NULL UNIQUE, 
telefone_hospital CHAR(11) NOT NULL UNIQUE,

constraint fk_hospitalEmpresa
	foreign key(fk_empresa)
		references empresas(id_empresa)
);

Create table unidades
(id_unidade INT PRIMARY KEY AUTO_INCREMENT,
fk_hospital INT NOT NULL,
cep CHAR(8) NOT NULL,
rua VARCHAR(50) NOT NULL,
numero VARCHAR(50) NOT NULL,
cidade VARCHAR(50) NOT NULL,
nome_unidade VARCHAR(100) NOT NULL,
email_responsavel VARCHAR(50),
telefone_responsavel CHAR(11),
rede_total DOUBLE,

constraint fk_hospitalUnidade
	foreign key(fk_hospital)
		references hospitais(id_hospital)
);

Create table componentes
(id_componente INT PRIMARY KEY AUTO_INCREMENT,
nome_componente VARCHAR(50) NOT NULL UNIQUE,
tipo VARCHAR(50) NOT NULL,
unidade_medida VARCHAR(50) NOT NULL
);

Create table monitores
(id_monitor INT PRIMARY KEY AUTO_INCREMENT,
fk_unidade INT NOT NULL,
fk_empresa INT NOT NULL,
dtFabricacao DATE,
dtManutencao DATE,
status_monitor VARCHAR(50),

constraint chkStatusMonitor
	check (status_monitor IN ('Ativo', 'Inativo', 'Manutenção')),

constraint fk_unidadeMonitor
	foreign key(fk_unidade)
		references unidades(id_unidade),
	
constraint fk_empresaMonitor
	foreign key(fk_empresa)
		references empresas(id_empresa)
);

Create table componente_monitor
(fk_componente INT,
fk_monitor INT,
limite DECIMAL(5,2),

constraint limitePorcentagem
	check (limite >= 0 AND limite <= 100),
        
constraint fk_monitorComp
	foreign key(fk_monitor)
		references monitores(id_monitor),

constraint fk_componente
	foreign key(fk_componente)
		references componentes(id_componente),

PRIMARY KEY(fk_componente, fk_monitor)
);

INSERT INTO empresas VALUES
(1, '00000000000001', 
	'00000000001', 
		'Saint Peter Tecnologia Ltda, SP Technology Serviços de Informática',
			'saintpetertechnology@saintpeter.com');
            
INSERT INTO usuarios (fk_adm, fk_empresa, nome_usuario, email, senha, cpf) VALUES
(NULL, 
	1, 
		'Suporte Saint Peter', 
			'suporte@saintpeter.com', 
				'SaintPeterTech@2026', 
					'13509417003');
            
INSERT INTO componentes (nome_componente, tipo, unidade_medida) VALUES
('CPU', 'Hardware', '%'),
('RAM', 'Hardware', '%'),
('Disco', 'Hardware', '%'),
('Rede', 'Rede', 'Megabit');

INSERT INTO empresas 
(cnpj_empresa, telefone_empresa, razao_social, email_empresa)
VALUES
('00000000000002', 
 '11999999999', 
 'MedCloud Serviços Hospitalares LTDA', 
 'contato@medcloud.com'),
 ('00000000000003', 
 '11888888888', 
 'HealthTech Monitoramento Hospitalar LTDA', 
 'contato@healthtech.com');

INSERT INTO hospitais 
(fk_empresa, nome_hospital, cnpj_hospital, telefone_hospital)
VALUES
(2, 'Hospital Nova Esperança', '20000000000001', '11444455551'),
(2, 'Hospital Bem Estar', '20000000000002', '11444455552');

INSERT INTO hospitais 
(fk_empresa, nome_hospital, cnpj_hospital, telefone_hospital)
VALUES
(3, 'Hospital Santa Helena', '30000000000001', '11555566661'),
(3, 'Hospital Central Brasil', '30000000000002', '11555566662');

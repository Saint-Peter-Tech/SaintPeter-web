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
nome_hospital VARCHAR(50) NOT NULL,
cnpj_hospital CHAR(14) NOT NULL UNIQUE, 
telefone_hospital CHAR(11) NOT NULL UNIQUE
);

Create table unidades
(id_unidade INT PRIMARY KEY AUTO_INCREMENT,
fk_hospital INT NOT NULL,
cep CHAR(8) NOT NULL,
rua VARCHAR(50) NOT NULL,
numero VARCHAR(50) NOT NULL,
cidade VARCHAR(50) NOT NULL,
email_responsavel VARCHAR(50),
telefone_responsavel CHAR(11)
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
status_monitor VARCHAR(50),

constraint chkStatusMonitor
	check (status_monitor IN ('Ativo', 'Inativo')),

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
('RAM', 'Hardware', 'Bytes'),
('Disco', 'Hardware', 'Bytes'),
('Rede Enviada', 'Rede', 'Bytes'),
('Rede Recebida', 'Rede', 'Bytes'),
('Velocidade Envio', 'Rede', 'Bytes/s'),
('Velocidade Recebimento', 'Rede', 'Bytes/s');

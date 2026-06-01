Create DATABASE IF NOT EXISTS SaintPeter;
Use SaintPeter;

CREATE TABLE IF NOT EXISTS empresas
(id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj_empresa char(14) NOT NULL UNIQUE,
telefone_empresa char(11) NOT NULL UNIQUE,
razao_social VARCHAR(100) NOT NULL UNIQUE,
email_empresa VARCHAR(45) NOT NULL UNIQUE
)AUTO_INCREMENT = 2;

CREATE TABLE IF NOT EXISTS usuarios
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

CREATE TABLE IF NOT EXISTS hospitais
(id_hospital INT PRIMARY KEY AUTO_INCREMENT,
fk_empresa INT NOT NULL,
nome_hospital VARCHAR(50) NOT NULL,
cnpj_hospital CHAR(14) NOT NULL UNIQUE, 
telefone_hospital CHAR(11) NOT NULL UNIQUE,

constraint fk_hospitalEmpresa
	foreign key(fk_empresa)
		references empresas(id_empresa)
);

CREATE TABLE IF NOT EXISTS unidades
(id_unidade INT PRIMARY KEY AUTO_INCREMENT,
fk_hospital INT NOT NULL,
cep CHAR(8) NOT NULL,
rua VARCHAR(50) NOT NULL,
numero VARCHAR(50) NOT NULL,
cidade VARCHAR(50) NOT NULL,
latitude DECIMAL(10, 8) NULL,
longitude DECIMAL(11, 8) NULL,
nome_unidade VARCHAR(100) NOT NULL,
email_responsavel VARCHAR(50),
telefone_responsavel CHAR(11),
rede_total DOUBLE,

constraint fk_hospitalUnidade
	foreign key(fk_hospital)
		references hospitais(id_hospital)
);

CREATE TABLE IF NOT EXISTS componentes
(id_componente INT PRIMARY KEY AUTO_INCREMENT,
nome_componente VARCHAR(50) NOT NULL UNIQUE,
tipo VARCHAR(50) NOT NULL,
unidade_medida VARCHAR(50) NOT NULL,
comando_psutil VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS modelos(
	id_modelo INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT NOT NULL,
    nome VARCHAR(50),
    dtLancamento DATE,
    descricao VARCHAR(1000),

	constraint fk_modeloEmpresa
		foreign key (fk_empresa)
			references empresas(id_empresa)

);

CREATE TABLE IF NOT EXISTS monitores
(id_monitor INT PRIMARY KEY AUTO_INCREMENT,
fk_unidade INT NOT NULL,
fk_empresa INT NOT NULL,
fk_modelo INT NOT NULL,
dtFabricacao DATE,
dtManutencao DATE,
status_monitor VARCHAR(50),
descricao_manutencao VARCHAR(20),

constraint chkStatusMonitor
	check (status_monitor IN ('Ativo', 'Inativo', 'Manutenção')),

constraint chkDescricao
	check (descricao_manutencao IN ('Inicializada', 'Em Andamento', 'Finalizada', 'Pendente')),

constraint fk_unidadeMonitor
	foreign key(fk_unidade)
		references unidades(id_unidade),
	
constraint fk_empresaMonitor
	foreign key(fk_empresa)
		references empresas(id_empresa),
        
constraint fk_modeloMonitor
	foreign key (fk_modelo)
		references modelos(id_modelo)
);

CREATE TABLE IF NOT EXISTS componente_monitor
(fk_componente INT,
fk_monitor INT,
limite DECIMAL(5,2),
        
constraint fk_monitorComp
	foreign key(fk_monitor)
		references monitores(id_monitor),

constraint fk_componente
	foreign key(fk_componente)
		references componentes(id_componente),

PRIMARY KEY(fk_componente, fk_monitor)
);

INSERT IGNORE INTO empresas VALUES
(1, '00000000000001', 
	'00000000001', 
		'Saint Peter Tecnologia Ltda, SP Technology Serviços de Informática',
			'saintpetertechnology@saintpeter.com');

INSERT IGNORE INTO componentes (nome_componente, tipo, unidade_medida, comando_psutil) VALUES
('CPU', 'Hardware', '%', 'cpu_percent(interval=1)'),
('RAM', 'Hardware', '%', 'virtual_memory().percent'),
('Disco_Usado', 'Hardware', '%', "disk_usage('/').used"),
('Disco_Total', 'Hardware', '%', 'disk_usage("/").total'),
('Rede', 'Rede', 'Megabit', NULL);

INSERT IGNORE INTO empresas 
(cnpj_empresa, telefone_empresa, razao_social, email_empresa)
VALUES
('00000000000002', 
 '11999999999', 
 'Philips do Brasil Ltda', 
 'philips@philips.com');

INSERT IGNORE INTO hospitais 
(fk_empresa, nome_hospital, cnpj_hospital, telefone_hospital)
VALUES
(2, 'Hospital Nova Esperança', '20000000000001', '11444455551'),
(2, 'Hospital Bem Estar Saúde', '20000000000002', '11444455552'),
(2, 'Hospital Santa Helena', '30000000000001', '11555566661'),
(2, 'Hospital Central Brasil', '30000000000002', '11555566662');

INSERT IGNORE INTO unidades 
(fk_hospital, cep, rua, numero, cidade, latitude, longitude, nome_unidade, email_responsavel, telefone_responsavel, rede_total)
VALUES
(1, '04293970', 'Rua do Boqueirão', '320', 'São Paulo', -23.62207690, -46.61616220, 'Unidade Vila da Saúde', 'spnovaesperanca@esperanca.com', '11911111111', 100),
(1, '01414001', 'Rua Haddock Lobo', '595', 'São Paulo', -23.55802090, -46.66167880, 'Unidade SPTech', 'spnovaesperanca@esperanca.com', '11952814455', 50),
(1, '01424001', 'Alameda Lorena', '53', 'São Paulo', -23.57348290, -46.65604000, 'Unidade Jardim Paulista', 'spnovaesperanca@esperanca.com', '11995735566', 60),
(2, '05109130', 'Rua Teixeira Soares', '200', 'São Paulo', -23.50425200, -46.63711190, 'Unidade SP - Bem Estar Saúde', 'spbemestar@bemestar.com', '11922222222', 70),
(3,  '04075904', 'Avenida Açocê', '530', 'São Paulo', -23.60424520, -46.65596360, 'Unidade SP - Santa Helena', 'spsantahelena@santahelena.com', '1123235167', 80),  
(4, '01007900', 'Rua Doutor Faria Pereira', '56', 'São Paulo', -23.48977930, -46.63747200, 'Unidade SP - Central Brasil', 'spcentralbrasil@centralbrasil.com', '1132567234', 90);

INSERT IGNORE INTO usuarios (fk_adm, fk_empresa, nome_usuario, email, senha, cpf) VALUES
(
    NULL,
    1,
    'Suporte',
    'suporte@saintpeter.com',
    'suporte',
    '57000802812'
),
(
    NULL,
    2,
    'Júlia Araripe',
    'julia@philips.com',
    'admin',
    '92665394812'
),
(
	1,
	2,
    'Philipi',
	'philipi@philips.com',
	'analista',
	'72776014830'
);

INSERT INTO modelos (nome, dtLancamento, fk_empresa, descricao) VALUES
	("IntelliVue MX400", "2021-06-07", 2, "O IntelliVue MX400 oferece um grande poder de monitoramento em uma unidade altamente compacta e portátil. Capaz de fornecer grande quantidade de informações do paciente em uma rápida olhada, o IntelliVue pode fazer uma diferença real quando diversos pacientes e diferentes prioridades exigem atenção."),
    ("IntelliVue MX450", "2021-06-09", 2, "O IntelliVue MX450 combina poderoso monitoramento com portabilidade flexível em uma unidade compacta. Fornecendo abrangente informação do paciente à primeira vista, pode fazer uma real diferença quando vários pacientes e prioridades exigem atenção."),
    ("IntelliVue MX500", "2022-06-06", 2, "O IntelliVue MX500 combina poderoso monitoramento com portabilidade flexível em uma unidade compacta. Fornecendo abrangente informação do paciente à primeira vista, pode fazer uma real diferença quando vários pacientes e prioridades exigem atenção."),
    ("IntelliVue MX550", "2022-07-07", 2, "O IntelliVue MX550 reúne um monitoramento poderoso ao leito com a garantia de um backup de bateria. Capaz de absorver uma grande quantidade de informações do paciente em um piscar de olhos, ele pode fazer uma enorme diferença quando diversos pacientes e prioridades precisam de atenção."),
    ("IntelliVue MX750", "2024-12-25", 2, "O monitor de pacientes à beira do leito IntelliVue MX750 da Philips aborda diretamente as necessidades de segurança em constante evolução do cenário de TI em saúde e conta com uma série de recursos que facilitam suas estratégias de segurança cibernética.¹ Além disso, esse monitor excepcional oferece uma funcionalidade avançada e uma ampla gama de medições."),
    ("IntelliVue MX850", "2025-12-24", 2, "O monitor de pacientes à beira do leito IntelliVue MX850 da Philips aborda diretamente as necessidades de segurança em constante evolução do cenário de TI em saúde e conta com uma série de recursos que facilitam suas estratégias de segurança cibernética. Além disso, esse excepcional monitor de qualidade premium oferece uma funcionalidade avançada, opções flexíveis de configuração e uma ampla gama de medições. O monitor se adapta facilmente às demandas de ambientes de terapia intensiva para pacientes em estado grave.");
    
    
INSERT IGNORE INTO monitores 
(fk_unidade, fk_empresa, fk_modelo, dtFabricacao, dtManutencao, status_monitor) 
VALUES
(1, 2, 1, '2024-01-01', '2025-01-01', 'Inativo'),
(1, 2, 2, '2024-02-01', '2025-02-01', 'Inativo'),
(2, 2, 3, '2024-03-01', '2025-03-01', 'Inativo'),
(2, 2, 4, '2024-01-01', '2025-01-01', 'Inativo'),
(3, 2, 5, '2024-02-01', '2025-02-01', 'Inativo'),
(3, 2, 6, '2024-03-01', '2025-03-01', 'Inativo');

INSERT INTO componente_monitor (fk_componente, fk_monitor, limite) VALUES
(1, 1, 70), (2, 1, 85), (3, 1, 80), (4, 1, 80), (5, 1, 1.5),
(1, 2, 70), (2, 2, 85), (3, 2, 80), (4, 2, 80), (5, 2, 1.5),
(1, 3, 70), (2, 3, 85), (3, 3, 80), (4, 3, 80), (5, 3, 1.5),
(1, 4, 80), (2, 4, 75), (3, 4, 80), (4, 4, 80), (5, 4, 1.5),
(1, 5, 80), (2, 5, 75), (3, 5, 80), (4, 5, 80), (5, 5, 1.5),
(1, 6, 80), (2, 6, 75), (3, 6, 80), (4, 6, 80), (5, 6, 1.5);

CREATE USER 'nodejs'@'%' identified by 'SaintPeter@2026';
grant select, insert, update on SaintPeter.* to 'nodejs'@'%';
flush privileges;

CREATE USER 'etl'@'%' identified by 'SaintPeter@2026';
grant select, insert, update on SaintPeter.* to 'etl'@'%';
flush privileges;
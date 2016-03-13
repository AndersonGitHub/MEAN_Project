# MEAN_Project
MEAN (MongoDB, Express, Angular, NodeJS) Application.

Configuração do ambiente (Tutorial para Linux Ubuntu 14.04)
===========================================================

1 - MongoDB

Obs.-> execute estes comandos no terminal do Linux (Ctrl + T):

1.1 - Importar a chave pública utilizada pelo package management system (apt-get):

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

1.2 - Criar um list file para o MongoDB com este comando: 

	echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

1.3 - Reload da lista de repositórios local:

	sudo apt-get update

1.4 - Instale os pacotes do MongoDB:

	sudo apt-get install -y mongodb-org
	
1.5 - Inicie o MongoDB com o comando:
	
	sudo service mongod start

Fonte: https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

2 - NodeJS e NPM (Node Package Manager, necessário para instalação das dependências. Obs.: para esta aplicação, as dependências serão baixadas ao clonar o projeto, porém há casos onde é necessário executar "npm install", que irá verificar as dependências no arquivo "package.json" e baixá-las do repositório NPM).

Obs.-> execute estes comandos no terminal do Linux (Ctrl + T):

2.1 - Execute estas duas linhas para instalação do NodeJS:

	curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
	
	sudo apt-get install -y nodejs
	
2.2 - Verifique a versão do NodeJS e NPM com o comando:
	
	node --version
	
	npm --version

Fonte: https://nodejs.org/en/download/package-manager/

3 - Iniciando a aplicação

Após a instalação do MongoDB, verifique se o mesmo está ativo. Abra seu navegador e digite "http://localhost/27017". Deverá aparecer uma mensagem como essa : "It looks like you are trying to access MongoDB over HTTP on the native driver port". 

Pelo terminal (Ctrl + T), navegue até o diretório onde foi clonada a aplicação, por exemplo	
	
	cd ~/<myGitFolder>/MEAN_Project/node_app/
	
Execute o comando 
	
	node node_app.js

Deverá surgir o log no terminal:
 
    "Application listening on port 5000"
	
Assim, abra seu navegador e digite "http://localhost:5000"


Atenciosamente,

Anderson Luiz Fernandes
"anderson.luiz.sjc@gmail.com"
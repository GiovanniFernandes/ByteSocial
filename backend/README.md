# Intruções para rodar o backend

1 -  Use o seguinte comando para intalar as dependências do node e manter-se atualizado:

    npm i

2 - Sobre o Banco de Dados (SGBDs)

    2.1 Não possui o MySQL ou não quer usa-lo:

    ~ Utilize o ".example01.env"
    ~ Renomeie o arquivo para ".env"
    ~ Caso queira ver os dados organizados:
        - Intale o plugin SQLite Viewer
        - acesse o arquivo src/database/develop.db
    
    2.2 Se você já tiver instalado o mysql:

    ~ Utilize o ".example02.env"
    ~ Renomeie o arquivo para ".env"
    ~ Modifique as variáveis de acordo com sua maquina e o mysql instalado: 
        - DB_USER, DB_PWD, DB_NAME

    2.3 Caso queira usar outro banco de dados, como o postgreeSQL: 
    
    ~ Fale comigo, vulgo Antonio. 

    ! OBS ! O arquivo .env em seu repositório local não será "commitado", logo não o suba para o remoto, são as variáveis de ambiente do projeto. O gitignore já "ignora" tal arquivo, só não o apague de lá.


3 - Rode as migrations

    ~ No terminal: npm run migrate:up

4 - Enfim, execute o programa:

    ~ No terminal: npm run start

5 - Dúvidas: 

    ~ De o seu jeito ou fale comigo, vulgo Antonio.


#### Obs. Não precisa fazer todos esses passos toda vez que tenha dado pull, apenas o 1 e o 4, caso precise fazer alguma coisa a mais será informado no grupo da web.
___

# Api Documentation


###  Authenticate

#### Login user:

    POST /login

#### Example Request:
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        "email": "user@example.com",
	    "password": "********"
    }
    
#### Example Response:
    {
        "user": {
		"id": 1,
		"username": "user"
	    },
	    "token": token_jwt,
	    "status": true
    }
    
#### Validate user:

    POST /validate
    
#### Example Request:
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        "token": token_jwt
    }
    
#### Example Response:
    {
        "user": {
            "id" : 1,
            "username": "user"
        }, 
        "status": true}
    }


###  User
    
#### Register user

    POST /cadastro
    
#### Example Request:
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer {token_jwt}`
    },
    body: {
	    "username": "user",
	    "email": "user@example.com",
	    "password": "********"
    }
    
#### Exemple Response:
    [
        {
            "id": 1,
            "username": "user",
            "email": "user@example.com",
            "password": hash,
            "updatedAt": "2023-04-14T04:04:30.147Z",
            "createdAt": "2023-04-14T04:04:30.147Z"
        },
        true
    ]

#### Get users:

    GET /users
    
#### Example Request:
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer {token_jwt}`
    }
    
#### Example Response:
    [
        {
            "id": 1,
            "username": "user1",
            "email": "user1@example.com",
            "createdAt": "2023-04-14T03:01:54.000Z",
            "updatedAt": "2023-04-14T03:01:54.000Z"
        },
        {
            "id": 2,
            "username": "user2",
            "email": "user2@example.com",
            "createdAt": "2023-04-14T03:01:54.000Z",
            "updatedAt": "2023-04-14T03:01:54.000Z"
        },
        {
            "id": 3,
            "username": "user3",
            "email": "user3@example.com",
            "createdAt": "2023-04-14T03:01:54.000Z",
            "updatedAt": "2023-04-14T03:01:54.000Z"
        }
    ]

#### Get user:

    GET /user/${id}

|   Parameter   |   Type    |   Description |
|   :---        |   :---    |   :---        |
|   id          |   number  |   desired user id     |
    
#### Example Request:
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer {token_jwt}`
    }
    
#### Example Response:
    {
        "username": "user",
        "Criado em ": "2023-04-14T03:01:54.000Z",
        "qtdPosts": 1,
        "posts": [
		    {
			    "id": 1,
			    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
			    "createdAt": "2023-04-14T03:44:32.000Z",
			    "updatedAt": "2023-04-14T03:44:32.000Z",
			    "user_id": 1
		    }
	    ]
    }







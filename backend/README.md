## Intruções para rodar o backend

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


### Obs. Não precisa fazer todos esses passos toda vez que tenha dado pull, apenas o 1 e o 4, caso precise fazer alguma coisa a mais será informado no grupo da web.



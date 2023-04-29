export enum eStateConnections {
    noConnection =0, requestSent = 1, receivedRequest = 2, friends =3 
}
  
/*
    Estados do botão    
    1º estágio 
        - vizualização padrão = sem connexão = noConnction
            - ação = solicitaçaõ de amizade, estado alterado para o 2º estágio 
    2º estágio 
        - vizualização de quem enviou: = resquestSent
            - botão de cancelar solicitação de amizade, em vermelho ou laranja
                - ação = cancela solicitação enviada, estado alterado para o 1º estágio  
        - vizualização de quem recebeu: = receivedRequest
            - botão de aceitar aceitar ou recusar amizade, seguir exemplo dos botões em perfil
                - ação aceitar = envia para o 3º estágio 
                - ação recusar = envia para o 1º estágio
    3º estágio = friend
        - vizualização de amigos
            - ação = desfazer amizade ao clicar no botão, envia para o 1º estágio
*/

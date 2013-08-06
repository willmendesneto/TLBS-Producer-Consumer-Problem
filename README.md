How to

O código é usado da seguinte maneira:

Existe uma lista de botões que simulam os eventos para serem inseridos ao "Buffer". A lista acima corresponde à fila de processos que estão no "Buffer" em espera que que uma instância da classe "Consumer" as processe.

Ao clicar no botão "Iniciar Consumer" o buffer ficará inacessível para a instância da classe "Producer".

Uma instância da classe "Semaphore" está responsável por verificar o acesso ao buffer de processos. Quando uma das duas instâncias (Producer ou Consumer) for acessar o buffer, fechará para a outra e vice-versa.


Problema do produtor-consumidor

Em programas multithread muitas vezes há uma divisão de trabalho entre os segmentos. em
um padrão comum, alguns tópicos são produtores e alguns são consumidores. produtores
criar itens de algum tipo e adicioná-los a uma estrutura de dados, os consumidores
remover os itens e processá-los.

Programas event-driven são um bom exemplo. Um "evento" é algo que
Acontece que requer o programa para responder: o usuário pressiona uma tecla ou movimentos
do rato, um bloco de dados chega a partir do disco, chega um pacote a partir do
rede, uma operação pendente concluída.

Sempre que ocorre um evento, um segmento produtor cria um objeto de evento e
adiciona-lo para o buffer de eventos. Ao mesmo tempo, segmentos de consumo ter eventos fora
do buffer e processá-los. Neste caso, os consumidores são chamados de "evento
manipuladores ".

Há várias restrições de sincronização que precisamos cumprir para
fazer este sistema funcionar corretamente:

Enquanto um item está sendo adicionado ou removido do buffer, o buffer é
em um estado inconsistente. Portanto, os tópicos devem ter acesso exclusivo a
o tampão.

• Se um segmento consumidor chega, enquanto o buffer está vazio, ele bloqueia até que um
produtor adiciona um novo item.
Suponha que os produtores de realizar as seguintes operações mais e mais:

* Código 1;
    event = waitForEvent()
    buffer.add(event)


Além disso, assume que o consumidor realizar as seguintes operações:

* Código 2;
    event = buffer.get()
    event.process()

Como especificado acima, o acesso ao tampão tem de ser exclusivas, mas
waitForEvent e event.process podem ser executados simultaneamente.

Puzzle: Adicionar declarações de sincronização com o código do produtor e do consumidor
para impor as restrições de sincronização.
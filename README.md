# Carrinho

## 1. Requisitos gerais
### 1.1 Requisitos gerais: Cadastro


Ao acessar a tela de inicial (login), há uma mensagem abaixo do formulário que diz para clicar ali caso não tenha cadastro. Nesta botão, o usuário será redirecionado para a tela de cadastro que consiste em um formulário com nome email e senha. Ao clicar para criar a conta, a aplicação valida se este email já não foi utilizado por outro usuário. Caso o email já conste em outro usuário, aparece um alert avisando o usuário e mantem ele nesta tela para adequações. Quando o email fornecido não é encontrado na base de cadastro, é dado um alert de sucesso e é redirecionado de volta para a tela de login. Neste momento o usuário foi cadastrado no back-end com perfil padrão inicial de comprador. 

### 1.2 Requisitos gerais: Login

Ao acessar a tela de inicial (login), há um formulário com campo email e senha para ser preenchido pelo usuário. Ao clicar no Entrar, essas informações são comparadas com as fornecidas anteriormente pelo usuário (no momento do cadastro). Caso não sejam validados, um alert aparece informando o usuário. Quando validados, um token JWT será gerado no back e enviado ao front e armazenado no local storage. Além do token, também é armazenado o id de usuário e o perfil (admin, vendedor ou comprador).
Nesta tela também há uma função rodando atraves de um set Interval para buscar token no local storage e tentar validá-lo. Esta função serve para validar automaticamente um usuário que volte para a tela de login sem necessidade de preencher os dados novamente caso o token dele ainda esteja dentro do prazo de validade (12 horas).  Esta função de validação de token busca ele no localstorage e tenta valida-lo no back. Se não validar, mantem na tela(sem aviso ao usuário pois ele pode já ter preenchido os dados de login ou não neste momento). Se validar é redirecionado para a home. 

Dados para teste: 
perfil administrador
email: admin@teste.com
senha: admin

perfil vendedor
email: vendedor@teste.com
senha: vendedor

perfil comprador
email: comprador@teste.com
senha: comprador


### 1.3 Requisitos gerais: Home

Ao acessar a home, há um menu de botões que se adequa ao perfil de cada usuário. Sendo que compradores terão acesso apenas a Loja neste momento. Vendedores terão acesso ao Gerenciar Produtos. E administradores terão acesso aos dois perfis anteriores e ao Gerenciar Usuários. 
Neste tela também aparecem no header dois botões que ficarão fixos enquanto o usuário estiver logado: um a esquerda da tela para ser redirecionado a Home e outro a direita para efetuar o logout. O botão de logout apaga os item que foram armazenados na local storage (token, role e id do usuário) e o redireciona para a tela de login. 

## 2. Requisitos cliente/comprador
### 2.1 Requisitos cliente/comprador: Loja

perfil comprador
email: comprador@teste.com
senha: comprador

Ao acessar a loja, importamos no back 1000 produtos. Porém para não apresentar todos de uma vez para o cliente, carregamos através de um tipo de paginação que vai carregando o catálogo aos poucos. 
Essa estratégia é boa pois reduz o tempo que levaria para carregar todos os produtos de uma única vez para o cliente, porém ela tem impacto no campo de filtro por nome do produto - pois este só funciona nos produtos que estiverem já aparentes na tela (não está filtrando todos os resultados do back, apenas os que já estão carregados na tela).*

A tela da loja apresenta os produtos em formato de cards com nome, quantidade disponível em estoque e preço unitário. Além das informações de cada produto, cada card também conta com um botão para adicionar unidades daquele item ao seu carrinho de compras. Quando clicado, este botão tará para o card também um campo com a quantidade adicionada e um botão para reduzir a quantidae também. A quantidade selecionada não poderá sobrepor a quantidade do produto em estoque. Caso o usuário tente será impedido e será lançado um alert informando-o. 

Ao deslizar a tela para baixo, será possível ver a contagem de páginas de produtos disponíveis junto com o valor da página atual (a que foi mais recentemente carregada). Além disso, um botão "Ver mais" que fará o carregamento do próximo bloco de produtos. 

Ao terminar a seleção dos produtos desejados, o cliente voltará ao topo da tela e clicará no carrinho de compras. 

### 2.2 Requisitos cliente/comprador: Carrinho de compras

Caso o usuário tenta acessar o carrinho sem ter adicionado nenhum produto a sua compra, as mensagens serão adequadas para informá-lo que o carrinho está vazio e apresentará um único botão para que ele inicie suas compras voltando a tela da loja. 

Quando já tiver itens adicionados e o carrinho for clicado, será aberto o carrinho de compras em um dialog para o cliente. Neste dialog, há a saudação que será personalizada com o nome dele e detalhes da compra que está sendo feita no momento. Nesta tela a compra do cliente ainda tem o status de rascunho, o que permite que ele faça edições de todos os tipos (inclusão e exclusão de itens, alterações de quantidades...). Nesta tela, os itens já selecionados são apresentados em um tabela na qual o usuário poderá fazer adequações nas quantidades selecionadas (também validando com o estoque) e até remover um item. Também já é apresentado ao cliente o subtotal de cada item e o valor total da compra até o momento. 

Neste ponto, terminadas as edições e conferências, o cliente pode continuar comprando o que o levará de volta a tela da loja e continuara a jornada desta mesma compra. Pode limpar o carrinho, o excluirá todos os itens adicionados na compra até o momento. Ou confirmar a sua compra - o que salvará essas informações de em status de compra confirmada o que já não permitirá em nenhum momento edição nos itens a partir deste status. Apenas edições de status serão possíveis neste objeto a partir daqui (pagamento confirmado e finalizada).

## 3. Requisitos vendedor
### 3.1 Requisitos vendedor: Listagem de produtos

perfil vendedor
email: vendedor@teste.com
senha: vendedor

Quando o login tem perfil de vendedor, na home aparecerá o botão Gerenciar produtos. Ao clicar nele, o usuário será redirecionado para uma tela em que há a listagem dos 1000 produtos que incluimos de início. Nesta tela, os produtos são apresentados em uma tabela que possui nome do produto, quantidade em estoque, preço e quem é o vendedor resposánsável. Sugestões de continuação de desenvolvimento* da aplicação incluem conectar este Id de vendedor ao Id do usuário do vendedor e assim, utilizar como filtro esta informação para apresentar ao vendedor apenas a listagem dos produtos que foram cadastrados por ele. Para ter acesso aos produtos de multiplos vendedores precisaria de um usuario admin. Por enquanto, qualquer perfil vendedor tem acesso a todos os produtos nesta listagem. Além das informações, cada linha da tabela possui 3 botões. Um para ver detalhes do produto - uma tela apenas para visualização em que informações que não constem na tabela poderiam ser apresentadas. No momento estamos incluindo, por exemplo, o id do produto. Esta tela não permite edição. Para editar, o usuário precisa voltar a tela com a tabela de produtos e clicar no botão editar da linha correspondente ao produto de interesse. O mesmo dialog será então aberto, mas agora apenas com os campos passíveis de edição como nome, quantidade, preço e vendedor. O Id não aparece nesta tela pois não permitimos alterações do id. Por fim, há o botão de deletar que excluirá aquele produto do back end. 
Em todos os momentos de criação, edição ou deleção, a lista é atualizada automaticamente. 
Nesta tela todos os 1000 produtos são carregados de uma só vez, o que permite melhor usabilidade do campo de busca por nome do produto. 

### 3.2 Requisitos vendedor: Cadastro de produtos

Na tela de listagem de produtos há um botão para adicionar novos produtos no canto superior direito da tela, que abrirá o mesmo dialog que abre ao "ver detalhes" e "editar", com adequações de titulo e campos para criação de um novo produto na lista.

## 4. Perfil admin:
### 4.1 Perfil admin: Listagem de usuários

perfil administrador
email: admin@teste.com
senha: admin

Além das funcionalidades e telas disponíveis para os perfis de comprador e vendedor, o perfil admin tem acesso ao botão Gerenciais Usuários na Home. 
A tela de gerenciar usuários é similar a tela de listagem de produtos. Traz os usuários existentes em tabela com nome, email, perfil de acesso e novamento os três botões em cada linha: ver detalhes, editar e remover. 
O funcionamento dos botões da tabela desta tela são similares aos da tela de produtos com única diferença que o campo pesquisa busca o conteúdo tanto no campo nome quanto no campo perfil e foi feita a adequação dos campos e botões.

### 4.2 Perfil admin: Cadastro de usuários

Na tela de listagem de usuários é possível ver um botão também para adicionar novos usuários. Ao clicar nele é aberto o dialog com devidas adequações para preenchimento das informações e atualização da tabela da tela anterior acontece automaticamente ao fechar o dialog. 
Importante lembrar que nesta tela, acessada pelo perfil admin, é o unico caminho para gerar usuário com perfil diferente de comprador. Na tela de cadastro todos os usuários gerados recebem perfil de comprador que podem posteriormente ser alterado por alguem que possua perfil admin. Sugestão de continuidade de desenvolvimento* seria incluir filtro para selecionar todos os usuários de determinado perfil.

## 5. API/Back-End

Foi desenvolvida uma WebAPI em C# (reposiório do gitHub : https://github.com/carlarani/carrinhoDeComprasBack). Esta API foi desenvolvida para os mesmos objetos que o front possui (usuario, produto, compra, compraProduto/ProdutoCompra). Algumas Models existentes no front não são conectadas com a API, como é o caso de CompraDisplay e CompraProdutoDisplay, que foram classes criadas para manipular informações apenas no front, utilizando como base uma combinação das informações do back das classes existentes e persistentes. 

A API usa como forma de armazenar os dados um Banco de dados Im Memory, o que significa que as informações só estão disponíveis enquanto a API está rodando. Quando desconectada, os dados são descartados. 

Os dados disponíveis para visualização e testes na aplicação estão sendo populados neste banco de dados im memory atraves de alguns arquivos json, também disponíveis no repositório da api/back. 

*Estas são pontos de atenção / sugestões de próximos desenvolvimentos que seriam feitos para deixar a aplicação mais próxima a uma aplicação real.


## Informações úteis

Design de inspiração : https://www.figma.com/file/8uovzyDAjeEB6MsHv0RrzH/Landing-Page%3A-%23LaylaMoNow!-(Community)?node-id=38%3A48&t=SWFyY1iEHsRpvVPu-0



### Orientações do professor para o projeto *Carrinho de compras *

Como maneira para nos aprofundarmos nos conceitos de angular, vamos fazer um carrinho de compras!

Nossa app terá 2 visões, uma de cliente e outra de vendedor.

Requisitos gerais:
Página de cadastro de usuário
Login/Senha
Controle de quantidade


Requisitos vendedor:
Listagem de produtos
Cadastro de produtos

Requisitos cliente:
Listagem de produtos
Adicionar produto ao carrinho
Finalizar compra

Observação: Não é necessário construir API para o backend, pode ser feito utilizando Local Storage.

Fique a vontade para agregar mais funcionalidades! Serão levadas em conta na avaliação.

Entrega
Data máxima: 22/01/2023, 23:59H
Link do repositório no github

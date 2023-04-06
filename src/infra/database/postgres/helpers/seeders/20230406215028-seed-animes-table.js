'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query(
      'SELECT id FROM categories;'
    )

    await queryInterface.bulkInsert('animes', [
      // AÇÃO
      // Dragon ball super
      {
        name: 'Dragon Ball Super',
        synopsis:
          'Sete anos após os eventos do Dragon Ball Z, a Terra está em paz, e suas pessoas vivem livres de quaisquer perigos que espreitam no universo.',
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Naruto Shippuden
      {
        name: 'Naruto Shippuden',
        synopsis:
          'Dois anos e meio se passaram após a partida de Uzumaki Naruto e Jiraiya da vila de Konoha, para um treinamento a parte com Naruto. Logo ao voltar à vila os primeiros a encontrá-lo foram Sakura e Konohamaru. Agora Naruto e seus amigos não tem apenas que se preocupar com o resgate de Sasuke, mas também com uma organização chamada Akatsuki, que está atrás dos Jinchuurikis (ninjas que carregam um Bijuu em seus corpos, junto a isso inumeros outros acontecimentos ocorrem ao longo da série.',
        featured: true,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Boku No Hero Academia
      {
        name: 'Boku No Hero Academia',
        synopsis:
          'O que é um herói? Para Midoriya Izuku, a resposta dessa pergunta sempre foi simples: Tudo que eu quero ser! E quem é o maior herói? Bem, o lendário All Might (Todo Poderoso), é claro. All Might é o herói número um e também o Símbolo da Paz mundial. Nem mesmo em seus sonhos mais loucos Izuku poderia imaginar que logo seu caminho cruzaria o de seu herói de infância.',
        featured: false,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Mob Psycho 100
      {
        name: 'Mob Psycho 100',
        synopsis:
          'Kageyama Shigeo, conhecido como Mob, é um aluno da 8ª série com poderes psíquicos. Ele podia dobrar colheres e levitar objetos com sua mente desde pequeno, mas lentamente passou a se abster de usar suas habilidades em público devido à atenção negativa que recebia. Agora, a única coisa que ele quer é ser amigo de uma garota de sua classe, Tsubomi. Com seu mentor psíquico, que não tem poderes, ele continua sua vida cotidiana, tentando realizar seu propósito de vida.',
        featured: false,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Bleach
      {
        name: 'Bleach',
        synopsis:
          'Bleach é um Anime que conta a história de um garoto de quinze anos, Kurosaki Ichigo. Ele não é como os garotos comuns de sua idade, ele tem a habilidade de ver fantasmas e espiritos, além de se comunicar com eles. Ichigo tinha muita energia espiritual, coisa que ele não sabia, até conhecer Kuchiki Rukia (Uma Shinigami). Os Shinigamis tem três objetivos principais, mandar as almas para a sociedade espiritual ou para o inferno, derrotar e purificar Hollows, balancear e regular o numero de almas em cada mundo.',
        featured: false,
        category_id: categories[0].id,
        created_at: new Date(),
        updated_at: new Date()
      },

      // AVENTURA
      // One piece
      {
        name: 'One Piece',
        synopsis:
          'Houve um homem que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis... Assim começou a Grande Era dos Piratas!',
        featured: true,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Hunter x Hunter
      {
        name: 'Hunter x Hunter',
        synopsis:
          '”Monstros terríveis… Criaturas exóticas… Imensas riquezas… Tesouros escondidos… Enclaves malignos… Terras inexploradas… A palavra “desconhecido” guarda magia. E pessoas incríveis são atraídas para essa magia. Elas são conhecidas como… Hunters!” Gon é um altivo garoto que cresceu aos cuidados da tia no pacato vilarejo de Ilha de Baleia. ',
        featured: true,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Boruto: Naruto Next Generations
      {
        name: 'Boruto: Naruto Next Generations',
        synopsis:
          'Aqui o protagonista será o filho dele, Boruto Uzumaki, que tomará o lugar do pai como protagonista após este ter enfim conseguido se tornar no maior ninja de todos. Sinopse: A Vila Oculta da Folha entrou numa era de paz e modernidade. Prédios altos cerceiam as ruas, telas gigantes brilham com imagens, e a Linha Trovão corre pela vila, conectando os distritos. Embora continue sendo uma vila ninja, o número de civis aumentou, e a vida dos shinobi começou a mudar. Boruto Uzumaki, filho de Naruto Uzumaki, o Sétimo Hokage, se inscreveu na Academia Ninja para aprender a ser um verdadeiro ninja ',
        featured: false,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Fullmetal Alchemist Brotherhood
      {
        name: 'Fullmetal Alchemist Brotherhood',
        synopsis:
          'Fullmetal Alchemist: Brotherhood é a segunda versão de Full metal alchemist, o anime que conta a história dos irmãos Alquimistas Edward Elric e Alphonse Elric. Esta versão busca se aproximar totalmente do mangá.À primeira vista, o primeiro capítulo pode parecer muito confuso, pois não segue em nada o mangá, mas como o primeiro epi da antiga versão de Full Metal já seguia o mangá eles resolveram colocar um primeiro episódio diferente para não ficar sem gosto. ',
        featured: false,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Sword Art Online
      {
        name: 'Sword Art Online',
        synopsis:
          'No ano de 2022, a Realidade Virtual Massive Multiplayer RPG Online (VRMMORPG), Sword Art Online (SAO), é lançado. Com o equipamento Nerve Gear, um capacete de realidade virtual que estimula no usuário cinco sentidos através de seu cérebro, os jogadores podem experimentar e controlar seus personagens no jogo com suas mentes. Em 6 de novembro de 2022, todos os jogadores ao entrar pela primeira vez, descobrem que eles são incapazes de sair. ',
        featured: false,
        category_id: categories[1].id,
        created_at: new Date(),
        updated_at: new Date()
      },

      // Comédia
      // Arakawa Under the Bridge
      {
        name: 'Arakawa Under the Bridge',
        synopsis:
          'Piadas, personagens estranhos, ambientes bizarros, tudo isso e muito mais é o que pode esperar de Arakawa Under the Bridge. Misture tudo com dois personagens cujos ideias são opostos e você consegue criar uma série muito engraçada.',
        featured: false,
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Baka to Test to Shokanju
      {
        name: 'Baka to Test to Shokanju',
        synopsis:
          'O que será frequentar em um colégio tão emocionante que você nunca quer faltar a uma aula? Em Baka to Test to Shokanju, os personagens principais são os idiotas do colégio, os testes e também alguns monstros. Uma turma de garotos burros tentando melhorar seu desempenho acadêmica enquanto luta contra monstros é garantia de muitas gargalhadas.',
        featured: false,
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Gekkan Shojo Nozaki-kun
      {
        name: 'Gekkan Shojo Nozaki-kun',
        synopsis:
          'O que será frequentar em um colégio tão emocionante que você nunca quer faltar a uma aula? Em Baka to Test to Shokanju, os personagens principais são os idiotas do colégio, os testes e também alguns monstros. Uma turma de garotos burros tentando melhorar seu desempenho acadêmica enquanto luta contra monstros é garantia de muitas gargalhadas.',
        featured: false,
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Hataraku Mao-ama
      {
        name: 'Hataraku Mao-ama',
        synopsis:
          'O que pode ser mais divertido do que um demônio trabalhando a meio-tempo em um restaurante de fast-food? E o pior é que esse demônio de outro mundo descobre que a Terra afinal é o local ideal para ele viver. Com esse cenário você pode ter a certeza de que vão acontecer vários momentos tão estranhos que se tornarão hilários.',
        featured: false,
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Sayonara, Zetsubou-Sensei
      {
        name: 'Sayonara, Zetsubou-Sensei ',
        synopsis:
          'Sendo um anime focado em temas sensíveis como a depressão, Sayonara, Zetsubou-Sensei utiliza o humor negro para criar um arsenal de piadas e personagens dramáticos para causar a diversão no público.',
        featured: false,
        category_id: categories[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },

      // ESPORTE
      // Haikyuu
      {
        name: 'Haikyuu',
        synopsis:
          'Um evento do acaso despertou o amor de Hinata Shouyou por voleibol. Seu clube não tinha membros, mas de alguma forma perseverou e finalmente chegou a seu primeiro e último jogo normal do ensino fundamental, onde ele foi atropelado por Kageyama Tobio, um jogador exemplar conhecido como Rei da Quadra. Desejando vingança, Hinata entrou no time de vôlei do Colégio Karasuno apenas para enfrentar seu odiado rival, Kageyama!',
        featured: true,
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Super Onze
      {
        name: 'Super Onze',
        synopsis:
          'Enquanto outras escolas no Japão competem pelo título de melhor time de futebol do país, o clube de futebol Raimon Middle School, Inazuma Eleven, luta para se erguer quando está prestes a ser desfeito. O neto do primeiro goleiro da equipe Inazuma Eleven e capitão da equipe, Mamoru Endou, assume o desafio de dar o pontapé inicial no time há muito negligenciado. Para fazer isso, ele precisará de uma ajudinha e mais do que um pouco de sorte. Mamoru Endou encontra esperança nas mãos de Shuuya Gouenji, um jovem jogador brilhante que desistiu do futebol.',
        featured: true,
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Kuroko no Basket
      {
        name: 'Kuroko no Basket',
        synopsis:
          'Kuroko é um membro do time de basquete colegial lendário conhecido como “Geração dos Milagres”, e embora ninguém saiba, os cinco principais jogadores o consideram o melhor jogador de basquete. Quando ele se junta à equipe, todos se surpreendem ao descobrir que Kuroko é pequeno, magro e fraco..qual é o segredo que o faz tão famoso, e quais de suas habilidades são capazes de ajudar a sua equipe?',
        featured: false,
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Captain Tsubasa
      {
        name: 'Captain Tsubasa',
        synopsis:
          'Captain Tsubasa conta a história de Tsubasa Oozora (Oliver Tsubasa na versão brasileira e portuguesa), um garoto de 11 anos que tem um grande talento pelo futebol e é reconhecido pelo seu técnico, e ex-jogador brasileiro, Roberto Hongo, que decide levar Tsubasa para o Brasil e treiná-lo para a Copa do Mundo.',
        featured: false,
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Beyblade Burst
      {
        name: 'Beyblade Burst',
        synopsis:
          'Aoi Valt é um garoto cheio de energia que adora atacar e manejar uma Beyblade chamada Valkyrie. Seu melhor amigo Kurenai Shuu é um Blader de elite que é um gênio, mas ainda se esforça bastante usando a Beyblade chamada Spriggan.',
        featured: false,
        category_id: categories[3].id,
        created_at: new Date(),
        updated_at: new Date()
      },

      // sobrenatural
      // Nanatsu No Taizai
      {
        name: 'Nanatsu No Taizai',
        synopsis:
          'Os “Sete Pecados Capitais”, um grupo maligno de cavaleiros que conspiraram para derrubar o reino de Britânia, supostamente foram erradicados pelos Cavaleiros Divinos, embora ainda existam rumores de que eles estão vivos. Dez anos depois, os Cavaleiros Divinos realizaram um golpe de estado e assassinaram o rei, se tornando os novos e tiranos governantes do reino. Elizabeth, a única filha do rei, sai em uma jornada para encontrar os “Sete Pecados Capitais”, e recrutá-los para que possam ajudar a tomar o reino de volta.',
        featured: false,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // JoJo no Kimyou na Bouken
      {
        name: 'JoJo no Kimyou na Bouken',
        synopsis:
          'Em 1868, Dario Brando salva a vida de um nobre inglês, George Joestar. Ao receber o filho de Dario, Dio, quando o menino fica sem pai, George espera pagar a dívida que ele deve ao seu salvador. No entanto Dio, insatisfeito com sua posição na vida, aspira a tomar a casa de Joestar para si. Empunhando uma máscara de pedra asteca com propriedades sobrenaturais, ele decide destruir George e seu filho, Jonathan JoJo Joestar, e desencadeia uma cadeia de eventos que continuarão a ecoar nos próximos anos. Meio século depois, em Nova York, o neto de Jonathan, Joseph Joestar, descobre o legado que seu avô deixou para ele.',
        featured: false,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Kimetsu no Yaiba
      {
        name: 'Kimetsu no Yaiba',
        synopsis:
          'Desde os tempos antigos, abundam os rumores de demônios devoradores de homens à espreita na floresta. Por causa disso, os moradores locais nunca se aventuram do lado de fora durante a noite. Diz a lenda que um matador de demônios também perambula pela noite, caçando esses demônios sanguinários. Para o jovem Tanjirou, esses rumores logo se tornarão sua dura realidade ... Desde a morte de seu pai, Tanjirou assumiu a responsabilidade de sustentar sua família.',
        featured: true,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Tokyo Ghoul
      {
        name: 'Tokyo Ghoul',
        synopsis:
          'Estranhos assassinatos começam a acontecer em Tokyo. Devido a evidência líquida nos casos, a polícia concluiu que os ataques são resultados de uma criatura que se alimenta de outros seres, um “ghoul” do tipo “eater”. Dois amigos de faculdade, Kaneki e Hide, criam a teoria de que os ghouls estão imitando os humanos, por isso nunca são vistos ou capturados. Eles nem imaginam que essa teoria pode ser verdade e a coisa sairá do controle, pois Kaneki acaba se envolvendo, sem saber, com uma dessas criaturas, que ao atacar o garoto acaba morrendo acidentalmente, mas o deixa seriamente ferido e a ponto de morrer.',
        featured: false,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Death Note
      {
        name: 'Death Note',
        synopsis:
          'Light Yagami é um genial estudante entediado com a vida que leva. Mas tudo está prestes a mudar. Light encontra um misterioso caderno chamado Death Note e descobre que com ele é possível matar quem quiser. O rapaz então decide varrer a escória da sociedade do planeta. Dotado de grande senso de justiça, ele começa a usar o caderno maldito para eliminar criminosos do mundo inteiro e começa a ganhar notoriedade na internet e nos demais meios de comunicação.',
        featured: true,
        category_id: categories[4].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animes', null, {})
  }
}

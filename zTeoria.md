# Clean Architeture
Desacoplamento
Inversão de dependencia
Injeção de Dependencia


# DDD Domain Driven Design
Como vamos converter um problema do cliente em algo palpável

- Domain Experts
Pessoas que estão no dia a dia 

- Linguagem ubíqua
Linguagem em que todas as pessoas conseguem se comunicar.

Nós de TI chamamos sempre criamos o USUARIO.
Mas o Domain Expert talvez pode chamar o usuario de BARBEIRO.

- Agregados

- Values Objects
São propreidades que possuem regras de negócio embutidas dentro da propria propriedade, tornando-se possivelmente uma CLASSE.

Manter bom senso e não aplicar exageradamente.
Provavelmente para cada propriedade cabe alguma regra, porem esse conceito pode ser aplicado com mais precisão em casos realmente especiais.

- Eventos de Dominio
- Subdominios



-Exemplo de conversa:
Muita dificuldade em saber as dúvidas dos alunos
Eu tenho que responder os alunos e eu me perco em quais duvidas já foram respondidas.

- Entidades
Obtido com a conversa com o Domain expert
É possivel identificar isso através de seujeitos (Eu tenho que responder -> Foco no EU)

- Casos de Uso
Obtido com a conversa com o Domain expert
É possivel identificar isso através de verbos (Eu tenho que responder -> Foco no RESPONDER)

- GETTERS and SETTERS
Protegem as propreidades
Podem ser usados para validação
Pode ser usados para manipular o dado antes de ser exposto
Aqui darei aqui os detalhes técnicos do que fiz.

## Tractian-technical-test

![image](https://github.com/R-o-d-r-i-g-o/tractian-technical-test/assets/89111957/febbba9f-9564-4df2-a9d6-86a1081d16bb)

![image](https://github.com/R-o-d-r-i-g-o/tractian-technical-test/assets/89111957/7c41017e-0756-4941-b32f-f1c313932652)

link do serviço rodando em ambiente remoto: https://tractian-technical-test.vercel.app/

*OBS.: As vezes a instancia postgres pode ter instabilidades resultando em demora de queries

![image](https://github.com/R-o-d-r-i-g-o/tractian-technical-test/assets/89111957/1ac1288c-461d-46b7-991e-edb3e68eae92)

# Principais Ferramentas e Libs Usadas:

```bash
- POSTGRES (Supabase)
- NEXT
- REACT
- JEST
- LOTTIE
- PRISMA
- AXIOS
- ZUSTAND
- TAILWIND
- REACT-QUERY
```

# Explicação técnica

- Usei next por conta de ser uma ferramenta atual e já ter um cacheamento de dados muito trabalhado. Ela permitiu fazer uso de bibilhotecas de lotties de uma maneira muito elaborada, sem que o loading inicial fosse um problema (mesmo ao renderizar client-side).

- Usei ainda o postgres para a tratativa de dados e seleção de maneira recursiva dos itens do menu (não sobrecarregando o cliente). Isso permitiu com que as opções de filtro de menu fossem feita de maneira performática no geral (isso justifica ainda o uso da ferramente PRISMA).

- Usei libs como o REACT-QUERY e AXIOS para a chamada do backend integrado na aplicação next (api router).

- Para gerenciamento de estado global utilizei a tecnologia ZUSTAND para trabalhar o conceito de "PUBLISHERS" e "SUBSCRIBERS" (observables).

- O Jest foi usado apenas de maneira bem simbólica para teste de um High-order component, no caso da aplicação em next14, o componente template (p/a mock de contexto).

# Desafios encontrados

- Perda de performance vinda da volumetria de dados no frontend do app: Para evitar isso utilizei recursos de paginação do próprio SGBD além da api basica do react.

- Não ter implementado mais casos de teste: Nesse ponto o tempo foi um quesito que se mostrou o maior desafio, pois ao consiliar esse projeto como minha rotina, tive que dar enfaze na entrega das funcionalidade de maior valor da plataforma nesse primeiro momento.

# Pontos de melhorar (review pessoal)

- Poderia ter sido usadas melhores práticas de clean code. A questão da componentização também poderia ter sido um pouco mais trabalhada principalmente por conta da existencia de muitas diretivas de "use client" no projeto usadas.

- Duplicidade de código adivindo de diversas tipagens "soltas" no meio da aplicação em locais as vezes fora de escopo e/ou não estratégicos.

- Organização dos dados dentro do Banco de Dados: Ao menos a nomenclatura e tipagens mais específicas poderiam ter sido usadas nesse momento.

- Acredito ainda ter usado bastante da ferramenta zustand o que, de certa forma, foi ruin no sentido de existirem muitos Wrapers para uso 


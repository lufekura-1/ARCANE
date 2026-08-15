# Arcane Hunt

RPG de navegador em HTML, CSS e JavaScript, sem etapa de build.

## Executar localmente

Como os sprites são carregados por URL, sirva a raiz do projeto por HTTP:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000/` no navegador.

## Estrutura

```text
index.html                 marcação e pontos de montagem da interface
assets/css/game.css        estilos e layouts responsivos
assets/js/core.js          estado, renderização e loop principal
assets/js/progression.js   progressão, spells, hunts e bosses da versão 9
assets/js/world-tiles.js   variações visuais dos mapas
assets/js/sprite-*.js      registro e associação de sprites
assets/js/content-expansion.js  itens e conteúdo adicional
assets/js/world-renderer.js     carregamento e renderização de tiles
assets/images/             pastas preparadas para sprites por categoria
```

Os scripts são carregados na ordem declarada no fim de `index.html`, pois as camadas de versão ampliam funções definidas anteriormente. Consulte [`assets/images/README.md`](assets/images/README.md) antes de adicionar sprites.

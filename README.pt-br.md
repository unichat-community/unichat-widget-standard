# UniChat Widget Standard

[English](./README.md)

Widget de chat para o [UniChat](https://github.com/voguh/unichat), independente de plataforma.

## Eventos

| Evento       | Variantes                                                              |
| ------------ | ---------------------------------------------------------------------- |
| Mensagem     | Comum, GIF da Twitch, streak da Twitch                                 |
| Donate       | Comum, Super Sticker do YouTube                                        |
| Sponsor      | Novo sponsor, renovação                                                |
| Sponsor gift | ---                                                                    |
| Raid         | Com e sem contagem de espectadores                                     |
| Cheer        | Com valor (ex.: bits da Twitch), sem valor (ex.: presentes do YouTube) |
| Redemption   | ---                                                                    |

## Personalização

Cada evento pode ser desligado e tem cor, ícone e template de texto próprios. Outras opções:

- cor do nome do autor: a cor da plataforma, ou uma cor fixa por tipo de autor (espectador, sponsor, moderador, streamer);
- limite e tempo de vida das mensagens;
- animações de entrada e saída;
- tamanhos, cores e arredondamento da bolha, avatar, emotes e stickers;
- valor mínimo de donate e cheer, mínimo de dias de streak;
- comandos e usuários ignorados.

## Dock do OBS

Adicione `?obs_dock=true` à URL do widget. O chat passa a ter rolagem e as mensagens nunca são removidas por limite ou tempo de vida.

## Instalação

Baixe a última versão em [Releases](https://github.com/unichat-community/unichat-widget-standard/releases).

## Desenvolvimento

Requer Node.js 24 e pnpm 10.

```sh
pnpm install
pnpm dev        # gera na pasta de widgets do UniChat e observa mudanças
pnpm build      # build de produção em dist/
pnpm typecheck
pnpm lint
```

## Licença

Este projeto é gratuito e de código aberto sob a [Eclipse Public License 2.0](./LICENSE).

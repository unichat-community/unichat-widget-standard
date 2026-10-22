# UniChat Widget Standard

[Português](./README.pt-br.md)

Platform-agnostic chat widget for [UniChat](https://github.com/voguh/unichat).

## Events

| Event        | Variants                                                          |
| ------------ | ----------------------------------------------------------------- |
| Message      | Regular, Twitch GIF, Twitch watch streak                          |
| Donate       | Regular, YouTube Super Sticker                                    |
| Sponsor      | New sponsor, renewal                                              |
| Sponsor gift | ---                                                               |
| Raid         | With and without viewer count                                     |
| Cheer        | With value (e.g. Twitch bits), without value (e.g. YouTube gifts) |
| Redemption   | ---                                                               |

## Customization

Every event can be turned off and has its own color, icon and label template. Other options:

- author name color: the platform color, or a fixed color per author type (viewer, sponsor, moderator, streamer);
- message limit and lifetime;
- entry and exit animations;
- bubble, avatar, emote and sticker sizes, colors and radius;
- minimum value for donates and cheers, minimum days for streaks;
- ignored commands and users.

## OBS dock

Add `?obs_dock=true` to the widget URL. The chat becomes scrollable and messages are never removed by limit or lifetime.

## Installation

Download the latest version from [Releases](https://github.com/unichat-community/unichat-widget-standard/releases).

## Development

Requires Node.js 24 and pnpm 10.

```sh
pnpm install
pnpm dev        # builds into the UniChat widgets folder and watches for changes
pnpm build      # production build in dist/
pnpm typecheck
pnpm lint
```

## License

This project is free and open source under the [Eclipse Public License 2.0](./LICENSE).

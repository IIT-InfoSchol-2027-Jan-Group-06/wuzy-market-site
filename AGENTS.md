## Development

When starting the dev server, use background mode:

```
astro dev --background
```
Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design

**Read [DESIGN.md](./DESIGN.md) before touching any UI.** It is the design
contract: every colour, type, spacing, radius, shadow and motion value, plus the
reasoning behind the ones that look arbitrary.

Two things it settles that come up constantly:

- The repo carries **two** design systems — the marketing page (Anton/Inter/Caveat
  on `#000000`) and the in-app phone mockups (Poppins on `#000811`, sized in
  design units). They share exactly one token, `--color-ember`. Never mix them.
- The colour token names are inverted: `--color-charcoal` is a light cream,
  `--color-bone` is black. Read values, not names.

## Dont changes
Dont change the layout or the animations of the website , just change other thing on design aspects

## Commits

- Always commit with `git commit -s` (adds the `Signed-off-by` trailer).
- Never append the `Co-Authored-By: Claude ...` or `Claude-Session: ...`
  trailers. The message ends at the last body paragraph, followed only by the
  `Signed-off-by` line that `-s` adds.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

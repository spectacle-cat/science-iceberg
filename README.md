# Below the Surface

A fully static science atlas for shared, informal exploration. England KS3 provides the scope; the hierarchy is an editorial navigation map, not a nationally prescribed Year 7 sequence or a formal coverage certification.

## Work locally

No dependencies to install. Node.js runs the small static generator; Python is used only for a preview server.

```sh
npm run build
npm run check
npm run dev
```

Open http://localhost:4173. Each topic has a real generated HTML page, including unwritten topics. Only Biology, Chemistry and Physics have one-pagers initially. Deploy the contents of `dist/` to any static host; directory index pages must be supported. The Sites project identity is in `.openai/hosting.json`.

## Generate a chosen page

The reusable skill source is `skills/science-page/SKILL.md`. With the project open in Codex, invoke `$science-page` and name a topic or paste the request from its placeholder page. If the skill has not been installed on another laptop, ask Codex to read that file and follow it, or install the folder under `~/.codex/skills/science-page/`.

`content/tree.json` holds stable topic IDs, hierarchy and curriculum sources. `content/cards.json` holds only populated cards. Editing the tree changes navigation; adding one card fills one topic. Build and check afterwards, then republish. Keep IDs stable to retain existing progress.

## Progress

Ticks mean “we explored this”, not mastery. Ticking a parent does not tick descendants. Progress stays in localStorage at the current browser/origin and is never sent to a server. Changing device, browser or domain will not automatically transfer it. Download a backup under Your progress and restore it on another browser. Restore merges known topic IDs; it does not clear existing ticks. Storage failures show a notice and preserve progress in memory for download.

## Content and design

Three root cards introduce science with discussion prompts, revealable explanations, real applications, optional activities and parent guidance. All other pages deliberately remain empty. Scientific thinking is embedded in the card contract across all three subjects. The curriculum source is linked from the atlas and each tree node.

The site uses plain HTML/CSS/JS with SVG iceberg illustrations. It needs no model, API, database or server at runtime. Web fonts use Google Fonts with local system fallbacks. Generated text is HTML-escaped. The builder and checker validate structure, topic relationships and internal links; scientific content still needs editorial review.

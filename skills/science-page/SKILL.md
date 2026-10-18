---
name: science-page
description: Create a selected science one-pager for the Below the Surface static homeschool atlas. Use when asked to fill or revise a topic in this project's curriculum tree, preserving unselected placeholders.
---

# Science page

Work in the Below the Surface project containing `content/tree.json`, `content/cards.json` and `scripts/build.mjs`. Locate it in the current workspace (initial location: `/home/spec/Projects/Homeschool/science`). If installed globally, the skill directory is not the project directory.

The audience is an unschooled 14-year-old and a parent who is not confident in science. They discuss, draw and play together for about 20 minutes. Write with curiosity and plain language, without school-style lesson plans, grades, babyish tone or assumed prerequisite knowledge. The parent needs accurate explanations they can use immediately.

## Scope

Resolve the requested topic title or stable ID against `content/tree.json`. Generate only explicitly selected pages; do not fill children, siblings, or the whole tree. If the request identifies several possible topics, ask which one. Keep IDs and hierarchy stable because browser progress uses them. Do not equate KS3 with a nationally fixed Year 7 syllabus. The tree is a curated KS3 navigation map, not a certified coverage audit.

Read the selected node, its ancestors and any existing card. Verify relevant science against the node's curriculum source and appropriate authoritative sources (for example scientific institutions, universities or museums). Include links actually checked; do not fabricate references. The curriculum defines scope, but may not support every interesting application. Avoid copying lesson plans.

## Card contract

Add or replace only `content/cards.json[topicId]`, following the three existing subject cards. Plain strings are escaped by the renderer; do not insert HTML or executable code. Required string fields:

- `kicker`: short subject/context label.
- `headline`: intriguing, concrete title.
- `intro`: what the topic is, in two or three short sentences.
- `question`: an opening discussion prompt that elicits a prediction before explanation.
- `idea`: the high-level explanation, enough to answer the prompt accurately.
- `use`: why this matters in everyday adult life.
- `activity`: one optional practical comparison, drawing or thought experiment with ordinary materials and clear steps.
- `twist`: a transfer question that exposes understanding beyond repeating the explanation.
- `parent`: answer guidance for both questions, what to listen for, and limits of the analogy/model.
- `misconception`: a common mix-up and its correction.
- `science`: a relevant question about evidence, fair tests, measurement, uncertainty or models.

Also provide `hooks`: exactly three `[title, explanation]` string pairs, and `sources`: one or more `{ "title": "…", "url": "https://…" }` objects. Aim for roughly 350–550 words total, with deeper detail in the parent guidance rather than the opening.

Use striking examples when relevant: tanks, recoil, space, predators, corrosion, forensic science, explosions as phenomena. Do not force military themes into every topic. Explain mechanisms without weapon construction or hazardous experiments; use drawings and harmless models for those topics. Avoid overselling simplified models. Keep reproductive biology accurate and age-appropriate, and avoid personalised medical advice.

## Verify and deliver

Run `node scripts/build.mjs` then `node scripts/check.mjs` from the project directory. Inspect that the selected page changed from placeholder to content and that unselected cards remain unchanged. Review factual accuracy, units, the prediction/answer pairing, practical feasibility, and word count. The checker verifies structure and links, not scientific truth.

Report the selected topic and local output path. These are static files: regeneration does not update an existing public URL until redeployed. Follow the user's requested publishing scope; this skill itself does not grant fresh publication authority. Do not add a runtime AI backend or generate pages during browsing.

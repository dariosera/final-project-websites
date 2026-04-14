# Student Final Project Websites

This repository collects the final project websites built by students across our classes. It is used as part of an activity with guests from **Accessiway**.

## Structure

```
/
├── sommeiller/
│   └── first-year/
│       └── <project-name>/   # each group's project files
│   └── second-year/
│   └── third-year/
└── monti/
    └── ...
```

Each folder under a school and year contains the HTML/CSS project of a student group.

## Cloudflare deployment

This repository can be deployed as a static site with Wrangler.

1. Install Wrangler if needed: `npm install -g wrangler`
2. Log in to Cloudflare: `wrangler login`
3. Deploy from the repository root: `wrangler deploy`

The root [`index.html`](/home/radioresa/Documenti/Neta/final-project-websites/index.html) acts as a landing page and links to the student project folders.

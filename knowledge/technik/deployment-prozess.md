---
title: "Deployment-Prozess"
category: technik
tags: [deployment, ci-cd, release]
updated: 2026-02-18
author: IT-Team
---

## Ablauf

1. Feature-Branch wird per Pull Request in `main` gemergt
2. CI-Pipeline führt Tests und Build automatisch aus
3. Bei erfolgreichem Build: automatisches Deployment auf Staging
4. Manuelle Freigabe für Produktion durch Tech Lead
5. Deployment auf Produktion via Docker/Nginx

## Rollback

Bei Problemen: vorheriges Docker-Image erneut deployen
(`docker compose up -d` mit vorheriger Image-Version).

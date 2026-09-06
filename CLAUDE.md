# Internes Wissens-Dashboard

## Projektbeschreibung
Web-Dashboard für Firmenwissen mit KI-gestützter Suche.
Mitarbeiter stellen Fragen in natürlicher Sprache, das System 
antwortet basierend auf der internen Dokumentation.

## Tech-Stack
- Astro 5 + Tailwind CSS 4 (Dashboard-Frontend)
- n8n (API-Layer + Ingestion-Workflows)
- Claude API (Antwortgenerierung mit Kontext)
- Markdown-Dateien als Wissensquelle (in /knowledge/ Ordner)
- Docker + Nginx für Deployment
- Optional: Authentik oder HTTP Basic Auth für Zugangsschutz

## Funktionen
1. Suchleiste: Frage in natürlicher Sprache eingeben
2. Kategorien: SOPs, FAQs, Technik, HR, Onboarding (als Kacheln)
3. Antwort-Ansicht: KI-Antwort + Quellenangabe + Link zum Original
4. Dokument-Browser: Alle Dokumente nach Kategorie durchblättern
5. Admin-Bereich: Dokumente hochladen, bearbeiten, löschen
6. Aktivitäts-Log: Welche Fragen werden häufig gestellt?

## Design
- Clean, internes Tool-Look (nicht Marketing-Website)
- Dunkel/Hell-Modus (Toggle oben rechts)
- Suchleiste prominent oben (wie Google — groß, zentriert)
- Antworten in einer Chat-ähnlichen Bubble
- Schnelle Ladezeiten, kein Overhead
- Responsive aber Desktop-Fokus (interne Tools = meist Desktop)

## Seitenstruktur
1. / — Dashboard: Suchleiste + Kategorie-Kacheln + Letzte Fragen
2. /suche?q=... — Suchergebnis-Ansicht
3. /kategorie/[name] — Alle Dokumente einer Kategorie
4. /dokument/[slug] — Einzelnes Dokument anzeigen
5. /admin — Dokument-Verwaltung (geschützt)
6. /admin/upload — Neues Dokument hochladen
7. /admin/stats — Häufige Fragen, Nutzungsstatistik

## Wissensstruktur
/knowledge/
  /sops/ — Standard Operating Procedures
  /faq/ — Häufige Fragen
  /technik/ — Technische Dokumentation
  /hr/ — Personalthemen
  /onboarding/ — Neue Mitarbeiter

Jede Markdown-Datei hat Frontmatter:
---
title: "Kundenanlage im CRM"
category: sops
tags: [kunde, crm, anlage]
updated: 2026-03-15
author: Name
---

## Such-Algorithmus (RAG-Light)
1. Frage kommt rein
2. Keywords extrahieren (einfach: Stoppwörter entfernen)
3. Alle Markdown-Dateien nach Keywords + Tags durchsuchen
4. Top 5 relevanteste Dokumente (nach Treffer-Anzahl sortiert)
5. Diese 5 Dokumente als Kontext an Claude API senden
6. Claude antwortet NUR basierend auf dem Kontext
7. Quellenangabe (Dokumenttitel + Link) wird mitgeliefert

## Sicherheit
- Zugang nur mit Passwort (HTTP Basic Auth oder Session)
- Admin-Bereich zusätzlich geschützt
- Keine Daten an externe Services außer Claude API
- Wissens-Dateien liegen nur auf dem eigenen Server
---
title: "Server-Zugang einrichten"
category: technik
tags: [server, ssh, zugang]
updated: 2026-01-25
author: IT-Team
---

## Voraussetzungen

- SSH-Key wurde bei der IT hinterlegt
- VPN-Verbindung aktiv

## Einrichtung

1. SSH-Key generieren: `ssh-keygen -t ed25519`
2. Öffentlichen Key an die IT senden
3. Zugang testen: `ssh user@server.intern.example`

## Berechtigungen

Zugriff wird rollenbasiert vergeben. Erweiterte Rechte (sudo) nur nach
Freigabe durch die Teamleitung.

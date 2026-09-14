---
title: "Arbeits-Repositories für die FREUD-Community"
category: agentic
tags: [agentic, freud, communnity.claude, hugo]
updated: 2026-09-07
author: Koenig Christian
---
# Willkommen bei der FREUD-Community

![Freud](img/freud_logo.png)

## Über dieses Repo

Dies ist das erste einer Serie von Arbeits-Repositories für die FREUD-Community. Mit diesem Repo starten wir unsere
Reise.

FREUD "lebt" in Source-Repositories, genauer in einem [Development Container](https://containers.dev/). Dieses Repo
ist das Minimum, was Ihr braucht, um mit FREUD arbeiten zu können. Es gibt bis jetzt hier keine Sourcen, es gibt nur
FREUD.

Genaugenommen hat jedes Source-Repository seinen eigenen FREUD, denn FREUD kann man konfigurieren. Dieser hier ist
für die erste Community-Übung konfiguriert.

## Rechtliches

* Die FREUD-Konfiguration in diesem Repository arbeitet mit einem Sprachmodell, das **FÜR DIENSTLICHE ZWECKE
  NICHT ZULÄSSIG** ist!
* Das verwendete Gratis-Sprachmodell _Big Pickle_ ist ein sogenanntes Ghost-Modell. Ein unbekannter, wahrscheinlich
  chinesischer Hersteller stellt es gratis bereit, verwendet aber die Daten zum Training
* Die Verwendung für Schulungszwecke ist nur dann zulässig, wenn allfällig verwendete Daten dafür ausdrücklich
  freigegeben wurden
* Das ist hier der Fall

## Was ist FREUD?

FREUD ist eine Entwicklungsumgebung für [Agentic Coding](https://share.google/aimode/1Wy9EzQAzdliAHKEl), bestehend
aus [OpenCode](https://opencode.ai/), [OpenSpec](https://openspec.dev/) in einem
[Development Container](https://containers.dev/), getestet und lauffähig in
[Visual Studio Code](https://code.visualstudio.com/), angereichert mit Wiener Charme.

FREUD ist in der selben Kategorie wie [Claude Code](https://claude.com/de/product/claude-code) oder
[Cursor](https://cursor.com/get-started). FREUD kann beliebige Sprachmodelle verwenden und ist nicht an eine
Anbieterfirma gebunden. Alle Basiskomponenten sind Open Source.

FREUD ist _Work In Progress_. Der Aufbau von FREUD kann und wird sich für und mit uns weiterentwickeln,
die Marke bleibt bestehen.

## Voraussetzungen für die Teilnahme

* Ein Entwicklungsrecher (privat oder Entwicklerarbeitsplatz der Stadt Wien) mit mindestens 32 GB Arbeitsspeicher.
  Getestet wird mit Apple Macbook Pro, Linux und
  [Windows 11 mit WSL2 EAP](https://confluence.wien.gv.at/display/AGORA/Entwicklungsumgebungen+und+Testserver)
* [Docker Desktop](https://docs.docker.com/desktop/) installiert und gestartet
* [Visual Studio Code](https://code.visualstudio.com/)
* [Git](https://git-scm.com/) installiert
* Zugang zu GitHub Enterprise in der Cloud

Basis-Fähigkeiten im Umgang mit der Linux-Shell sind notwendig, Entwicklungs-Skills ebenfalls.
Wir fokusieren nicht auf "Wunscherfüllung mit Magie", wir fokusieren auf Entwickler:innen, die wissen,
wie sie ein Problem lösen können, und die sich der KI bedienen, um noch produktiver zu sein.

## Erste Schritte

1. Nur vor der ersten Nutzung:

   * Öffnen von [OpenCode Zen](https://opencode.ai/zen) im Browser
   * Drücken von \[Get Started with Zen\]
   * Login mit "Google" oder "GitHub"
   * Kopieren des "Default API Key" und notieren an einem sicheren Ort
   * Man kann unter "Abrechnung" / "Billing" eine Zahlungsmethode hinterlegen, muss aber nicht, weil
     "OpenCode Zen" auch Gratis-Modelle zur Verfügung stellt

2. Nur [EAP](https://confluence.wien.gv.at/display/AGORA/Entwicklungsumgebungen+und+Testserver) oder WSL2 allgemein:

   * Öffne Docker Desktop
   * In `⚙️ / "Resources" / Tab "WSL Integration"` aktiviere "Enable integration with my default
     WSL distro"
   * In `⚙️ / "Resources" / Tab "Advanced"` deaktiviere den "Resource Saver" (wichtig beim Bauen des Devcontainers)
   * \[Apply\]

3. Öffne ein Terminal mit einer Shell (bash oder zsh) und klone das Daten- und das Arbeits-Repo

    ```bash
    # Erstellen eines Verzeichnisses für die Repos
    mkdir -p ~/freud
    cd ~/freud

    # Daten-Repo klonen
    git clone https://stadtwien.ghe.com/PACE/freud-test-data.git

    # Arbeits-Repo klonen
    git clone https://stadtwien.ghe.com/PACE/freud-community-01.git

    # Repos abkoppeln, sie sind für die Teilnehmer nicht schreibbar
    for d in freud-community-01 freud-test-data ; do
        ( cd $d ; git remote remove origin )
    done

    # Nicht benötigte Docker-Ressourcen freigeben (auf Prompt mit 'y' antworten)
    docker system prune -a
    ```

    Wenn das `docker`-Kommando scheitert, dann ist Docker Desktop entweder nicht installiert, läuft nicht
    oder die Integration mit WSL ist nicht aktiviert

4. Öffne Visual Studio Code (am EAP in Windows) und starte den Devcontainer

   * Öffne das Arbeitsverzeichnis `~/freud/freud-community-01` ("File / Open Folder", Ctrl-K + Ctrl-O)
   * Ein Popup-Fenter unten links frägt, ob das Verzeichnis in einem Container geöffnet werden soll.
     Bestätigen mit \[Reopen in Container\]
   * Beim ersten Öffnen wird nun der Container erst gebaut. Das kann einige Minuten dauern. Solange
     der Container nicht gelöscht wird, steht er zur Verfügung und ein weiteres Öffnen geht schnell
   * Öffne ein Terminal innerhalb von VSCode. Der in Terminals angezeigte Prompt `vscode ➜ /workspace (main) $`
     zeigt, dass wir uns im Verzeichnis `/workspace` des Devcontainers befinden. Diesem Verzeichnis ist das vorher
     angelegte Arbeitsverzeichnis `~/freud/freud-community-01` überlagert worden. Es ist der einzige Teil des
     Host-Computers, der in dieser VSCode-Instanz sichtbar ist. Der Container läuft unter dem Benutzer `vscode` und
     `main` ist der Branch des Arbeits-Repos.

        ```bash
        vscode ➜ /workspace (main) $ pwd
        /workspace
        vscode ➜ /workspace (main) $ id
        uid=1000(vscode) gid=1000(vscode) groups=1000(vscode),995(pipx),996(python),997(nvm),998(sdkman),999(dotnet)
        vscode ➜ /workspace (main) $ ls -laF
        total 416
        drwxr-xr-x 7 vscode vscode   4096 Aug  5 12:00 ./
        drwxr-xr-x 1 root   root     4096 Aug  5 12:17 ../
        drwxr-xr-x 3 vscode vscode   4096 Aug  4 07:36 .agents/
        drwxr-xr-x 5 vscode vscode   4096 Aug  5 09:54 .devcontainer/
        -rw------- 1 vscode vscode 388576 Aug  5 10:02 freud_logo.png
        drwxr-xr-x 8 vscode vscode   4096 Aug  5 12:20 .git/
        drwxr-xr-x 7 vscode vscode   4096 Aug  5 09:48 .opencode/
        -rw-r--r-- 1 vscode vscode   1299 Aug  5 09:48 opencode.json
        drwxr-xr-x 4 vscode vscode   4096 Aug  4 08:01 openspec/
        -rw-r--r-- 1 vscode vscode   2982 Aug  5 11:22 README.md
        vscode ➜ /workspace (main) $ node --version
        v24.19.0
        vscode ➜ /workspace (main) $ dotnet --version
        9.0.316
        vscode ➜ /workspace (main) $ java -version
        openjdk version "26.0.2" 2026-07-21
        OpenJDK Runtime Environment Temurin-26.0.2+10 (build 26.0.2+10)
        OpenJDK 64-Bit Server VM Temurin-26.0.2+10 (build 26.0.2+10, mixed mode, sharing)
        vscode ➜ /workspace (main) $ python3 --version
        Python 3.14.6
        vscode ➜ /workspace (main) $
        ```

Das Arbeitsverzeichnis ist sichtbar, diverse Entwicklungswerkzeuge stehen zur Verfügung. Node.js mit **Javascript** und
**Typescript** steht immer zur Verfügung, weil OpenCode in Typescript geschrieben ist. Für diese Übung haben wir die
die gebräuchlichen Programmiersprachen **Java**, **dotNET / C#** und **Python** hinzugefügt.



5. Starte OpenCode

   * Öffnen einer beliebigen Datei. In der Tab-Zeile findet sich nun rechts oben eine Schaltfläche mit
     dem OpenCode-Logo, einem schwarzen Rechteck mit weißem, fast rechteckigem Buchstaben "O".
     ![OpenCode-Logo](img/opencode-logo.png)
   * Drücken des OpenCode-Logos
   * OpenCode läuft nun innerhalb von VSCode in einem Terminal und sieht so aus:

     ![OpenCode](img/opencode.png)

6. Beim ersten Mal: Verbinde mit OpenCode Zen

   * Klicke in den Prompt _Ask anything... "Fix a TODO in the codebase"_ und gib `/connect` ein
   * Wähle "OpenCode Zen"
   * Gib Deinen OpenCode Zen API-Key ein und drücke die \[Return\]-Taste
   * Den Dialog zur Modellauswahl kannst Du sofort mit \[Esc\] beenden. Es ist bereits das Gratis-Modell **Big Pickle**
     für die beiden Modi **Plan** und **Build** eingestellt

**Gut zu wissen:**

   * Im OpenCode-Fenster kannst Du durch Selektieren mit der Maus den selektierten Text kopieren. Ctrl-C hingegen
     beendet OpenCode
   * Mit \[TAB\] wechselt man zwischen den Modi **Plan** und **Build**
   * Kommandos In OpenCode beginnen mit `/`. Sobald man diesen in das Prompt-Feld tippt, erscheint ein Menü
     möglicher Kommandos
   * Im Prompt-Feld von OpenCode kann m an mit \[Cursor-Up\] und \[Cursor-Down\] in der Hirstorie der Eingaben
     navigieren
   * Du kannst bei OpenCode Zen Zahlungen aktivieren, musst aber nicht. Wir verwenden nur die Gratis-Modelle
   * Die Liste der über OpenCode verfügbaren Modelle mit ihren Preisen ist nachzulesen auf
     [https://llm24.net/provider/opencode](https://llm24.net/provider/opencode)

## Anpassungspunkte

* Der Aufbau von FREUD, reduziert auf die wesentlichen Konfigurationspunkte, ist wie folgt:

  ```
  freud-community-01
  ├── .agents
  │   └── skills
  ├── .devcontainer
  │   ├── Dockerfile
  │   ├── devcontainer-lock.json
  │   ├── devcontainer.json
  │   ├── features
  │   │   ├── freud-opencode
  │   │   └── freud-opencode-openspec
  │   └── scripts
  ├── .opencode
  │   ├── commands
  │   │   ├── freud
  │   │   ├── git
  │   │   ├── opsx-apply.md
  │   │   ├── opsx-archive.md
  │   │   ├── opsx-explore.md
  │   │   ├── opsx-propose.md
  │   │   ├── opsx-sync.md
  │   │   ├── opsx-update.md
  │   │   └── spec
  │   ├── plugins
  │   │   ├── freud
  │   │   └── freud.ts
  │   └── skills
  │       ├── openspec-apply-change
  │       ├── openspec-archive-change
  │       ├── openspec-explore
  │       ├── openspec-propose
  │       ├── openspec-sync-specs
  │       └── openspec-update-change
  ├── opencode.json
  └── openspec
  ```

* `opencode.json`:

    * LLM-Provider
    * Defaults für Modelle (hier **Big Pickle**)
    * Freigegebene Kommandos im Container (Permissions), nach denen die Benutzer:in nicht gefragt wird

* `.agents/skills/`: Leeres Verzeichnis für zusätzliche Skills, auch selbst geschriebene

* `.opencode/`: Sollte nicht verändert werden

* `.devcontainer/Dockerfile`: Das Basisimage ist hier definiert. Normalerweise kein Änderungsbedarf

* `.devcontainer/devcontainer.json`:

    * Definiert "Features", die dem Basisimage hinzugefügt werden. Das sind z.B. Programmiersprachen und
      Werkzeuge. Je mehr Features hinzugefügt werden, desto größer wird das Container-Image udn desto
      länger dauert der initiale Build. Eine [Liste von verfügbaren Features](https://containers.dev/features)
      ist im Internet verfügbar. Wenn ein für den Agenten benötigtes Programm (z.B. der Dokumentenkonverter
      `pandoc`) im Basis-Image nicht vorhanden ist, dann sollte man es bevorzugt als Feature installieren
      und nicht im `.devcontainer/Dockerfile` nachinstallieren oder gar bauen.

    * "Customizations" können verwendet werden, um bestimmte VSCode-Extensions in Devcontainer zur Verfügung
      zu haben, egal, ob sie im VSCode am Host installiert wurden. Man kann damit die Arbeitsugebung
      über Entwickler:innen hinweg standardisieren

## Das Daten-Repo

Das Daten-Repo ist eine Kopie der Source des [Foto-Blogs von Andreas Manessinger](https://blog.andreas-manessinger.info/)

```tree
freud-test-data
├── 01-hugo-blog
│   ├── archetypes
│   │   └── default.md
│   ├── comments
│   │   └── post
│   ├── config.toml
│   ├── content
│   │   ├── page
│   │   └── post
│   ├── data
│   │   └── lead_images.yml
│   ├── hugo.sh
│   ├── layouts
│   ├── LICENSE
│   ├── notes.md
│   ├── public
│   │   ├── _redirects
│   │   ├── 2006
│   │   ├── 2007
│   │   ├── 2008
│   │   ├── 2009
│   │   ├── 2010
│   │   ├── 2011
│   │   ├── 2012
│   │   ├── 2013
│   │   ├── 2014
│   │   ├── 2015
│   │   ├── 2016
│   │   ├── 2017
│   │   ├── 2018
│   │   ├── 2019
│   │   ├── 2020
│   │   ├── 2021
│   │   ├── 2022
│   │   ├── 2023
│   │   ├── 2024
│   │   ├── 2025
│   │   ├── 2026
│   │   ├── 404.html
│   │   ├── about
│   │   ├── books
│   │   ├── categories
│   │   ├── comment
│   │   ├── css
│   │   ├── favicon.ico
│   │   ├── feed
│   │   ├── feeds
│   │   ├── fonts
│   │   ├── images
│   │   ├── index.html
│   │   ├── index.xml
│   │   ├── page
│   │   ├── post
│   │   ├── site-notice
│   │   ├── sitemap.xml
│   │   ├── tags
│   │   └── webcomponents
│   ├── README.md
│   ├── resources
│   ├── static
│   │   ├── _redirects
│   │   ├── favicon.ico
│   │   └── webcomponents
│   ├── tab.yml
│   └── themes
│       └── manessinger_com
└── README.md
```

Insgesamt sind das 10929 Verzeichnisse und 28706 Dateien. Diese Daten sind aus einem öffentlichen Repo auf GitHub,
stehen unter [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/deed.de) und sind vom Autor ausdrücklich
für die Verwendung durch die FREUD-Community freigegeben. Es besteht keinerlei Gefahr einer Rechtsverletzung.

## Übung 1

### Vorbereitung

Öffne ein Terminal-Fenster **außerhalb von VSCode**.

```bash
❯ cd ~/freud/freud-test-data/01-hugo-blog/

freud-test-data/01-hugo-blog on  main
❯ ./hugo.sh
Starting Hugo development server in foreground. To stop, press ^C

Unable to find image 'hugomods/hugo:std-base-non-root' locally
std-base-non-root: Pulling from hugomods/hugo
4f4fb700ef54: Pull complete
42b20d8196c4: Pull complete
33693f11bfa5: Pull complete
33bef87b7b4c: Pull complete
a8075c3b787f: Pull complete
dd0f0761f1a1: Pull complete
55afa1ecc21d: Pull complete
d7960adca635: Download complete
Digest: sha256:9aa69d1daec2e6834f7c02eacab3c16164add0d5759f9133816cbe32bd9396b1
Status: Downloaded newer image for hugomods/hugo:std-base-non-root
Watching for changes in /src/archetypes, /src/content/{page,post}, /src/data, /src/layouts, /src/static/webcomponents, /src/themes/manessinger_com/archetypes, /src/themes/manessinger_com/i18n, /src/themes/manessinger_com/layouts/{_default,partials,taxonomy}, /src/themes/manessinger_com/static/{css,feed,feeds,fonts,images}
Watching for config changes in /src/config.toml
Start building sites …
hugo v0.164.0-ce2470e7012b5ab5fc4e10ebe4027e9f8d9e00dc linux/amd64 BuildDate=2026-07-06T16:39:30Z VendorInfo=hugomods


                  │  EN
──────────────────┼──────
 Pages            │ 9074
 Paginator pages  │ 5351
 Non-page files   │    0
 Static files     │   58
 Processed images │    0
 Aliases          │  896
 Cleaned          │    0

Built in 19699 ms
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1314/ (bind address 0.0.0.0)
Press Ctrl+C to stop
```

[Hugo](https://gohugo.io/) ist ein [Static Site Generator](https://jamstack.org/generators/). Er läuft jetzt in
einem Container im Development-Modus. Öffne [http://localhost:1314/](http://localhost:1314/) in einem Browser.

Versuchst Du, die URL im Development-Container aufzurufen, dann geht das nicht. Aus Sicht des Containers ist
`localhost` der Container selbst:

```bash
vscode ➜ /workspace (main) $ curl -I http://localhost:1314/
curl: (7) Failed to connect to localhost port 1314 after 1 ms: Couldn't connect to server
```

Stattdessen verwenden wir bei Docker Desktop den speziellen Hostnamen `host.docker.internal`, um Ports am
Host anzusprechen.

```bash
vscode ➜ /workspace (main) $ curl -I http://host.docker.internal:1314/
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 30951
Content-Type: text/html; charset=utf-8
Last-Modified: Wed, 05 Aug 2026 20:16:31 GMT
Date: Wed, 05 Aug 2026 20:46:01 GMT
```

### Aufgabe

Erzeuge ein Kommandozeilenprogramm, das, ausgehend von einer Start-URL, den Links auf der Seite rekursiv folgt,
aber nur wenn es interne Links (selber Host) sind. Externen Links wird nicht gefolgt. Das Programm soll einfach nur
eine Liste von Links ausgeben.

OpenCode hat keinen Zugriff auf das Datenverzeichnis, wir werden aber fordern, dass das entstehende Programm
mit der Website [http://host.docker.internal:1314/](http://host.docker.internal:1314/) arbeiten soll.

### Lösungsweg

#### Methode

Wir verwenden OpenSpec als Methode. Dabei wird, ausgehend vom derzeitigen Zustand des Repos, ein "Change"
diskutiert, formal erarbeitet, implementiert und abgeschlossen. Der jeweilige Endzustand wird mit einer
maschinenlesbaren Spezifikation abpgeglichen und die Spezifikation an die neu implementierte Realität
angepasst.

#### Kommandos

* `/ospx-explore` versetzt den Planungs-Agenten in einen Zustand, in dem er nichts ausführen kann, aber Lösungswege
  phantasievoll auslotet. Der Agent wird Fragen stellen, und dann irgendwann anbieten, einen Lösundsvorschlag zu
  formalisieren
* `/ospx-propose` kann direkt verwendet werden, um einen ausgereiften Lösundsvorschlag zu formalisieren. Das
  bedeutet, dass der Agent einen Plan fü einen Change erstellt und ihn unter `openspec/changes/` ablegt. Der
  Plan enthält "Proposal", "Design", "Specs" und "Tasks".
* `/ospx-apply` führt den Plan mit dem Build-Agenten aus, bis alle Tasks abgearbeitet sind
* `/ospx-sync` integriert die Änderungen durch abgeschlossene Changes mit den Spezifikationen unter
  `openspec/specs/`. Dort sammelt sich über die Zeit die Information über die aktuelle Implementierung
* `/ospx-archive` archiviert abgeschlossene Changes
* `/git/commit` erzeugt strukturierte Commits, getrennt nach unabhängigen Änderungen
* `/freud/couch` stellt drei Fragen, deren Antworten nicht aus der bisherigen Dokumentation und dem Code
  hervorgehen. Was der Code macht, das mag klar sein, nicht aber, warum der Code es macht

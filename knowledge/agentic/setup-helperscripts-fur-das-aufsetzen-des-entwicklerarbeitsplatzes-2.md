---
title: "Setup-Helperscripts für das Aufsetzen des Entwicklerarbeitsplatzes"
category: agentic
tags: [setup, claude]
updated: 2026-09-07
author: Koenig Christian
---
# Setup-Helperscripts für das Aufsetzen des Entwicklerarbeitsplatzes

## Anforderung

Der Entwicklerarbeitsplatz (EAP) ist über den Digital Workplace (DWP) 
[anzufordern](https://dwp.wien.gv.at/dwp/app/#/catalog). Auf der Seite 
ist unter der Überschrift _Entwicklerarbeitsplatz_ die Kachel
_Virtueller Entwicklerarbeitsplatz On-Premises_ zu wählen.

Nach Auswahl der Anforderungsart _Installation eines virtuellen EAP On-Prem_ 
sind eine Reihe von Fragen zu beantworten. 

Wählt man bei der Programmiersprache _Other_, dann führt das zu einem 
Genehmigungsschritt durch die Führungskraft. Diese muss zur Genehmigung
in den [DWP](https://dwp.wien.gv.at/dwp/app/) einsteigen.

Für die Entwicklung von Container-Applikationen ist das 
[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/)
erforderlich, sowie [Docker Desktop](https://www.docker.com/products/docker-desktop/).
Hinzu kommen IDEs und andere Werkzeuge. Die Dimensionierung sollte also nicht
zu knapp ausfallen. Empfehlenswert sind 8 CPUs und 32 GB RAM. Eine Harddisk
mit 500 GB ist ausreichend.

Der EAP wird von der Firma ACP installiert. Nach Fertigstellung erfolgt eine 
Verständigung in Form von zwei Emails, eine vom DWP und eine von der ACP mit
dem Rechnernamen.

## Entwickler-Netzwerk (historisch)

Die aktuell ausgelieferten EAPs sind bereits im richtigen Netzwerk

~~Vor dem Einsteigen sollte der EAP ins VLAN 2729 verschoben werden. Dazu Mail an 
Stefan Kovarik, BAP2 (stefan.kovarik@wien.gv.at, +43 1 4000 71878) unter 
Angabe des Rechnernamens. Beim Verschieben in ein anderes Netz erfolgt ein 
Reboot. Erst danach sollte in den neuen EAP eingestiegen werden.~~

## Inbetriebnahme

Der EAP verwendet _Ivanti User Rights Management_ zur Einschränkung dessen,
was unter Windows mit administrativen Rechten gemacht werden kann. _Ivanti_
wird nach dem Ersteinstieg der Benutzer:in via Policies installiert. Dazu
sind mehrere Reboots notwendig, und der Reboot beim Netzwerk-Verschieben
zählt nicht mit.

### Vorsicht!

_Rebooten_ bedeutet, dass im Startmenü rechts unten der Knopf
_Ein/Aus_ gedrückt wird und im darauf erscheinenden Menü **Neu starten**
gewählt wird - **niemals** _Herunterfahren_. Wenn der EAP heruntergefahren wird,
kann er von der Benutzer:in nicht mehr gestartet werden!

### Vorgehensweise

* Reboot
* mehr als 10 Minuten Warten
* Reboot
* Im Startmenü "power" eingeben, rechten Mausklick auf _Powershell_, 
  _Datenspeicherort öffnen_, damit öffnet sich der Explorer mit dem
  Verzeichnis der Powershell. Mit SHIFT-MausRechts erscheint das Kontextmenü.
  MausRechts ohne SHIFT bringt auch ein Menü, aber dort muss man erst
  _Weitere Optionen anzeigen_ auswählen, um zum richtigen Kontextmenü
  zu kommen. In diesem Kontextmenü sollte jetzt ein Eintrag 
  _Mit administrative Rechten ausführen_ verfügbar sein
* wenn nicht: rebooten und länger warten
* wenn verfügbar: Powershell mit administrativen Rechten starten

## Installationen via Powershell

In PS mit administrativen Rechten:

```powershell
curl https://repo.wien.gv.at/repository/eap/initial.setup/EAP_initial_setup.ps1 -o .\Downloads\EAP_initial_setup.ps1
.\Downloads\EAP_initial_setup.ps1
```

Das Script sollte mit Erfolg terminieren.

* Reboot

Die Powershell 7 (PS7) ist nun installiert und kann wieder mit der 
beschriebenen Methode gestartet werden.

In PS7 mit administrativen Rechten entweder

```powershell
wsl --install --web-download
```

oder

```powershell
wsl --install --distribution Ubuntu-24.04 --web-download
```

Anschließend Reboot.

## Installation von Docker-Desktop

Am Desktop befindet sich seit der Ausführung des Powershell-Scripts ein Icon 
mit dem Titel _UniGetUI_. Das ist die graphische Oberfläche für einen universellen
Windows-Packagemanager. Dieses Programm ist zu starten. 

Rechts oben ist ein Suchfeld (rechts davon eine Lupe). Dort gibt man "docker" ein.
In der darauf erscheinenden Liste scheint _Docker Desktop_ mehrmals auf. Das Paket 
mit der Paket-ID _Docker.DockerDesktop_ kann mit Rechtsklick / _Installieren_ 
installiert werden.

Anschließend Reboot.

Nach dem Wiedereinstieg

* Docker starten mit administrativen Rechten (Startmenü, "docker", _Speicherort_,
  im Explorer SHIFT-Rechtsklick, _Mit administrativen Rechten ausführen_
* User/PW für Proxy eingeben, Skip, Skip
* Login öffnet Browser, User/PW für Docker eingeben, danach "öffnen" zulassen 
  (reicht Login an bereits laufende Instanz weiter)

## Weitere Schritte in Linux

Ausgehend davon, dass am EAP WSL mit Ubuntu installiert ist, müssen eine Reihe
von Schritten durchgeführt werden. Der erste ist, in Ubuntu die Zertitfikate
des CA-Wien-Bundles zu installieren. Das Repo 
[https://bitbucket.wien.gv.at/scm/gpcdem/eap-setup-helpers](https://bitbucket.wien.gv.at/scm/gpcdem/eap-setup-helpers)
enthält in seinem [README.md](https://bitbucket.wien.gv.at/projects/GPCDEM/repos/eap-setup-helpers/browse/README.md)
genau diesen Text. Da er aktueller sein könnte und nur im Repo gepflegt wird,
sollte mit der Version im Repo fortgefahren werden.

### Installieren des Zertifikats-Bündels

Das Repo kann zu diesem Zeitpunkt noch nicht geklont werden. Am EAP sind unter Windows
zwar die Zertifikate aus dem Zertifikats-Bündel der Stadt Wien bereits installiert,
aber nicht in Linux.

Das Script [install-ca-wien-bundle-in-ubuntu.sh](https://bitbucket.wien.gv.at/projects/GPCDEM/repos/eap-setup-helpers/browse/install-ca-wien-bundle-in-ubuntu.sh) muss deshalb manuell angelegt und per Cut+Paste befüllt werden. Danach kann es mit

```bash
sudo bash -c "./install-ca-wien-bundle-in-ubuntu.sh"
```

ausgeführt werden.

### Linux-Paketmanager für den Proxy konfigurieren

Die Installation von Paketen in Linux ist zu dem Zeitpunkt noch nicht möglich, weil 
der Ubuntu-Paketmanager _apt_ erst konfiguriert werden muss, um für Netzwerk-Zugriffe
den Proxy zu verwenden. Eine Methode ist, das Script [install-apt-proxy.sh](https://bitbucket.wien.gv.at/projects/GPCDEM/repos/eap-setup-helpers/browse/install-apt-proxy.sh) zu verwenden:

```bash
mkdir -p ~/src
cd ~/src
git clone https://bitbucket.wien.gv.at/scm/gpcdem/eap-setup-helpers.git
cd eap-setup-helpers
sudo bash -c "./install-apt-proxy.sh"
```

Alternativ kann auch gemäß der 
[Anleitung in AGORA](https://confluence.wien.gv.at/display/AGORA/WSL) der Nexus als 
Proxy konfiguriert werden, aber, Vorsicht, die Anleitung ist für Ubuntu 22.04 LTS (Jammy Jellyfish),
was wahrscheinlich nicht die aktuell installierte Ubuntu-Version ist.

### Linux-Update

Die frisch installierte Linux-Distribution ist nicht auf dem tagesaktuellen Stand.
Die Aktualisierung erfolgt mit:

```bash
sudo su
apt update
apt upgrade
```

Dabei kann es zu Timeouts kommen. Bei Abbruch

```bash
Err:1 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 packagekit-tools amd64 1.2.8-2ubuntu1.2
  502  badgateway [IP: 10.199.232.30 3128]
Err:2 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 packagekit amd64 1.2.8-2ubuntu1.2
  Connection failed [IP: 10.199.232.30 3128]
E: Failed to fetch http://archive.ubuntu.com/ubuntu/pool/main/p/packagekit/packagekit-tools_1.2.8-2ubuntu1.2_amd64.deb  502  badgateway [IP: 10.199.232.30 3128]
E: Failed to fetch http://archive.ubuntu.com/ubuntu/pool/main/p/packagekit/packagekit_1.2.8-2ubuntu1.2_amd64.deb  Connection failed [IP: 10.199.232.30 3128]
E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
```

kann der Vorgang einfach wiederholt werden. Im Beispielfall mit über 100 Paketen hat 
erst der dritte Versuch funktioniert.

Eine Umstellung auf den Nexus als Paketquelle würde das Timeout-Problem lösen,
ist aber fragiler.

## Entwicklung von Linux-basierten, containerisierten Applikationen

Wir entwickeln zwar für Container, und prinzipiell kann man auch _in Containern_ entwickeln,
aber die bequemste und schnellste Methode ist (am Beispiel einer Single Page Application, SPA) 
das direkte Arbeiten mit z.B.Frontend-Developmentserver (in einem Terminalfenster laufend) und IDE.
Mit dieser Methode wirken sich Änderungen im Frontend unmittelbar aus, und für Änderungen
im Backend ist nur ein Neustart des Backend-Services notwendig.

Das heißt also, wir benötigen Entwicklungswerzeuge am EAP installiert.

### Visual Studio Code

_Visual Studio Code (VSC)_ ist bereits unter Windows installiert. Mit dem Extension-Pack _Remote Development_
von Microsoft erhält man die Extensions _WSL_ und _Dev Containers_. Nach der Installation kann man 
in VSC mit dem Verbindungs-Icon (gegenläufige Pfeilspitzen, linke untere Fensterecke, unter dem Zahnrad)
ein Menü aufklappen und _Connect to WSL_ auswählen.  

Beim ersten Mal wird ein Serverteil in Linux heruntergeladen, dann ändert sich der Verbindungs-Icon 
und daneben steht z.B. _WSL: Ubuntu-24.04_.

### Kommandozeilen-Werkzeuge

Grundsätzlich kann man die meisten Programmiersprachen und Kommandozeilenwerkzeuge auch
über den Ubuntu-Paketmanager installieren. Der Nachteil davon ist, dass man damit an
den Relese-Zyklus der installierten Linux-Distribution bindet. Wir verwenden deshalb 
[Homebrew](https://brew.sh/), den universellen, ursprünglich für Apple MacOS entwickelten
Packagemanager.

Dieser Schritt ist optional.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bashrc
exec bash
```

Nun kann man sich seine Entwicklungswerkzeuge in der gewünschten Version installieren.
Für ein [Golang](https://go.dev/)-Backend zu einem [React](https://react.dev/)-Frontend
bräuchte man z.B. die Programmiersprache _Go_ und [Node.js](https://nodejs.org/). 
_Node.js_ existiert gleichzeitig in verschiederen Versionen, das installiert man am besten 
über einen Versionsmanager, also z.B. das weitverbreitete, in BASH geschriebene 
[nvm](https://github.com/nvm-sh/nvm), oder das in [Rust](https://www.rust-lang.org/) geschriebene
[fnm](https://github.com/Schniz/fnm). Man würde also z.B. folgende Kommandos aufrufen:


```bash
brew install go
brew install fnm
echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> ~/.bashrc
exec bash
fnm install 24
brew install pnpm
```

Danach sieht man folgende installierte Versionen

```bash
$ go version
go version go1.24.3 linux/amd64

$ node --version
v24.1.0
```

Man hätte mit `brew install go@1.23` auch eine ältere Version installieren können, so ist es die aktuelle.

Mit `brew update` erhält man jeweils Updates auf die installierte Version, bei aktuellen Versionen 
führt ein Update auch zu einem Upgrade auf die nächste Version. Aus z.B. `go1.24.7` wird also
irgendwann `go1.25.0` werden. Die parallele Installation ist natürlich auch möglich.

### IntelliJ IDEA Ultimate

Via _UniGetUI_ kann man IntelliJ IDEA installieren, entweder in der Community-Version oder der 
Ultimate-Version. Das richtige Paket für Ultimate ist das mit der Paket-ID `JetBrains.IntelliJIDEA.Ultimate`.
Es gibt auch mit "EAP" markierte Pakete, das heißt dann aber _Early Access Program_ (und nicht
_Entwicklerarbeitsplatz_).

Wir entwickeln Applikationen basierend auf Linux-Containern. Deshalb wollen wir in WSL arbeiten, d.h. unsere
Source-Repositories auf ein Linux-Filesystem in WSL klonen, in einer Linux-Shell Linux-Kommandos ausführen.

Es gibt nun zwei Möglichkeiten Dateien in WSL zu editieren, und die unterscheiden sich dahingehend, wo der
Editor läuft. Man kann in WSL natürlich `vi` (eigentlich `vim`) verwenden, aber die Mehrzahl der Entwickler:innen 
wollen den Komfort einer modernen IDE mit grafischer Benutzeroberfläche haben.

Für _Visual Studio Code_ bietet Microsoft seit Jahren Remote-Unterstützung, d.h. man kann VSCode in Windows
laufen lassen und damit Verzeichnisse in WSL (oder in der Cloud) öffnen. Das geht jetzt auch mit JetBrains-IDEs
sehr gut.

Man erspart sich damit das deutlich weniger performante Laufenlassen der Oberfläche innerhalb von WSL und der 
Darstellung durch einen X-Server oder den mit WSL mitgelieferten Wayland-Compositor. Startet man die IDE direkt 
in Windows, dann ist die Oberfläche sehr responsiv, so wie man sich das erwartet.

#### Installation der Linux-Version für Remote-Development in WSL

Das Prinzip ist gleich wie bei VSCode. Man öffnet im Startdialog von IntelliJ IDEA in _Remote Development_ / _WSL_
ein WSL-Projekt. Anfangs wird es keines geben, deshalb klickt man auf das "Plus" neben dem "Zahnrad". Ein Dialog 
öffnet sich, man wählt die WSL-Installation (es könnten mehrere Linux-Installationen unter WSL parallel 
installiert sein) der beim Aufsetzen installierten Distribution, hier also _Ubuntu_.

Im nächsten Dialog wählt man die IDE und das Projekt-Verzeichnis (in Linux). Als IDE wird hier die gleiche Version 
zum Download vorgeschlagen, die auch unter Windows läuft.

Normalerweise sollte man hier einfach den Button _Download IDE and Connect_ drücken können, aber das funktioniert in 
unserer Umgebung nicht.

Stattdessen laden wir mit dem Browser in Windows von 
[https://www.jetbrains.com/idea/download/other.html](https://www.jetbrains.com/idea/download/other.html) die 
aktuelle Linux-Version (zum Zeitpunkt des Schreibens 
[https://download.jetbrains.com/idea/ideaIU-2025.1.2.tar.gz](https://download.jetbrains.com/idea/ideaIU-2025.1.2.tar.gz)) 
herunter und speichern sie unter Windows im _Downloads_-Verzeichnis. 

Zurück zum immer noch geöffneten Dialog. Unter der IDE-Auswahl ist ein Link `Installation options...`. 
Klickt man auf diesen, dann öffnet sich ein Menü, aus dem man _Upload installer file_ wählt. Statt der IDE-Auswahl
steht dann jetzt ein Eingabefeld für Dateiupload mit der Bezeichnung _Select archive file_. Hier wählt man die 
heruntergeladene Datei `ideaIU-2025.1.2.tar.gz` aus. Nun kann man den Button _Upload IDE and Connect_ drücken.
Die IDE wird nun ins WSL geladen, dort im Homedirectory der Benutzer:in gespeichert, ausgepackt und unter`
`~/.cache/JetBrains/` installiert. Danach öffnet sich die gewohnte IntelliJ IDEA-Benutzeroberfläche. 

In dieser IDE (die bis auf die Oberfläche in WSL läuft) kann man Plugins installieren, die Plugins updaten,
aber was man nicht kann, das ist das Updaten der IDE selbst. Dazu ist ein weiterer Download von 
[https://www.jetbrains.com/idea/download/other.html](https://www.jetbrains.com/idea/download/other.html)
nötig und ein nochmaliges Uploaden nach WSL. Die in WSL installierten Versionen sind unter `~/.cache/JetBrains/`
als versionierte Verzeichnisse sichtbar. Alte Versionen kann man von dort auch löschen.

Wenn eine IDE in Linux bereits installiert ist, dann wird sie beim nächsten Öffnen eines WSL-Projekts
bereits vorausgewählt sein, und dam Button steht _Start IDE and Connect_.

### NPM und der Proxy

_Node.js_ verwendet nicht die Systemzertifikate, unser Proxy macht aber _TLS Introspection_,
das heißt, er bricht die TLS-Verbindung auf. Im Prinzip ist das nichts anderes als eine
klassische _Man in the Middle-Attacke_, nur eben gewollt. Zum Aufbrechen der Verbindung muss
dem aufrufenden Programm ein Zertifikat präsentiert werden, das dem gewünschten Hostnamen des 
Ziels entspricht. Der Proxy erzeugt diese Zertifikate on-the-fly, sie sind aber mit unserer eigenen
CA zertifiziert. Diese haben wir bereits am Anfang im Linux-System installiert, aber, wie gesagt, 
_Node.js_ verwendet sie ja nicht. Mit

```bash
npm config set strict-ssl false
```

schalten wir deshalb die Überprüfung aus. Ist das gefährlich? Nein, im Gegenteil, denn am Proxy
wird ja der Inhalt der Verbindung sicherheitsgeprüft.


## Entwickeln für Applikationen hinter dem Standardportal

In der Dokumentation zu [Container Smart CI (CSC)](https://stp.wien.gv.at/container-smart-ci/docs/)
wird das [Standardportal detailliert erklärt](https://stp.wien.gv.at/container-smart-ci/docs/030_rules/010_security_portal.html) 
und im Kapitel über den [CSC Ingress](https://stp.wien.gv.at/container-smart-ci/docs/030_rules/020_ingress.html)
wird auch demonstriert, wie der Ingress in einem 
[Entwicklermodus](https://stp.wien.gv.at/container-smart-ci/docs/030_rules/020_ingress.html#development_mode) 
verwendet werden kann, um auf einem Entwicklungsrechner das Standardportal zu simulieren.

### Installation des `csc-ingress`

Mit dem Script [install-csc-ingress.sh](https://bitbucket.wien.gv.at/projects/GPCDEM/repos/eap-setup-helpers/browse/install-csc-ingress.sh) kann `csc-ingress` wie folgt installiert werden:

```bash
./install-csc-ingress.sh Andreas Manessinger
```

Statt _Andreas Manessinger_ sollte natürlich der eigene Vor- und Nachname verwendet werden.

Das Script legt im Homedirectory der Benutzer:in ein Verzeichnis `bin` an, und dorthin wird
`csc-ingress` installiert. Wenn das Verzeichnis beim Login vorhanden ist, dann wird es automatisch
dem Pfad hinzugefügt. Wenn es neu angelegt wurde, dann sollte man im Linux-Fenster die Shell 
als Login-Shell neu starten.

```bash
exec bash -l
```

Ferner werde zwei Konfigurationsdateien angelegt, nämlich `~/.csc-ingress-config.yaml`

```yaml
log-proxy-rules: true
# log-request-data: true
scan-interval: 10
listen-port: 8444
use-https: false
http-header-forwarded-proto: "x-pvp-orig-scheme"
http-header-forwarded-host: "x-pvp-orig-host"
logfile: /home/man0001/log/csc-ingress.log
```

und `~/.csc-ingress-dev-config.yaml`

```yaml
random-user: false
header-set: "stp"
portal-role-default: "_no_role"
default-user-idx: 0
users:
    # 0
  - user-id: "wien1.man0001@wien.gv.at"
    given-name: "Andreas"
    family-name: "Manessinger"
    email: "andreas.manessinger@wien.gv.at"
    ou: "GPC1"
    assignment-attributes: "tenant(name=GPC1);prjsupport();tbac();crud();apiclient()"
user-headers:
  - name: "stp"
    headers:
      user-id: "X-PVP-USERID"
      given-name: "X-PVP-GIVEN-NAME"
      family-name: "X-PVP-PRINCIPAL-NAME"
      email: "X-PVP-MAIL"
      ou: "X-PVP-OU"
      assignment-attributes: "X-PVP-ROLES"
common-headers:
  - name: "stp"
    headers:
      portal-scheme: "X-PVP-ORIG-SCHEME"
      portal-host: "X-PVP-ORIG-HOST"
      portal-application: "X-PORTAL-APPLICATION"
      portal-role: "X-PORTAL-ROLE"
      portal-zone: "X-PORTAL-ZONE"
proxy-defs:
  - prefix: "/wienermelange-react-demo/app/api"
    port: 6680
    timeout: 10
    trim-path: 3
  - prefix: "/csc-starter/api"
    port: 3080
    timeout: 10
    trim-path: 3
  - prefix: "/csc-starter/docs"
    port: 8000
    timeout: 10
    trim-path: 3
```

Der Ingress wird in einem Linux-Fenster gestartet mit 

```bash
csc-ingress --dev-mode
```

Er läuft dann im Vordergrund und hört auf dem in `~/.csc-ingress-config.yaml` konfigurierten 
Port 8444. HTTPS ist deaktiviert.

Alle 10 Sekunden sieht er nach, welche Docker-Compose-Applikationen laufen.

---
title: "Power BI Bereitschaft GDA - Handbuch"
category: support
tags: [powerbi, bereitschaft, ssas, fehlersuche, handbuch]
updated: 2026-09-06
author: Kohl Mario
---
# Power BI Bereitschaft GDA

## Handbuch

---

## Agenda oder Tagesordnungspunkte

I. Handbuch (Von PowerBI zu DB)
II. Historischer Fall

---

## I. Handbuch (Von PowerBI zu DB)

Behandlung möglicher Fehlerquellen

---

## Fehlersuche von PowerBI zu DB
### Inhaltsverzeichnis (Handbuch)

🏠 (4) Fehlersuche von PowerBI zu DB

(5) [PowerBI (Service) reagiert generell nicht](#powerbi-service-reagiert-nicht)

(6) [Rechte in PowerBI (Frontend)](#rechte-in-powerbi-frontend)

(7) [Rechteverwaltung in PowerBI](#rechteverwaltung-in-powerbi)

(8) [Konfiguration der Datenquelle in PowerBI](#konfiguration-der-datenquelle-in-powerbi)

(9) [Verfügbarkeit und Konfiguration des SSAS](#verfügbarkeit-und-konfiguration-des-ssas)

(10) [SSAS Cube Aktualisierung](#ssas-cube-aktualisierung)

(11) [Rechteverwaltung im SSAS](#rechteverwaltung-im-ssas)

(12) [User- & Rechteverwaltung II](#user--rechteverwaltung-ii)

(13) [RLS im SSAS (Multidimensional)](#rls-im-ssas-multidimensional)

(14) [RLS im SSAS (Tabular)](#rls-im-ssas-tabular)

(15) [Kontrolle der Beladung im SQL Server Agent](#kontrolle-der-beladung-im-sql-server-agent)

(16) [SQL Agent-Job – Kontrolle der Konfiguration](#sql-agent-job--kontrolle-der-konfiguration)

(17) [Zusammenfassung Voraussetzungen](#zusammenfassung-voraussetzungen)

**Anmerkung:**  
In dieser Unterlage ist Scheduling per AUTOMIC noch nicht berücksichtigt!  
(Würde eine Auswirkung bei Folie (15 & 16) haben.)

---

## PowerBI (Service) reagiert nicht

### Wie restartet man PowerBI Service?

**Voraussetzung:**
- Zugriffsrecht über Cyberark (https://cyberark.wien.gv.at/)  
  Look-Up PBI-Server: https://confluence.wien.gv.at/display/PBIPlattform/PowerBI+OnPremises+Server
- Recht zum Durchstarten des Dienste

---

## Rechte in PowerBI (Frontend)

### Hat der User die notwendigen Rechte in PowerBI?

Sofern im Stamm bzw. einen Unterordner ersichtlich können die FrontEnd-Rechte im PowerBI administriert werden.

**Nicht Teil der Bereitschaft:**
- Versteckte Ordner (im Stamm bzw. Unterordner nicht ersichtlich)
- Wartung der RLS (= Row Level Security) (z. B.: wg. fehlender Berechtigungen)
- SAAS-Server: Hier sind die Magistrate selbst verantwortlich,  
  Zuständigkeit der Bereitschaft endet bei der Gewährleistung des funktionierenden Systems

-> In diesen Fällen kann nur auf den nächsten Arbeitstag verwiesen.

---

## Rechteverwaltung in PowerBI

### Übersicht Rollen und Vererbung

Wenn diese Schaltfläche sichtbar ist, bedeutet dies, dass die automatische Vererbung der berechtigten Gruppen/User mit deren Rechten von der übergeordneten Eben deaktiviert ist.

Durch Aktivieren verschwindet diese und der Ordner/Bericht erbt ALLE Rechte der übergeordneten Ebene.

(Details zum PowerBI können in Confluence nachgelesen werden.)

---

## Konfiguration der Datenquelle in PowerBI

### Ist die Datenquelle des Dashboards richtig konfiguriert?

**! Aufbereitung der Daten im Dashboard ist nicht Bestandteil der Bereitschaft!**

**Ist der richtige Umgebung hinterlegt?**  
(Wenn Information zur Verfügung steht)  
Info welcher SSAS-Server & -Cube hinterlegt!

**Ist der richtige Service-User (lt. SSAS) hinterlegt?**

Wenn RLS verwendet werden soll/ist, muss dieser Punkt aktiviert sein, damit der SAM-Account Name des Benutzers richtig an SSAS übergeben wird.

---

## Verfügbarkeit und Konfiguration des SSAS

### Wenn SSAS nicht mehr reagiert oder man die Datenquelle sucht

**Voraussetzung:** Management-Studio & Admin-Rechte auf SSAS-Server

Info auf welchen Server und welche Datenbank das SSAS-Projekt sich bezieht.  
(Notwendig bei weiterer Fehlersuche im Agent-Job!)

**Restart des Service:**  
Wenn SSAS-Server nicht mehr reagiert

(Service-)User über dem auf die DB zugegriffen wird.  
(Hat der User die notwendigen Rechte in der DB?)

---

## SSAS Cube Aktualisierung

### Wie aktualisiert man einen SSAS-Cube?

**Nicht Teil der Bereitschaft:**
- Inhaltliche Fehler in einem SSAS-Cube sind nicht Teil der Bereitschaft!
- > Es ist auf den nächsten Arbeitstag zu verweisen.

---

## Rechteverwaltung im SSAS

### User- & Rechteverwaltung I

Diese Rechte können direkt auf der Role-Startseite vergeben werden:
- **Full Control:** alle Rechte
- **Process database:** vergibt alle Rechte um den Cube zu aktualisieren
- **Read definitions:** Darf NUR die Metadaten und Dimensionen lesen

---

## User- & Rechteverwaltung II

Es können AD-User oder AD-Gruppen hinterlegt werden.

In folgenden Gruppen können die einzelnen Zugriffsrechte allgemein auf die jeweilige Gruppe eingestellt werden.

---

## RLS im SSAS (Multidimensional)

### Wie kann man kontrollieren ob RLS (= Row Level Security) im Einsatz?

**Nicht Teil der Bereitschaft:**
- Wartung der RLS

---

## RLS im SSAS (Tabular)

### Wie kann man kontrollieren ob RLS (= Row Level Security) im Einsatz?

**Nicht Teil der Bereitschaft:**
- Wartung der RLS

---

## Kontrolle der Beladung im SQL Server Agent

### Wie kontrolliert man am SQL Server ob der Job (erfolgreich) gelaufen ist?

**Voraussetzung:** Management-Studio & „SQLAgentOperatorRole" in [msdb] für die betroffenen Server

Es können die letzten Ausführungen (auf Schritt-Ebene) und deren Rückmeldungen ausgewertet werden.

---

## SQL Agent-Job – Kontrolle der Konfiguration

### Konfiguration der Job Eigenschaften

- Hat der (wenn ausgefüllt) hinterlegte Service-User die notwendigen Rechte?
- Stimmt die hinterlegte Datenbank bzw. ist das Skript valide?

---

## Zusammenfassung Voraussetzungen

### Jene Rechte müssen für die beschriebenen Anwendungsmöglichkeiten gegeben sein

**PowerBI:**
- Zugriffsrecht über Cyberark (https://cyberark.wien.gv.at/)
- Recht zum Durchstarten des Dienste (direkt auf Server)
- Mitgliedschaft in der AD-Gruppe WIEN1\PROD_MAGBI_COVID_MA01_Admin

**SSAS:**
- Zugriff auf (installiertes) Management-Studio
- Recht „Server Administrator" auf SSAS-Server

**SQL-Server:**
- Zugriff auf (installiertes) Management-Studio
- Recht „SQLAgentOperatorRole" in [msdb] auf MS-SQL-Server

**Nicht Teil der Bereitschaft:**
- Darstellung in den Dashboards
- inhaltliche Fehler (z. B.: Zahlen entsprechen nicht der Erwartungshaltung des Kunden)
- Fehlende Berechtigungen (v. a. bei RLS)
- SAAS-Server: Hier sind die Magistrate selbst verantwortlich,  
  Zuständigkeit der Bereitschaft endet bei der Gewährleistung des funktionierenden Systems

-> In diesen Fällen kann nur auf den nächsten Arbeitstag verwiesen werden!

---

## Historischer Fall

---

## Use Case

### Ticket/Anruf - Anfragen:
- DAS Dashboard geht nicht… (Standardinfo von Kunden)
- „Dashboardpowerbi" geht nicht… (irreführende Auskunft über Link)

### Schritt 1: Identifizierung des Dashboards

- Welches Dashboard funktioniert nicht?  
  -> Am besten den User anrufen (Nummer steht im Ticket) der das Problem gemeldet hat.  
  -> Link schicken lassen bzw. mit User tel. aufrufen
- Greift der User auf das richtige Dashboard zu. PROD Link bzw. DEV Link überprüfen.
- Handelt es sich um ein technisches Problem  
  -> Dashboard funktioniert nicht (technisch)  
  ODER zeigt das Dashboard falsche Zahlen an (inhaltlich -> Next Business Day)
- Wenn der Power BI Server nicht erreichbar ist -> Folie 5

---

### Schritt 2: Fehler anschauen

- Dashboard Link aufmachen und den Fehler des Users analysieren.  
  Auch hier am besten telefonisch mit dem User den Fehler besprechen.
- Problemfeststellung:  
  z. B.: Dashboard: EMS-Liste – „Seite1 AGES Linelist" zeigt heute keine Daten. Letzter Abzug: vor 2 Tagen, sollt aber stündlich aktuell sein.
- Werden die Daten bei euch angezeigt aber bei dem User nicht  
  –> Berechtigungsproblem (eventuell RLS) oder User greift auf DEV Dashboard zu.  
  –> Bei falscher Umgebung auf PROD verweisen, sonst Schritt 3

### Schritt 3: Berechtigungsproblem:

- Siehe Folie 6
- Wenn kein Berechtigungsproblem besteht weiter zu Schritt 4

---

### Schritt 4: Datenquelle des Dashboards anschauen

- Informationen öffnen
- Dashboard -> More Info -> Manage/Verwalten
- Nähe Infos auf Folie 6-7

---

### Schritt 5: Datenquelle identifizieren

- Wo liegt der Job?
- Wo liegt das SSAS-Model?
- nähere Infos auf Folie 8

---

### Schritt 6: SSAS Analyse

- Mangement Studio öffnen, zum Job und zum Model navigieren.

---

### Schritt 6: SSAS Analyse – Job Analyse

- Kontrolle wann der Job das letzte Mal erfolgreich gelaufen ist.
- Dazu muss man zum Job navigieren der das Model belädt und in der Folie 15 wird erklärt, wie man die letzte Aktualisierung prüft.
- Wenn der Job nicht im Aktualisierungsrythmus aktualisiert wurde  
  -> Job manuell nachstarten
- Meldungen:
  - 1) Model läuft ohne Probleme durch -> Nächste Seite
  - 2) Model wirft einen Fehler -> inhaltlicher Fehler  
    -> Next Business Day

---

### Schritt 6: SSAS Analyse- Model Analyse

- Rechtsklick auf das Model und auf Properties
- Hier seht man wann das Model zuletzt gelaufen ist.
- Model manuell processen -> Rechtsklick auf das Model -> Process (Folie 10)
- Mode: Process Full und mit OK bestätigen

---

### Schritt 7: Meldungen nach dem Processen

- 1) Model läuft ohne Probleme durch  
  -> Daten im Dashboard kontrollieren, das Problem sollte gelöst sein.
- 2) Model wirft einen Fehler  
  -> inhaltlicher Fehler z.b: Failed to save modifications to the server. Error returned: 'The 'SysCreateDate' column does not exist in the rowset. Im Datenabzug fehlt anscheinend die Spalte "SysCreateDate".  
  -> Next Business Day
- Nähere Infos auf Folie 10

---

## Danke

**Anmerkung:** Dieses Dokument wird in elektronischer Form geführt. Gedruckte Kopien können vom aktuellen Stand abweichen.

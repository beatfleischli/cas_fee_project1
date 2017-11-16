# cas_fee_project1

## Installieren


```
# Voraussetzungen
-> node.js und npm müssen installiert sein: https://www.npmjs.com

# Repo in eigenen Account forken
-> Button 'Fork' oben rechts

# und Clonen
$ git clone https://github.com/{USERNAME}/cas_fee_project1.git

# Oder Zip herunterladen
-> grüner Button 'Clone or download' mitte rechts

# In Projektordner wechseln (-> CLI)
$ cd cas_fee_project1

# Zum aktuellen Branch wechseln
$ git checkout classes

# Dependencies installieren
$ npm install

```

## App ausführen

```
# Starten
$ npm start

# Im Browser 
http://localhost:3007/
```

## Funktionalität
Gemäss Wireframe und Spezifikation.
- Sortieren: der erste Klick sortiert die Einträge in aufsteigender, der zweite in Absteibender Reihenfolge. Ein dritter Klick führt zurück in den unsortierten Zustand.
- Filterung: der erste Klick zeigt alle abgschlossenen, der zweite Klick alle nicht abgeschlossenen Einträge an. Der dritte Klick ruft wieder alle Einträge in unsortiertem Zustand auf.
- Ein Klick auf einen anderen Button setzt den angefangenen Zyklus zurück.
- Mit den Navigations-Buttons Back und Forward kann die Seite korrekt gewechselt werden.
# Student Study Hub

## Scopo dell'Applicazione

Student Study Hub è uno strumento progettato per aiutare gli studenti a visualizzare, organizzare e navigare materiali di studio complessi. L'applicazione carica i dati da un file JSON di progetto e li trasforma in un'interfaccia interattiva a doppio pannello, rendendo più semplice comprendere la struttura degli argomenti e approfondire i dettagli.

Lo scopo principale è fornire una visione d'insieme chiara attraverso una mappa mentale e, allo stesso tempo, permettere un accesso rapido e intuitivo ai contenuti di riepilogo dettagliati.

## Funzionalità Principali

- **Caricamento da File JSON**: L'applicazione inizia caricando un file `.json` fornito dall'utente, che contiene tutti i dati del progetto di studio.
- **Dashboard dei Progetti**: Se il file JSON contiene più progetti, viene visualizzata una dashboard con una scheda per ogni progetto, permettendo all'utente di selezionare quale visualizzare.
- **Vista di Studio Interattiva**: Il cuore dell'applicazione è una vista a due pannelli:
    1.  **Mappa Mentale (Sinistra)**: Una rappresentazione gerarchica e comprimibile dell'outline del materiale di studio. Fornisce una visione chiara della struttura degli argomenti, delle idee principali e delle sotto-idee.
    2.  **Riepilogo Dettagliato (Destra)**: Un pannello che mostra i contenuti completi, organizzati in schede (tab) che corrispondono alle idee principali.
- **Navigazione Sincronizzata**: Questa è la funzionalità chiave che abbiamo sviluppato. Cliccando su un qualsiasi nodo (argomento) nella mappa mentale a sinistra:
    - Il nodo viene evidenziato.
    - Il pannello del riepilogo a destra passa automaticamente alla scheda corretta.
    - La vista scorre fluidamente fino alla sezione esatta corrispondente al nodo selezionato.
    Questo trasforma la mappa mentale in un potente strumento di navigazione.

## Come si Usa

1.  **Avvia l'applicazione**: Apri l'applicazione nel browser.
2.  **Carica il tuo progetto**: Trascina e rilascia il tuo file `.json` nell'area di upload, oppure clicca per selezionarlo dal tuo computer.
3.  **Seleziona un Progetto**: Se il file contiene più progetti, clicca sulla scheda del progetto che desideri studiare.
4.  **Naviga ed Esplora**:
    - Usa la mappa mentale a sinistra per avere una visione d'insieme della struttura. Puoi espandere o comprimere le sezioni per concentrarti su aree specifiche.
    - Clicca su un qualsiasi titolo nella mappa mentale. La vista a destra si aggiornerà e ti mostrerà immediatamente i dettagli di quella sezione, eliminando la necessità di scorrere e cercare manualmente.

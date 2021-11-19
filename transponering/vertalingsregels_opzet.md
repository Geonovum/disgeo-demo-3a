## Vertalingsregels en afleidingsregels

### Inleiding

Om te komen tot een samenhangend Gebouw in de SOR, moet data gecombineerd worden uit de BAG, BGT, WOZ en BRT. Om te weten welke data hoe gecombineerd moet worden, is een informatieanalyse nodig en veel kennis van de huidige basisregistraties. Op basis van deze informatieanalyse moeten vertaalregels gespecificeerd worden. De vertaalregels kunnen vervolgens worden gebruikt in de omzetting van data uit de huidige basisregistraties naar de SOR. In een slimme architectuur kunnen deze regels een plek krijgen in de 'semantische laag' die ervoor zorgt dat de data uit de huidige basisregistraties in samenhang kunnen worden benaderd. De vertaalregels vertellen dan precies hoe de data uit de basisregistraties moeten worden omgezet naar data conform het IMSOR model. 

Tijdens deze High-5 hebben we een eerste (zeer kleinschaling!) begin gemaakt met het opstellen van zulke vertaalspecificaties, vooral om te beproeven waar we bij dit werk allemaal tegenaan lopen. 

We hebben voor de SOR objecttypen `Gebouw`, `Gebouwzone` en `Gebouwlaag` een eerste aanzet tot een mapping gemaakt. Hierbij bleek dat je in zo'n mapping twee soorten gevallen tegenkomt: 
- Het gegeven is aanwezig in een bronregistratie en moet worden _vertaald_ naar een gegeven in de SOR (en hierbij heb je dan nog allerlei gradaties van eenvoudige naar complexe mappings). Bijvoorbeeld: het gegeven `bouwlaag` van WOZ deelobject kan worden vertaald naar `bouwlaagnummer` van SOR Gebouwzone.
- Het gegeven is niet als zodanig aanwezig in een bronregistratie, maar kan wel worden _afgeleid_. Bijvoorbeeld: de 2.5D geometrie van Gebouwlaag. Gebouwlaag zit als attribuut in de WOZ, maar niet met een eigen geometrie. Dit gegeven kan op een slimme manier wellicht wel worden afgeleid uit de in WOZ en BAG aanwezige gegevens over 2D geometrie, gebouwtype, oppervlakte en bouwjaar.

Voor het realiseren van een semantische laag bovenop huidige registraties (volgens het model van de SOR) zijn dus _vertalingsregels_ en _afleidingsregels_  nodig. Deze willen we vastleggen op conceptueel niveau, zodat ze onafhankelijk zijn van een specifieke technische omgeving en (met hulp van de informatiemodelleur) zowel door domeinexperts als door programmeurs begrepen kunnen worden. 

Vertalingsregels geven aan hoe de gegevens uit verschillende bronnen zich laten vertalen in gegevens conform het model van de SOR. Deze regels kunnen gericht zijn op de specifieke registraties in het kader van de SOR, waarbij mappings worden toegepast gebaseerd op transponeringstabellen. Echter is het ook wenselijk om deze regels zodanig op te stellen dat ze generiek genoeg zijn voor hergebruik buiten de context van de basisregistraties. Dit zou waardevol zijn voor de aansluiting met sectorale registraties; het gaat dan over breed toepasbare modelleerpatronen.

Afleidingsregels zijn nodig om uniformiteit te waarborgen. In gevallen waar het belangrijk is om afgeleide informatie vast te leggen in de SOR, dient deze afleiding op gestructureerde wijze te worden vastgelegd. Hiermee kunnen interpretatieverschillen in de inwinning/vastlegging van gegevens worden vermeden. 

Afleidingsregels hebben betrekking op datgene wat momenteel niet expliciet in de registraties is opgenomen, maar wel van belang is voor de SOR. In principe zullen er geen afleidingsregels worden gespecificeerd voor bestaande registratiegegevens die momenteel worden afgeleid uit andere registraties. Echter is het wel belangrijk deze gevallen in kaart te brengen, zodat in een latere fase kan worden gekeken naar automatische afleiding vanuit de SOR.  

### Verschillende soorten vertalingsregels
Vertalingsregels kunnen eenvoudige één op één mappings zijn, maar ook complexe omzettingen. Toen we keken naar de mappings vanuit BAG, BGT en WOZ naar SOR Gebouw kwamen we op vertalingsregels die van zeer eenvoudig to zeer complex gingen. In deze paragraaf geven we een overzicht van de varianten.  

Vertalingsregels kunnen betrekking hebben op vertalingen tussen de volgende elementen:

In basisregistratie | In SOR | Voorbeeld
--------------------|--------|----------
waardelijst waarde | waardelijst waarde | Simpel geval: BRT-Gebouw.typeGebouw `Toren` = SOR-Gebouw.type `Toren`. Het komt ook voor dat de waarde in de bronregistratie een nauwer begrip lijkt te zijn van een waarde in de SOR, bijvoorbeeld: BRT-Gebouw.typeGebouw `Boortoren` < (specifieker dan) SOR-Gebouw.type `Toren`\*. Soms lijkt er een relatie te zijn tussen de waardes van lijsten die behoren tot verschillende objecttypes. In deze gevallen is extra aandacht nodig voor het mappen en afleiden van attributen/relaties. 
objecttype | objecttype | BAG Pand = SOR Gebouw
attribuutsoort waarde | attribuutsoort waarde | BAG-Pand.oorspronkelijk bouwjaar `<waarde>` = SOR-Gebouw.oorsponkelijk bouwjaar `<waarde>`
waardelijst waarde | objecttype | BGT-BegroeidTerreindeel.fysiekvoorkomen `heide` = SOR-Heide. 
objecttype | waardelijst waarde | nog niet gevonden
waardelijst waarde | attribuutsoort waarde | nog niet gevonden
attribuutsoort waarde | waardelijst waarde | WOZ-object.aanduiding_repeterend `ja` = SOR-Gebouw.aard `repeterend`
objecttype | attribuutsoort waarde | nog niet gevonden
attribuutsoort waarde | objecttype | WOZ `bouwlaag` attribuut met getalswaarde wordt in SOR objecttype `Bouwlaag` met eigen 2.5D geometrie. NB hierbij moet de geometrie afgeleid worden.

<aside class='note'>*Idealiter zou de nadere relatie tussen BRT `Boortoren` en SOR `Toren` al in de context van de registratie worden gespecificeerd, echter zijn zulke hiërarchische lijsten niet beschikbaar. Bij bevragingen vanuit de SOR is dit wel belangrijk, vooral wanneer er vanuit de SOR nadere relaties bestaan met waardes/concepten uit verschillende registraties. Gebruikers hebben deze vastlegging nodig wanneer ze niet bekend zijn met de inhoud van alle onderliggende registraties. </aside>

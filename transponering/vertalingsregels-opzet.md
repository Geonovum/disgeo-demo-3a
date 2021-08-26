## Vertalingsregels en afleidingsregels

### Inleiding

Om te komen tot een geharmoniseerd / geconsolideerd Gebouw in de SOR, moet data gecombineerd worden uit de BAG, BGT, WOZ en BRT. Om te weten welke data hoe gecombineerd moet worden, is een informatieanalyse nodig en veel kennis van de huidige basisregistraties. Op basis van deze informatieanalyse moeten vertaalregels gespecificeerd worden. Tijdens deze high 5 hebben we een eerste begin gemaakt met dit werk, vooral om te beproeven waar we bij dit werk allemaal tegenaan lopen. 

We hebben voor de SOR objecttypen Gebouw, Gebouwzone en Gebouwlaag een eerste aanzet tot een mapping gemaakt. Hierbij bleek dat je in zo'n mapping twee soorten gevallen tegenkomt: 
- het gegeven is aanwezig in een bronregistratie en moet worden omgezet naar een gegeven in de SOR (en hierbij heb je dan nog allerlei gradaties van eenvoudige naar complexe mappings). Bijvoorbeeld: het gegeven `bouwlaag` van WOZ deelobject mapt naar `bouwlaagnummer` van SOR Gebouwzone.
- het gegeven is niet als zodanig aanwezig in een bronregistratie, maar kan wel worden _afgeleid_. Bijvoorbeeld: de 2.5D geometrie van Gebouwlaag. Gebouwlaag zit als attribuut in de WOZ, maar niet met een eigen geometrie. Dit gegeven kan op een slimme manier wellicht wel worden afgeleid uit de in WOZ en BAG aanwezige gegevens over 2D geometrie, gebouwtype, oppervlakte en bouwjaar.

Voor het realiseren van een semantische laag bovenop huidige registraties (volgens het model van de SOR) zijn dus _vertalingsregels_ en _afleidingsregels_  nodig. Deze willen we vastleggen op conceptueel niveau, zodat ze onafhankelijk zijn van een specifieke technische omgeving en (met hulp van de informatiemodelleur) zowel door domeinexperts als door programmeurs begrepen kunnen worden. 

Vertalingsregels geven aan hoe de gegevens uit verschillende bronnen zich laten vertalen in gegevens conform het model van de SOR. Deze regels kunnen gericht zijn op de specifieke registraties in het kader van de SOR, waarbij mappings worden toegepast gebaseerd op transponeringstabellen. Echter is het ook wenselijk om deze regels zodanig op te stellen dat ze generiek genoeg zijn voor hergebruik buiten de context van de basisregistraties. Dit zou waardevol zijn voor de aansluiting met sectorale registraties; het gaat dan over breed toepasbare modelleerpatronen.

Afleidingsregels zijn nodig om uniformiteit te waarborgen. In gevallen waar het belangrijk is om afgeleide informatie vast te leggen in de SOR, dient deze afleiding op gestructureerde wijze te worden vastgelegd. Hiermee kunnen interpretatieverschillen in de inwinning/vastlegging van gegevens worden vermeden. Afleidingsregels hebben betrekking op datgene wat momenteel niet expliciet in de registraties is opgenomen, maar wel van belang is voor de SOR. In principe zullen er geen afleidingsregels worden gespecificeerd voor bestaande registratiegegevens die momenteel worden afgeleid uit andere registraties. Echter is het wel belangrijk deze gevallen in kaart te brengen, zodat in een latere fase kan worden gekeken naar automatische afleiding vanuit de SOR.  

### Verschillende soorten vertalingsregels
Vertalingsregels kunnen eenvoudige één op één mappings zijn, maar ook complexe omzettingen. Toen we keken naar de mappings vanuit BAG, BGT en WOZ naar SOR Gebouw kwamen we op vertalingsregels die van zeer eenvoudig to zeer complex gingen. In deze paragraaf geven we een overzicht.  

Vertalingsregels kunnen betrekking hebben op vertalingen tussen de volgende elementen:

- BR waardelijst waarde - SOR waardelijst waarde
- BR objecttype - SOR objecttype
- BR attribuutsoort waarde - SOR attribuutsoort waarde

- BR waardelijst waarde - SOR objecttype
- BR objecttype - SOR waardelijst waarde

- BR waardelijst - SOR attribuutsoort waarde
- BR attribuutsoort waarde - SOR waardelijst waarde

- BR objecttype - SOR attribuutsoort waarde 
- BR attribuutsoort waarde - SOR objecttype (bouwlagen)


Transponeringstabellen worden gebruikt om in kaart te brengen welke transformaties waar van toepassing zijn. Voorbeelden hiervan:
1.	BR waardelijst waarde - SOR waardelijst waarde***
1.	BR waarde = SOR waarde:
1.	bij vergelijkbare objecttypes --> BRT-Gebouw.typeGebouw|Toren = SOR-Gebouw.type|Toren 
2.	bij verschillende objecttypes* --> WOZ-deelobject.type|kasteel (OZ-deelobject.type mapped normaal gesproken naar SOR-Gebouwzone.type of SOR-Verblijfsobject.feitelijk) = SOR-Gebouw.type|kasteel; etc.
2.	BR waarde < (nadere specificatie van) SOR waarde: 
1.	vergelijkbare objecttypes-->  BRT-Gebouw.typeGebouw|Boortoren < (nadere specificatie van) SOR-Gebouw.type|Toren 
2.	verschillende objecttypes* --> WOZ-deelobject.type|berging (WOZ-deelobject.type mapped normaal gesproken naar SOR-Gebouwzone.type of SOR-Verblijfsobject.feitelijk) < (nadere specificatie van) SOR-Gebouw.type|bijgebouw
3.	BR waarde > (breder dan) SOR waarde: (nog geen gevallen gevonden, is dit wel mogelijk - moeten we het ondersteunen?)
2.	BR waardelijst waarde - SOR objecttype (komt wel voor bij andere objecten zoals BGT-begroeid.fysiekvoorkomen|heide = SOR-heide, maar niet bij gebouwen voor zover ik weet. Misschien is dit het geval bij toegangsdeur? )
3.	BR attribuutsoort waarde - SOR waardelijst waarde --> WOZ-object.aanduiding_repeterend|ja = SOR-Gebouw.aard|repeterend ; WOZ-object.aanduiding_in_aanbouw|ja = SOR-Gebouw.status|in aanbouw


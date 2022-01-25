## Scope van de High-5

Tijdens de eerste uren van de eerste High-5 dagen in augustus 2021 hebben we gezamenlijk de scope besproken aan de hand van enkele scope-bepalende vragen. 

### Wat is ons startpunt?
Het inhoudelijke startpunt voor ons modelleerwerk is het DiS Geo: Eisen aan model samenhangende objectenregistratie document [[EMSO]]. De laatste inzichten van de DisGeo werkgroep Inhoud - Gebouwen zijn daarin beschreven. Voor ons van belang in dat document is ook het hoofdstuk Transitie / transponering, waarin beschreven is wat de relatie is tussen SOR inhoud en de huidige registraties. Hoewel de informatiemodellen van de huidige basisregistraties niet ons startpunt zijn, kijken we er wel naar, om te zien hoe deze zich verhouden tot het gewenste SOR model en wat er aan eventuele afleidingsregels nodig is.

### Hoe zit het met 3D representaties van objecten?
Voor deze High-5 is 3D buiten scope. We gaan uit van wat je uit de huidige basisregistraties kan halen, eventueel via afleiding. 3D representaties zitten nu niet in een basisregistratie. De 3D basisvoorziening bevat al wel 3D representaties van BAG/BGT objecten en ook de relatie met deze objecten is vastgelegd; het is dus mogelijk om het 3D model bij een object op te vragen. 

### Is de BRT in scope?
We hebben besloten de BRT te parkeren voor deze High-5. De BRT valt wel binnen de scope van de SOR; maar de relatie met BGT en BAG is niet eenvoudig te leggen. In het IGO traject is een analyse gedaan van de verhouding tussen BRT objecten en functies met andere basisregistraties. Zij hebben onder andere  gevonden dat er een n op n relatie is tussen BRT en BAG/BGT. Er staan ook gebouwen in de BRT die niet in de BAG/BGT staan. De BRT transponering staat bovendien niet in [[EMSO]] beschreven.

Hoewel niet eenvoudig, is het wel zeer interessant om in een latere fase naar de BRT te kijken in de context van SOR gebouwen. Je zou aan de hand van het object Gebouw kunnen onderzoeken hoe generalisatie in de semantische laag kan worden gedefinieerd. BRT is tevens interessant omdat het rijk is aan functies, ook voor gebouwen. In de SOR zijn deze BRT gebouwfuncties in samenhang gebracht met de functiebeschrijvingen in de WOZ. Dit heeft geresulteerd in de type lijst bij SOR Gebouw. Gekeken moet worden hoe deze informatie kan worden afgeleid uit de BRT en de WOZ. 

### Is de WOZ in scope? 
We hebben de WOZ in de eerste dagen van deze High-5 wel meegenomen. Op basis van onze bevindingen hebben we echter besloten om de WOZ voorlopig, in de hierop volgende implementatie-High-5, buiten scope te plaatsen. Het  informatiemodel SOR-Gebouw dat we hebben geproduceerd bevat dan ook geen objecttypen en kenmerken die uit de WOZ moeten worden afgeleid. 

Uit onze eerste exercities om een transponering op te stellen voor SOR gebouw in relatie tot BAG, BGT en WOZ, bleek met name de WOZ relatie een lastige te zijn. Meer hierover staat met name in [](#vertaling-naar-sor-gebouw) en [](#vertaling-naar-sor-gebouwzone).

### Wat is de relatie van energielabels met de SOR?
Het energielabel is typisch een gegeven van buiten de SOR; het moet mogelijk zijn voor een externe partij om dit te koppelen aan een SOR object en in samenhang te bevragen. Daarmee is het energielabel in scope van deze High-5. Het is een mooie use case om externe gegevens aan de SOR te koppelen.

Er is geen informatiemodel energielabels; we baseren ons in deze High-5 op een proza beschrijving. 

Van energielabels weten we het volgende: 
- Je kan altijd van een verblijfsobject het energielabel vinden, maar een energielabel kan aan verschillende verblijfsobjecten hangen. 
- Energielabels kunnen gerelateerd zijn aan een deel van een gebouw of aan een verblijfsobject. Wat dit 'deel van gebouw' is, is nog onduidelijk. Soms is dit een ruimtelijke 'koker' binnen een flatbebouw; daar lijkt een soort gebouwzone handig voor, maar in de huidige [[EMSO]] definitie past dat niet, want een gebouwzone moet zich volgens die definitie binnen een verdieping bevinden. Je zou hiervoor iets als de CityGML `BuildingUnit` moeten hebben.

### Gebouw in de huidige registraties

In de huidige basis- en sectorregistraties zijn er veel gegevens te vinden over een "gebouw". Als input voor deze High-5 hebben we de informatiemodellen van deze registraties genomen:
* BAG
* BGT
* WOZ
* EPBD - Energielabels
* EAN - Energie afgiftepunten

 In onderstaand plaatje hebben we getracht om deze te combineren tot één informatiemodel, zonder scherp te kijken naar de specifieke definitie van gebouw, noch kijkende naar de betekenis van eigenschappen.

<figure id="gebouw-huidige-registraties">
  <img src="media/gebouw-gegevens.drawio.png" alt="gebouw-huidige-registraties">
  <figcaption>Gebouw en aanverwante gegevens in huidige registraties</figcaption>
</figure>

Dit plaatje gebruiken we als startpunt voor de ontwikkeling tijdens de high-5 van een logisch SOR-informatiemodel voor gebouwen. In de loop van de High-5 hebben we, zoals eerder in dit hoofdstuk beschreven, de scope vernauwd door eerst de BRT en later ook de WOZ erbuiten te plaatsen. 

De volgende achtergrondinformatie stond bij de modellering tot onze beschikking:

*Informatiemodel BAG*

- [Gegevenscatalogus BAG](https://www.geobasisregistraties.nl/documenten/publicatie/2018/03/12/catalogus-2018)
- [Datamodel BAG](https://bag.basisregistraties.overheid.nl/datamodel)
- [Begrippenkader BAG](https://bag.basisregistraties.overheid.nl/resource?subject=https://bag.basisregistraties.overheid.nl/doc/begrippenkader/bag)

*Informatiemodel BGT*

- [Gegevenscatalogus BGT](https://docs.geostandaarden.nl/imgeo/catalogus/bgt/)
- [Informatiemodel IMGeo EAP en XMI](https://register.geostandaarden.nl/informatiemodel/imgeo/2.2/)
- [Begrippenkader IMGeo](https://definities.geostandaarden.nl/imgeo)

*Informatiemodel BRT*

- [Gegevenscatalogus BRT](https://www.kadaster.nl/-/brt-catalogus-productspecificaties)
- [Datamodel BRT](https://brt.basisregistraties.overheid.nl/datamodel)
- [Informatiemodel BRT EAP en XMI](https://register.geostandaarden.nl/informatiemodel/imbrt/1.2.3/)
- [Begrippenkader BRT](https://brt.basisregistraties.overheid.nl/resource?subject=https://brt.basisregistraties.overheid.nl/doc/begrippenkader/top10nl)

*Informatiemodel WOZ*

- [Documentatie IMWOZ, bespreekversie 6-8-2021](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html)

*Informatie over energielabels*

- [Informatiepagina RVO](https://www.rvo.nl/onderwerpen/duurzaam-ondernemen/gebouwen/hulpmiddelen-tools-en-inspiratie-gebouwen/ep-online)

*Informatie over energieafgiftepunten*

- [Casebeschrijving energieafgiftepunten](https://github.com/Geonovum/disgeo-demo-3a/blob/main/energieafgiftepunten/afgiftepunten.md)

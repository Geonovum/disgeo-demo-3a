# Implementatiefase

Dit hoofdstuk bevat de beschrijving van de opzet, resultaten en inzichten van de laatste experimenteersessie uit deze High-5 reeks, de implementatiedagen van januari 2022. 

Het gaat bij deze implementatie om een **verkenning** om te ervaren hoeveel (of hoe weinig) er van de SOR gerealiseerd kan worden vanuit de huidige registraties. Het is geen ontwikkeling maar onderzoek.

## Onderzoeksvragen
In deze fase implementeren we het gemaakte SOR Gebouw MVP model en de transponeringsregels. We willen de volgende vragen beantwoorden: 
- Is het SOR Gebouw model MVP te implementeren; waar loop je tegenaan
- Zijn de transponeringsregels te implementeren; waar loop je tegenaan

## Opzet

<figure id="2022-architectuur">
    <img src="media/2022-architectuur.png" alt="Architectuur van de implementatie"/>
    <figcaption>Architectuur van de implementatie</figcaption>
</figure>

De onderste laag van deze architectuur, ontsluiting bij de bron, is in de voorbereiding al gerealiseerd door het Kadaster. In deze High-5 realiseren we de bovenste laag, Services, met daarin afnamevoorzieningen voor verschillende doelgroepen: 
- Een Lookup API SOR Gebouw, conform het informatiemodel uit [](#imsor-gebouw-0). Deze API ondersteunt het gehele informatiemodel en regelt de orchestratie van BAG en BGT naar SOR. De REST API, URI Dereferencing service, en OGC Features API worden hier bovenop gebouwd. Het SPARQL Endpoint maakt gebruik van de URI Dereferencing service. De Lookup API is geen voorziening voor eindgebruikers.
- Een REST API voor de grote groep gebruikers die gegevens nodig heeft voor administratieve processen. De REST API ondersteunt vragen over gebouwen en geeft JSON terug. Deze API ondersteunt collecties met paginering, en heeft een endpoint voor individuele bevraging. Heeft ook CRS negotiation; de default is ETRS 89. Levert HAL JSON, compliant met NL API strategie. Geen JSON-LD (die zit wel in de URI dereferencing service). We maken gebruik van REST tooling om te laten zien dat het werkt. 
- Een URI Dereferencing service die op basis van de URI identifier van een object de gegevens teruggeeft als RDF. Het SPARQL Endpoint maakt gebruik van de URI Dereferencing service; het is in principe geen voorziening voor eindgebruikers.
- Een [OGC API Features](https://ogcapi.ogc.org/features/) (part 1) API die ruimtelijke vragen ondersteunt en GeoJSON en HTML ondersteunt. Deze API is voornamelijk bedoeld voor de gebruikers die de data willen gebruiken in GIS software. We realiseren een client GIS viewer om te laten zien dat het werkt.
- Een Linked Data API (SPARQL endpoint) bovenop een knowledge graph plus een data story om te laten zien dat het werkt. Deze voorziening is voor data scientists / business analisten en dergelijken.

Als proefgebied is voor Swifterbant (gemeente Dronten) gekozen. 

## Scope beperking
We zijn in de implementatiefase begonnen met een hele bescheiden scope met daarin alleen het objecttype `Gebouw`. Op dag 2 hebben we `Open Bouwwerk` hieraan toegevoegd en op dag 3 `Gebouwcomponent`. 

Aan `Verblijfsobject` en `Installatie` zijn we niet toe gekomen. 

## Resultaten

De implementatie-onderdelen zijn gerealiseerd in een ontwikkelomgeving van het Kadaster en helaas niet publiek beschikbaar. 

### Orchestratielaag en Lookup API SOR

De orchestratielaag is het intelligente hart van de architectuur: wat we aan het begin van deze High-5 serie de 'semantische laag' noemden. De orchestratielaag regelt de aggregatie van één of meerdere onderliggende services. Deze services kunnen fysiek bij verschillende organisaties worden gehost zodat een federatief systeem mogelijk is. Als gebruiker van de Lookup API hoef je geen kennis te hebben van de onderliggende systemen, in dit geval de BAG en de BGT. 

De Lookup API is onderdeel van deze orchestratielaag en zorgt voor ontkoppeling tussen onderliggende systemen en de uiteindelijke raadpleegvoorzieningen. Het resultaat van een zoekvraag door een gebruiker wordt door deze Lookup API samengevoegd uit antwoorden van de onderliggende systemen en met behulp van de transponeringsregels gemapped naar het IMSOR model. 

Deze architectuur met transponering en orchestratie in het hart resulteert in een “virtuele” basisregistratie. Alles gebeurt on the fly, er is geen tussentijdse opslag. 

De Lookup API heeft een [[GraphQL]] interface. Dit is een goed passende API stijl voor orchestratie, omdat het anders dan een gewone REST API, die een soort veelgestelde vragen voorziening is, een hoge mate van flexibiliteit biedt voor afnemers. Je kan zelf je vragen samenstellen en bepalen welke gegevens je in het resultaat wilt hebben. Ook is het mogelijk om delen van zoekvragen parallel te verwerken. 

<figure id="graphql-screenshot">
  <img src="media/2022-graphql-screenshot.png" alt="GraphQL screenshot">
  <figcaption>GraphQL query en resultaat</figcaption>
</figure>

### Transponeringsregels

De transponeringsregels die zijn opgesteld door inhoudelijke experts in de eerste en tweede High-5 sessie, zijn in de implementatiefase omgezet naar machineleesbare regel. Ze beschrijven de vertaling van brondatamodellen naar het doelmodel: het model van het samenhangende SOR gebouw. Deze transponeringsregels moet je zien als een soort configuratie. De orchestratielaag, de Lookup API is intelligent genoeg om deze regels te lezen, interpreteren en uitvoeren. De semantiek is zo gescheiden van de orchestratieprogrammatuur. 

De transponering is voor `Gebouw`, `Open Bouwwerk`, en `Gebouw component` gerealiseerd. Voor de meeste attributen van deze objecttypen is een regel opgesteld die beschrijft waarmee het moet worden gevuld uit de bronregistraties. Een aantal attributen is om verschillende redenen niet getransponeerd. Het overzicht staat hieronder. 

Het attribuut `status` dat in alle objecten voorkomt was een uitdaging om te transponeren. De SOR heeft een [nieuwe onderverdeling van levenscycli](https://docs.geostandaarden.nl/disgeo/emso/#levensfasen). Met behulp van het SOR begrippenkader hebben we de SOR levenscyclus slim op de BAG en BGT `status` kunnen mappen. 

De transponeringsregels zijn in deze fase als onderdeel van de LookUP API gerealiseerd ... 
<figure id="2022-transponeringsarch1">
    <img src="media/2022-transponeringsarch1.png" alt="Transponeringsregelsarch1"/>
    <figcaption>Transponeringsregels als onderdeel van de Lookup API</figcaption>
</figure>

... maar moeten uiteindelijk een apart onderdeel worden in de orchestratielaag. 

<figure id="2022-transponeringsarch2">
    <img src="media/2022-transponeringsarch2.png" alt="Transponeringsregelsarch2"/>
    <figcaption>Transponeringsregels gepositioneerd in de orchestratielaag</figcaption>
</figure>

Een algemene vraag die tijdens deze High-5 nog niet uitgebreid aan de orde is geweest, is _hoe kunnen we verifiëren of de vertaalregels correct zijn geïmplementeerd?_ Daarnaast zijn er altijd gedetailleerde transponeringsvraagstukken waar een oplossing voor gevonden moet worden. Een voorbeeld is _Wat als de bronhouder code van een BGT (pand) object niet hetzelfde is als die van het corresponderende BAG object?_ Dit is een kwaliteitsissue dat bij de transponering mogelijk aan het licht zou kunnen komen en waar een oplossingsrichting voor gekozen moet worden. 

#### Gebouw transponering

Er zijn transponeringsregels geschreven waarmee alle BAG `Pand` objecten worden getransponeerd naar SOR `Gebouw`. Enkele attributen van BGT `Pand` worden erbij gezocht. BGT OVerigBouwwerk met `type` = `Schuur` of `Bunker` worden ook getransponeerd naar SOR Gebouw.

Attribuut | Realisatie | Toelichting
----------|------------|------------
`type`    | <span id="check">&#10003;</span> | Deels geïmplementeerd vanwege scope. Veel typen moeten uit BRT of WOZ komen. Bij alle BAG panden is `nil` ingevuld. Bij overig bouwwerken uit de BGT is het type, `Schuur` of `Bunker` daarvandaan overgenomen.
`aard`    | <span id="nocheck">&#10005;</span>| Buiten scope: BRT/WOZ
`geometrie omtrek`     | <span id="check">&#10003;</span>| Uit BAG
`geometrie grondvlak`  | <span id="check">&#10003;</span>| Uit BGT
`naam`    | <span id="nocheck">&#10005;</span>| Buiten scope: BRT
`oorspronkelijkBouwjaar` | <span id="check">&#10003;</span>| Uit BAG
`relatieveHoogteligging` | <span id="check">&#10003;</span>| Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`  | <span id="check">&#10003;</span>| Uit BAG/BGT

#### Open Bouwwerk transponering

Dit objecttype komt uit de BGT en wordt als het gaat om een `OverigBouwwwerk` met attribuut `type` = `Open loods` of `Overkapping` getransponeerd naar SOR `Gebouw`. 

Attribuut  | Realisatie | Toelichting
-----------|------------|------------
`type`     | <span id="check">&#10003;</span>| Uit BGT
`geometrie`| <span id="check">&#10003;</span>| Uit BGT
`isOnderdeelVan` | <span id="nocheck">&#10005;</span>| geen mapping gespecificeerd. Dit gegeven zit niet in de brondata, er moet een afleidingsregel voor gemaakt worden.
`relatieveHoogteligging` | <span id="check">&#10003;</span>| Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`   | <span id="check">&#10003;</span>| Uit BGT

#### Gebouwcomponent transponering
De volgende objecten worden getransponeerd naar SOR `Gebouwcomponent`: 
- Alle BGT `Gebouwinstallatie` objecten  met attribuut `type` = `Bordes`, `Luifel`, of `Toegangstrap`. 
- Alle BGT `Kunstwerkdeel` objecten met attribuut `type` = `Perron` worden getransponeerd naar Gebouwcomponent.

Attribuut  | Realisatie | Toelichting
-----------|------------|------------
`type`     | <span id="check">&#10003;</span>| Uit BGT
`geometrie`| <span id="check">&#10003;</span>| Uit BGT
`isOnderdeelVan` | <span id="nocheck">&#10005;</span>| geen mapping gespecificeerd. Dit gegeven zit niet in de brondata, er moet een afleidingsregel voor gemaakt worden.
`relatieveHoogteligging` | <span id="check">&#10003;</span>| Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`   | <span id="check">&#10003;</span>| Uit BGT

### REST API
De gerealiseerde REST API is een API conform de Nederlandse API strategie [[ADR]]. Objectinformatie wordt door deze API geretourneerd in HAL + JSON formaat. De API is bedoeld voor het opvragen van een beperkte set objecten en ondersteunt:
- paginering
- geometrie in meerdere coördinatenstelsels (RD, ETRS-89)
- geo-zoeken conform de API strategie, maar meerdere filters kunnen mogelijk gemaakt worden

De API is geconfigureerd met behulp van het [DotWebStack Framework](https://github.com/dotwebstack/dotwebstack-framework). Er wordt een “On the fly” mapping op de lookup API gedaan. 

[](#2022-RESTAPIendpoints) toont de functionaliteit van de REST API in de vorm van Swagger documentatie. 

<figure id="2022-RESTAPIendpoints">
    <img src="media/2022-RESTAPIendpoints.png" alt="REST API endpoints"/>
    <figcaption>De endpoints van de REST API</figcaption>
</figure>

### URI Dereferencing Service
De URI Dereferencing service is een heel eenvoudige maar krachtige component, die op basis van de URI identifier van een object de gegevens teruggeeft als RDF. Dit is een van de kernonderdelen van linked data, ook verwoord in [Spatial Data on the Web Best Practice 1](https://www.w3.org/TR/sdw-bp/#globally-unique-ids): geef je objecten een URI identificatie en zorg dat je informatie over het object teruggeeft als die URI wordt opgevraagd. Dat is precies wat deze service doet: als je via de URI Dereferencing Service de identificerende URI van een object via HTTP opvraagt, krijg je gegevens van dat object terug, inclusief http(s) links naar andere objecten. 

Belangrijk punt is dat de HTTP URI een implementatie-onafhankelijke identificatie is. Via dezelfde URI kun je gegevens in meerdere formaten terug vragen door gebruik te maken van content negotiation. 

Ook bij dit onderdeel geldt: De API is geconfigureerd met behulp van het [DotWebStack Framework](https://github.com/dotwebstack/dotwebstack-framework). Er wordt een “On the fly” mapping op de lookup API gedaan. 

### OGC API Features
De gerealiseerde OGC Features API maakt het mogelijk om de SOR te integreren met gangbare tooling binnen het GIS / Geo domein. De OGC API Features standaard [[ogcapi-features]] is de opvolger van WFS maar dan gebaseerd op REST principes. Je kunt er geo-objecten mee opvragen middels een gestandaardiseerde interface, die door GIS tooling wordt ondersteund. In deze High-5 implementeerden we alleen deel 1. 

Er is custom programmeerwerk gedaan om de OGC API Features bovenop een andere API te laten functioneren. Er wordt net als bij de andere componenten een "on the fly" mapping gedaan.

Net als de REST API is de OGC API Features beschreven met Swagger documentatie:

<figure id="2022-oaf-swagger">
    <img src="media/2022-oaf-swagger.png" alt="OAF Swagger"/>
    <figcaption>Swagger documentatie van OGC API Features</figcaption>
</figure>

Het lukte tijdens de High-5 om SOR data via de OGC API Features in te laden in open source GIS pakket [QGIS](https://qgis.org/en/site/). 

<figure id="2022-OAF-qgis">
    <img src="media/2022-OAF-qgis.png" alt="OAF QGIS"/>
    <figcaption>SOR data in QGis via de OGC API Features</figcaption>
</figure>

### Linked Data API
De Linked Data API biedt toegang tot de SOR conform Linked Data standaarden. Tijdens de High-5 is de Linked Data API verbonden aan de URI Dereferencing Service om de data binnen te halen (dit gebeurt met de snelheid van je internetverbinding) en in de eigen Knowledge Graph op te slaan. Vervolgens kan er in de omgeving van het Kadaster Data Science team van alles mee worden gedaan zoals het integreren met andere datasets. Omdat de data zelfbeschrijvend is en dus in feite 'zegt' dat het geodata is, wordt automatisch een kaartvisualisatie aangeboden voor het bekijken van de data. Op de kaart kun je doorklikken naar een web pagina voor elk object. 

<figure id="2022-kg">
    <img src="media/2022-kg.png" alt="KG"/>
    <figcaption>Eén gebouw in de Knowledge graph van de Linked Data API</figcaption>
</figure>

Tijdens de High-5 zijn een aantal dingen specifiek gerealiseerd met deze data:
- Gebouwen met verschil in bovenaanzichtgeometrie en maaiveldgeometrie vinden en in 3D visualiseren;
- Een kaart met daarop gebouwen uit verschillende bouwjaren in verschillende kleuren gevisualiseerd;
- Integratie met CBS wijk/buurt data en op basis daarvan tonen van nabijheid voorzieningen.

<figure id="2022-ld-gebouw">
    <img src="media/2022-ld-gebouw.png" alt="ld gebouw"/>
    <figcaption>3D visualisatie van een gebouw met verschillende bovenaanzicht- en grondvlakgeometrieën</figcaption>
</figure>

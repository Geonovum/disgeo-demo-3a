# Implementatiefase

Dit hoofdstuk bevat de beschrijving van de opzet, resultaten en inzichten van de laatste experimenteersessie uit deze High-5 reeks, de implementatiedagen van januari 2022. 

## Onderzoeksvragen
In deze fase implementeren we het gemaakte SOR Gebouw MVP model en de transponeringsregels. We willen de volgende vragen beantwoorden: 
- Is het SOR Gebouw model MVP te implementeren; waar loop je tegenaan
- Zijn de transponeringsregels te implementeren; waar loop je tegenaan

## Opzet

<figure id="2022-architectuur">
    <img src="media/2022-architectuur.png" alt="Architectuur van de implementatie"/>
    <figcaption>Architectuur van de implementatie</figcaption>
</figure>

De onderste laag van deze architectuur, ontsluiting bij de bron, is in de voorbereiding al gerealiseerd door het Kadaster. In deze High-5 realiseren we de bovenste laag, Services, met daarin: 
- Een Lookup API SOR Gebouw, conform het informatiemodel uit [](#imsor-gebouw-0). Deze API ondersteunt het gehele informatiemodel en regelt de orchestratie van BAG en BGT naar SOR. De REST API, URI Dereferencing service, en OGC Features API worden hier bovenop gebouwd. Het SPARQL Endpoint maakt gebruik van de URI Dereferencing service.
- Een REST API die vragen over gebouwen ondersteunt en JSON teruggeeft. Deze API ondersteunt collecties met paginering, en heeft een endpoint voor individuele bevraging. Heeft ook CRS negotiation; de default is ETRS 89. Levert HAL JSON, compliant met NL API strategie. Geen JSON-LD (die zit wel in de URI dereferencing service). We maken gebruik van REST tooling om te laten zien dat het werkt. 
- Een URI Dereferencing service die op basis van de URI identifier van een object de gegevens teruggeeft als RDF.
- Een [OGC API Features](https://ogcapi.ogc.org/features/) (part 1) API die ruimtelijke vragen ondersteunt en GeoJSON en HTML ondersteunt. We realiseren een client GIS viewer om te laten zien dat het werkt.
- Een SPARQL endpoint bovenop een knowledge graph plus een data story om te laten zien dat het werkt.

Als proefgebied is voor Swifterbant (gemeente Dronten) gekozen. 

## Scope beperking
We zijn in de implementatiefase begonnen met een hele bescheiden scope met daarin alleen het objecttype `Gebouw`. Op dag 2 hebben we `Open Bouwwerk` hieraan toegevoegd en op dag 3 `Gebouwcomponent`. 

Aan `Verblijfsobject` en `Installatie` zijn we niet toe gekomen. 

## Resultaten

De meeste implementatie-onderdelen zijn gerealiseerd in een ontwikkelomgeving van het Kadaster en helaas op dit moment niet publiek beschikbaar. Wellicht gaat nog gekeken worden of dit (tijdelijk) toch mogelijk is. 

Het Linked Data gedeelte is wel openbaar. 

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

Het attribuut `status` dat in alle objecten voorkomt was een uitdaging om te transponeren. De SOR heeft een [nieuwe onderverdeling van levenscycli](https://docs.geostandaarden.nl/disgeo/emso/#levensfasen). Die hebben we als basis genomen, waardoor we gebruik konden maken van het [begrippenkader van de SOR](https://begrippen.geostandaarden.nl/sor-high5/nl/) (de experimentele variant voor de High-5). Het begrippenkader is uitgedrukt in SKOS [[skos-primer]], en dit biedt mogelijkheden om semantische relaties te leggen tussen begrippenkaders. Wat we dus gedaan hebben is de status begrippen uit het SOR begrippenkader verbinden met de overeenkomstige begrippen van BAG en BGT (die ook gepubliceerde begrippenkaders hebben) door middel van mapping relaties. 

De orchestratielaag kon deze relaties tussen begrippen gebruiken voor de transponering en de Lookup API kan daardoor gegeven een SOR status een BAG status vinden of gegeven een BAG status een SOR status teruggeven.

#### Gebouw transponering

Alle BAG `Pand` objecten worden getransponeerd naar SOR `Gebouw`. Enkele attributen van BGT `Pand` worden erbij gezocht. BGT OVerigBouwwerk met `type` = `Schuur` of `Bunker` worden ook getransponeerd naar SOR Gebouw.

Attribuut | Realisatie | Toelichting
----------|------------|------------
`type`    | [x]        | Deels geïmplementeerd vanwege scope. Veel typen moeten uit BRT of WOZ komen. Bij alle BAG panden is `nil` ingevuld. Bij overig bouwwerken uit de BGT is het type, `Schuur` of `Bunker` daarvandaan overgenomen.
`aard`    | [ ]        | Buiten scope: BRT/WOZ
`geometrie omtrek`     | [x] | Uit BAG
`geometrie grondvlak`  | [x] | Uit BGT
`naam`    | [ ]        | Buiten scope: BRT
`oorspronkelijkBouwjaar` | [x] | Uit BAG
`relatieveHoogteligging` | [x] | Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`  | [x]        | Uit BAG/BGT

#### Open Bouwwerk transponering

Dit objecttype komt uit de BGT en wordt als het gaat om een `OverigBouwwwerk` met attribuut `type` = `Open loods` of `Overkapping` getransponeerd naar SOR `Gebouw`. 

Attribuut  | Realisatie | Toelichting
-----------|------------|------------
`type`     | [x]        | Uit BGT
`geometrie`| [x]        | Uit BGT
`isOnderdeelVan` | []   | geen mapping gespecificeerd. Dit gegeven zit niet in de brondata, er moet een afleidingsregel voor gemaakt worden.
`relatieveHoogteligging` | [x] | Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`   | [x]        | Uit BGT

#### Gebouwcomponent transponering
De volgende objecten worden getransponeerd naar SOR `Gebouwcomponent`: 
- Alle BGT `Gebouwinstallatie` objecten  met attribuut `type` = `Bordes`, `Luifel`, of `Toegangstrap`. 
- Alle BGT `Kunstwerkdeel` objecten met attribuut `type` = `Perron` worden getransponeerd naar Gebouwcomponent.

Attribuut  | Realisatie | Toelichting
-----------|------------|------------
`type`     | [x]        | Uit BGT
`geometrie`| [x]        | Uit BGT
`isOnderdeelVan` | []   | geen mapping gespecificeerd. Dit gegeven zit niet in de brondata, er moet een afleidingsregel voor gemaakt worden.
`relatieveHoogteligging` | [x] | Uit BGT. Niet in EMSO aangemerkt als inhoud SOR, maar voor deze beproeving wel interessant om mee te nemen. Zolang we geen 3D hebben... 
`status`   | [x]        | Uit BGT

### REST API
De REST API is een API conform de Nederlandse API strategie [[ADR]]. 

### OGC API Features

### URI Dereferencing Service

### SPARQL endpoint

## Bevindingen

- Wat zonder meer gelukt is
- Wat wel lukte maar met workarounds / moeite 
- Wat niet lukte

De bevindingen zijn gegroepeerd op onderwerp.

### Bevindingen rondom het informatiemodel

#### Identificatie van SOR objecten
We introduceren nu geen SOR identificatie maar gebruiken hiervoor de identificatie uit de bestaande bronregistraties. Omdat er zowel BAG als BGT panden zijn, die samen in een Gebouw object moeten gevat worden, moest er gekozen worden welke identificatie leidend is. Dit is voor ons het BAG ID geworden. 

Er zijn ook SOR gebouwen die geen BAG id hebben, namelijk de BGT `OverigBouwwerk` objecten van het type `Bunker` en `Schuur`. Voor deze SOR gebouwen wordt het BGT id overgenomen. 

<aside class="issue">Bij Orchestratie uitdagingen in de webinar is gezegd: 

> Identificatie bevat geen type details

Nagaan wat hiermee werd bedoeld. Klinkt als een bevinding. 
</aside>

#### Ontbrekende gegevens voor bunkers en schuren
Voor bunkers en schuren uit de BGT, die geen corresponderend BAG pand hebben maar wel SOR Gebouw zijn, lopen we tegen het issue aan dat er geen bouwjaar bekend is en dat er geen BAG geometrie is. Deze gegevens moeten dus optioneel of voidable worden in het informatiemodel. In MIM termen betekent voidable: we gebruiken dan `mogelijk geen waarde = ja` in het informatiemodel. 

Als we de attributen `bouwjaar` en `geometrie` voidable maken, zijn ze wel verplicht, maar is het toegestaan om een nilwaarde op te nemen en een reden van het ontbreken van het gegeven op te nemen. 

Als we deze attributen optioneel maken, worden ze in hun geheel weg gelaten bij bunkers en schuren. 

Semantisch is de eerste optie correcter (want ook BGT schuren en bunkers hebben een bouwjaar en een omtrekgeometrie, we hebben deze alleen nooit ergens geregistreerd). Het is de vraag wat handiger is. 

###  Bevindingen rondom de transponering

#### Toevoegen Open Bouwwerk
Omdat we voor de SOR gebouwen al moesten putten uit de BGT `OverigBouwwerk` objecten om daar de schuren en bunkers uit te halen, bleek het heel weinig werk te zijn om ook SOR `Open Bouwwerk` op te nemen. Deze objecten zijn namelijk geabseerd op een ander BGT `OverigBouwwerk` type (`Open loods` en `Overkapping`). 

`Open Bouwwerk` is toegevoegd aan de Lookup API SOR en daarna ook aan de REST API en de URI Dereferencing service. Dat was heel gemakkelijk om te doen. Als je eenmaal een query hebt voor een objecttype, is het eenvoudig om hier verder op voort te bouwen. Dit wijst op een zekere flexibiliteit in het systeem. Positief!

#### Mapping specificatie
We maken een declaratieve, machineleesbare specificatie van de mapping tussen BAG/BGT en SOR. De hele intelligentie van de transponering plaatsen we zo buiten de logica van de APIs. De Lookup API  hoeft alleen de mapping uit te voeren en kan daardoor generiek blijven. De vertaalspecificaties moeten twee kanten op werken voor een functionerende API: om gegevens in de bron(nen) te kunnen vinden gegeven een zoekvraag; en om gegevens te kunnen leveren in de doelstructuur (SOR model). 

<aside class="note">
In een *declaratieve* (programmeer)taal of specificatie beschrijf je alleen *wat* er moet gebeuren, en niet hoe (via welke stappen) dat doel bereikt moet worden. Het is daardoor abstracter en staat los van de implementatie.
</aside>

Deze declaratieve, machineleesbare mappingspecificatie sluit aan bij MIM en zit qua opzet dichtbij de taal die we gebruiken voor het informatiemodel. Technisch is het een soort YAML dialect dat machineleesbaar is en herkenbaar voor ontwikkelaars.

We brengen in deze taal de mogelijkheid aan om functies aan te roepen zodat ingewikkelde transformaties als een functie kunnen worden omschreven.

<aside class="issue">Het zou leuk zijn om een naam te hebben voor deze mapping spec taal...</aside>

[TODO] toevoegen bevinding van LD team dat zij ook graag de mapping willen kunnen lezen en uitvoeren. Dit hoeft niet per se centraal op 1 plek te zitten. Zie aantekeningen. 

#### Query planning
Om de transponering te kunnen uitvoeren moet je ook de orchestratie logica vastleggen: de kennis over in welke gegevensbron je welke gegevens kan vinden en in welke volgorde je het beste de bronnen kan raadplegen als je er meerdere nodig hebt (wat in de SOR natuurlijk vaak zo is). 

De volgorde van het uitvoeren van de benodigde queries op een slimme manier bepalen is een uitdaging. We hopen dit op basis van configuratie, dus op basis van de declaratief uitgedrukte transponeringsregels te kunnen doen. 

Het specifiek uitprogrammeren van deze volgorde in code moet vermeden worden.

#### Specificatie vanuit bron of doel
Je kunt bij het maken van zo'n mappingspecificatie twee kanten op. 
1. Je neemt de bron als uitgangspunt, en specificeert voor elk brongegeven wat de naam, structuur en inhoud van het resultaatgegeven moet zijn; een zogenaamde "push" transformatie.
1. Je neemt het gewenste resultaat als uitgangspunt, en specificeert voor elk resultaatgegeven waar je dat precies in de brondata kunt vinden; een zogenaamde "pull" transformatie ofwel "cherry-picking". 

Onze eerste uitdaging was: welke van deze aanpakken kunnen we het beste als uitgangspunt nemen? We hebben gekozen voor aanpak 2. Waarom? 
- In algemene zin is een push aanpak meer geschikt voor een mapping waarbij de doelstructuur erg lijkt op de bronstructuur, terwijl een pull aanpak beter werkt voor een mapping waarbij de doelstructuur erg afwijkt van de bron. De doel- en brongegevensstructuur verschillen niet fundamenteel van elkaar, wat zou pleiten voor een push aanpak; maar er zijn meer argumenten.
- De SOR is gespecificeerd vanuit het gewenste einddoel en SOR objecten zijn daardoor vaak een combinatie van meerdere bronobjecten, zodat er niet één enkel bronobject als uitganspunt genomen kan worden;
- De pull / cherry picking aanpak leent zich meer voor een geleidelijk ontwikkelproces waarbij er steeds meer gegevens aan de SOR objecten kunnen worden toegevoegd, ongeacht uit welke bronregistratie ze komen.

#### Lastige transponeringen
Sommige transponeringsregels zijn heel eenvoudig, bijvoorbeeld die voor het vullen van het `bouwjaar`. Andere zijn ingewikkelder doordat bepaalde algemeen voorkomende gegevens in de huidige basisregistraties niet eenduidig gemodelleerd zijn. 

Een voorbeeld is het gegeven `status`, i.e. levensfase van een object. In de BAG zitten andere statussen dan in de BGT. Als een gebruiker wil filteren op basis van een in de SOR gedefinieerde status moet de transponeringslaag specificeren hoe je dit terugvertaalt naar de juiste BAG en BGT status. 

In het begrippenkader van de SOR hebben we bovendien een hiërarchie in de statussen aangebracht, waardoor ze zijn ingedeeld in statussen waarbij het object aanwezig is in de werkelijkheid, versus nog niet aanwezig of niet meer aanwezig (zie het begrip [`Levensfase`](https://begrippen.geostandaarden.nl/sor-high5/nl/page/levensfase) en de begrippen die daaronder vallen). Hierdoor kan een gebruiker gemakkelijker filteren op bijvoorbeeld alle bestaande objecten, zonder de specifieke daaronder vallende statussen te moeten opsommen.

In deze High-5 willen we beproeven of het lukt hier een transponeringsregel voor te beschrijven en implementeren, die gebruik maakt van de hiërarchische begrippenlijst van statussen in het DiSGeo begrippenkader. [TODO later meer...]

### OGC API Features

#### Coördinaatreferentiesysteem
OGC API Features: Part 1 schrijft als coördinaatreferentiesysteem WGS 84 longitude/latitude voor (i.e. http://www.opengis.net/def/crs/OGC/1.3/CRS84). De Lookup API serveert standaard de gegevens in het coördinaatreferentiesysteem van de bron, zijnde RD. 

Om dit op te lossen wordt in de Lookup API de optie geïmplementeerd om de gegevens in plaats van in RD, in ETRS 89 op te vragen. Tussen ETRS 89 en WGS 84 zit maar een kleine afwijking, en een hoge nauwkeurigheid is in dit geval niet belangrijk, dus we kunnen WGS 84 gelijkstellen aan ETRS 89, zoals beschreven in de Handreiking Gebruik coördinaatreferentiesystemen bij uitwisseling en visualisatie van geo-informatie [[CRS]]. De ETRS 89 coördinaten kunnen in de OGC API Features opgenomen worden in de GeoJSON output als zijnde WGS 84. 

### SPARQL Endpoint en Knowledge Graph

#### Bulkbevraging
Ten behoeve van de knowledge graph is er behoefte aan het in bulk kunnen opvragen van een grote hoeveelheid data uit de Lookup API. Tijdens deze High-5 hebben we bulk bevragingen echter bewust buiten scope geplaatst (moeilijk binnen 3 dagen te realiseren) en de Lookup API biedt deze mogelijkheid nu dus niet. Daarom werd in eerste instantie de RDF data voor de hele gemeente Dronten via puntbevraging (per object op basis van een lijst met alle identifiers binnen de gemeente) opgehaald. Omdat dit nogal lang duurt is als workaround ervoor gekozen om alleen de data voor het dorp Swifterbant op te vragen. 

Uiteraard wordt, zodra er meer tijd is, zo'n bulkbevragingsvoorziening wel gerealiseerd. 

### Lookup APIs
Deze bevindingen gaan over de Lookup APIs die zowel in de onderste als de bovenste laag (de SOR laag) voorkomen. 

#### Gestandaardiseerd GraphQL profiel

Efficiënte orchestratie vereist uniformiteit in Lookup API’s
Standaardisatie van interface elementen
Toegangspatronen t.b.v. orchestratie (o.a. batching)
Advies: Standaard API profiel voor Lookup API’s

De Lookup API SOR, Lookup API BGT en Lookup API BAG hebben om diverse redenen een GraphQL endpoint. GraphQL is een low level standaard waarmee je alle kanten op kunt, en er is nog geen gestandaardiseerd profiel voor, dat beschrijft hoe je bijvoorbeeld omgaat met naamgeving, filteren, paginering, sortering etc. zoals de API Design Rules (uit de NL API strategie) dat doen voor REST APIs. Dit heeft als consequentie voor de afnemende APIs dat er specifieke code moeten worden geschreven om de data te verkrijgen en om te vormen (wellicht is bv. het uitfilteren van attributen en 'plat slaan' van geneste structuur nodig). Ter vergelijking: voor een OGC API Features is dit bijvoorbeeld niet nodig als de data al in een Postgres database of een Geopackage bestand zit in de juiste structuur. De ETL stappen zijn dan al gedaan; in de huidige situatie wordt er in feite nog ETL gedaan IN de API op het laatste moment.

Het schrijven van deze specifieke code is meer werk ten opzichte van het gebruik van een standaard GIS opslagmethode en blijkt bovendien ook wat lastiger dan verwacht. Je krijgt ook een beheerslast: als er in de Lookup API gegevens bij komen, moet er in de specifieke code ook weer iets aangepast worden met betrekking tot het wel of niet doorleveren van die gegevens. Met andere woorden: er is een mapping nodig van de Lookup API naar de afnemende APIs, die beheerd moet worden. 

Hetzelfde geldt bij de Lookup API SOR die bevragingen doet bij de Lookup API BGT en Lookup API BAG. Ook voor deze interfaces moet in de Lookup API SOR specifieke code geschreven worden. In deze High-5 setting is dit nog te overzien, maar in de grotere context van de SOR is het programmeren en beheren van de orchestratie niet meer te doen zonder gestandaardiseerd GraphQL profiel. 

Hier lopen we in feite tegen hetzelfde probleem aan als bij de [eerste High 5 demonstrator](https://docs.geostandaarden.nl/disgeo/dll/#api-versus-knowledge-graph) die werd gebouwd bovenop bestaande, APIs die niet aan een gestandaardiseerd profiel voldeden. De laag met de semantiek en orchestratie zou niet te beheren zijn, concludeerden we toen. 

We denken wel dat dit deels te beheersen is, mits er gestandaardiseerd wordt. Dit brengt de hoeveelheid specifieke code aanzienlijk terug. Een belangrijke bevinding van deze High-5 is dus dat er een gestandaardiseerd GraphQL profiel nodig is, dat in ieder geval in de context van de SOR architectuur, voor de samenhangende registraties, wordt gehanteerd.

Het is niet gelukt om de OGC API Features op de LookUP API aan te sluiten zonder hard codeerwerk. Het lijkt erop dat een profiel/standaard kan helpen, maar zelfs als dat er is kan er nog hard codeerwerk nodig zijn. Op zich is dit niet heel veel werk maar het zegt wel iets en het betekent dat er mogelijk programmeerwerk nodig is bij latere wijzigingen in APIs. Dit is niet wenselijk want het maakt de oplossing beduidend minder flexibel. 

#### Batch bevraging
Als een gebruiker aan de SOR API een collectie van objecten opvraagt, moet de Lookup API SOR daarvoor eerst naar de BAG, en vervolgens naar de BGT met een set BAG ids om de aanvullende BGT gegevens erbij te vinden. In die tweede stap wordt nu per id een individuele zoekvraag gesteld. Het zou handig zijn om die te kunnen bundelen in een batch bevraging.

Dit is vergelijkbaar met de constatering vanuit het SPARQL endpoint dat een bulkbevraging nodig was. Dit geldt dus voor zowel de Lookup API SOR als die van de BAG en BGT in de laag Ontsluiting data.

#### Performance en andere non-functionals
Performance van de APIs is een belangrijk aspect, dat samenhangt met het eerder genoemde query planning. Indien mogelijk kunnen we bijvoorbeeld onderdelen van een query tegelijktijdig uitvoeren om zo performance te verbeteren. 

Cruciaal is dat elk van de services die data leveren voor de SOR op zich al goede performance moeten hebben, anders kunnen SOR services ook nooit snel worden. 

Ruimtelijke vragen zijn niet per sé een aandachtspunt wat betreft performance. Maar hoge performance loopt wel in het algemeen gevaar als je een vraag stelt waarop een grote selectie aan objecten terugkomt. Hoe ga je die sorteren, pagineren etc. Dat zijn zware operaties. 

De DiS Geo architectuurbeschrijving [[ARCH]] noemt een aantal niet-functionele eisen die van belang zijn voor SOR voorzieningen, waaronder performance maar ook andere eisen. Dat deze eisen aan de SOR gesteld worden betekent dat de services die onder de SOR liggen hier ook aan moeten voldoen. Ze moeten een hoge uptime hebben, goede foutafhandeling hebben, fouten en performance moeten traceerbaar zijn, etc. 

**Aanbeveling:** Een verdere uitwerking van de SOR voorzieningen architectuur / de niet-functionele eisen aan de onderliggende services is nodig.

#### Versionering van APIS
In de loop der tijd zullen APIs worden doorontwikkeld en veranderen - zoals ook de onderliggende informatiemodellen. Dit is een uitdaging: als de onderliggende APIs van de SOR veranderen raakt dit de orchestratie / transponeringslaag. [Semantic versioning](https://semver.org/lang/nl/) is daarom nodig.



## Lessons Learned over de implementatie

Dit hoofdstuk beschrijft welke aspecten van implementatie goed gelukt zijn, wat wel lukte maar met moeite, en wat problemen opleverde en misschien zelfs niet gelukt is. 

De bevindingen zijn gegroepeerd op onderwerp.

### Bevindingen over het informatiemodel

#### Ontbrekende gegevens voor bunkers en schuren
Voor bunkers en schuren uit de BGT, die geen corresponderend BAG pand hebben maar wel SOR Gebouw zijn, lopen we tegen het issue aan dat er geen bouwjaar bekend is en dat er geen BAG geometrie is. Deze gegevens moeten dus optioneel of voidable worden in het informatiemodel. In MIM termen betekent voidable: we gebruiken dan `mogelijk geen waarde = ja` in het informatiemodel. 

Als we de attributen `bouwjaar` en `geometrie` voidable maken, zijn ze wel verplicht, maar is het toegestaan om een nilwaarde op te nemen en een reden van het ontbreken van het gegeven op te nemen. 

De andere optie is om deze attributen optioneel te maken: dan worden ze in hun geheel weg gelaten bij bunkers en schuren. Deze optie is gekozen tijdens de implementatie van de high 5.

Wat uiteindelijk de beste modellering is zal nog worden uitgewerkt.

###  Bevindingen over de transponering
Hoewel er allerlei uitdagingen zijn, is gebleken dat de op transponering gebaseerde architectuur werkt. De data kan bij de bron blijven. We doen geen getransformeerde data opslag maar orchestratie on the fly, en het is toch mogelijk om data af te nemen als stroom uit het stopcontact op verschillende manieren. Het Linked Data endpoint doet wel synchrone opslag, omdat dit voor het exploreren nodig is.

#### Transponering Gebouw en gebouwgerelateerde objecttypen
Over het algemeen bleek: als je eenmaal de transponering van een objecttype gedaan hebt, is de volgende niet zo moeilijk. Transponeren van objecttypen uit de BGT bleek relatief simpel. Deze objecttypen hebben onderling weinig relaties en verschillen niet zo heel veel van elkaar. De objecttypen uit de BAG hebben meer onderlinge relaties en verschillen. 

Een kanttekening hierbij is dat zodra andere gegevensbronnen (BRT, WOZ, enz) binnen beschouwing komen, dit nieuwe uitdagingen kan opleveren. 

De SOR vereist een aantal administratieve relaties tussen objecttypen. Sommige van deze relaties zijn al aanwezig in de huidige bronregistraties, zoals de relatie tussen `Verblijfsobject` en `Gebouw`. Maar de SOR specificeert ook een aantal relaties die nu nog niet administratief worden bijgehouden. Een voorbeeld hiervan is de `hoortBij` relatie tussen `Gebouwcomponent` en `Gebouw`. 

Deze in de bron nog niet aanwezige relaties hebben we tijdens de High-5 buiten beschouwing gelaten. De vraag blijft daarom of het mogelijk is relaties die in de bron niet aanwezig zijn, on the fly in de transponeringslaag te gaan bepalen, bijvoorbeeld door ze geometrisch af te leiden. We weten niet of dit performance issues zou opleveren. In dat geval zou mogelijk een tussentijdse opslag van deze relaties nodig zijn (een linkset). En in het uiterste geval kan het ook nodig zijn dat relaties door de bronhouder moeten worden ingewonnen en beheerd, mogelijk met inzet van AI technologie. 

Op dit punt is vervolgonderzoek nodig. 

#### Transponering van identificatie
We hebben in de eerdere modelleerfase van deze High-5 al besloten om nu geen SOR identificatie te introduceren, maar hiervoor de identificatie uit de bestaande bronregistraties te gebruiken. Omdat er zowel BAG als BGT panden zijn, die samen in een Gebouw object moeten gevat worden, moest er gekozen worden welke identificatie leidend is. Dit is voor ons het BAG ID geworden. 

Er zijn ook SOR gebouwen die geen BAG id hebben, namelijk de BGT `OverigBouwwerk` objecten van het type `Bunker` en `Schuur`. Voor deze SOR gebouwen wordt het BGT id overgenomen. 

Een probleem met de identificatie was dat het geen type details bevat. Met andere woorden: op het moment dat de Lookup API een verzoek binnenkrijgt de gegevens behorende bij een object identificatie te leveren, deze API niet weet in welke registratie dit object moet worden opgehaald en in welke objecttype-collectie daar moet worden gekeken. Nu hebben we een slimmigheid gebruikt: BGT_identificatie bevat een “.”, en dit feit gebruikte de Lookup API om te bepalen of de zoekvraag naar de BGT of de BAG API moest worden doorgespeeld. Dat is niet bestendig bij uitbreiding van bronnen van Gebouw (BRT) en andere SOR objecten. 

Ook op dit punt is vervolgonderzoek nodig. Is dit probleem bijvoorbeeld op te lossen met een index / linkset oftewel een soort 'wegwijzer' waar de SOR Lookup API kan vinden welke identifier waar gevonden kan worden? Of moeten we wellicht toch een nieuwe SOR identificatie hanteren waaraan dit te zien zou zijn? 

Bij het toekennen van een nieuw SOR ID zouden we dan nog kunnen overwegen om dit een verlenging van een bestaand ID te maken zodat herleiding mogelijk is. De bestaande IDs blijven gebruiken is op zich het gemakkelijkst (hoewel wel wel voor elk SOR objecttype moeten bepalen welk ID we hiervoor kiezen, wat voor uit meerdere bronnen samengestelde objecttypen lastig kan zijn) en hergebruik van bestaande IDs is positief. Maar een nieuw SOR ID introduceren betekent wel nóg een identificatie voor afnemers. 

#### Transponering van historie
De transponering van historie is deels gelukt. Met name het historiemodel van de BAG is met succes getransponeerd naar de SOR. Het feit dat in BAG 2.0 een versienummer voor objectgegevens is ingevoerd hielp hierbij. 

Het historiemodel van de BGT bleek lastiger. De BGT bevat een beperkt historiemodel met alleen registratietijdstippen, geen geldigheidstijdstippen; het verschilt van dat van de BAG, en houdt geen versienummer bij voor geregistreerde gegevens zoals de BAG dat doet. De ontwikkelaars hadden ook meer parate kennis van de BAG dan de BGT. Het opstellen van transponeringsregels van het BGT historiemodel naar de SOR zou waarschijnlijk zeker enkele dagen onderzoek vergen. Omwille van de tijd hebben we er tijdens de High-5 voor gekozen dit niet te doen. 

Omdat het BAG historiemodel wel was getransponeerd konden we bevestigen of tijdreizen mogelijk was en dit bleek het geval. De Lookup API kan tijdreisvragen beantwoorden op basis van de historie-informatie uit de BAG. In de High-5 gebruiken we dit alleen om het actueel geldige informatieobject op te vragen, maar een zoekvraag naar een historisch tijdstip zou even goed mogelijk zijn. 

Bij het bekijken van extracten uit de BGT ontdekten we bij toeval een eigenaardigheid:  een object met meerdere instanties, waarvan de gegevens volledig hetzelfde waren, maar met twee verschillende LV-publicatie-tijdstippen. Dit soort datakwaliteitsissues kan bij de transponering van gegevens uiteraard voor problemen zorgen. Een uitgangspunt is dan ook dat de datakwaliteit in orde moet zijn. 

Er is meer tijd nodig om dit onderwerp, het transponeren van historie van niet alleen de BAG maar ook de BGT en andere basisregistraties die in de SOR een rol spelen, uit te zoeken. Hierbij is inhoudelijke kennis van het historiemodel in deze basisregistraties onontbeerlijk.

#### Transponering van metadata
De transponering van overige metadata is grotendeels gelukt. We hebben metadata over de herkomst van objecten meegenomen in de transponering zoals van tevoren beschreven in [](#modelleerpatronen-voor-metadata). Hierdoor kun je aan de SOR data zien uit welke bronobjecten uit de BAG en/of BGT deze is opgebouwd. Bij deze bronobjecten kun je dan ook terugvinden wat het oorspronkelijke brondocument en de bronhouder is, als deze gegevens in de bronregistratie beschikbaar zijn. 

Zie [](#transponering-van-metadata-en-historie) voor het overzicht van de transponeringsregels voor metadata. 

<aside class="note">Het SOR `Gebouw` zelf heeft geen brondocumenten en bronhouder. Dat kan ook niet zomaar, want er is in de huidige situatie formeel geen bronhouder voor SOR objecten. Het is ook niet zonder meer mogelijk om de bronhouder uit de BAG of BGT over te nemen, want bij objecten waarvan gegevens in meerdere basisregistraties beschikbaar zijn, is het mogelijk dat ze meerdere bronhouders hebben!</aside>

#### Toevoegen Open Bouwwerk
Omdat we voor de SOR gebouwen al moesten putten uit de BGT `OverigBouwwerk` objecten om daar de schuren en bunkers uit te halen, bleek het heel weinig werk te zijn om ook SOR `Open Bouwwerk` op te nemen. Deze objecten zijn namelijk gebaseerd op een ander BGT `OverigBouwwerk` type (`Open loods` en `Overkapping`). 

`Open Bouwwerk` is toegevoegd aan de Lookup API SOR en daarna ook aan de REST API en de URI Dereferencing service. Dat was heel gemakkelijk om te doen. Als je eenmaal een query hebt voor een objecttype, is het eenvoudig om hier verder op voort te bouwen. Dit wijst op een zekere flexibiliteit in het systeem. Positief!

Een probleem met de transponering van `Open Bouwwerk` is dat in de BAG zogenaamde "open frontstallen" staan die als `Pand` getypeerd zijn (zie hiervoor de [Praktijkhandreiking BAG](https://imbag.github.io/praktijkhandleiding/trefwoorden/permanente-opening#:~:text=Een%20uitzondering%20hierop%20die%20in,volledig%20door%20wanden%20omsloten%20beschouwd.)), maar die in de SOR `Open Bouwwerk` moeten worden. Deze gevallen konden we nu niet in de transponering meenemen omdat er geen mapping regel voor was. Het is niet duidelijk of dit in de data te herkennen is en of automatisch transponeren überhaupt mogelijk is. 

#### Mapping specificatie
Het is beoogd een declaratieve, machineleesbare specificatie van de mapping te maken tussen BAG/BGT en SOR en deze uit te laten voeren door intelligente software. De hele intelligentie van de transponering kan zo buiten de logica van de APIs geplaatst worden. De Lookup API hoeft alleen de mapping uit te voeren en kan daardoor generiek blijven. De vertaalspecificaties moeten twee kanten op werken voor een functionerende API: om gegevens in de bron(nen) te kunnen vinden gegeven een zoekvraag; en om gegevens te kunnen leveren in de doelstructuur (SOR model). 

Tijdens deze high 5 is een stap gezet richting het declaratief maken van de mapping. Dit moet nog verder uitgewerkt worden.

<aside class="note">
In een *declaratieve* (programmeer)taal of specificatie beschrijf je alleen *wat* er moet gebeuren, en niet hoe (via welke stappen) dat doel bereikt moet worden. Het is daardoor abstracter en staat los van de implementatie.
</aside>

Deze declaratieve, machineleesbare mappingspecificatie sluit aan bij MIM en zit qua opzet dichtbij de taal die we gebruiken voor het informatiemodel. Technisch is het een soort YAML dialect dat machineleesbaar is en herkenbaar voor ontwikkelaars.

Het Linked Data team gaf tijdens de High-5 aan dat zij ook graag de transformatieregels willen kunnen lezen en uitvoeren. De transformatieregels moeten breder beschikbaar / toepasbaar zijn dan alleen op één plek in de Lookup API (en dus ook implementatie / techniek onafhankelijk). Ze zouden idealiter conceptueel moeten worden vastgelegd op één plek, door of met behulp van inhoudelijk experts, en moeten worden geïmplementeerd in meerdere formaten en zo op meerdere plekken inzetbaar zijn.

Een vervolgstap zou kunnen zijn om samen verder te werken aan een gestandaardiseerde multi-inzetbare transponeringstaal.

Sommige transponeringsregels zijn heel eenvoudig, bijvoorbeeld die voor het vullen van het `bouwjaar`. Andere zijn ingewikkelder doordat bepaalde algemeen voorkomende gegevens in de huidige basisregistraties niet eenduidig gemodelleerd zijn. Een voorbeeld is het gegeven `status`, i.e. levensfase van een object. In de BAG zitten andere statussen dan in de BGT. De in de SOR gedefinieerde statussen zijn weer anders. 

#### Gebruik van begrippenkader in transponering

Het bleek mogelijk om bij de transponering van gegevens slim gebruik te maken van relaties tussen begrippen in het  [begrippenkader van de SOR](https://begrippen.geostandaarden.nl/sor-high5/nl/) (de experimentele variant voor de High-5). Dit is toegepast bij de transponering van gegevens over levenscyclus (`status`).  

Het begrippenkader is uitgedrukt in SKOS [[skos-primer]], en dit biedt mogelijkheden om semantische relaties te leggen tussen begrippenkaders. Wat we gedaan hebben is de status begrippen uit het SOR begrippenkader verbinden met de overeenkomstige begrippen van BAG en BGT (die ook gepubliceerde begrippenkaders hebben) door middel van mapping relaties. 

De orchestratielaag kon deze relaties tussen begrippen gebruiken voor de transponering en de Lookup API kan daardoor gegeven een SOR status een BAG status vinden of gegeven een BAG status een SOR status teruggeven.

#### Specificatie vanuit bron of doel
Je kunt bij het maken van zo'n mappingspecificatie twee kanten op. 
1. Je neemt de bron als uitgangspunt, en specificeert voor elk brongegeven wat de naam, structuur en inhoud van het resultaatgegeven moet zijn; een zogenaamde "push" transformatie.
1. Je neemt het gewenste resultaat als uitgangspunt, en specificeert voor elk resultaatgegeven waar je dat precies in de brondata kunt vinden; een zogenaamde "pull" transformatie ofwel "cherry-picking". 

Onze eerste uitdaging was: welke van deze aanpakken kunnen we het beste als uitgangspunt nemen? We hebben gekozen voor aanpak 2. Waarom? 
- In algemene zin is een push aanpak meer geschikt voor een mapping waarbij de doelstructuur erg lijkt op de bronstructuur, terwijl een pull aanpak beter werkt voor een mapping waarbij de doelstructuur erg afwijkt van de bron. De doel- en brongegevensstructuur verschillen niet fundamenteel van elkaar, wat zou pleiten voor een push aanpak; maar er zijn meer argumenten.
- De SOR is gespecificeerd vanuit het gewenste einddoel en SOR objecten zijn daardoor vaak een combinatie van meerdere bronobjecten, zodat er niet één enkel bronobject als uitganspunt genomen kan worden;
- De pull / cherry picking aanpak leent zich meer voor een geleidelijk ontwikkelproces waarbij er steeds meer gegevens aan de SOR objecten kunnen worden toegevoegd, ongeacht uit welke bronregistratie ze komen.

#### Query planning
Om de transponering te kunnen uitvoeren moet je ook de orchestratie logica vastleggen: de kennis over in welke gegevensbron je welke gegevens kan vinden en in welke volgorde je het beste de bronnen kan raadplegen als je er meerdere nodig hebt (wat in de SOR natuurlijk vaak zo is). 

De volgorde van het uitvoeren van de benodigde queries op een slimme manier bepalen is een uitdaging. We hopen dit op basis van configuratie, dus op basis van de declaratief uitgedrukte transponeringsregels te kunnen doen. 

Het specifiek uitprogrammeren van deze volgorde in code moet vermeden worden.

### Bevindingen over Lookup APIs en orchestratie
Deze bevindingen gaan over de orchestratie en over de Lookup APIs die zowel in de onderste als de bovenste laag (de SOR laag) voorkomen. 

#### Gestandaardiseerd GraphQL profiel
De Lookup API SOR, Lookup API BGT en Lookup API BAG hebben om diverse redenen een GraphQL endpoint. GraphQL is een low level standaard waarmee je alle kanten op kunt, en er is nog geen gestandaardiseerd profiel voor, dat beschrijft hoe je bijvoorbeeld omgaat met naamgeving, filteren, paginering, sortering etc. zoals de API Design Rules (uit de NL API strategie) dat doen voor REST APIs. 

Er is in elke afnemende API van de Lookup API SOR een mapping nodig waarin de data wordt gefilterd en omgezet naar de gewenste structuur. Deze mapping moet beheerd worden. 

Hetzelfde geldt bij de Lookup API SOR zelf, die bevragingen doet bij de Lookup API BGT en Lookup API BAG. Ook voor deze interfaces moet in de Lookup API SOR specifieke code geschreven worden. In deze High-5 setting is dit nog te overzien, maar in de grotere context van de SOR is het programmeren en beheren van de orchestratie niet meer te doen zonder gestandaardiseerd GraphQL profiel. 

Hier lopen we in feite tegen hetzelfde probleem aan als bij de [eerste High 5 demonstrator](https://docs.geostandaarden.nl/disgeo/dll/#api-versus-knowledge-graph) die werd gebouwd bovenop bestaande, APIs die niet aan een gestandaardiseerd profiel voldeden. De laag met de semantiek en orchestratie zou niet te beheren zijn, concludeerden we toen. 

We denken wel dat dit deels te beheersen is, mits er gestandaardiseerd wordt. Dit brengt de hoeveelheid specifieke code aanzienlijk terug. Een belangrijke bevinding van deze High-5 is dus **dat efficiënte orchestratie uniformiteit in Lookup API’s vereist**. Een gestandaardiseerd GraphQL profiel is nodig, dat in ieder geval in de context van de SOR architectuur, voor de samenhangende registraties, wordt gehanteerd. In dit profiel kunnen net zoals in de API strategie voor REST APIs vaak gehanteerde interface elementen en toegangspatronen t.b.v. orchestratie (o.a. batching) gestandaardiseerd worden.

#### Batch bevraging
Als een gebruiker aan de SOR API een collectie van objecten opvraagt, moet de Lookup API SOR daarvoor eerst naar de BAG, en vervolgens naar de BGT met een set BAG identificaties om de aanvullende BGT gegevens erbij te vinden. In die tweede stap wordt nu per identificatie een individuele zoekvraag gesteld. Het zou handig zijn om die te kunnen bundelen in een batch bevraging.

Dit is vergelijkbaar met de constatering vanuit het SPARQL endpoint dat een bulkbevraging nodig was. Dit geldt dus voor zowel de Lookup API SOR als die van de BAG en BGT in de laag Ontsluiting data.

#### Performance en andere non-functionals
Performance van de APIs is een belangrijk aspect, dat samenhangt met het eerder genoemde query planning. Cruciaal is dat elk van de services die data leveren voor de SOR op zich al goede performance moeten hebben, anders kunnen georchestreerde SOR services ook nooit snel worden. Non-functional aspecten zijn in deze architectuur extra belangrijk want je bent zo zwak als de zwakste schakel. 

In deze High-5 setting bleken de extra schakels in het netwerk (APIs bovenop APIs) qua performance verwaarloosbaar: elk stapje kost maar enkele milliseconden. Ook de impact van on the fly transponering was heel beperkt, vooral bij eenvoudige omzettingen zoals een gegeven van naam veranderen. Een belangrijke kanttekening is wel dat we natuurlijk niet met grote datavolumes gewerkt hebben. Mocht performance wel een issue worden, dan kan daaraan nog veel gedaan worden, bijvoorbeeld onderdelen van een query tegelijktijdig uitvoeren. 

Bij complexere transponeringsregels die zwaar op de techniek drukken kan een afweging gemaakt worden, of je die via de techniek moet oplossen of, als ze waarde opleveren, in de bron van de basisregistraties.

Ruimtelijke vragen zijn niet per sé een aandachtspunt wat betreft performance. Maar hoge performance loopt wel in het algemeen gevaar als je een vraag stelt waarop een grote selectie aan objecten terugkomt. Hoe ga je die sorteren, pagineren etc.? Dat zijn zware operaties.

De DiS Geo architectuurbeschrijving [[ARCH]] noemt een aantal niet-functionele eisen die van belang zijn voor SOR voorzieningen, waaronder performance maar ook andere eisen. Dat deze eisen aan de SOR gesteld worden betekent dat de services die onder de SOR liggen hier ook aan moeten voldoen. Ze moeten allemaal een hoge uptime hebben, goede foutafhandeling hebben, fouten en performance moeten traceerbaar zijn, etc. 

**Aanbeveling:** Een verdere uitwerking van de SOR voorzieningen architectuur / de niet-functionele eisen aan de onderliggende services is nodig.

#### Versionering van API's
In de loop der tijd zullen APIs worden doorontwikkeld en veranderen - zoals ook de onderliggende informatiemodellen. Dit is een uitdaging: als de onderliggende APIs van de SOR veranderen raakt dit de orchestratie / transponeringslaag. [Semantic versioning](https://semver.org/lang/nl/) is daarom nodig.

### Bevindingen over de REST API

Het realiseren van de REST API verliep zonder bijzondere problemen en kostte niet veel tijd (binnen 2 dagen gerealiseerd). 

Zoals bij alle van de Lookup API afnemende services was er een on the fly mapping nodig van het graphql endpoint naar de gewenste gegevensstructuur in de REST API.

### Bevindingen over de URI Dereferencing Service
Net als de REST API was deze snel te realiseren en waren er geen problemen mee. Een beperking is wel dat je per definitie altijd maar één object tegelijk kan opvragen aan deze service. In sommige situaties is een bulk bevraging handiger. Dat biedt deze service, vanwege de aard van URI dereferencing, niet.

Heel mooi is dat alle endpoints, dus zowel de REST API, de OGC Features API en de Linked Data API, uiteindelijk naar **dezelfde URI** voor een gegeven object oplossen (dereferencing). Elk object heeft dus een universele URI identificatie die werkt over meerdere technische ontsluitingen heen.

### Bevindingen over OGC API Features

#### Aansluiten op Lookup API was niet eenvoudig

Het aansluiten van de OGC API Features op de graphql gebaseerde Lookup API SOR was niet eenvoudig. Er moest specifieke code worden geschreven om de data te verkrijgen en om te vormen (bijvoorbeeld voor het uitfilteren van attributen en 'plat slaan' van geneste structuur). Voor een OGC API Features is dit niet nodig als de data al in een Postgres database of een Geopackage bestand zit in de juiste structuur. De ETL stappen zijn dan al gedaan; in de huidige situatie wordt er in feite nog ETL gedaan IN de API op het laatste moment.

Het schrijven van deze specifieke code is meer werk ten opzichte van het gebruik van een standaard GIS opslagmethode en blijkt bovendien ook wat lastiger dan verwacht. Je krijgt ook een beheerslast: als er in de Lookup API gegevens bij komen, moet er in de specifieke code ook weer iets aangepast worden met betrekking tot het wel of niet doorleveren van die gegevens.

#### Coördinaatreferentiesysteem
OGC API Features: Part 1 schrijft als coördinaatreferentiesysteem WGS 84 longitude/latitude voor (i.e. http://www.opengis.net/def/crs/OGC/1.3/CRS84). De Lookup API serveerde standaard de gegevens in het coördinaatreferentiesysteem van de bron, zijnde RD. 

Om dit op te lossen is in de Lookup API de optie geïmplementeerd om de gegevens in plaats van in RD, in ETRS 89 op te vragen. Tussen ETRS 89 en WGS 84 zit maar een kleine afwijking, en een hoge nauwkeurigheid is in dit geval niet belangrijk, dus we kunnen WGS 84 gelijkstellen aan ETRS 89, zoals beschreven in de nieuwe handreiking over  coördinaatreferentiesystemen van Geonovum [[CRS]]. De ETRS 89 coördinaten kunnen in de OGC API Features opgenomen worden in de GeoJSON output als zijnde WGS 84. 

#### "Geo-Graphql"
Vanuit de realisatie van de OGC API Features zien we, naast behoefte aan een standaard Graphql profiel, ook behoefte aan een standaard afspraak over 'geo-graphql', dat wil zeggen over hoe je ruimtelijke vragen kan stellen aan een Graphql endpoint. 

Het is niet gelukt om de OGC API Features op de LookUP API aan te sluiten zonder hard codeerwerk. Het lijkt erop dat een profiel/standaard kan helpen, maar zelfs als dat er is kan er nog hard codeerwerk nodig zijn. Op zich is dit niet heel veel werk maar het zegt wel iets en het betekent dat er mogelijk programmeerwerk nodig is bij latere wijzigingen in APIs. Dit is niet wenselijk want het maakt de oplossing beduidend minder flexibel. 

### Linked Data API en Knowledge Graph
Al snel op de eerste dag lukte het om de knowledge graph te vullen door de URI Dereferencing Service te bevragen. Dit was zeer eenvoudig te implementeren omdat de Web- en Linked Data standaarden voor interoperabiliteit zorgen. Zodra de data in de knowledge graph zat, was het ook eenvoudig om daar vervolgens integrale bevragingen op te doen en de resultaten te visualiseren. 

Ook was het goed mogelijk de data te integreren met andere beschikbare linked data. Hiervoor is gewerkt met een linkset waarin de relatie van BAG panden met de buurt waarin ze liggen administratief is uitgedrukt. 

#### Bulkbevraging
Ten behoeve van de knowledge graph is er behoefte aan het in bulk kunnen opvragen van een grote hoeveelheid data uit de Lookup API. Tijdens deze High-5 hebben we bulk bevragingen echter bewust buiten scope geplaatst (moeilijk binnen 3 dagen te realiseren) en de Lookup API biedt deze mogelijkheid nu dus niet. Daarom werd in eerste instantie de RDF data voor de hele gemeente Dronten via puntbevraging (per object op basis van een lijst met alle identifiers binnen de gemeente) opgehaald vanuit de URI Dereferencing Service. Omdat dit nogal lang duurt is als workaround ervoor gekozen om alleen de data voor het dorp Swifterbant op te vragen. 

Uiteraard wordt, zodra er meer tijd is, zo'n bulkbevragingsvoorziening wel gerealiseerd. 

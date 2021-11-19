## Inventarisatie van manieren om vertaalspecificaties vast te leggen

Zoals in het vorige hoofdstuk is uitgelegd, zijn er in de SOR vertalingsregels en afleidingsregels nodig die uitdrukken hoe de SOR inhoud zich verhoudt tot de gegevens in de bestaande basisregistraties. Deze regels willen we vastleggen op conceptueel niveau, zodat ze onafhankelijk zijn van een specifieke technische omgeving en zowel door domeinexperts als door programmeurs begrepen kunnen worden. 

Hiervoor hadden we niet direct een uitdrukkingsvorm voorhanden. Meestal worden vertaalspecificaties, vaak transformaties genoemd, in een technische omgeving uitgedrukt. Soms gebeurt dit op basis van vertaal- of 'mapping'-tabellen; deze hebben een niet-formeel karakter en complexere regels zijn er moeilijk in uit te drukken. We hebben tijdens de High-5 een korte inventarisatieronde gedaan van mogelijke uitdrukkingsvormen voor vertaalspecificaties.

### INSPIRE harmonisatiemethode
Bij het harmoniseren van eigen data naar INSPIRE geharmoniseerde data moet veel data getransformeerd worden uit bronsystemen naar het INSPIRE datamodel. 

Vaak wordt hier de tool [HALE studio](https://www.wetransform.to/products/halestudio/) voor gebruikt. Hierin kun je vertaalspecificaties voor gegevens uitdrukken. Hoe dit precies eruit ziet en of je deze vertaalspecificaties ook kunt hergebruiken buiten de HALE omgeving weten we nog niet.

In het programma Basisregistratie Ondergrond (BRO) zijn vertaalspecificaties gemaakt van bron naar INSPIRE in Excel tabellen. Zie [voorbeeld](https://github.com/BROprogramma/GLD/blob/gh-pages/INSPIRE/Grondwater%20INSPIRE%20mapping.xlsx?raw=true). 

### Niet-formele vertaaltabel
In het IGO project zijn [vertaalspecificaties](https://labs.kadaster.nl/demonstrators/architectuur-selfservice/KnowledgeGraph/) opgenomen in een vertaaltabel die kon worden gebruikt om samen met domeinexperts (die de inhoud kenden) vast te leggen hoe gegevens moesten worden gemapt of afgeleid. Daarna zijn deze specificaties in [SPARQL construct statements](https://labs.kadaster.nl/demonstrators/architectuur-selfservice/LDViews/) geïmplementeerd. 

Ook in het programma Basisregistratie Ondergrond (BRO) zijn vertaalspecificaties vastgelegd in een vertaaltabel (zie onder INSPIRE harmonisatiemethode).

### Visuele mapping tools
Er bestaan ook visuele mapping tools. Binnen het IGO traject werd bijvoorbeeld de tool [Weaver](https://www.weaverhq.com/why-weaver.html) gebruikt. Zie [voorbeeld](https://kadaster.wvr.io/bag2-0/home).

In de context van XML transformatie zijn er visuele mapping tools op de markt, waaruit XSLT gegenereerd kan worden voor de technische transformatie; zie bijvoorbeeld [Stylus Studio](http://www.stylusstudio.com/xslt-mapper.html). Er is echter nooit een visuele uitdrukkingsvorm gestandaardiseerd. Deze visuele mapping tools hebben dezelfde beperking als mapping tabellen: complexere mappings zijn niet altijd goed te visualiseren.

### UML
UML heeft voor zover wij konden ontdekken geen mogelijkheid om vertaalspecificaties uit te drukken in modelvorm. Hierbij plaatsen we de kanttekening dat UML zeer uitgebreid is, waardoor het kan zijn dat er wel een mogelijkheid bestaat die wij over het hoofd zagen. 

UML biedt wel in klasse-diagrammen een mogelijkheid om aan te geven dat een property van een class `derived` is. Maar meer dan een aanduiding is dit niet; je kunt niet aangeven hoe de property zich verhoudt tot datgene waaruit hij is afgeleid.

Imvertor gebruikt wel een soort mapping relaties tussen conceptuele en logische modellen: [tracing](https://support.ptc.com/help/modeler/r9.1/en/index.html#page/Integrity_Modeler/umlprofile/UML_Trace.html). Of dit geschikt is voor onze doeleinden hebben we niet kunnen bepalen. 

### QVT
[Query/View/Transformation (QVT)](https://en.wikipedia.org/wiki/QVT) is een aan UML gerelateerde standaard voor model transformaties. Ons is geen bestaande toepassing hievan bekend, maar vanwege de nauwe relatie met UML is het de moeite waard om ons hier verder in te verdiepen. Tijdens de High-5 hebben we dat nog niet gedaan.

### XSLT
[XSLT](https://www.w3.org/TR/xslt/) is een bekende declaratatieve transformatietaal waarin je kunt uitdrukken wat de transformatieregels zijn om van een bronformaat naar een doelformaat te komen. Het declaratieve karakter maakt de taal interessant; dit betekent dat de transformatieregels niet uitdrukken HOE een computer de vertaling van bron naar doel moet uitvoeren, maar alleen WAT de relatie is tussen bron en gewenste doel. 

XSLT is echter een uitdrukkingsvorm op technisch implementatie-niveau (het zijn scripts; niet te lezen voor een domeinexpert) en werkt alleen met XML input. Daardoor is het voor ons doel niet geschikt. 

### PROV
Met PROV ([[PROV-DM]] en [[PROV-O]]) kun je vastleggen hoe gegevens van elkaar zijn afgeleid. Dit is vergelijkbaar met [hoe je dat doet voor informatieobjecten](#modelleerpatroon-voor-de-beschrijving-van-de-afleiding-van-sor-informatieobjecten).

Voor het vastleggen van de herkomst van een gegeven, moeten we het gegeven als `PROV Entiteit` modelleren. Dit betekent dat we een individueel gegeven als object moeten kunnen beschrijven, zodat we deze kunnen voorzien van extra eigenschappen. Hoe je dit het beste kunt doen moet verder onderzocht worden.

### SHACL Rules
Met [SHACL Rules](https://www.w3.org/TR/shacl-af/#rules) ([[SHACL-AF]]) is het mogelijk om op basis van "shapes" in bestaande in RDF uitgedrukte gegevens, in combinatie met generatieregels, nieuwe gegevens af te leiden.

### GraphQL
In GraphQL specificeer je een standaardschema, dat de brondata beschrijft, en een doelschema, dat beschrijft wat je terug wilt krijgen. Deze druk je uit in GraphQL queries. Net als bij XSLT heeft GraphQL een declaratief karakter.

Net als XSLT is GraphQL een taal op technisch implementatie-niveau, maar het abstraheert wel van verschillende soorten datastores. Daarom vinden we het interessant om te verkennen in de volgende High-5. 

### RML

Met [RML](https://rml.io/) (RDF Mapping Languague) kun je willekeurige gestructureerde data transformeren naar een doelmodel in RDF. De ingrediënten voor een mapping zijn:
* Een manier om data te verkrijgen;
* Een manier om over een deel van de data te itereren;
* Een mapping naar het doelmodel.

Een vergelijkbare mapping-opzet zou ook toegepast kunnen worden voor het transponeren van gegevens. Hiervoor zouden bouwblokken uit RML hergebruikt kunnen worden. RML heeft bijvoorbeeld een rijke mogelijkheid om transformatiefuncties mee te nemen in een mapping op een declaratieve manier.

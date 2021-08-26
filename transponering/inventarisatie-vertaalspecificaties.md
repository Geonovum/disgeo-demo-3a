## Inventarisatie van manieren om vertaalspecificaties vast te leggen

### INSPIRE harmonisatiemethode
Bij het harmoniseren van eigen data naar INSPIRE geharmoniseerde data moet ook data getransformeerd wroden. Hoe wordt dit vastgelegd? 

[Marcel vraagt dit aan Clemens en Thorsten]

Vaak wordt hier de tool HALE voor gebruikt. Hierin kun je data vertaalspecificaties uitdrukken. Hoe dit precies eruit ziet en of je deze vertaalspecificaties ook kunt hergebruiken buiten de HALE omgeving weten we nog niet.

In het programma Basisregistratie Ondergrond (BRO) zijn vertaalspecificaties gemaakt naar INSPIRE in Excel tabellen. Zie [voorbeeld](https://github.com/BROprogramma/GLD/blob/gh-pages/INSPIRE/Grondwater%20INSPIRE%20mapping.xlsx?raw=true). 

### Niet-formele vertaaltabel
In het IGO project zijn [vertaalspecificaties](https://labs.kadaster.nl/demonstrators/architectuur-selfservice/KnowledgeGraph/) opgenomen in een vertaaltabel die kon worden gebruikt om samen met domeinexperts (die de inhoud kenden) vast te leggen hoe gegevens moesten worden gemapt of afgeleid. Daarna zijn deze specificaties in [SPARQL construct statements](https://labs.kadaster.nl/demonstrators/architectuur-selfservice/LDViews/) geïmplementeerd. 

Ook in het programma Basisregistratie Ondergrond (BRO) zijn vertaalspecificaties gemaakt (zie onder INSPIRE harmonisatiemethode).

### Visuele mapping tools
Bij IGO werd Weaver (link?) gebruikt. 

In de context van XML transformatie zijn er ook wel visuele mapping tools (waaruit dan XSLT gegenereerd kan worden) maar er is bij mijn weten nooit een visuele uitdrukkingsvorm gestandaardiseerd. Je had bij complexere mappings vaak ook meer dan een lijntje tussen elementen nodig.

Zie 
- http://www.stylusstudio.com/xslt-mapper.html

### UML
Heeft UML een mogelijkheid om vertaalspecificaties uit te drukken in modelvorm? 

Er is wel een mogelijkheid om aan te geven dat een property van een class `derived` is. Maar meer dan een aanduiding is dit dacht ik niet.

Imvertor legt/gebruikt wel een soort mapping relaties tussen conceptuele en logische modellen. Tracing dacht ik. Meer lezen: https://support.ptc.com/help/modeler/r9.1/en/index.html#page/Integrity_Modeler/umlprofile/UML_Trace.html

### QTV
https://en.wikipedia.org/wiki/QVT

### XSLT
Een declaratatieve transformatietaal waarin je kunt uitdrukken wat de transformatieregels zijn om van een bronformaat naar een doelformaat te komen. Dit is echter een uitdrukkingsvorm op technisch implementatie-niveau en werkt alleen met XML input. 

### PROV-O
Heeft een manier om vast te leggen hoe gegevens van elkaar zijn afgeleid.

[Pano ...]

### SHACL Rules
(oa RWS gebruikt dit)
[...]

### GraphQL
In GraphQL specificeer je een standaardschema (schema van de brondata) en een schema hoe je het zou willen hebben. Dat druk je uit in GraphQL queries. Interessant om te verkennen in de volgende high 5. 

Net als XSLT zit dit wel op technisch niveau. Maar je kan verschillende soorten datastores aanspreken. 

### RML

[...]
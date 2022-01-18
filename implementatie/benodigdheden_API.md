## Benodigdheden ten behoeve van API's

Dit hoofdstuk beschrijft een opsomming van de benodigheden om API's te maken voor afnemers/gebruikers, met name voor developers.  

We onderscheiden voor de High-5's de volgende externe API's: 

* API volgens de NL API strategie
* API volgens de OGC API Feature part 1
* API volgens Linked Data
* Verder kent de iGO omgeving een user-interface om analyse vragen te kunnen stellen op de data. 

### Overzicht input voor externe API's 

De input die hiervoor gebruikt kan worden: 

1. Informatiemodel in ReSpec (html), te vinden in [](#imsor-gebouw-0). 
2. [Informatiemodel in een mim-export formaat](https://github.com/Geonovum/disgeo-demo-3a/blob/main/implementatie/imsor-gebouw-high5-20211130.xml) (in wording, nog niet officieel), in XML.
3. [Informatiemodel in een RDF formaat](https://github.com/Geonovum/disgeo-demo-3a/blob/main/implementatie/imsor-gebouw-high5-20211130.ttl) (RDFS/OWL/SHACL)
4. JSON schema van het informatiemodel - voor 1 en 2 

<aside class="issue">Het JSON Schema ontbreekt nog.</aside>

### Interne API's 

Verder is er een integratiecomponent voorzien die de data uit de BAG en de BGT samenvoegt volgens vertaalregels. 
Deze integratiecomponent kan vervolgens gebruikt worden om de genoemde 4 externe API's te voeden. 

We willen vooral leren hoe dit werkt, of dit werkt, wat dit betekent voor API specificaties en wat de benodigde input hiervoor is.

Deze component heeft nodig: 

 * Een van bovenstaande 4 items (vermoedelijk 2)
 * Vertaalregels, deze bestaan uit: 
   * Directe eigenschappen, te vinden in [](#gebouwen-van-bron-naar-sor)
   * Historie BAG en BGT, te vinden in [](#specificatie-van-de-vertaling-van-historie) 
   * Metadata 

<aside class="issue">Vertaalregels voor metadata ontbreken nog.</aside>

Hiervan wordt een GraphQL schema gemaakt t.b.v. een (interne) API.

### Gebruik van de interne API door de externe API's 

De interne GraphQL API kan gebruikt worden voor de hierboven genoemde API's 1, 2, 3 en 4. 

Vraag: hoe precies de GraphQL gebruikt kan worden t.b.v. API 1 t/m 4 is een onderdeel van de 'implementatie' High-5.  

Vraag: voor de LD API, gebruiken we dan de interne GraphQL API of gebruiken we daarvoor de database die onder iGO ligt (voor de High-5). 

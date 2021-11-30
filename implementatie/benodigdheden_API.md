## Benodigdheden ten behoeve van API's

Dit hoofdstuk beschrijft een opsomming van de benodigheden om API's te maken. 

We onderscheiden voor de high-5's de volgende externe API's: 

* API volgens de NL API strategie
* API volgens de OGC API Feature part 1
* API volgens Linked Data
* Verder kent de iGO omgeving een user-interface om analyse vragen te kunnen stellen op de data. 

### Overzicht input voor externe API's 

De input die hiervoor gebruikt kan worden: 

1. Informatiemodel in re-spec (html), te vinden in [](#imsor-gebouw-0). 
2. Informatiemodel in een mim-export formaat (in wording, nog niet officieel), in XML, te vinden hier TODO Lennart 
3. Informatiemodel in een RDF formaat (RDFS/OWL/SHACL), te vinden hier TODO Pano 
4. JSON schema van het informatimodel - voor 1 en 2, te vinden hier TODO Lennart 

### Interne API's 

Verder is er een integratie component voorzien die de data uit de BAG en de BGT (en ...) samenvoegt volgens vertaalregels. 
Deze integratie component kan vervolgens gebruikt worden om de genoemde 4 externe API's te voeden. 

We willen vooral leren hoe dit werkt, of dit werkt, wat dit betekent voor API specificaties en benodigde input.

Deze component heeft nodig: 

 * Een van bovenstaande 4 items (vermoedelijk b)
 * Vertaalregels, deze bestaan uit: 
   * Directe eigenschappen, te vinden in [](#gebouwen-van-bron-naar-sor)
   * Historie BAG, te vinden hier: tijdslijnen_vertaling.md
   * Historie BGT, te vinden hier: tijdslijnen_vertaling.md
   * Metadata, te vinden hier TODO wie? 

Hiervan wordt een GraphQL schema gemaakt t.b.v. een (interne) API.

### Gebruik van de interne API door de externe API's 

De interne GraphQL API kan gebruikt worden voor de hierboven genoemde API's 1, 2, 3 en 4. 

Vraag: hoe precies de GraphQL gebruikt kan worden t.b.v. API 1 t/m 4 is een onderdeel van de 'implementatie' high-5.  

Vraag: voor de LD API, gebruiken we dan de interne GraphQL API of gebruiken we daarvoor de database die onder iGO ligt (voor de high-5). 

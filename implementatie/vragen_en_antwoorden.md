## Implementatie vragen en antwoorden

Een overzicht van vragen en antwoorden die opkomen vanuit het implementatie perspectief. 

_Hoe kunnen we verifieren of de vertaal regels correct zijn geimplementeerd?_ 
Het lijkt handig om de data uit de BAG en de BGT ook los op te nemen in de response op enige manier, met de tijdslijnen en de data. Precies zoals de BAG en BGT dit doen in een API. 
Dit is een API design aanvulling, niet een IM concern.  

_Wat als een object in de BAG al bestaat maar in de BGT nog niet, wat doen we dan met de attributen uit de BGT die wel verplicht zijn in het model?_ 
Implementeren als oneOf null constructie in JSON.
In informatiemodel opnemen van mogelijk geen waarde/voidable/nillable (eventueel met bijbehorende reden) 

_Wat als de bronhouder code van de BGT niet hetzelfde is als die van de BAG, bij het in elkaar schuiven? 
Error. 

_Kan het voorkomen dat een IM Gebouw object soms een identificatie uit de BGT heeft en soms uit de BAG?_ 
Nee. Gebouw en Verblijfsobject hebben altijd een id uit de BAG. De andere objecttypen uit de BGT. Zelfs voor Gebouw, want Gebouw bestaat altijd eerst als Pand in de BAG. 

'Domein' van Gebouw en Verblijfsobject is dan altijd zoals de BAG c.q. NL.IMBAG.Pand of NL.IMBAG.verblijfsobject, dit kan je 1 op 1 overnemen van de BAG API. 
'Domein' van de BGT objecten is altijd 'NL.IMGeo' (?)


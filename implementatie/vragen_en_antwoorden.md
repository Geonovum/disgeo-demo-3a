## Implementatievragen en antwoorden

Een overzicht van vragen en antwoorden die opkomen vanuit het implementatieperspectief. 

_Hoe kunnen we verifiëren of de vertaalregels correct zijn geïmplementeerd?_ <br/>
Het lijkt handig om de data uit de BAG en de BGT ook los op te nemen in de response op enige manier, met de tijdslijnen en de data. Precies zoals de BAG en BGT dit doen in een API. 
Dit is een API design aanvulling, niet een IM concern.  

_Wat als een object in de BAG al bestaat maar in de BGT nog niet, wat doen we dan met de attributen uit de BGT die wel verplicht zijn in het model?_ <br/>
Implementeren als `oneOf null` constructie in JSON.
In informatiemodel opnemen van mogelijk geen waarde/voidable/nillable (eventueel met bijbehorende reden) 

_Wat als de bronhouder code van de BGT niet hetzelfde is als die van de BAG, bij het in elkaar schuiven?_ <br/>
Error. 

_Kan het voorkomen dat een IM Gebouw object soms een identificatie uit de BGT heeft en soms uit de BAG?_ <br/>
Nee. Gebouw en Verblijfsobject hebben altijd een id uit de BAG. De andere objecttypen uit de BGT. Zelfs voor Gebouw, want Gebouw bestaat altijd eerst als Pand in de BAG. 

<aside class="issue">Toch kan het wel voorkomen dat een SOR Gebouw geen BAG identificatie heeft. Ook de BGT objecten 
met type `Bunker` | `Schuur` | `Open loods` | `Overkapping` worden getransponeerd naar SOR Gebouw. Deze hebben geen relatie met BAG panden want dat zijn het in de huidige BAG populatie niet. </aside>

'Domein' van Gebouw en Verblijfsobject is dan altijd zoals de BAG c.q. `NL.IMBAG.Pand` of `NL.IMBAG.verblijfsobject`, dit kan je 1 op 1 overnemen van de BAG API. 
'Domein' van de BGT objecten is altijd `NL.IMGeo`.
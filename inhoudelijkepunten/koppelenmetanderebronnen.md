## Gegevens koppelen tussen een SOR Gebouw en een andere informatiebron  

De bronnen die onder de SOR liggen zijn andere bronnen dan waar de energiegegevens worden bijgehouden. Wat in ieder geval niet de bedoeling is om de data uit deze bronnen over te nemen en op te slaan. De bedoeling is om de verschillende bronnen te bevragen en de data uit deze bronnen in samenhang te kunnen leveren aan afnemers. In dit geval gaat het niet om het samenhang aanbrengen van data van de BR's onder de SOR, maar van het aanbrengen van samenhang van data uit ook andere bronnen met de data van de SOR.  

We noemen de niet-SOR bronnen in onderstaande tekst: andere bronnen. 

De belangrijkste stap is om eerst een betrouwbare koppeling te leggen van een andere bron naar de SOR, al dan nite via de BAG, de BGT, de WOZ. Dit is op zichzelf niet eenvoudig. je kan hierbij denken aan een koppeling met een matching op basis van adres, geometrie, of beide. 

Manieren van koppelen: 
- Deze koppeling zou een beheerde relatie kunnen zijn vanuit een bron object naar een SOR object. 
- Deze koppeling zou een bron object met een SOR object kunnen koppelen, die het SOR object niet verandert en het eigen bronobject niet verandert. Je zou dit een koppelklasse kunnen noemen. 

Voorbeelden van deze koppelingen zijn: 
- De EAN-BAG koppeling (beheerde relatie)  
- De BRK-BAG koppeling (koppelklasse die beide bronnen niet aanpast) 

Nadat de koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
- De koppeling loopt in principe altijd van een "andere" bron naar de SOR. 
- Binnen de SOR zelf zijn er koppelingen tussen de BAG en de BGT, de BAG en de WOZ, maar deze zijn voor de gebruikers van de SOR verborgen. 
- Van de SOR naar een andere bron zal er geen koppeling zijn (in theorie wel mogelijk) 
- Een koppeling kan ook gelegd worden ales deze zuiver geometrisch kan orden bepaald. 
 
Nadat de koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
Hier zijn een aantal opties denkbaar. 

_Optie 1: andere bronnen koppelen met de SOR, en niet andersom_ 

Een SOR object heeft een identificatie en andere bronnen koppelen hiermee. Wanneer er informatieproducten worden gemaakt, kan dit product putten uit alle bronnen, waar de SOR er een van is. 

Voordelen: 
- Er is geen impact op de SOR 
- Er ontstaat een eco-systeem waarmee informatie uit bronnen gekoppeld kan worden met de SOR en de BR's 

Implicaties: 
- Het SOR informatiemodel kent alleen SOR gegevens. 
- Andere bronnen (moeten) gaan koppelen met de SOR (koppelingen naar BR's worden vervangen met koppelingen naar de SOR)
- De standaarden die de SOR hanteert worden niet gebruikt door de andere bronnen. 
- Afnemers zijn afhankelijk van de informatieproducten die gemaakt worden of moeten deze zelf maken. 

Nadeel: deze aanpak standaardiseert niet sterk. 

_Optie 2: modelleer de gegevens mee in een SOR Gebouw_ 

Een SOR object krijgt extra gegevens erbij. 

Voorwaarden: 
- maak duidelijk wat de herkomst van het gegeven is uit het energie domein (en niet uit een BR) 
- de informatievoorziening die de energie gegevens levert moet te bevragen zijn door de SOR 

Voordeel: 
- het volstaat voor afnemers om een SOR Gebouw op te vragen. 

Implicaties: 
- de verantwoordelijk van het meeleveren van gegevens komt bij de SOR te liggen (in overleg uiteraard) 
- de eisen aan gegevens voor BR's gaan ook gelden voor de informatievoorziening die de energie gegevens levert, zoals de beschrijving en de standaarden die hiervoor gelden, de historie tijdslijnen en tijdreis mogelijkheden) 

_Optie 3: extend het SOR object en voeg je eigen gegevens toe_ 

Je legt dan geen koppeling, maar je extend het SOR object. Dit kan alleen als je echt gegevens wilt toevoegen aan SOR Gebouw, zonder eigen objecttype te introduceren. In de implementatie zal dit, vanwegen het bijhouden van historie, toch lijken op 1 van de 2 eerder genoemde manieren van koppelen. 

_Andere gedachtes_

De genoemde opties kennen eigen nadelen en voordelen. Als we op zoek gaan naar best of both worlds zou je kunnen denken aan: 

- Modelleer het SOR object met alleen SOR gegevens, en maak het mogelijk om subtypes hiervan te modelleren met daarin extra gegevens. 

- Modelleer het SOR object met alleen SOR gegevens, en links op naar andere bronnen die aangesloten zijn/worden op de SOR en stel hiervoor aansluitvoorwaarden. 

Bij aansluitvoorwaarden kan je denken aan: dat de SOR en andere bronnen aan dezelfde standaarden voldoen wat betreft modellering, historie en tijdreizen en andere standaarden die nodig zijn om te komen tot een samenhangend stelsel van BR en niet-Br bronnen, waarin afnemers het ook ervaren als een samenhangend stelsel.   


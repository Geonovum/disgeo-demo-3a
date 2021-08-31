## Gegevens koppelen tussen een SOR Gebouw en een andere informatiebron  


![voorbeeld-informatie](media/voorbeeld-informatie.png)

De bronnen die onder de SOR liggen zijn andere bronnen dan waar de energiegegevens worden bijgehouden. Wat in ieder geval niet de bedoeling is om de data uit deze bronnen over te nemen en op te slaan. De bedoeling is om de verschillende bronnen te bevragen en de data uit deze bronnen in samenhang te kunnen leveren aan afnemers. In dit geval gaat het niet om het samenhang aanbrengen van data van de BR's onder de SOR, maar van het aanbrengen van samenhang van data uit ook andere bronnen met de data van de SOR.  

We noemen de niet-SOR bronnen in onderstaande tekst: andere bronnen. 

De belangrijkste stap is om eerst een betrouwbare koppeling te leggen van een andere bron naar de SOR, al dan niet via de BAG, de BGT, de WOZ. Dit is op zichzelf niet eenvoudig. je kan hierbij denken aan een koppeling met een matching op basis van adres, geometrie, of beide. 

### Manieren van koppelen 

- Deze koppeling zou een beheerde relatie kunnen zijn vanuit een bron object naar een SOR object. 
- Deze koppeling zou een bron object met een SOR object kunnen koppelen, die het SOR object niet verandert en het eigen bronobject niet verandert. Je zou dit een koppelklasse kunnen noemen. 

Voorbeelden van deze koppelingen zijn: 
- De EAN-BAG koppeling (beheerde relatie vanuit een eigen object uit de eigen bron naar een BR/SOR object)  
- De BRK-BAG koppeling (koppelklasse die beide bronnen niet aanpast) 

Nadat de koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
- De koppeling loopt in principe altijd van een "andere" bron naar de SOR. 
- Binnen de SOR zelf zijn er koppelingen tussen de BAG en de BGT, de BAG en de WOZ, maar deze zijn voor de gebruikers van de SOR verborgen. 
- Van de SOR naar een andere bron zal er geen koppeling zijn (in theorie wel mogelijk) 
- Een koppeling kan ook gelegd worden ales deze zuiver geometrisch kan orden bepaald. 
 
Nadat de koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
Hier zijn een aantal opties denkbaar. 

### Combineren van de eigen bron met SOR gegevens

Er zijn verschillende manieren van modelleren waar aan gedachte kan worden. Deze zijn verkend, elk heeft eigen voordelen en nadelen. Er is nog geen voorkeur uitgesproken, en nog geen advies per situatie. We gaan deze opties verder onderzoeken. 

_Optie 1: andere bronnen koppelen met de SOR, en niet andersom_ 

Een SOR object heeft een identificatie en andere bronnen koppelen hiermee. Wanneer er informatieproducten worden gemaakt, kan dit product putten uit alle bronnen, waar de SOR er een van is. 

Voordelen: 
- Er is geen impact op de SOR, maar het koppelt wel beide bronnen aan elkaar
- Er ontstaat een eco-systeem waarmee informatie uit bronnen gekoppeld kan worden met de SOR en de BR's 

Implicaties: 
- Het SOR informatiemodel kent alleen SOR gegevens. 
- Andere bronnen (moeten) gaan koppelen met de SOR (koppelingen naar BR's worden vervangen met koppelingen naar de SOR)
- De standaarden die de SOR hanteert worden niet gebruikt door de andere bronnen. 
- Afnemers zijn afhankelijk van de informatieproducten die gemaakt worden of moeten deze zelf maken. 

Nadeel: deze aanpak standaardiseert niet sterk. 

_Optie 2: modelleer de gegevens mee in een SOR Gebouw_ 

Een SOR object krijgt extra gegevens erbij. Dit is vooral geschikt wanneer er een informatieproduct gemaakt wordt die twee bronnen combineert (zoals de SOR zelf ook doet door meerdere BR's met elkaar te combineren). Een product leverancier zou dit kunnen doen of de partij die de andere bron(nen) ontsluit.

Voorwaarden: 
- Maak goed duidelijk wat de herkomst van het gegeven is qua bron - uit de SOR of uit het energie domein 
- In de implementatie zal dit, vanwegen het bijhouden van historie, nodig zijn om in je eigen object historie bij te houden op dezelfde manier zoals de SOR dit doe.t 

Voordeel: 
- het volstaat voor afnemers om het informatieproduct op te vragen
- een afnemer hoeft niet de bronnen apart af te lopen en zelf de software te ontwikkelen 
- de bron beheerder en de SOR beheerder kunnen er samen voor zorgen dat het informatieproduct functioneel helemaal goed/juist is, afnemers hoeven dit niet te doen 

Implicaties: 
- de verantwoordelijkheid van het meeleveren van gegevens komt bij de informatieproduct leverancier te liggen (in overleg met de SOR) 
- de eisen aan gegevens voor BR's gaan ook gelden voor de informatievoorziening die het informatieprodcut levert levert, zoals de beschrijving en de standaarden die hiervoor gelden, de historie tijdslijnen en tijdreis mogelijkheden). 

Aandachtspunt: het is voor afnemers wat lastiger om te zien welke gegevens van de SOR zijn en welke van een andere bron. Spendeer dus extra aandacht aan het goed beschrijven van de inhoud van het product en aan de (semantische) correctheid van het combineren van de gegevens. 

Deze aanpak standaardiseert goed.  

_Optie 3: extend het SOR object en voeg je eigen gegevens toe_ 

Je legt dan geen relatie, maar je extend het SOR object. 

Voorwaarde: 
- Dit kan alleen als je echt objecttype ook overeenkomt met wat er in de SOR onder een Gebouw wordt verstaan, maar als dat zo is dan is dit semantisch direct goed geregeld. 
- In de implementatie zal dit, vanwegen het bijhouden van historie, nodig zijn om in je eigen object historie bij te houden op dezelfde manier zoals de SOR dit doe.t 

Voordeel; 
- Het is direct duidelijk dat alle definities en afbakeningen van de SOR ook gelden voor de extensie (de specialisatie is je eigen object, het SOR Gebouw is de generalisatie)

Deze aanpak standaardiseert goed.  

_Optie 4: koppelklasse_

Maak een nieuw objecttype en noem deze: KoppelingSORMyObject. Leg een relatie naar een SOR object en naar je eigen MyObject. 

Voordelen: 
- de SOR en je eigen objecten worden niet geraakt, op geen enkele manier, maar er is wel een koppeling. 
- je kan de historie van de koppeling los beheren 

Nadeel: deze aanpak standaardiseert niet sterk. 

### Aanbeveling 

Voor de aanbevelingen wordt verwezen naar paragraaf [Aanbevelingen met betrekking tot koppelen](#aanbevelingen-met-betrekking-tot-koppelen)
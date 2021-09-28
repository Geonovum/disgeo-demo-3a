## Gegevens koppelen tussen een SOR Gebouw en een andere informatiebron  


![voorbeeld-informatie](media/voorbeeld-informatie.png)

De bronnen waaruit de SOR wordt samengesteld zijn andere bronnen dan waar de energiegegevens worden bijgehouden. Wat in ieder geval niet de bedoeling is, is het overnemen en opslaan van de data uit deze bronnen in de SOR. In plaats daarvan beogen we een federatief stelsel, waarin de verschillende bronnen worden bevraagd en de data uit deze bronnen in samenhang geleverd kunnen worden aan afnemers. 

In dit geval gaat het niet om het aanbrengen van samenhang tussen gegevens van de basisregistraties onder de SOR, maar van het aanbrengen van samenhang tussen gegevens *uit andere bronnen* met de data van de SOR.  

We noemen de niet-SOR bronnen in onderstaande tekst: andere bronnen. 

De belangrijkste stap is om eerst een betrouwbare koppeling te leggen van een andere bron naar de SOR, al dan niet via de BAG, de BGT, de WOZ, enz. Dit is op zichzelf niet eenvoudig. je kan hierbij denken aan een koppeling op basis van een automatische matching op basis van adres, geometrie, of beide. 

### Manieren van koppelen 

- Deze koppeling zou een beheerde relatie kunnen zijn vanuit een andere bron object naar een SOR object. 
- Deze koppeling zou een andere bron object met een SOR object kunnen koppelen, die het SOR object niet verandert en het eigen bronobject niet verandert. Je zou dit een koppelklasse kunnen noemen. 

Voorbeelden van deze koppelingen zijn: 
- De EAN-BAG koppeling (beheerde relatie vanuit een eigen object, het energieafgiftepunt, uit een andere bron naar een BR/SOR object)  
- De BRK-BAG koppeling (koppelklasse die beide bronnen niet aanpast) 

Uitgangspunten:
- De koppeling loopt in principe altijd van een "andere" bron naar de SOR. 
- Binnen de SOR zelf zijn er koppelingen tussen de BAG en de BGT, de BAG en de WOZ, maar deze zijn voor de gebruikers van de SOR verborgen. 
- Van de SOR naar een andere bron zal er geen koppeling zijn (in theorie wel mogelijk). 
- Een koppeling kan ook gelegd worden ales deze zuiver geometrisch kan worden bepaald. 
 
Nadat de koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
Hier zijn een aantal opties denkbaar. 

### Combineren van de eigen bron met SOR gegevens

Er zijn verschillende modelleerpatronen waaraan gedacht kan worden. Deze patronen hebben we in de High-5 verkend. Elk patroon heeft eigen voordelen en nadelen; er is nog geen voorkeur uitgesproken, en nog geen advies per situatie. We gaan deze opties verder onderzoeken. 

_Optie 1: andere bronnen koppelen met de SOR, en niet andersom_ 

Een SOR object heeft een identificatie en andere bronnen koppelen hiermee. Wanneer er informatieproducten worden gemaakt, kan dit product putten uit alle bronnen, waar de SOR er één van is. 

Voordelen: 
- Er is geen impact op de SOR, maar het koppelt wel beide bronnen aan elkaar;
- Er ontstaat een eco-systeem waarmee informatie uit bronnen gekoppeld kan worden met de SOR en de basisregistraties. 

Implicaties: 
- Het SOR informatiemodel kent alleen SOR gegevens. 
- Andere bronnen (moeten) gaan koppelen met de SOR (koppelingen naar basisregistraties worden vervangen door koppelingen naar de SOR);
- De standaarden die de SOR hanteert worden niet gebruikt door de andere bronnen;
- Afnemers zijn afhankelijk van de informatieproducten die gemaakt worden of moeten deze zelf maken. 

Nadeel: deze aanpak standaardiseert niet sterk. 

_Optie 2: modelleer de gegevens mee in een SOR Gebouw_ 

Een SOR object krijgt extra gegevens erbij. Dit is vooral geschikt wanneer er een informatieproduct gemaakt wordt die twee bronnen combineert (zoals de SOR zelf ook doet door meerdere basisregistraties met elkaar te combineren). Een productleverancier zou dit kunnen doen of de partij die de andere bron(nen) ontsluit.

Voorwaarden: 
- Maak goed duidelijk wat de herkomst van het gegeven is qua bron - uit de SOR of uit, bijvoorbeeld, het energie domein;
- In de implementatie zal het, vanwege het bijhouden van historie, nodig zijn om in je eigen object historie bij te houden op dezelfde manier als de SOR dit doet. 

Voordeel: 
- Het volstaat voor afnemers om het informatieproduct op te vragen;
- Een afnemer hoeft niet de bronnen apart te bevragen en zelf de software te ontwikkelen;
- De bron beheerder en de SOR beheerder kunnen er samen voor zorgen dat het informatieproduct functioneel helemaal goed/juist is, afnemers hoeven dit niet te doen. 

Implicaties: 
- De verantwoordelijkheid van het meeleveren van gegevens komt bij de informatieproductleverancier te liggen (in overleg met de SOR);
- De eisen aan gegevens voor basisregistraties gaan ook gelden voor de informatievoorziening die het informatieproduct levert, zoals de beschrijving en de standaarden die hiervoor gelden, de historie tijdslijnen en tijdreis mogelijkheden. 

Aandachtspunt: het is voor afnemers wat lastiger om te zien welke gegevens van de SOR zijn en welke van een andere bron. Spendeer dus extra aandacht aan het goed beschrijven van de inhoud van het product en aan de (semantische) correctheid van het combineren van de gegevens. 

Deze aanpak standaardiseert goed.  

_Optie 3: breid het SOR object uit en voeg je eigen gegevens toe_ 

Je legt dan geen relatie, maar je maakt een eigen extensie van het SOR object. 

Voorwaarde: 
- Dit kan alleen als je eigen objecttype echt overeenkomt met wat er in de SOR onder een Gebouw wordt verstaan. Als dat zo is dan is dit semantisch direct goed geregeld. 
- In de implementatie zal het, vanwege het bijhouden van historie, nodig zijn om in je eigen object historie bij te houden op dezelfde manier als de SOR dit doet. 

Voordeel:
- Het is direct duidelijk dat alle definities en afbakeningen van de SOR ook gelden voor de extensie (de specialisatie is je eigen object, het SOR Gebouw is de generalisatie).

Deze aanpak standaardiseert goed.  

_Optie 4: koppelklasse_

Maak een nieuw objecttype en noem deze: KoppelingSORMyObject. Leg een relatie naar een SOR object en naar je eigen MyObject. 

Voordelen: 
- De SOR en je eigen objecten worden niet geraakt, op geen enkele manier, maar er is wel een koppeling. 
- Je kan de historie van de koppeling los beheren.

Nadeel: deze aanpak standaardiseert niet sterk. 

### Aanbeveling 

Voor de aanbevelingen wordt verwezen naar paragraaf [Aanbevelingen met betrekking tot koppelen](#aanbevelingen-met-betrekking-tot-koppelen).
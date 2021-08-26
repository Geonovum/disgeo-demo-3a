# Energieafgiftepunten

Een mogelijk leuke, aan de energietransitie gerelateerde use case om tijdens deze en volgende high 5 sessies op in te zoomen, gaat over zogenaamde energieafgiftepunten. Hieronder wat kennis hierover, opgetekend in een gesprek met Jan van Gelder (Geonovum, ex-Alliander). 

- Energieafgiftepunten zijn onderdeel van netwerkdata. Met behulp van netwerkdata kun je bijvoorbeeld  traces uitvoeren, aggregeren tot verzorgingsgebieden, etc.
- Samengevat heb je binnen het energienetwerkmodel een distributienet, waarmee je de hogere spanningen aan elkaar knoopt, en een aansluitnet, die naar de huizen gaat. In de meterkast zit de meter en daar zit een schroef en dat is feitelijk het fysieke afgiftepunt. Daar begint je eigen netwerk als consument. 
- De meter staat bovenop het afgiftepunt en meet wat daar gebeurt, ingaande en eventueel uitgaande stroom (en gas, maar we focussen ons hier op energie).
- Deze meter is van de netbeheerder. 
- Een interessant gegeve is de EAN code. Iedere consument/prosument heeft een EAN code. Deze is gebonden aan het adres. Soms heb je er 2, voor levering door en levering aan netbeheerder, maar dit is iets van het verleden. In slimme meters heb je maar 1 code. EAN is een sleutel naar de klantenadministratie van de netbeheerder. 
- Netbeheerders hebben veel problemen gehad bij het matchen van adres en aansluitpunt. Er was vroeger geen uniforme adrescodering in Nederland, met name huisnummertoevoegingen verschilden per regio/stad. Bv Amsterdam had de toevoeging 'rood' en 'zwart', maar de PTT hanteerde dat niet. Vroeger konden netbeheerders dus geen energieatlas maken, omdat ze hun gegevens niet goed genoeg konden relateren aan adressen. 
- Nu is dat een stuk beter, de koppeling van BAG ID met EAN is bijvoorbeeld bij Alliander inmiddels gerealiseerd. Op basis van adres met handmatige nabewerking. Jan en Dick hebben gebeld met iemand van kadaster die hierbij betrokken is geweest. Jan weet niet hoever andere netbeheerders hiermee zijn. 
- De relatie tussen EAN en BAG ID is in situaties met één pand met één verblijfsobject (VBO) wel eenduidig, maar als je een flat hebt met meerdere vbo's is het lastiger. Je weet dan via de BAG alle adressen in een flat, en de netbeheerder heeft ook alle meters in de flat, maar weet niet hoe de bekabeling in de flat loopt. Ze hebben dit dan gemodelleerd als een overdrachtspunt (ook wel aansluitcomplex) met een leiding naar het gebouw, en naar alle vbo's (1 - * relatie). Dit is opgelost door soms de relatie te leggen naar een BAG pand en soms naar een BAG vbo. 
- Via een afgiftepunt kun je de data van standaardjaarverbruiken ophalen. 
- Als je die koppeling tussen EAN en BAG ID hebt, en als je de energielabels er ook bij kan halen, kun je kijken of energielabel en daadwerkelijk verbruik een beetje matchen. Dat is interessante informatie, want dan kun je bijvoorbeeld de gebouwen vinden waar de isolatie nog verbeterd kan worden.
- Het is dan ook mogelijk om te kijken naar de netcapaciteit, de netbeheerder kan zo bepalen of die groot genoeg is / of er nog ruimte is. Dan kunnen ze weten (in combinatie met hun eigen data van de kabeldikte enzo) of ze nog grote windparken/zonnevelden kunnen bijzetten. Dit soort informatie is te vinden als netcongestiekaart. Zie bv https://www.enexis.nl/zakelijk/duurzaam/beperkte-capaciteit/gebieden-met-schaarste en https://www.liander.nl/transportschaarste/beschikbaarheid-capaciteit. 
- Netbeheerders gebruiken ook vaak postcodegebieden, bijvoorbeeld om te kijken hoeveel huishoudens getroffen zijn door een stroomuitval. Maar met netwerktracing zouden ze dat veel preciezer kunnen zien. 
- Ze kunnen bijvoorbeeld ook doorrekenen of hun netwerk wel efficient geschakeld is. 
- Maar voor al deze dingen hebben ze die standaardjaarverbruiken op de juiste afgiftepunten nodig (juist geadresseerd dus), anders is de berekening niet accuraat. 
- Jan weet niet of de BAG nog onhandigheden bevat, maar bijvoorbeeld informatie over waar de vbo's in het pand zitten zou helpen. De netbeheerders zouden ook graag de kabels in de panden (vooral panden met meerdere vbo's) willen intekenen, maar daarvoor heb je 3D nodig, en historische data (Huisaansluitschetsen, die vaak met de hand op een kladje getekend zijn). Deze huisaansluitschetsen kloppen lang niet altijd. Ze werden wel bewaard en zijn gedigitaliseerd (deels overgenomen, deels is er data bij gegenereerd op basis van best guess). Bij grote renovaties wordt deze data wel ingetekend op basis van de werkelijke situatie. 
- Energietransitie is een leuk onderwerp. Op basis van goede netcongestie-informatie kun je gericht subsidie geven. Deze informatie zou je eigenlijk landelijk dekkend willen hebben, maar dan moet je wel zorgen dat ze op dezelfde manier zijn uitgerekend, i.e. uniform zijn. Daar zit ook een mogelijke standaardisatie use case.
- TNO heeft een vrij eenvoudig, overzichtelijk informatiemodel bedacht voor dit soort data https://www.tno.nl/nl/aandachtsgebieden/informatie-communicatie-technologie/expertisegroepen/monitoring-control-services/grip-op-de-energietransitie-met-esdl/ Zie ook github repo link onderaan dit artikel. Jan vond dit een handig model.
- Als we deze case doen kunnen we ook ontdekken waar de standaardisatievraagstukken en mogelijkheden voor data-optimalisatie zitten. 

## EAN koppeling 

Een gebouw is een plek waar iemand woont, of waar een bedrijf is gevestigd etcetera en hierbij is sprake van een energiebehoefte, die gelevert wordt  via een energie afgifte punt. Energie afgifte punten worden administratief gekoppeld aan een gebouw c.q. een BAG Pand, of aan een deel van een gebouw c.q. een BAG verblijfsobject. Dit noemen we de EAN koppeling. 

_Informatiebehoefte rondom een SOR Gebouw op het gebied van energie_ 

De informatie waar o.a. behoefte aan is: 
- verwachte jaargebruik van gas 
- verwachte jaargebruik van gas 
- energiesoorten die geleverd worden: waardelijst met o.a. gas, elecktra
- meterstand gas
- meterstand elektra 

Er zijn vele meer gegevens die interessant zijn, we beperken ons tot deze. 

Het informatiemodel waar deze informatie te vinden is: TODO link. 

_EAN gegevens koppelen met een SOR Gebouw_ 

De bronnen die onder de SOR liggen zijn andere bronnen dan waar de energiegegevens worden bijgehouden. Wat in ieder geval niet de bedoeling is om de data uit deze bronnen over te nemen en op te slaan. De bedoeling is om de verschillende bronnen te bevragen en de data uit deze bronnen in samenhang te kunnen leveren aan afnemers. In dit geval gaat het niet om het samenhang aanbrengen van data van de BR's onder de SOR, maar van het aanbrengen van samenhang van data uit ook andere bronnen met de data van de SOR.  

We noemen de niet-SOR bronnen in onderstaande tekst: andere bronnen. 

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

_Andere gedachtes_

Genoemde opties kennen nadelen en voordelen. Als we op zoek gaan naar best of both worlds zou je kunnen denken aan: 

- Modelleer het SOR object met alleen SOR gegevens, en maak het mogelijk om subtypes hiervan te modelleren met daarin extra gegevens. 

- Modelleer het SOR object met alleen SOR gegevens, en links op naar andere bronnen die aangesloten zijn/worden op de SOR en stel hiervoor aansluitvoorwaarden. 

Bij aansluitvoorwaarden kan je denken aan: dat de SOR en andere bronnen aan dezelfde standaarden voldoen wat betreft modellering, historie en tijdreizen en andere standaarden die nodig zijn om te komen tot een samenhangend stelsel van BR en niet-Br bronnen, waarin afnemers het ook ervaren als een samenhangend stelsel.   









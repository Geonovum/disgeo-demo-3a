# Energieafgiftepunten

Een mogelijk leuke, aan de energietransitie gerelateerde use case om tijdens deze en volgende high 5 sessies op in te zoomen, gaat over zogenaamde energieafgiftepunten. 

_Hieronder wat kennis hierover, opgetekend in een gesprek met Jan van Gelder (Geonovum, ex-Alliander)_ 

- Energieafgiftepunten zijn onderdeel van netwerkdata. Met behulp van netwerkdata kun je bijvoorbeeld  traces uitvoeren, aggregeren tot verzorgingsgebieden, etc.
- Samengevat heb je binnen het energienetwerkmodel een distributienet, waarmee je de hogere spanningen aan elkaar knoopt, en een aansluitnet, die naar de huizen gaat. In de meterkast zit de meter en daar zit een schroef en dat is feitelijk het fysieke afgiftepunt. Daar begint je eigen netwerk als consument. 
- De meter staat bovenop het afgiftepunt en meet wat daar gebeurt, ingaande en eventueel uitgaande stroom (en gas, maar we focussen ons hier op energie).
- Deze meter is van de netbeheerder. 
- Een interessant gegeve is de EAN code. Iedere consument/prosument heeft een EAN code. Deze is gebonden aan het adres. Soms heb je er 2, voor levering door en levering aan netbeheerder, maar dit is iets van het verleden. In slimme meters heb je maar 1 code. EAN is een sleutel naar de klantenadministratie van de netbeheerder. 
- Netbeheerders hebben veel problemen gehad bij het matchen van adres en aansluitpunt. Er was vroeger geen uniforme adrescodering in Nederland, met name huisnummertoevoegingen verschilden per regio/stad. Bv Amsterdam had de toevoeging 'rood' en 'zwart', maar de PTT hanteerde dat niet. Vroeger konden netbeheerders dus geen energieatlas maken, omdat ze hun gegevens niet goed genoeg konden relateren aan adressen. 
- Nu is dat een stuk beter, de koppeling van BAG ID met EAN is bijvoorbeeld bij Alliander inmiddels gerealiseerd. Op basis van adres met handmatige nabewerking. Jan en Dick hebben gebeld met iemand van kadaster die hierbij betrokken is geweest. Jan weet niet hoever andere netbeheerders hiermee zijn. 
- De relatie tussen EAN en BAG ID is in situaties met ????n pand met ????n verblijfsobject (VBO) wel eenduidig, maar als je een flat hebt met meerdere vbo's is het lastiger. Je weet dan via de BAG alle adressen in een flat, en de netbeheerder heeft ook alle meters in de flat, maar weet niet hoe de bekabeling in de flat loopt. Ze hebben dit dan gemodelleerd als een overdrachtspunt (ook wel aansluitcomplex) met een leiding naar het gebouw, en naar alle vbo's (1 - * relatie). Dit is opgelost door soms de relatie te leggen naar een BAG pand en soms naar een BAG vbo. 
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

## EAN koppeling toelichting 

Een gebouw is een plek waar iemand woont, of waar een bedrijf is gevestigd etcetera en hierbij is sprake van een energiebehoefte, die gelevert wordt  via een energie afgifte punt. Energie afgifte punten worden administratief gekoppeld aan een gebouw c.q. een BAG Pand, of aan een deel van een gebouw c.q. een BAG verblijfsobject. Dit noemen we de EAN koppeling. 

_Informatie die te koppelen zou zijn in theorie_ 

Een SOR Gebouw met: 
- verwachte jaargebruik van gas 
- verwachte jaargebruik van gas 
- energiesoorten die geleverd worden: waardelijst met o.a. gas, elecktra
- meterstand gas
- meterstand elektra 

Het informatiemodel waar deze informatie te vinden is het informatiemodel van het centrale aansluitregister (CAR) waar ook de energieafgiftepunten en de EAN koppeling in staan.

## Uitwerking 

Status: dit onderwerp is gestart en verkend, maar is maar tot halverwege gekomen. De mogelijkheiden op het eind van dit hoofdstuk zinn verkend en opgesomd, maar zijn niet verder verwerkt naar een informatiemodel. 

De uitwerking zal algemene modelleerpatronen volgen, die uitgewerkt zijn in: TODO link naar modelleerpatronen voor koppelen.md


## LessonsLearned

[Aan deze wordt nog gewerkt.]

[kijken of ik de lessons learned en de inzichten die verderop staan, kan invoegen in deze paragrafen.]

#### SOR model en modelleerpatronen

Om beter te begrijpen hoe we naar een samenhangende registratie kunnen toewerken moeten we de huidige informatiemodellen erbij halen. Bij het samenvoegen van objecttypes uit de modellen wordt snel duidelijk dat er veel soorten gegevens door elkaar lopen. Een belangrijke principe in de context van deze high5 was dan ook: neem alleen directe eigenschappen op bij een bepaald objecttype. Om ervoor te zorgen dat deze principes op een stelselmatige manier worden toegepast zijn modelleerpatronen nodig. In de NEN3610 wordt een belangrijk patroon voor registratiegegevens gespecificeerd die deels invulling geeft aan dit principe. In deze high5 is daarnaast aandacht besteed aan drie andere patronen: voor brongegevens, voor de afleiding van informatieobjecten, en voor historie/tijdlijn. Voor het modelleren van brongegevens en de afleiding van informatieobjecten is PROV-O uitermate geschikt, deze kan worden toegepast in de SOR door het NEN3610 patroon voor registratiegegevens als aanknopingspunt aan te houden.  

Uiteindelijk moet het mogelijk zijn om vanuit andere registraties naar de SOR toe te koppelen. Dit kan worden gerealiseerd door verschillende objecttypes aan elkaar te relateren, of door een bestaand SOR objecttype uit te breiden. Voor het relateren van objecttypes zijn er een aantal opties geïnventariseerd: je kunt objecttypes combineren in één SOR object, apart beheerde linksets genereren, of gebruik maken van een koppelklasse. Voor de laatste optie zijn extra documentatie of algoritmes nodig om te kunnen afleiden dat er een relatie bestaat tussen de objecten.  

#### Van bron naar SOR

Om brongegevens te vertalen naar het model van de SOR is het van belang om naast modelleerpatronen ook vertaalspecificaties op te stellen. Deze specificaties bevatten voor de SOR zowel vertalingsregels als afleidingsregels. Vertalingsregels geven aan hoe gegevens uit de bronregistratie zich laten vertalen in gegevens conform de SOR - in de SOR zijn zowel simpele als complexere mappings nodig. Daarnaast zijn ook afleidingsregels nodig, wanneer gegevens niet expliciet aanwezig zijn in de bronregistratie maar wel kunnen worden afgeleid. Deze specificaties dienen op conceptueel niveau te worden vastgelegd, zodat ze onafhankelijk zijn van een specifieke technische omgeving. De regels moeten begrijpelijk zijn voor degenen die het implementeren, maar ook voor domeinexperts die inzicht hebben in de achterliggende betekenis van de data. Er zijn meerdere opties mogelijk voor de vastlegging van deze regels. Om een idee te krijgen over de soorten regels die aan de orde zijn voor de SOR is gekeken naar de transponering van Gebouw objecten uit de registraties. Samenhang met de WOZ blijkt lastiger, dit heeft vooral te maken met verschillen in de typeringen van SOR gebouwen en WOZ objecten, waarbij ook veel inhoudelijke kennis nodig is. Er is ook een wens om geometrie af te leiden uit andere gegevens – of en hoe dergelijke afleidingsregels haalbaar zijn moet nog worden onderzocht. 

#### SOR model in de praktijk

De SOR zou je vanuit de praktijk eerder als een groeimodel kunnen zien – een gradiënt oplossing dat steeds verder wordt ontwikkeld en toegepast. Hierbij horen korte termijn en lange termijn doelen. Op de korte termijn zal de focus komen te liggen op de realisatie van een SOR MVP (minimal viable product) - een tussenoplossing totdat de SOR volledig kan worden ingevoerd. Vanuit een inhoudelijk perspectief wordt in de SOR MVP vooral gekeken naar de samenhang van gegevens waarbij redelijk simpele relaties en vertalingsregels aan bod komen. In een later stadium kunnen complexere relaties getackeld worden (waarbij bijvoorbeeld extra inwinning of kennis nodig is). 

De opbouw van het SOR model heeft als voordeel dat er een ontkoppeling ontstaat tussen de duiding van gegevens en de ontsluiting van gegevens. Het resultaat is een implementatie-onafhankelijk model waarmee verschillende ontsluitingsvormen kunnen worden ondersteund. Dit is belangrijk omdat het ontwikkelaars in staat stelt verschillende technieken te combineren, zonder dat er verwarring ontstaat over de duiding van de gegevens. 

In het IGO traject (Integrale Gebruiksoplossing) werden verschillende basisregistraties makkelijk toegankelijk gemaakt door gegevens uit de registraties samen te voegen. Echter is het bij de samenvoeging van geometrieën en objectgegevens niet altijd duidelijk wat de relatie tussen deze gegevens is. Hiervoor is de SOR nodig: om de juiste duiding van een object te kunnen ontsluiten. 

#### Modelleerpatroon: historie en tijdlijn

Bij het integreren van historie en tijdlijn gegevens uit de huidige basisregistraties zijn een aantal uitdagingen geïdentificeerd. Ten eerste is gekeken naar de definities van tijdslijnen in de registraties, en of deze ook daadwerkelijk overeenkomen. Niet alle registraties kennen momenteel beide tijdslijnen die in de SOR worden behandeld. Om dit wel mogelijk te maken zijn vertalingsregels uitgewerkt. Ook is in het kader van de historie rekening houden met de identificatie van objecten, aangezien er in sommige gevallen sprake is van meerdere identificaties. Voor de huidige fase van de SOR lijkt het vooralsnog voldoende om de identificaties van de onderliggende registraties over te nemen – voor de gebruiker levert dit geen problemen op. Een belangrijke punt was het in elkaar schuiven van objecten uit verschillende basisregistraties, dit is uitgewerkt voor een complexer geval. Een volledig overzicht van alle punten die zijn behandeld wordt gegeven in de documentatie. 
Voor tijdsreisvragen zijn twee insteken onderzocht: je kunt een tijdreis vraag aan elke basisregistratie stellen en het antwoord vervolgens samenvoegen, of het op basis van de geldige levenscycli doen. Beide insteken zijn realiseerbaar, waarbij de eerste optie eenvoudiger te implementeren is. 


#### Inzichten

- Zelfs wanneer dezelfde terminologie wordt gebruikt bij het specificeren van modelelementen, zijn er vaak nog subtiele verschillen in de definities hiervan. Begrippen zijn soms anders afgebakend – dit geldt dus ook voor data die hierop gebaseerd is. Om deze reden kunnen informatieobjecten/gegevens afkomstig van verschillende registraties niet zomaar over elkaar gelegd worden, ook al worden ze beschreven door dezelfde termen. 
- Hoewel het samenvoegen van de registratiemodellen niet direct tot een samenhangend geheel zal leiden, kan hiernaartoe gewerkt worden middels een aantal modelleerprincipes. Deze principes vertalen zich in modelleerpatronen voor object centraal modelleren. Verschillende patronen kunnen worden toegepast om vanuit andere registraties naar de SOR te koppelen – hiermee wordt het een stuk gemakkelijker om objecten aan elkaar te relateren. 
- We hebben vertaalregels nodig op conceptueel niveau, zodat deze in verschillende technische talen kunnen worden uitgedrukt. Dit draagt bij aan de ontkoppeling tussen de duiding van gegevens en de ontsluiting van gegevens. 
- We moeten niet naar de SOR kijken als een volledig model, maar als een groeimodel. Hierbij is het belangrijk om korte en lange termijn doelen te stellen. Op de korte termijn is het streven naar een SOR MVP (minimal viable product) realistischer. Vanuit een inhoudelijk perspectief wordt in de SOR MVP vooral gekeken naar de samenhang van gegevens waarbij redelijk simpele vertalingsregels aan bod komen – dus geen complexere afleidingsregels. Ook is het belangrijk rekening te houden met huidige technologie. Door een SOR MVP in de praktijk te toetsen kunnen inzichten worden opgedaan die de standaardisatie van het volledige SOR model ten goede komen.  
- Bij het opstellen van de vertalingsspecificaties voor historie en tijdslijn is onderkend dat bepaalde attributen buiten scope zijn voor de modellering van SOR informatieobjecten in de huidige fase. Hier kunnen verschillende redenen voor zijn, dit zal moeten worden gedocumenteerd en teruggekoppeld aan de relevante partijen. Als voorbeeld: het attribuut versie kan momenteel niet gemakkelijk dynamisch worden berekend. Daarnaast is het belangrijker om te weten wanneer gegevens geldig zijn, niet om welke versie het gaat. Daarom wordt dit attribuut voorlopig niet opgenomen. 




### Inzichten

Deze High-5 heeft een  aantal inzichten opgeleverd die hier worden samengevat:


1. Zelfs wanneer dezelfde terminologie wordt gebruikt bij het specificeren van modelelementen, zijn er vaak nog **subtiele verschillen in de definities** hiervan. Begrippen zijn soms anders afgebakend – dit geldt dus ook voor data die hierop gebaseerd is. Om deze reden kunnen informatieobjecten/gegevens afkomstig van verschillende registraties niet zomaar over elkaar gelegd worden, ook al worden ze beschreven door dezelfde termen. 
2. Hoewel het samenvoegen van de registratiemodellen niet direct tot een samenhangend geheel zal leiden, kan hiernaartoe gewerkt worden middels een aantal modelleerprincipes. Deze principes vertalen zich in **modelleerpatronen** voor object centraal modelleren. Verschillende patronen kunnen worden toegepast om vanuit andere registraties naar de SOR te koppelen – hiermee wordt het een stuk gemakkelijker om objecten aan elkaar te relateren. 
3. We hebben **vertaalregels** nodig op conceptueel niveau, zodat deze in verschillende technische talen kunnen worden uitgedrukt. Dit draagt bij aan de ontkoppeling tussen de duiding van gegevens en de ontsluiting van gegevens. 
4. We moeten niet naar de SOR kijken als een volledig model, maar als **een groeimodel**. Hierbij is het belangrijk om korte en lange termijn doelen te stellen. Op de korte termijn is het streven naar een SOR MVP (minimal viable product) realistischer. Vanuit een inhoudelijk perspectief wordt in de SOR MVP vooral gekeken naar de samenhang van gegevens waarbij redelijk simpele vertalingsregels aan bod komen – dus geen complexere afleidingsregels. Ook is het belangrijk rekening te houden met huidige technologie. Door een SOR MVP in de praktijk te toetsen kunnen inzichten worden opgedaan die de standaardisatie van het volledige SOR model ten goede komen.  
5. Bij het opstellen van de vertalingsspecificaties voor historie en tijdslijn is onderkend dat **bepaalde attributen buiten scope** zijn voor de modellering van SOR informatieobjecten in de huidige fase. Hier kunnen verschillende redenen voor zijn, dit zal moeten worden gedocumenteerd en teruggekoppeld aan de relevante partijen. Als voorbeeld: het attribuut *versie* kan momenteel niet gemakkelijk dynamisch worden berekend. Daarnaast is het belangrijker om te weten wanneer gegevens geldig zijn, niet om welke versie het gaat. Daarom wordt dit attribuut voorlopig niet opgenomen. 



### Aanbevelingen

#### Algemene aanbevelingen

##### Aanbeveling met betrekking tot gebouwen
Om te komen tot een geharmoniseerd / geconsolideerd Gebouw in de SOR, op basis van de huidige objecten in de basisregistraties, is nader onderzoek nodig. Alle BAG/BGT panden kunnen worden omgezet naar SOR Gebouw; dit geldt ook voor enkele typen BGt OverigBouwwerk. Maar de juiste WOZ data erbij vinden is lastiger. De relatie tussen de typering van gebouwen in de SOR en de gebruikesdoelen / functies / typen van gebouwen in de BAG, WOZ en de BRT blijkt complex te zijn. Dat betekent ook dat het mogelijk nog heel lastig wordt om de geharmoniseerde SOR gebouwen, met name wat betreft de WOZ data, te vormen op basis van de huidige BRs. In ieder geval is hiervoor veel inhoudelijke kennis van het WOZ informatiemodel en de WOZ data nodig.

Aanbeveling: Begin met BAG + BGT harmonisatie. Voor het harmoniseren van WOZ gebouwdata in de SOR moet, indien dat binnen scope is, iemand met veel WOZ kennis bij de volgende high 5 aanwezig zijn om de vertaal en afleidregels scherper te maken. 

##### Aanbevelingen met betrekking tot koppelen

Voor afnemers is het van belang dat gegevens en modellering er hetzelfde uitziet. Dit is voor de SOR gestandaardiseerd, maar voor andere bronnen nog niet. 

Om standaardisatie t.b.v. afnemers goed voor elkaar te krijgen zouden we kunnen denken aan aansluitvoorwaarden. Bij aansluitvoorwaarden kan je denken aan dat de SOR en andere bronnen aan dezelfde standaarden voldoen wat betreft:
- modellering
- historie (ontsluiten) en tijdreizen 
- andere standaarden die nodig zijn om te komen tot een samenhangend stelsel van BR en niet-BR bronne

Zodat afnemers het geheel ook ervaren als een samenhangend stelsel. Het is de vraag of dergelijke aansluitvoorwaarden afgesproken kunnen worden, maar dit lijkt wel wenselijk. 


#### Aanbevelingen voor het vervolg van de High-5

##### Aanbevelingen met betrekking tot historie

1. Inhoud geeft aan dat een geldige levenscyclus samenstellen inderdaad een vraag is die we moeten kunnen beantwoorden. Zie hoofdstuk Historie - insteek B (onderin). 

2.  De implementatie maakt gebruik van een vertaalspecificatie om historie uit verschillende bronnen in elkaar te schuiven. 
- Gebruik insteek A voor tijdreis vragen op een SOR Gebouw conform de NL API strategie 
- Gebruik insteek B om de voor geldige levenscyclus van een SOR Gebouw te kunnen leveren

(en en gebruik niet insteek B om vervolgens de tijdreisvraag te beantwoorden want deze laaste insteek performed een stuk slechter. Het is wel nuttig om te doen om te testen of beide routes dezelfde antwoorden geven, om te bewijzen dat de implemenaties kloppen).

ACTIE: vertaal specficatie van A en B laten reviewen door team van 2e high-5. 

3. Elke GEO-BR levert een API voor tijdreizen (t.b.v. insteek A) en een API om een geldige levenscyclus mee op te vragen (t.b.v. insteek B). 
ACTIE --> uitzetten bij LV of BR. 


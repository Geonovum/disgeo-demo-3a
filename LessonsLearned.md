## LessonsLearned

Aan deze wordt nog gewerkt. 

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


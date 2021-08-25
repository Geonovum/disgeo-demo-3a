## Inhoudelijke punten

Hieronder een overzicht van items om 1 voor 1 op te pakken bij het modelleren van een gebouw of bouwwerk. De lijst is geleverd door Inhoud, een aantal zijn 1 op 1 te gebruiken en een  aantal niet, het gaat ons om de modellering van deze laatste. 

Het thema is een Gebouw. 

We houden ons aan wat er op dit moment kan, in ons vermoeden, vanuit de BR's. Andere zaken parkeren we. 

De lijst met kandidaat punten is onderstaand opgesomd. We een aantal uitwerken, maar allemaal lukt niet in 1 high-5. Degene die behandeld zijn, zijn voorzien van een link. 

### Niet 1 op 1

Hieronder vallen gegevens die niet 1 op 1 van een BR over te nemen zijn naar de SOR. Denk hierbij vooral aan afgeleide gegevens of geaggregeerde gegevens of aan gegevens die een betere benaming hebben gekregen. De modelleering hiervan en de specificatie voor de afleiding worden bekeken. 

### Naamswijzigingen


Naamswijzigingen van objecttypen en attribuutsoorten
- Status van objecten (hiërarchische lijsten) vertalen naar een geaggregeerde status (zie emso)
- Gebouwzone op basis van WOZ deelobject en de relatie met BAG/BGT
- Attribuutsoorten zoals 'type' die meerdere keren voorkomen en dus naamgevingsconflicten kunnen opleveren 

### Identificaties

- Op dit moment is er geen DE identificatie van een SOR object. De identificaties van het SOR object als deze niet 1 op 1 in een BR is geregistreerd. De herkomst van een SOR object zijn gegevens van objecten uit BR's met een identificatie. We kunnen niet 3 attributen genaamd identificatie opnemen, zie ook naamswijzigingen maar deze hebben we geisoleerd omdat deze extra speciaal is. Verder speelt de UOI mogelijk een rol.

### Kwaliteit 

Kwaliteit van gegevens en metadata, en het bevestigen hiervan door een bronhouder. Het is hierbij niet de bedoeling om kwaliteitscontroles te modelleren, we doen dit alleen als er op inhoud bepaalde regels gelden voor gegevens of een combinatie van gegevens. 
- Metadata zoals bronverwijzing, in onderzoek, controlemetadata

### Consistentie

Gegevens die in samenhang een bepaalde consistentie behoren te hebben. 
- Functie, gebruiksdoel. Bepaalde functies van een gebouw zijn benoemd in de WOZ - geconstateerde functies - en in de BAG - vergunde functies. Wanneer deze niet in samenspraak met elkaar zijn, is het van belang om dit te weten. Dit is WOZ en BAG kennis, die een afnemer (meestal) niet weet. Wanneer een verblijfsobject als gebruiksdoel kantoorfunctie heeft en de WOZ constateert het gebruikt wordt voor wonen, dan is het feitelijke gebruik niet legitiem. We werken dit uit voor het thema wonen. 

### Modelleren van gegevens over registraties heen

Modelleren van gegevens over registraties heen standaard/hetzelfde zou moeten zijn, maar dit niet is. We willen dat het gebruik door afnemers niet onnodig complex/genuanceerd wordt en kijken of dit recht te trekken is. 
- [Historie](#Modelleren-van-historie-en-beantwoorden-van-tijdreis-vragen)


### afleiden van relaties tussen objecten

Het afleiden van relaties tussen objecten, die geometrisch af te leiden zijn zodat ze (ook) administratief te leggen zijn: 
- Relateren van gebouwcomponent aan gebouw
- Relateren van BRT gebouw aan gebouwblok (geometrisch afleiden) 
 
### beantwoorden van fuctionele vragen van gegevens uit andere bronnen

Het beantwoorden van fuctionele vragen van gegevens uit andere bronnen dan een BR aan gegevens in een BR. 
- Energielabels (vaak te koppelen aan BAG, maar niet rechtstreeks aan VBO; aan groep van VBO's)

### Algemene zaken 

- Toepassen SOR modelleerprincipes 
- De BAG identificatie in de BGT is een relatie, maar is gemodelleerd als een attribuut. 
 

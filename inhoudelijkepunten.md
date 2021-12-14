## Verkenning van inhoudelijke punten
Tijdens de High-5 is gezamenlijk verkend welke inhoudelijke punten, betreffende het realiseren van de SOR inhoud op basis van de inhoud van de huidige basisregistraties, relevant zijn. Niet al deze punten zijn uitgebreid aan de orde geweest. We beschrijven hieronder de besproken punten en geven aan welke nader zijn uitgewerkt in de volgende hoofdstukken. 

### Transponering

Transponering is het omzetten van gegevens uit de huidige basisregistraties naar SOR gegevens. In deze omzetting zijn allerlei gradaties waar te nemen. Soms gaat het om gegevens die rechttoe rechtaan 1 op 1 te mappen zijn. Hieraan hebben we in deze High-5 geen speciale aandacht verleend. Er zijn ook gegevens die niet 1 op 1 van een basisregistratie over te nemen zijn naar de SOR. Denk hierbij vooral aan afgeleide gegevens, geaggregeerde gegevens of aan gegevens die een betere benaming hebben gekregen. Al deze vormen van omzetten van gegevens bij elkaar worden in dit document ook wel transponering genoemd. Deze term wordt ook gebruikt in [[EMSO]]. 

Een eenvoudige vorm van transponering is het wijzigen van de naam van objecttypen, attribuutsoorten en andere modelelementen. Hierbij bestaan complicerende factoren zoals: 
- Het samenvoegen van waardelijsten, zoals bijvoorbeeld in de SOR gebeurt met de waardelijsten die de mogelijke statussen van objecten opsommen. Hierbij kan het gaan om hiërarchische lijsten die moeten worden vertaald naar een geaggregeerde status (zie [[EMSO]]).
- Attribuutsoorten zoals 'type' die meerdere keren voorkomen en dus naamgevingsconflicten kunnen opleveren.

Voor de transponering kun je regels formuleren, maar de vraag is dan nog hoe je deze vastlegt. Liefst op een manier die ontwikkelaars eenduiding kunnen interpreteren, maar tegelijkertijd nog wel leesbaar voor niet-programmeurs. Ook hier hebben we naar gekeken.

De verschillende aspecten van transponering zijn tijdens deze High-5 bekeken. Zie hiervoor: 
- [](#modelleerpatroon-voor-de-beschrijving-van-de-afleiding-van-sor-informatieobjecten)
- [](#vertalingsregels-en-afleidingsregels)
- [](#inventarisatie-van-manieren-om-vertaalspecificaties-vast-te-leggen)
- [](#gebouwen-van-bron-naar-sor)

### Identificaties

Op dit moment is er geen eenduidige identificatie van een SOR object. Als het SOR object niet één op één in een basisregistratie is geregistreerd, heeft het in elke basisregistratie waar het voorkomt een eigen identificatie. Een SOR Gebouw heeft bijvoorbeeld een BAG identificatie, een BGT identificatie en een BRT identificatie. Deze identificaties zijn van belang omdat ze de herkomst van het object duiden. We kunnen echter niet drie attributen genaamd `identificatie` opnemen, dan zou er een naamgevingsconflict ontstaan. Naast deze bronidentificaties is het wellicht ook van belang om een SOR identificatie in te voeren. Hierbij  speelt de UOI mogelijk een rol.

Identificatie van objecten speelt een rol bij de behandeling van historie en tijdreizen, waar we uitgebreider op ingaan in [](#modelleren-van-historie-en-beantwoorden-van-tijdreisvragen).

### Kwaliteit 

Een ander groot onderwerp dat aandacht vraagt binnen de SOR is de kwaliteit van gegevens, en het bevestigen hiervan door een bronhouder. Het is hierbij niet de bedoeling om kwaliteitscontroles te modelleren, we doen dit alleen als er op inhoud bepaalde regels gelden voor gegevens of een combinatie van gegevens. Het gaat onder andere om metadata die iets over kwaliteit van gegevens zegt, zoals bronverwijzing, in onderzoek, en controlegegevens.

Als gegevens in samenhang een bepaalde consistentie behoren te hebben, kunnen er regels worden opgesteld die gaan over een bepaalde combinatie van gegevens. Dit geldt bijvoorbeeld bij functie en gebruiksdoel van een gebouw. Bepaalde functies van een gebouw zijn benoemd in de WOZ - geconstateerde functies - en in de BAG - vergunde functies. Wanneer deze niet in samenspraak met elkaar zijn, is het van belang om dit te weten. Dit is WOZ en BAG kennis, die een afnemer (meestal) niet heeft. Wanneer een verblijfsobject als gebruiksdoel kantoorfunctie heeft en de WOZ constateert dat het gebruikt wordt voor wonen, dan is het feitelijke gebruik niet legitiem. Dit zou bijvoorbeeld kunnen worden uitgewerkt voor het thema wonen. 

Dit onderwerp is niet in zijn totaliteit uitgebreid aan de orde geweest, maar zou voor de volgende High-5, als we met gegevens gaan werken, wellicht geschikt zijn. Deeluitwerkingen zijn hier beschreven: 
- [](#modelleerpatronen-voor-metadata)

### Op gelijke wijze modelleren van generieke gegevens

Bepaalde generieke gegevens zoals gegevens over historie, levensloop, herkomst, enzovoort zouden over registraties heen gestandaardiseerd moeten zijn, maar zijn dit nu niet. Bij het gebruiken van de basisregistraties in samenhang is dit een belemmering. We willen dat het gebruik door afnemers niet onnodig complex/genuanceerd wordt en kijken of dit recht te trekken is. We hebben daarom in deze High-5 onderzocht hoe je dit soort generieke gegevens zou kunnen modelleren zodat gebruik in samenhang mogelijk is. Dit hebben we uitgewerkt voor het onderwerp historie. 

Zie hiervoor [](#modelleren-van-historie-en-beantwoorden-van-tijdreisvragen).


### Afleiden van relaties tussen objecten

De inhoudelijke eisen aan de SOR [[EMSO]] vragen in sommige gevallen om het afleiden van relaties tussen objecten, die nu in de bronregistraties niet aanwezig zijn. Deze relaties zijn (voor een deel) geometrisch af te leiden. Het afleiden van deze relaties en het vervolgens administratief uitdrukken van deze relaties heeft als voordeel dat gebruikers, die in deze relaties geïnteresseerd zijn, dit niet opnieuw hoeven doen. 

Het gaat bijvoorbeeld om:
- Relateren van gebouwcomponent aan gebouw
- Relateren van BRT gebouw aan gebouwblok (geometrisch afleiden) 

Dit onderwerp is niet uitgebreid aan de orde geweest, maar zou voor de volgende High-5, als we met gegevens gaan werken, wellicht geschikt zijn.
 
### Gegevens uit andere bronnen

Met de SOR willen we ook het stellen van functionele vragen op basis van gegevens uit andere bronnen dan een basisregistratie faciliteren. Daarom moet het mogelijk zijn om externe gegevens te koppelen aan gegevens in een basisregistratie. Dit is niet altijd zo eenvoudig. Een voorbeeld hiervan zijn de energielabels. Deze zijn te koppelen aan BAG, maar niet altijd rechtstreeks aan een verblijfsobject. Regelmatig is er een relatie tussen één energielabel en een hele groep van verblijfsobjecten. 

Het koppelen van externe gegevens is nader beschreven in [](#gegevens-koppelen-tussen-een-sor-gebouw-en-een-andere-informatiebron).

### Van functionele eisen aan inhoud naar informatiemodel
Bij het maken van het informatiemodel voor SOR Gebouw, op basis van de eisen aan de inhoud zoals beschreven in [[EMSO]], lopen we mogelijk tegen semantische dilemma's aan. Hoewel de eisen aan de inhoud zo goed als mogelijk beschreven zijn, is het onvermijdelijk dat we op problematische zaken stuiten als we daadwerkelijk gaan modelleren: dan moeten we immers echt gaan zorgen dat alle details kloppen. Inconsistenties in definities zijn dan bijvoorbeeld problemen die opgelost moeten worden. 

Tijdens het modelleerwerk in deze High-5 hebben we met verschilllende van dit soort problemen te maken gehad. Deze zijn beschreven in TODO paragraafverwijzing opnemen [...](). 

### Publicatievorm(en) van het informatiemodel
Omdat er op deze High-5 een vervolg komt waarin het informatiemodel wordt geimplementeerd in software, is het belangrijk dat het informatiemodel wordt opgeleverd in een voor ontwikkelaars bruikbare vorm. 

Hoe we dit doen is beschreven in TODO paragraafverwijzing opnemen [...](). 
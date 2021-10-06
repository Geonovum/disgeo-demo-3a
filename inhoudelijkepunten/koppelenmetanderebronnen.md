## Gegevens koppelen tussen een SOR Gebouw en een andere informatiebron  


![voorbeeld-informatie](media/voorbeeld-informatie.png)

De bronnen waaruit de SOR wordt samengesteld zijn andere bronnen dan waar de energiegegevens worden bijgehouden. Wat in ieder geval niet de bedoeling is, is het overnemen en opslaan van de data uit deze bronnen in de SOR. In plaats daarvan beogen we een federatief stelsel, waarin de verschillende bronnen worden bevraagd en de data uit deze bronnen in samenhang geleverd kunnen worden aan afnemers. 

In dit geval gaat het niet om het aanbrengen van samenhang tussen gegevens van de basisregistraties onder de SOR, maar van het aanbrengen van samenhang tussen gegevens *uit andere bronnen* met de data van de SOR.  

We noemen de niet-SOR bronnen in onderstaande tekst: andere bronnen. 

De belangrijkste stap is om eerst een betrouwbare koppeling te leggen van een andere bron naar de SOR, al dan niet via de BAG, de BGT, de WOZ, enz. Dit is op zichzelf niet eenvoudig. je kan hierbij denken aan een koppeling op basis van een automatische matching op basis van adres, geometrie, of beide. 

### Manieren van koppelen 

- Deze koppeling zou een beheerde relatie kunnen zijn vanuit een andere bron object naar een SOR object. 
- Deze koppeling zou een andere bron object met een SOR object kunnen koppelen, die het SOR object niet verandert en het eigen bronobject niet verandert. Je zou dit een koppelklasse kunnen noemen.
- Deze koppeling zou een uitbreiding of aanvulling kunnen zijn van een bestaand SOR objecttype.

Voorbeelden van deze koppelingen zijn: 
- De EAN-BAG koppeling (beheerde relatie vanuit een eigen object, het energieafgiftepunt, uit een andere bron naar een BR/SOR object)  
- De BRK-BAG koppeling (koppelklasse die beide bronnen niet aanpast)
- De BGT-BAG koppeling (Semantische relatie tussen BGT Pand en BAG Pand)

**Uitgangspunten:**

**_1. De koppeling loopt in principe altijd van een "andere" bron naar de SOR._**
  
Voordelen: 
  - Er is geen impact op de SOR, maar het koppelt wel beide bronnen aan elkaar;
  - Er ontstaat een eco-systeem waarmee informatie uit bronnen gekoppeld kan worden met de SOR en de basisregistraties.

Implicaties:
  - Andere bronnen (moeten) gaan koppelen met de SOR (koppelingen naar basisregistraties worden vervangen door koppelingen naar de SOR);

**_2. Binnen de SOR zelf zijn er koppelingen tussen de BAG en de BGT, de BAG en de WOZ, maar deze zijn voor de gebruikers van de SOR verborgen._**

**_3. Van de SOR naar een andere bron zal er geen koppeling zijn (in theorie wel mogelijk)._**

**_4. Een koppeling kan ook gelegd worden als deze zuiver geometrisch kan worden bepaald._**

Nadat een koppeling is gelegd, moet deze ook beheerd worden. Maar zodra de koppeling er is, kunnen gegevens uit de SOR en uit de "andere" bron bij elkaar gebracht worden. 
Hier zijn een aantal opties denkbaar. 

### Combineren van de eigen bron met SOR gegevens

Er zijn verschillende modelleerpatronen waaraan gedacht kan worden. Deze patronen hebben we in de High-5 verkend. Elk patroon heeft eigen voordelen en nadelen; er is nog geen voorkeur uitgesproken, en nog geen advies per situatie. We gaan deze opties verder onderzoeken.

Algemeen kunnen we wel de volgende voorwaarden stellen voor een samenhangend stelsel van informatie gekoppeld aan de SOR:
- Maak goed duidelijk wat de herkomst van het gegeven is qua bron - uit de SOR of uit een externe bron, bijvoorbeeld het energie domein;
- Wanneer je wilt meedoen in het samenhangde stelsel zal jouw dataset moeten voldoen aan dezelde logische aspecten als de SOR
  - voor tijdreizen is dezelfde uitdrukking van tijdslijnen nodig
  - voor het kunnen koppelen of platslaan van identificatie is dezelfde manier van identificeren nodig

Dat levert de volgende voordelen op:
- Afnemers kunnen via de ontsluiting van het samenhangde stelsel informatie uit verschillende datasets in combinatie met de SOR informatie opvragen, zonder dat ze deze combinatie zelf moeten maen.
- Een afnemer hoeft niet de bronnen apart te bevragen en zelf de software te ontwikkelen;
- De bron-beheerder en de SOR-beheerder kunnen er samen voor zorgen dat het informatieproduct functioneel helemaal goed/juist is, afnemers hoeven dit niet te doen. 

Daarbij spelen de volgende implicaties: 
- De verantwoordelijkheid van het meeleveren van gegevens komt bij de informatieproductleverancier te liggen (in overleg met de SOR);
- De eisen aan gegevens voor basisregistraties gaan ook gelden voor de informatievoorziening die het informatieproduct levert, zoals de beschrijving en de standaarden die hiervoor gelden, de historie tijdslijnen en tijdreis mogelijkheden. 

#### Voorbeeldcasus

Voor het duiden van deze verschillende modelelerwijzes gebruiken we de voorbeeldcasus uitgebeeld in [](#koppelen-voorbeeldcase). We hebben twee "externe" objecttypes `Gebouwdeel` en `MijnGebouw` die we op verschillende manieren willen koppelen met `Gebouw` uit de SOR.

<figure id="koppelen-voorbeeldcase">
  <img src="media/koppelen-voorbeeldcase.drawio.png" alt="koppelen-voorbeeldcase">
  <figcaption>Voorbeeldcasus te koppelen informatiemodellen</figcaption>
</figure>

#### Relateren van verschillende objecttypes

##### Optie 1: Koppelen vanuit een andere bron naar de SOR met een relatie

Deze koppeling zou een beheerde relatie kunnen zijn vanuit een andere bron object naar een SOR object. Dit kan op verschillende manieren:

###### a: Meegemodelleerd in dataset

Je kunt een relatie meemodelleren in een dataset door vanuit die dataset een relatie op te nemen naar een SOR-object. Om aan te duiden dat deze relatie verwijst naar een extern informatiemodel gebruiken we het stereotype [«Externe koppeling»](https://docs.geostandaarden.nl/mim/mim/#externe-koppeling) uit [[MIM]]. Merk op dat we in het externe informatiemodel verwijzen naar objecttype `Gebouw` uit de SOR. Het doel hiervan is het kunnen verwijzen naar een SOR Gebouw d.m.v. de identificatie van de SOR. Het is, in de representatie als data, belangrijk om niet alleen een directe referentie naar de identificatie op te nemen, maar om daadwerkelijk een objectstructuur van het gerefereerde object op te nemen. Dit laatste maakt het gemakkelijk om datastructuren als het ware over elkaar heen te leggen (zie datavoorbeelden in JSON).

<figure id="koppelen-relateren-meegemodelleerd">
  <img src="media/koppelen-relateren-meegemodelleerd.drawio.png" alt="koppelen-relateren-meegemodelleerd">
  <figcaption>Relatie met SOR object meegemodelleerd in (externe) dataset</figcaption>
</figure>

**Instantiedata voorbeeld in JSON:**

**_Extern:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
  "ligtIn": {
    "identificatie": "123",
    "domein": "sor/gebouw",
  }
}
```

**_SOR:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988"
}
```

**_In Samenhang:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
  "ligtIn": {
    "identificatie": "123",
    "domein": "sor/gebouw",
    "bouwjaar": "1988"
  }
}
```

**Implicaties**
- Je beheert de relatie bij de andere objectinformatie

###### b: Apart beheerde "linkset"

Wanneer je een objecttype bestaande dataset wilt koppelen aan de SOR, zonder het objecttype, of de dataset, zelf aan te passen is het mogelijk om een aparte "linkset" op te stellen. Een linkset is niets meer dan een set van relaties tussen instanties van twee objecttypen.
Deze linkset kan onderdeel zijn van dezelfde dataset die je wilt koppelen aan de SOR, maar kan ook een losse dataset zijn met verschillend beheer.

<figure id="koppelen-relateren-linkset">
  <img src="media/koppelen-relateren-linkset.drawio.png" alt="koppelen-relateren-linkset">
  <figcaption>Relatie met SOR object meegemodelleerd in (externe) apart beheerde "linkset"</figcaption>
</figure>

**Instantiedata voorbeeld in JSON:**

**_Extern:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
}
```

**_Extern (linkset):_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "ligtIn": {
    "identificatie": "123",
    "domein": "sor/gebouw"
  }
}
```

**_SOR:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988"
}
```

**_In Samenhang:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
  "ligtIn": {
    "identificatie": "123",
    "domein": "sor/gebouw",
    "bouwjaar": "1988"
  }
}
```

Ook hier maken we gebruik van objectstructuur plus identificatie om informatie "over elkaar heen te leggen" en in samenhang te presenteren.

<aside class="note">
  Semantisch is er geen verschil tussen optie 1.a en optie 1.b. Het verschil is dat in dit geval het beheer van de relatie apart staat van de andere informatie van het externe `Gebouwdeel`.
</aside>

**Implicaties:**
- De SOR en je eigen objecten worden niet geraakt, op geen enkele manier, maar er is wel een relatie gelegd. 
- Je kan de historie van de relatie los beheren.

##### Optie 2: Apart beheerde koppelinstanties

Een andere optie is het toepassen van een "koppelinstantie", ofwel een instantie van een "Koppelklasse". Een Koppelklasse is een speciaal construct waarmee twee objecttypes aan elkaar gekoppeld kunnen worden met uitgaande relatiesoorten vanuit de Koppelklasse naar de Objecttype die met elkaar gekoppeld worden. Semantisch gezien is dit gelijk aan het relateren van twee objecten.

Het beheer van de koppeling zit dan in principe op het niveau van de koppelklasse.

<aside class="note">
Bij het gebruik van een koppelklasse is het niet mogelijk om informatie "over elkaar heen te leggen" voor gebruik in samenhang, zoals bij dat optie 1 kan. Het is noodzakelijk zijn om ergens te beschrijven hoe de relatie tussen de twee objecttypes die verbonden worden door de koppelklasse geconstrueerd moet worden.
</aside>

<figure id="koppelen-relateren-koppelklasse">
  <img src="media/koppelen-relateren-koppelklasse.drawio.png" alt="koppelen-relateren-koppelklasse">
  <figcaption>Relatie met SOR object als instantie van een koppelklasse in (externe) dataset</figcaption>
</figure>

**Instantiedata voorbeeld in JSON:**

**_Extern:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
}
```

**_Extern (koppelinstantie):_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "789",
  "domein": "extern/gebouwdeel-gebouw",
  "gebouwdeel": {
    "identificatie": "456",
    "domein": "extern/gebouwdeel",
  },
  "gebouw": {
    "identificatie": "123",
    "domein": "sor/gebouw"
  }
}
```

**_SOR:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988"
}
```

**_In Samenhang:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "extern/gebouwdeel",
  "energieprestatie": 1.23,
  "gebruiksfunctie": {
    "code": "wonen"
  }
  "ligtIn": {
    "identificatie": "123",
    "domein": "sor/gebouw",
    "bouwjaar": "1988"
  }
}
```

**Implicaties:**
- De SOR en je eigen objecten worden niet geraakt, op geen enkele manier, maar er is wel een koppeling. 
- Je kan de historie van de koppeling los beheren.
- Je moet afleidingsregels specificeren om de semantische relatie tussen de gekoppelde objecten te manifesteren.

#### Uitbreiden van een bestaand objecttype


**Voorwaarde**: 
- Dit kan alleen als je eigen objecttype echt overeenkomt met wat er in de SOR onder een Gebouw wordt verstaan. Als dat zo is dan is dit semantisch direct goed geregeld. 
- In de implementatie zal het, vanwege het bijhouden van historie, nodig zijn om in je eigen object historie bij te houden op dezelfde manier als de SOR dit doet. 

##### Optie 1: Specialiseer het SOR object en gebruik dezelfde identificatie

Hier breiden we een SOR objecttype in een externe dataset uit door deze op informatiemodelniveau te specialiseren en op instantieniveau gebruik te maken van de SOR identificatie voor identificeren van het object waarvoor we de gespecialiseerd beschrijving opnemen.

<aside class="note">
  Het is hier belangrijk om onderscheid te maken tussen het object (het ding wat willen beschrijven) en het informatieobject (de set aan gegevens over het ding). De identificatie identificeert het ding en niet de informatie over het ding. De informatie over het ding wordt uniek gemaakt door de gekoppelde registratiegegevens. Daarom is het mogelijk om de object-identificatie die de SOR gebruikt her te gebruiken.
</aside>

<figure id="koppelen-uitbreiden-extenden">
  <img src="media/koppelen-uitbreiden-specialiseren.drawio.png" alt="koppelen-uitbreiden-specialiseren">
  <figcaption>Specialiseer het SOR object in (externe) dataset en gebruik de SOR identificatie</figcaption>
</figure>

**Instantiedata voorbeeld in JSON:**

**_Extern:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "capaciteit": 550
}
```

**_SOR:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988"
}
```

**_In Samenhang:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988",
  "capaciteit": 550
}
```

**Implicaties**:
- Het is direct duidelijk dat alle definities en afbakeningen van de SOR ook gelden voor de extensie (de specialisatie is je eigen object, het SOR Gebouw is de generalisatie).
- Hergebruik van de identificatie maakt het gemakkelijk om de externe (uitbreiding van ) gegevens te combineren met de SOR gegevens.


##### Optie 2: Stel het externe object gelijk aan het SOR object met een speciale relatie: _isGelijkAan_

Het is niet altijd mogelijk om dezelfde identificatie als de SOR te gebruiken. Mogelijk bestaat er al een andere identificatie in de externe registratie die ook waarde heeft buiten de context van de SOR. Deze optie introduceert een speciale relatie `isGelijkAan`, waarmee objecten aan elkaar gelijkgesteld kunnen worden. Binnen het SOR stelsel zou met deze speciale relatie kunnen bepalen dat twee verschillende identificatie platgeslagen kunnen worden tot 1 om zo de objectinformatie te kunnen combineren. 

<aside class=note>
  Omdat we hier gebruikmaken van een relatie, zijn de opties uit [](#relateren-van-verschillende-objecttypes) ook hiermee in combinatie toe te passen. Zo zouden de `isGelijkAan` relaties bijvoorbeeld ook in een apart beheerde linkset worden opgenomen.
</aside>

<figure id="koppelen-uitbreiden-gelijkstellen">
  <img src="media/koppelen-uitbreiden-gelijkstellen.drawio.png" alt="koppelen-uitbreiden-gelijkstellen">
  <figcaption>Gebruik eigen identificatie voor (extern) object en stel dat object gelijk aan SOR object</figcaption>
</figure>

**Instantiedata voorbeeld in JSON:**

**_Extern:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "456",
  "domein": "sor/mijn-gebouw",
  "capaciteit": 550,
  "isGelijkAan": {
    "identificatie": "123",
    "domein": "sor/gebouw"
  }
}
```

**_SOR:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988"
}
```

**_In Samenhang:_**
```json
{
  "geregistreerdMet": {},
  "identificatie": "123",
  "domein": "sor/gebouw",
  "bouwjaar": "1988",
  "capaciteit": 550
}
```

**Implicaties**:
- Je kunt jouw objectinformatie samenvoegen met objectinformatie uit de SOR zonder de identificatie her te gebruiken.
- De `isGelijkAan` relatie kan op verschillende manieren gelegd worden. Zie [](#relateren-van-verschillende-objecttypes)

### Aanbeveling 

Voor de aanbevelingen wordt verwezen naar paragraaf [Aanbevelingen met betrekking tot koppelen](#aanbevelingen-met-betrekking-tot-koppelen).
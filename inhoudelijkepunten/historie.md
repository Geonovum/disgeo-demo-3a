## Modelleren van historie en beantwoorden van tijdreis vragen 

Bij dit inhoudelijk punt wordt gekeken hoe gegevens uit verschillende onderliggende bronnen te combineren zijn, in het bijzonder voor aspecten die te maken hebben met de historie van gegevens en tijdreizen. De punten waarop gelet moet worden zijn benoemd en er is een vertaal specificatie gemaakt om historie "in elkaar te schuiven". 

### Doel

Een uniforme manier voor afnemers om te zien:

1) wanneer gegevens geldig zijn en wanneer deze gegevens geregistreerd/beschikbaar zijn
2) om een tijdreis vraag te stellen

Deze tijdreisvragen zijn (ook) los aan de basisregistraties te stellen. In deze high-5 echter wordt de tijdreis vraag "door een afnemer" 1x gesteld aan de SOR c.q. het SOR object Gebouw, en wordt deze tijdreis "onder water" aan de BR's gesteld. Hierna worden de gegevens van de BR's over een Gebouw die op de gevraagde datums geldig en beschikbaar zijn "in elkaar geschoven". De specificatie voor dit in elkaar schuiven en de uitkomst ervan wordt hieronder beschreven. 

Historie: hiermee wordt bedoeld de tijdslijn geldigheid en de tijdslijn registratie (t.b.v. zie 1 en 2).  

Opmerking: Buiten scope van deze uitwerking: levensduur van het object.  

### Uitgangspunten 

- SOR afspraak: van alle gegevens moet het bekend zijn wanneer de gegevens geldig zijn en wanneer ze beschikbaar/geregistreerd zijn. 
- Conform MIM - maar MIM kent nog geen metadata, we volgen de huidige stand van de expertgroep modellering SOR 
- Conform NEN3610 - zie modellering historie aldaar 
- Conform de specificatie van een tijdreis zoals beschreven in de NL API strategie (en hoe dit bv. in de LVBAG werkt, die deze implementeert).  
- In lijn met de SOR en met hoe de BR's nu grotendeels werken 

Dit betekent voor dit inhoudelijke punt: 
- We stellen het object centraal - d.w.z. we willen gegevens over het gebouw in de werkelijkheid leveren, en we doen dit door de registratie gegevens over dit object te leveren.
- We geven de tijdslijnen per set gegevens over een object aan. Dit heet ook wel een versie van een object. Afnemers willen gegevens van/over een object weten en wanneer deze, dit setje, geldig is en beschikaar is gekomen zodat ze het (hadden kunnen) weten. 

### Uitdaging en bijzondere punten met keuzes/voorstel

De uitdaging is om data uit de onderliggende BR's uit te leveren maar dan geuniformeerd. D.w.z. dat historie wordt bijgehouden in of over versies van objecten. Een versie is een setje gegevens over een object, zoals deze gedurende een bepaalde periode onveranderd zijn, en over die set gegevens wordt de tijdslijn geldigheid en de tijdslijn registratie bijgehouden en uitgeleverd. 

De uit te werken bijzondere punten voor historie en tijdreizen zijn:

0. Definities van de tijdslijn geldigheid en de tijdslijn registratie.
1. Als we het object centraal stellen, hoe gaan we dan om met objecten uit 2+ BR's die we in elkaar schuiven, in het bijzonder met de meerdere identificaties.
2. Niet elke geo-BR kent nu beide tijdslijnen. Maar weten wel wanneer gegevens geldig en beschikbaar/geregistreerd zijn. 
3. Niet elke geo-BR heeft voor de tijdslijn geldigheid hetzelfde dataype, sommige gebruiken een datum, sommige een datumtijd of een timestamp. Hoe gaan we hiermee om? 
4. Mutatie verschillen, met name t.a.v. beeindigen van objecten, wat bv. de BGT doet met een einddatum geldigheid en de BAG met een eindstatus. 
5. Hoe schuif je versies van objecten uit verschillende BR's in elkaar. Wat is het algoritme. 

#### Ad 0. definities van tijdslijn geldigheid en tijdslijn registratie 

Zie NEN3610 2021/2022 historie. 

Merk op: 
- Elke Landelijke Voorziening die een verzameling is van een BR heeft een eigen tijdslijn van verwerking in de LV. We onderkennen dus tijdstipRegistratie bij de bronhouder en tijdstipRegistratie bij de LV.
- Van elk gegeven houden we het registratie tijdstip bij. Dit geldt ook voor wanneer een beginGeldigheid of eindGeldigheid is geregisteerd, in een BR en in een LV. Elke versie van een object heeft een begin geldigheid, en het tijdstip van de registratie van een versie van een object geeft (ook) aan wanneer deze begin geldigheid is geregistreerd. Evenzo geldt dit voor de einde geldigheid, het tijdstip waarop eind geldigheid geregistreerd wordt moet bekend zijn en eind registratie geeft (ook) aan wanneer deze eind geldigheid is geregistreerd. 

#### Ad 1. in elkaar schuiven van versies van objecten uit meerdere BR's of bronnen

Een SOR object kan en mag meerdere identificaties hebben. Dit is ook handig, want dan in de link naar de BR ook direct bekend. 
- Wanneer een SOR object meerdere identificaties heeft, dan betekent dit dat je elk afzonderlijk kan gebruiken als identificatie, en dat de objecten uit de onderliggende BR's over hetzelfde SOR object en hetzelfde object in de werkelijkheid gaat. 

#### Ad 2. niet elke geo-BR kent nu beide tijdslijnen  

Om de geldigOp tijdreis vraag te kunnen stellen moet een bron weten wanneer de gegevens geldig zijn. Elke BR hoort te weten wanneer de gegevens die erin geregistreerd zijn geldig zijn. Deze tijdslijn geldigheid wordt echter niet altijd fysiek vastgelegd. Als dit niet zo is, dan is het nodig om deze af te leiden. Vertaal dan wat er geregistreerd in de BR naar de gevraagde tijdslijnen. 

Elke BR die aansluit op de SOR moet kunnen: 
- De tijdslijn geldigheid en de tijdslijn registratie leveren (dit kan zijn via een interne afleiding intern in de BR). 
- Implementeer de NL AP strategie geldigOp (moment in de tijdslijn geldsigheid) en beschikbaarOp (moment in de tijdslijn registratie) 
- Lever vanuit elke BR een eindstatus (bekijk of je in de BR deze ook registreerd, of dat je deze afleid) 

Vertaal specificatie tijdslijnen: 
BAG: kent beide tijdslijnen. Geen vertaling nodig. 
WOZ: kent beide tijdslijnen. Geen vertaling nodig. 
BGT: kent nog geen tijdslijn geldigheid. 

VERVOLG NODIG: BGT vertaalspecificatie naar de tijdslijn geldigheid. De BGT kan dit het beste zelf aangeven. Denk bv. aan:  
     - begin geldigheid = tijdstip registratie 
     - eind geldigheid = eindRegistratie. Wellicht nog wat logica rondom geconstateerd.    

Aanname is dat de BGT dit kan en doet. 

#### Ad 3. Niet elke geo-BR heeft voor de tijdslijn geldigheid hetzelfde dataype

Vertrekpunt van de SOR is dat een afnemer een vraag stelt: welke gegevens zijn er geldig op een bepaalde datum, veelal vandaag. Een gewone afnemer gaat niet zo snel een timestamp opgeven in deze vraag. Voor basisregistraties worden besluiten ook genomen op dagbasis. Het is wel zo dat als er twee versies van een object op dezelfde dag geldig zijn/worden dat de laatste van de twee het antwoord op de vraag: wat is er vandaag geldig, is. 

Voor wat betreft de keuze: welk datatype gebruiken we voor geldig op en welk datatype gebruiken we in de SOR voor begin en einde geldigheid, is hier een keuze te maken. 

Optie a) We gebruiken altijd een DatumTijd voor geldigheid. BR's die alleen een datum kennen, daarvoor gebruiken we die datum en dan 00:00:00 
- Voor de geldigOp parameter wordt altijd een DatumTijd gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 
Opm. niet 00:00:01 en 00:00:02 enz. 
Opm. hier zijn we data aan het bijverzinnen.

Optie b) We volgen bij de tijdslijn geldigheid definitie van de BR. Daarom: gebruik een keuze tussen datatypes. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 

Opm. mits die verantwoord kan bij elke BR. Dit kan als de betekenis van meerdere versies op een dag is, de laatste is vigerend vanaf het moment dat ie er is.  

Optie c) We gebruiken altijd een Datum. Immers, besluiten voor BR's gaan in op een datum.
Opm. We willen toegroeien naar dat de tijdslijn geldigheid altijd een datum is. Dit is nu al te implementeren, mits ofwel de BR ofwel de SOR view erop goed omgaat met meerdere versies op 1 dag. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 
- De implicatie van deze is dat een BR om moet kunnen gaan met wanneer er meerdere versies op 1 dag geldig zijn en deze kan herkennen van elkaar. 

Advies: gezien het groeipad willen we onderzoeken of c) kan. 

KEUZE: C

####  Ad 4. Mutatie verschillen

Wanneer een object wordt beeindigd en de BR geen eindstatus kent, registreer/oof leidt af, een extra versie met wel een eindstatus. 
Opm. het is aan de BR om te kiezen of er wel of niet een versie met een eindstatus wordt geregistreerd of dat deze wordt afgeleid. 

#### Ad. 5 Hoe schuif je versies van objecten uit verschillende BR's in elkaar

Onderstaande een verkenning. Uitgaand van alle genoemde keuzes in de voorliggende tekst. 

Uitwerking 5 gedachtenlijn. 

BR 1: 
```
- versie 1, begin geldigheid t1 -  
```

BR 2: 
  
```
- versie 1, begin geldigheid t3 -  
```

SOR:

```
Stel vraag aan BR 1: geldigOp t4. Antwoord: versie 1. Gebruik deze gegevens voor het SOR object.
Stel vraag aan BR 2: geldigOp t4. Antwoord: versie 1. Gebruik deze gegevens voor het SOR object. 
```

Maar hoe doen we het met de tijdslijnen?

Optie 0: lever de losse antwoorden uit de losse BR's ook los door, maar wel technisch in hetzelfde antwoord en bij elkaar.

```
--> 1 versie in BR 1 en 1 versie in BR 2 = 2 losse versies (niet in elkaar geschoven). 
```

Optie 1: laat elke BR heel duidelijk terugkomen in het SOR object
- Geef van elk gegevens uit BR 1 aan: herkomst BR1, en de historie metagegevens zijn: begin geldigheid t1 -   
- Geef van elk gegevens uit BR 2 aan: herkomst BR2, en de historie metagegevens zijn: begin geldigheid t3 -   

Bv. een gegevensgroep voor gegevens uit BR 1 + de metagegevens voor historie uit BR 1 en voor BR 2 analoog. 

```
--> 1 versie in BR 1 en 1 versie in BR 2 = 1 versie van het SOR object, 
    bestaande uit de delen die elk afzonderlijk tijdslijnen hebben. 
```

Optie 2: plaats alle kenmerken in het SOR object en bereken voor elk setje gegevens eigen tijdslijnen.

nieuwe versies voor elke periode

```
--> 1 versie in BR 1 en 1 versie in BR 2 = 2 versies van het SOR object, 
    met elk afzonderlijk tijdslijnen hebben. 
```

Deze laatste is het meeste in lijn met de intentie van de SOR en met de insteek: bepaal van elke setje gegevens wanneer dit setje geldig is. 

KEUZE: voor deze exercitie gaan we uit van optie 2, om te kijken of dat goed kan. 

De voorbeelden die we gaan uitwerken in de volgende paragrafen zijn hiermee in lijn. 

_Illustratieve voorbeelden_

Gedachtelijn bij de uitwerking, uitgedrukt als voorbeelden van objecten met tijdslijnen. 

**Illustratief voorbeeld 1**

BR 1:

```
- versie 1, begin geldigheid t1 -  
```

BR 2:

```
- versie 1, begin geldigheid t3 -  
```

wordt SOR: 

```
- versie 1, begin geldigheid t1 - eind geldigheid t3 (berekend)
- versie 2, begin geldigheid t3 -  
```


**Illustratief Voorbeeld 2**

BR 1:

```
- versie 1, begin geldigheid t1 - t2
- versie 2, begin geldigheid t3 -   
```

BR 2:

```
versie 1, begin geldigheid t2 -  
```

wordt in de SOR:

```
- versie 1, begin geldigheid t1 - eind geldigheid t2 (berekend) 
- versie 2, begin geldigheid t2 - t3 (berekend) 
- versie 3, begin geldigheid t3 -   
```

Met de tijdslijn registratie erbij:

- tijdstipRegistratie: het moment waarop begin geldigheid is geregistreerd. 
- eindRegistatie: het moment waarop de eind geldigheid is geregistreerd/bepaald.

KEUZE Dit is een regel die voor de BAG en de BRK geldt. Deze is toegepast. Dit past binnen NEN3610. 

Dus,

**Voorbeeld 1**

BR 1:

```
- versie 1, begin geldigheid t1 -  
            tijdstip registratie: t1 
```

BR 2:

```
- versie 1, begin geldigheid t3 -  
            tijdstip registratie: t2 
```

wordt SOR:

```
- versie 1, begin geldigheid t1 - eind geldigheid t3 (berekend) 
            tijdstip registratie: t1 - eind registratie: t2 
- versie 2, begin geldigheid t3 -  
            tijdstip registratie: t2 
```

**Voorbeeld 2**

BR 1:

```
- versie 1, begin geldigheid t1 - t3
  tijdstip registratie: t1 - eind registratie t4
- versie 2, begin geldigheid t3 -
  tijdstip registratie: t4
```

BR 2: 

```
versie 1, begin geldigheid t2 -  
      tijdstip registratie: t2 
```

wordt in de SOR:

```
- versie 1, begin geldigheid t1 - eind geldigheid t2
            tijdstip registratie: t1 - eind registratie t2 (berekend)
- versie 2, begin geldigheid t2 - t3 (berekend) 
            tijdstip registratie: t2 - eind registratie t4 (berekend)
- versie 3, begin geldigheid t3 - ..
            tijdstip registratie: t4 -   
```

Er zijn andere voorbeelden te verzinnen, we moeten kijken of we dit kunnen kraken, zoals een voorbeeld met meerdere geldige op 1 dag of met een registratie tijdstip van de begin geldigheid op een latere tijd ligt dan het registratie tijdstip van de eind geldigheid - of dat de vertaal specificatie minder rechttoe rechtaan wordt. 

### Modellering van historie in de SOR

Het informatiemodel gaat uit van het modelleerpatroon van [[NEN3610-2021-ontw]] waarbij `Registratiegegevens` over het informatieobject, zoals de tijdlijn geldigheid en tijdlijn registratie in een apart metadata objecttype zit wat 1 op 1 gerelateerd is aan het objecttype waar het informatieobject over gaat. Dit tezamen met de modelleerprincipes van de SOR, zorgt er voor dat het object centraal gehouden kan worden, ofwel, dat het objecttype alleen directe eigenschappen van het object kent.

<figure id="sor-modellering-historie">
  <img src="media/historie.drawio.png" alt="sor-modellering-historie">
  <figcaption>Historie van informatieobjecten in de SOR</figcaption>
</figure>

Het informatiemodel biedt, zoals beschreven in [](#modelleerpatroon-voor-de-beschrijving-van-de-afleiding-van-sor-informatieobjecten), ook de mogelijkheid om de herkomst van een SOR informatieobject uit te drukken. Hierbij kan bij de registratiegegevens via `afgeleidVan` relaties een koppeling gelegd worden met de registratiegegevens van informatieobjecten uit onderliggende registraties. In informatieproducten kan dan gekozen worden om deze herkomstinformatie wel of niet te tonen.

<aside class="note">
  Bij het SOR-informatieobject nemen we in deze fase geen attribuut `versie` op. Dit omdat de waarde van versie niet gemakkelijk dynamisch berekend kan worden in de eerste fase van de SOR, waarin het als bevragingslaag over bestaande registraties zal fungeren.
</aside>

<aside class="note">
In de toekomst zal een SOR object waarschijnlijk een eigen identificatie krijgen. Voorlopig is de SOR een dynamische laag over verschillende registraties heen. Toch is het handig om een SOR identificatie te bepalen, m.n. voor het goed kunnen functioneren van informatie-services. Hiervoor zal een afleidingsregel gespecificeerd moeten worden op basis van de relevante bronregistraties voor een specifiek object. Dit moet nader onderzocht worden.

Mogelijke opties (open lijst):
- de objectidentificaties met de oudste `beginGeldigheid` uit de onderliggende BR informatieobjecten
- per objecttype een prio-lijst met registraties vanuit welke de identificatie overgenomen kan worden.
</aside>


<aside class='example'>
Een voorbeeld hoe een informatieobject er in een concrete serialisatie conform dit modelleerpatroon uit zou kunnen zien is:

```
{
    "identificatie": "0200100000085932",
    "domein": "NL.SOR.Gebouw",
    "oorspronkelijkBouwjaar": "1980",
    "status": "In gebruik",
    "nummeraanduidingreeks": [
        {
            "identificatieBAGVBOLaagsteHuisnummer": "0200010000130331" ,
            "identificatieBAGVBOHoogsteHuisnummer": "0200010000130339"
        }
    ],
    "geregistreerdMet": {
        "beginGeldigheid": "2019-09-10" ,
        "tijdstipRegistratie": "2019-09-19T00:00:00Z",
        "afgeleidVan" : [
            {
                "versie": "1",
                "beginGeldigheid": "2019-09-10" ,
                "tijdstipRegistratie": "2019-09-19T00:00:00Z",
                "beschrijft": {
                    "identificatie": "0200100000085932",
                    "domein": "NL.IMBAG.Pand"
                }
            },
            {
                "versie": "4",
                "beginGeldigheid": "2019-08-10" ,
                "tijdstipRegistratie": "2019-08-10T00:00:00Z",
                "beschrijft": {
                    "identificatie": "00016712f55b4b90874036fda00b7ab0",
                    "domein": "NL.BGT.Pand"
                }
            }
        ]
    }
}
```

</aside>

### Uitwerking: voorbeelden uitgewerkt met tijdreisvragen 

Op basis van de keuzes zoals gemaakt in dit hoofdstuk: inhoudelijk punt Historie. 

Fictief complexer voorbeeld uit het BAG historie model, waarin gegevens inactief gemaakt zijn.  

**Uitgangssituatie** 

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | TI         |
|---------|--------|--------|------------|------------|------------|------------|------------|
| 1000    | 1      | A      | 01-01-2018 | 03-03-2019 | 30-12-2017 | 01-03-2019 |            |
| 1000    | 2      | B      | 03-03-2019 | 01-09-2033 | 01-03-2019 |01-04-2019  | 01-05-2019 |
| 1000    | 3      | H      | 01-09-2033 |            | 01-04-2019 |            | 01-05-2019 |
| 1000    | 4      | B      | 03-03-2019 |            | 01-05-2019 |            |            |
  

Fictief voorbeeld uit de WOZ 

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         |
|---------|--------|--------|------------|------------|------------|------------|
| 2000 	| 0 	    |  200k  | 01-01-2019 | 01-01-2020 | 10-01-2019 | 20-02-2020 |
| 2000 	| 1 	    |  220k  | 01-01-2020 |            | 20-02-2020 |            |	
  

#### Insteek 'versies': stel de tijdreis vraag aan elke BR en voeg de antwoorden samen

De tijdreis aan een SOR Gebouw kent maar 1 geldigOp en 1 beschikbaarOp. Stel deze tijdreis aan de BR's die gebruikt worden om SOR Gebouw samen te stellen. Elk BR zal als antwoord 1 versie van een object opleveren - met een setje gegevens erin - en deze versie kent een tijdslijn geldigheid en een tijdslijn registratie. De tijdslijn van registratie komt doorgaans overeen met het moment van beschikbaarstelling en als dit zo is, dan kan de data, maar ook de tijdslijnen, samengevoegd worden.   

Oftewel, doe een tijdreis op de BAG en de WOZ en breng de gegevens samen in een SOR Gebouw.

Lange formulering: welke gegevens zijn geldig voor dit gebouw op 'datum', met de kennis/data die vanuit de informatievoorziening beschikbaar is/was op 'datumtijd'. De eerste datum wordt gebruikt voor de tijdreis parameter geldigOp en de tweede voor beschikbaarOp. De tijdsreis wordt beantwoord door eerst alle gegevens weg te filteren die na beschikbaarOp in de registatie zijn geregistreerd (inclusief einddatum geldigheid en eind registratie). Van de gegevens die overblijven wordt de geldigOp vraag gesteld. Deze vragen worden "onder water" aan de BAG gesteld en aan de WOZ. 

Korte formulering: welke gegevens zijn geldig op 'datum geldigOp' beschikbaar op 'datumtijd beschikbaarOp'?

**Vertaal specificatie**

We ontvangen van de onderliggende BR's 1 versie van een object, die geldig en beschikbaar is op de gevraagde tijdreis. Dat wil zeggen, data die op de gevraagde beschikbaarOp aanwezig was in de registratie. 

Opm. Geen data die naderhand is geregistreerd, hieronder vallen ook later ingevulde data zoals 'einde geldigheid', 'eind registratie' en 'tijdstip inactief'. 

1) Als een gegeven er is, neem deze op in SOR Gebouw. 

2) Als een gegeven er niet is, maar wel zou moeten zijn volgens IMSOR - Gebouw, vul deze in als nillable=true (afhankelijk van gekozen serialisatie taal). 

3) Bereken de juiste waardes voor de historie / tijdslijn attributen. 
- Begin Geldigheid:        je krijgt er 2, 1 van BAG, 1 van WOZ, kies de nieuwste/laatste die voor/gelijk aan 'geldigOp' ligt/is.  
- Eind  Geldigheid:        je krijgt er 2, 1 van BAG, 1 van WOZ, kies de vroegste/eerste die na/gelijk aan 'geldigOp' ligt/is.  
- Tijdstip Registratie:    je krijgt er 2, 1 van BAG, 1 van WOZ, kies de TR die hoort bij de geselecteerde BG. 
- Eind     Registratie:    je krijgt er 2, 1 van BAG, 1 van WOZ, kies de ER die hoort bij de geselecteerde EG. 

4) Neem de identificaties van de onderliggende objecten en overige data die erbij hoort over naar de (optionele) 'herkomst data'. 

Nota bene. Ad. 3. Als een BR de data niet kan leveren zoals bedoeld in de voorgaande opmerking, dan filter data die destijds leeg was er a.u.b. wel uit. 

**Tijdreisvragen**

*Vraag 1.* Welke gegevens zijn geldig vandaag in 2021 en beschikbaar vandaag in 2021?

<div class='note'>
Antwoord: B en 220k                     (versie 4 van de BAG en versie 1 van de WOZ)  

- BG: BAG 03-03-2019 of BG WOZ 01-01-2020 --> 01-01-2020 (WOZ)
- EG: BAG leeg of WOZ leeg                --> leeg       (WOZ)
- TR: BAG 01-05-2019 of WOZ 10-01-2019    --> 10-01-2019 (WOZ) 
- ER: BAG leeg of WOZ leeg                --> leeg       (WOZ)
</div>

*Vraag 2.* Welke gegevens zijn geldig op 01-01-2019 en beschikbaar vandaag in 2021?_ 

<div class='note'>
Antwoord* : A en 200k                     (versie 1 van de BAG en versie 0 van de WOZ)  

- BG: BAG 01-01-2018 of BG WOZ 01-01-2019 --> 01-01-2019 (WOZ)
- EG: BAG 03-03-2019 of WOZ 01-01-2020    --> 03-03-2019 (BAG)
- TR: BAG 30-12-2017 of WOZ 10-01-2019    --> 10-01-2019 (WOZ)
- ER: BAG 01-03-2019 of WOZ 20-02-2020    --> 01-03-2019 (BAG)
</div>

*Vraag 3.* Welke gegevens zijn geldig op 01-01-2020 en beschikbaar op 01-01-2020?

<div class='note'>_
Antwoord: B en 200k                     (versie 4 van de BAG en versie 0 van de WOZ, versie 1 is immers pas per 20-02-2020 geregistreerd)  

- BG: BAG 03-03-2019 of BG WOZ 01-01-2019 --> 01-01-2019 (WOZ)
- EG: BAG leeg of WOZ leeg                --> leeg       (WOZ) 
        Opm. EG van versie 0 is pas per 20-02-2020 geregistreerd, op 01-01-2020 nog leeg.
- TR: BAG 01-05-2019 of WOZ 10-01-2019    --> 10-01-2019 (WOZ) 
        Opm. dus niet, de laatste TR, maar de TR die hoort bij BG. 
- ER: BAG leeg of WOZ 20-02-2020          --> leeg       (WOZ) 
        Opm. ER van versie 0 is pas per 20-02-2020 geregistreerd, op 01-01-2020 nog leeg.
</div>

*Vraag 4*. Welke gegevens zijn geldig op 01-01-2018 en beschikbaar vandaag in 2021?_ 

<div class='note'>_
Antwoord: A en ??                       (versie 1 van de BAG en GEEN versie van de WOZ, immers WOZ heeft pas geldige gegevens vanaf 01-01-2019)


- BG: BAG 01-01-2018 of BG WOZ n.v.t.     --> 01-01-2020 (BAG)
- EG: BAG leeg of WOZ n.v.t.              --> leeg       (BAG)
- TR: BAG 30-12-2017 of WOZ n.v.t.        --> 30-12-2017 (BAG)
- ER: BAG leeg of WOZ n.v.t.              --> leeg       (BAG) 
</div>

Opm. Als je de vraag aan de LV-en wilt stellen dan zijn de registratie tijdstippen van de verwerking van deze data in LV-en van belang voor beschikbaarOp. Voeg dan een `TR-LV`, `EG-LV` en `IA-LV` toe.   

#### Insteek 'levenscycli': vraag de geldige levenscycli op met een tijdreis en voeg deze samen

Een andere insteek is om de levenscyclus van de BAG op te vragen en die van de WOZ ook en om op basis hiervan de gegevens samen te voeren. Dit is ook nodig als een afnemer de levenscyclus van een SOR gebouw opvraagt. Voor tijdreizen is het altijd zo dat een afnemer naar geldige gegevens vraagt, met de kennis die de informatievoorziening had over de objecten. Het is dus niet nodig opm de hele levenscyclus op te vragen. Het volstaat om de geldige levenscyclus op te vragen op de aangegeven beschikbaarOp. Nadat edze in elkaar geschoven zijn kan aan het resultaat - de geldige levenscyclus van het SOR Gebouw - gevraagd worden wat de geldige gegevens zijn op de aangegeveven geldigOp. 

Nota bene: dus niet een tijdreis naar de gehele levenscyclus van de BAG en de WOZ en die in elkaar schuiven.

**Uitgangssituatie** (gelijk aan eerder genoemde) 

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | TI         |
|---------|--------|--------|------------|------------|------------|------------|------------|
| 1000 	| 1 	    |  A     | 01-01-2018 | 03-03-2019 | 30-12-2017 | 01-03-2019 |	        |      	
| 1000 	| 2 	    |  B     | 03-03-2019 | 01-09-2033 | 01-03-2019 | 01-04-2019 | 01-05-2019 |	
| 1000 	| 3 	    |  H     | 01-09-2033 |	         |            | 01-04-2019 | 01-05-2019 |
| 1000 	| 4 	    |  B     | 03-03-2019 |	         | 01-05-2019 |            |            | 	
  
TI staat voor tijdstip inactief. Deze gegevens waren geldig tot 01-05-2019 maar zijn dit hierna niet meer. 

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | 
|---------|--------|--------|------------|------------|------------|------------|
| 2000    | 0 	    | 200k   | 01-01-2019 | 01-01-2020 | 10-01-2019 | 20-02-2020	|           	
| 2000 	| 1 	    | 220k   | 01-01-2020 |            | 20-02-2020 |            |

**Vertaal specificatie**

- Doe een tijdreis naar de geldige levenscyclus van de BAG, zoals beschikbaar op een bepaalde datum. 
- Doe een tijdreis naar de geldige levenscyclus van de WOZ, zoals beschikbaar op een bepaalde datum. 

--> Schuif deze in elkaar. 

1. Controleer of elke levenscyclus alleen geldige gegevens bevat. 
   BAG: geen gegevens met bv. tijdstipNietBAG of tijdstip inactief. 
   WOZ: ... 
   
2. Zet alle BG datums op een rij, en hou per BG de TR en de versie en de BR bij. Dit is het aantal versies die we gaan maken. 

3. Zet alle EG datums op een tijd en hou bij elke EG bij welke ER erbij hoort. 

4. Maak een (1e) versie met de 1e begindatum en bijbehorende TR 
   en de 1e einddatum geldigheid en bijbehorende ER
   en de functionele data die in de versie staat die bij de BG hoort, beperkt tot de functionele data die nodig is voor het SOR object     
   
   Maak een (2e) versie met de 2e begindatum en bijbehorende TR 
   en de 2e einddatum geldigheid en bijbehorende ER
   en de functionele data die in de versie staat die bij de BG hoort, beperkt tot de functionele data die nodig is voor het SOR object 
   controleer of de BG overeenkomt met de EG van de vorige versie 
   
   Enz.       

**Tijdreis vragen**

*Vraag 1.* Welke gegevens zijn geldig vandaag in 2021 en beschikbaar vandaag in 2021?_ 

<div class='note'>_

_Tussenstap_: geldige levenscyclus BAG op beschikbaarOp vandaag 2021

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | TI         |
|---------|--------|--------|------------|------------|------------|------------|------------| 
| 1000 	| 1      | A 	   | 01-01-2018 | 03-03-2019 | 30-12-2017 | 01-03-2019 |            |           	
| 1000 	| 4 	    | B 	   | 03-03-2019 |            | 01-05-2019 |            | 	        | 
  
_Tussenstap_: geldige levenscyclus WOZ op beschikbaarOp vandaag 2021
  
| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | 
|---------|--------|--------|------------|------------|------------|------------|	           	          	
| 2000    | 0 	    | 200k   | 01-01-2019 | 01-01-2020 | 10-01-2019 | 20-02-2020	|          	
| 2000 	| 1 	    | 220k   | 01-01-2020 |            | 20-02-2020 |            | 	
  

_Tussenstap_: geldige levenscyclus SOR Gebouw op beschikbaarOp vandaag 2021

Berekend. 
     
| ID BAG  | ID WOZ |  BG          | EG             | TR           | ER             |  Waarde BAG  | Waarde WOZ |
|---------|--------|--------------|----------------|--------------|----------------|--------------|------------| 
| 1000 	| NULL   | 01-01-2018 B | 01-01-2019 WOZ | 30-12-2017 B | 10-01-2019 WOZ |  A           |  NULL      |
| 1000    | 2000   | 01-01-2019 W | 03-03-2019 BAG | 10-01-2019 W | 01-03-2019 BAG |  A           |  200k      |      
| 1000    | 2000   | 03-03-2019 B | 01-01-2020 WOZ | 01-05-2019 B | 20-02-2020 WOZ |  B           |  200k      |       
| 1000    | 2000   | 01-01-2020 W | 	           | 20-02-2020 W |                |  B           |  220k      |            
  
Op beschikbaarOp 'vandaag 2021' voor SOR Gebouw is het deze tabel, alleen de geldigOp vraag hoeft nog gesteld te worden. 

_Antwoord 1_: B en 220k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek). 

</div>

*Vraag 2.* Welke gegevens zijn geldig op 01-01-2019 en beschikbaar vandaag in 2021?_ 

De geldige levenscyclus van BAG en WOZ zijn vandaag op 2021 hetzelfde als bij de vorige berekening en in elkaar geschoven dus ook. 

<div class='note'>
Antwoord: A en 200k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek). 

</div>

*Vraag 3*. Welke gegevens zijn geldig op 01-01-2020 en beschikbaar op 01-01-2020?_  

<div class='note'>
Tussenstap: geldige levenscyclus BAG op 01-01-2020.

| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | TI         |
|---------|--------|--------|------------|------------|------------|------------|------------| 
| 1000 	| 1 	    |  A 	   | 01-01-2018 | 03-03-2019 | 30-12-2017 | 01-03-2019 |            | 	           	
| 1000 	| 4 	    | B 	   | 03-03-2019 | 	         | 01-05-2019 |            |            | 	
  
Dit is, toevallig, hetzelfde als bij de vorige tijdreizen. 

Tussenstap: geldige levenscyclus WOZ op 01-01-2020.
       
| Obj. ID | Versie | Waarde | BG         | EG         | TR         | ER         | 
|---------|--------|--------|------------|------------|------------|------------|	           	          	
| 2000    | 0 	    | 200k   | 01-01-2019 |            | 10-01-2019 | 	          |          	
     
Opm. versie 1 bestond nog niet en van versie 0 waren EG en ER nog niet gevuld. 
  
Deze is wel anders bij deze tijdreis in vergelijking tot de eerdere tijdreizen. 

Tussenstap: geldige levenscyclus SOR Gebouw op 01-01-2020.
     
Berekend.
       
| ID BAG  | ID WOZ |  BG          | EG             | TR           | ER           |  Waarde BAG  | Waarde WOZ |
|---------|--------|--------------|----------------|--------------|--------------|--------------|------------| 
| 1000    | NULL   | 01-01-2018 B | 01-01-2019 W   | 30-12-2017 B | 10-01-2019 W |     A        |    NULL    |
| 1000    | 2000   | 01-01-2019 W | 03-03-2019 B   | 10-01-2019 W | 01-03-2019 B |     A        |    200k    | 
| 1000    | 2000   | 03-03-2019 B | 	           | 01-05-2019 B |              |     B        |    200k    |

Opm. versie 1 van de WOZ zit er niet in. 
     
Op beschikbaarOp '01-01-2021' voor SOR Gebouw is het deze tabel, alleen de geldigOp vraag hoeft nog gesteld te worden. 

_Antwoord: B en 200k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek).
</div>

*Vraag 4.*  Welke gegevens zijn geldig op 01-01-2018 en beschikbaar vandaag in 2021?_ 

De geldige levenscyclus van BAG en WOZ zijn vandaag op 2021 hetzelfde als bij de eerste berekening en in elkaar geschoven dus ook. 

<div class='note'>
_Antwoord 4_: A en NULL/??  (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek).

</div>

Beide insteken komen tot hetzelfde antwoord. 

### Aanbevelingen voor vervolg (2e high-5)

Voor de aanbevelingen wordt verwezen naar paragraaf [Aanbevelingen met betrekking tot historie](#aanbevelingen-met-betrekking-tot-historie)




## Modelleren van historie en beantwoorden van tijdreisvragen 

Bij dit inhoudelijke punt wordt gekeken hoe gegevens uit verschillende onderliggende bronnen te combineren zijn, in het bijzonder voor aspecten die te maken hebben met de historie van gegevens en tijdreizen. De punten waarop gelet moet worden zijn benoemd en er is een vertaalspecificatie gemaakt om historie "in elkaar te schuiven". 

### Doel

Een uniforme manier voor afnemers:

1) om te zien wanneer gegevens geldig zijn en wanneer deze gegevens geregistreerd/beschikbaar zijn;

2) om een tijdreis vraag te stellen.

Deze tijdreisvragen zijn (ook) los aan de basisregistraties te stellen. In deze High-5 echter wordt de tijdreisvraag "door een afnemer" 1x gesteld aan de SOR c.q. het SOR object `Gebouw`, en wordt deze tijdreis "onder water" aan de basisregistraties gesteld. Hierna worden de gegevens van de basisregistraties over een `Gebouw` die op de gevraagde datums geldig en beschikbaar zijn "in elkaar geschoven". De specificatie voor dit in elkaar schuiven en de uitkomst ervan worden hieronder beschreven. 

<aside class="note">
Met *Historie* wordt bedoeld de tijdlijn geldigheid en de tijdlijn registratie.  

In scope zijn versies van informatieobjecten en de geldige levenscyclus van een object. Buiten scope van deze uitwerking: levensduur van het object. </aside>

### Uitgangspunten 

- SOR afspraak: van alle gegevens moet bekend zijn wanneer de gegevens geldig zijn en wanneer ze beschikbaar/geregistreerd zijn. 
- We modelleren conform MIM - maar MIM kent nog geen metadata. We volgen daarom de huidige stand van de expertgroep modellering SOR. 
- We modelleren conform NEN3610 - zie modellering historie aldaar.
- De uitwerking is conform de specificatie van een tijdreis zoals beschreven in de NL API strategie (en hoe dit bv. in de LVBAG werkt, die deze implementeert).  
- De uitwerking is in lijn met de SOR en met hoe de basisregistraties nu werken (de data die beschikbaar is of beschikbaar gemaakt zou kunnen worden).

Dit betekent voor dit inhoudelijke punt: 
- We stellen het object centraal - d.w.z. we willen gegevens over het gebouw in de werkelijkheid leveren, en we doen dit door de registratiegegevens over het informatieobject te scheiden van de informatie over het object.
- We geven de tijdlijnen per set gegevens over een object aan. Dit heet ook wel een versie van een informatieobject. Afnemers willen gegevens van/over een object weten en wanneer deze, dit setje, geldig is en beschikaar is gekomen zodat ze het (hadden kunnen) weten. 

### Uitdaging en bijzondere punten

De uitdaging is om data uit de onderliggende basisregistraties uit te leveren maar dan geuniformeerd. D.w.z. dat historie wordt bijgehouden in of over versies van informatieobjecten. Een versie is een setje gegevens over een object, zoals deze gedurende een bepaalde periode onveranderd zijn, en over die set gegevens wordt de tijdlijn geldigheid en de tijdlijn registratie bijgehouden en uitgeleverd. 

De uit te werken bijzondere punten voor historie en tijdreizen zijn:

0. Definities van de tijdlijn geldigheid en de tijdlijn registratie.
1. Als we het object centraal stellen, hoe gaan we dan om met informatieobjecten over hetzelfde object uit 2 of meer basisregistraties die we in elkaar schuiven, in het bijzonder met meerdere identificaties.
2. Niet elke geo-basisregistratie kent nu beide tijdlijnen. Maar informatie over wanneer gegevens geldig en beschikbaar/geregistreerd zijn is wel beschikbaar. 
3. Niet elke geo-basisregistratie heeft voor de tijdlijn geldigheid hetzelfde dataype, sommige gebruiken een datum, sommige een datumtijd of een timestamp. Hoe gaan we hiermee om? 
4. Mutatieverschillen, met name t.a.v. het einde van levenscycli van objecten, wat bv. de BGT doet met een einddatum geldigheid en de BAG met een eindstatus. 
5. Hoe schuif je versies van informatieobjecten uit verschillende basisregistraties in elkaar; wat is het algoritme?

**Ad 0. definities van tijdlijn geldigheid en tijdlijn registratie** 

Zie [[NEN3610-2021-ontw]] historie. 

Merk op: 
- Elke Landelijke Voorziening (LV) die een verzameling is van een basisregistratie heeft een eigen tijdlijn van verwerking in de LV. We onderkennen dus tijdstipRegistratie bij de bronhouder en tijdstipRegistratie bij de LV.
- Van elk gegeven houden we het registratietijdstip bij. Dit geldt ook voor wanneer een beginGeldigheid of eindGeldigheid is geregisteerd in een basisregistratie en in een LV. Elke versie van een informatieobject heeft een begin geldigheid, en het tijdstip van de registratie van een versie van een informatieobject geeft (ook) aan wanneer deze begin geldigheid is geregistreerd. Evenzo geldt dit voor de einde geldigheid, het tijdstip waarop eind geldigheid geregistreerd wordt moet bekend zijn en eind registratie geeft (ook) aan wanneer deze eind geldigheid is geregistreerd. 

**Ad 1. in elkaar schuiven van versies van informatieobjecten uit meerdere basisregistraties of bronnen**

Een SOR object kan en mag meerdere identificaties hebben. Het voordeel hiervan is dat de link naar de basisregistratie(s) bekend is. 
- Wanneer een SOR object meerdere identificaties heeft, dan betekent dit dat je elk afzonderlijk kan gebruiken als identificatie, en dat de informatieobjecten uit de onderliggende basisregistraties over hetzelfde SOR object en hetzelfde object in de werkelijkheid gaan. 

**Ad 2. niet elke geo-basisregistratie kent nu beide tijdlijnen**  

Om de geldigOp tijdreis vraag (welke gegevens waren bekend binnen een bepaald tijdvak) te kunnen stellen moet een basisregistratie weten wanneer de gegevens geldig zijn. Elke basisregistratie hoort te weten wanneer de gegevens die erin geregistreerd zijn geldig zijn. Deze tijdlijn geldigheid wordt echter niet altijd fysiek vastgelegd. Als dit niet zo is, dan is het nodig om deze af te leiden. Vertaal dan wat er geregistreerd is in de basisregistratie naar de gevraagde tijdlijnen. 

Elke basisregistratie die aansluit op de SOR moet kunnen: 
- De tijdlijn geldigheid en de tijdlijn registratie leveren (dit kan zijn via een interne afleiding in de basisregistratie). 
- De NL AP strategie geldigOp (moment in de tijdlijn geldigheid) en beschikbaarOp (moment in de tijdlijn registratie)  implementeren.
- Vanuit de basisregistratie een eindstatus leveren (bekijk of je in de basisregistratie deze ook registreert, of dat je deze afleidt). 

Vertaalspecificatie tijdlijnen: 
- BAG: kent beide tijdlijnen. Geen vertaling nodig. 
- WOZ: kent beide tijdlijnen. Geen vertaling nodig. 
- BGT: kent nog geen tijdlijn geldigheid. 

Alleen de BGT heeft dus een vertaalspecificatie nodig voor de tijdlijn geldigheid. De BGT kan dit het beste zelf aangeven. Denk bv. aan:  
     - begin geldigheid = tijdstip registratie 
     - eind geldigheid = eindRegistratie. Wellicht nog wat logica rondom geconstateerd.    

Aanname is dat de BGT dit kan en doet. 

**Ad 3. Niet elke geo-basisregistratie heeft voor de tijdlijn geldigheid hetzelfde dataype**

Vertrekpunt van de SOR is dat een afnemer een vraag stelt: welke gegevens zijn er geldig op een bepaalde datum, veelal vandaag. Een gewone afnemer gaat niet zo snel een timestamp opgeven in deze vraag. Voor basisregistraties worden besluiten ook genomen op dagbasis. Het is wel zo dat als er twee versies van een informatieobject op dezelfde dag geldig zijn/worden dat de laatste van de twee het antwoord is op de vraag: "wat is er vandaag geldig". 

Voor wat betreft het datatype voor geldig op en het datatype voor begin en einde geldigheid, is hier een keuze te maken voor de SOR. 

Optie a) We gebruiken altijd een `DatumTijd` voor geldigheid. In basisregistraties die alleen een datum kennen, gebruiken we die datum en dan `00:00:00`. 
- Voor de geldigOp parameter wordt altijd een `DatumTijd` gebruikt. 
- Bij meerdere versies van een informatieobject op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. We gebruiken dus niet `00:00:01` en `00:00:02` enz. Hier zijn we data aan het bijverzinnen.

Optie b) We volgen bij de tijdlijn geldigheid de definitie van de basisregistratie. Daarom: gebruik een keuze tussen datatypes. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een informatieobject op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag, mits dit verantwoord kan bij elke basisregistratie. Dit kan als de betekenis van meerdere versies op een dag is, dat de laatste vigerend is vanaf het moment dat die versie is ontstaan.  

Optie c) We gebruiken altijd een `Datum`. Immers, besluiten voor basisregistraties gaan in op een datum.
We willen ernaar toegroeien dat de tijdlijn geldigheid altijd een datum is. Dit is nu al te implementeren, mits ofwel de basisregistratie ofwel de SOR view erop goed omgaat met meerdere versies op 1 dag. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een informatieobject op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 
- De implicatie van deze optie is dat een basisregistratie om moet kunnen gaan met wanneer er meerdere versies op 1 dag geldig zijn en deze kan onderscheiden van elkaar. 

Advies: gezien het groeipad willen we onderzoeken of c) mogelijk is. 

KEUZE: C

**Ad 4. Mutatieverschillen**

Wanneer de levenscyclus van een object eindigd en de basisregistratie geen eindstatus kent, dient een basisregistratie te zorgen voor ofwel de registratie, ofwel het afleiden, van een extra versie met wel een eindstatus. Het is aan de basisregistratie om te kiezen of er wel of niet een versie met een eindstatus wordt geregistreerd of dat deze wordt afgeleid. 

**Ad. 5 Hoe schuif je versies van informatieobjecten uit verschillende basisregistraties in elkaar**

Onderstaande een verkenning, die uitgaat van alle genoemde keuzes in de voorliggende tekst. 

basisregistratie 1: 
```
- versie 1, begin geldigheid t1 -  
```

basisregistratie 2: 
  
```
- versie 1, begin geldigheid t3 -  
```

SOR:

```
Stel vraag aan basisregistratie 1: geldigOp t4. 
Antwoord: versie 1. gebruik deze gegevens voor het SOR informatieobject.
Stel vraag aan basisregistratie 2: geldigOp t4. 
Antwoord: versie 1. gebruik deze gegevens voor het SOR informatieobject.
```

Maar hoe doen we het met de tijdlijnen?

Optie 0: lever de losse antwoorden uit de losse basisregistraties ook los door, maar wel technisch in hetzelfde antwoord en bij elkaar.

```
--> 1 versie in basisregistratie 1 en 1 versie in basisregistratie 2 = 2 losse versies 
(niet in elkaar geschoven). 
```

Optie 1: laat elke basisregistratie heel duidelijk terugkomen in het SOR informatieobject
- Geef van elk gegeven uit basisregistratie 1 aan: herkomst basisregistratie1, en de historie metagegevens zijn: begin geldigheid t1 -   
- Geef van elk gegeven uit basisregistratie 2 aan: herkomst basisregistratie2, en de historie metagegevens zijn: begin geldigheid t3 -   

Bv. een gegevensgroep voor gegevens uit basisregistratie 1 + de metagegevens voor historie uit basisregistratie 1 en voor basisregistratie 2 analoog. 

```
--> 1 versie in basisregistratie 1 en 1 versie in basisregistratie 2 = 1 versie van het SOR informatieobject, 
    bestaande uit de delen die elk afzonderlijk tijdlijnen hebben. 
```

Optie 2: plaats alle kenmerken in het SOR informatieobject en bereken voor elk setje gegevens eigen tijdlijnen.

Introduceer nieuwe versies voor elke periode.

```
--> 1 versie in basisregistratie 1 en 1 versie in basisregistratie 2 = 2 versies van het SOR informatieobject, 
    met elk afzonderlijk tijdlijnen. 
```

Deze laatste is het meeste in lijn met de intentie van de SOR en met de insteek: bepaal van elke setje gegevens wanneer dit setje geldig is. 

KEUZE: voor deze exercitie gaan we uit van optie 2, om te kijken of dat goed kan. De voorbeelden die we gaan uitwerken in de volgende paragrafen zijn hiermee in lijn. 

_Illustratieve voorbeelden_

<aside class="example">
basisregistratie 1:

```
- versie 1, begin geldigheid t1 -  
```

basisregistratie 2:

```
- versie 1, begin geldigheid t3 -  
```

wordt SOR: 

```
- versie 1, begin geldigheid t1 - eind geldigheid t3 (berekend)
- versie 2, begin geldigheid t3 -  
```
</aside>

<aside class="example">
basisregistratie 1:

```
- versie 1, begin geldigheid t1 - t2
- versie 2, begin geldigheid t3 -   
```

basisregistratie 2:

```
versie 1, begin geldigheid t2 -  
```

wordt in de SOR:

```
- versie 1, begin geldigheid t1 - eind geldigheid t2 (berekend) 
- versie 2, begin geldigheid t2 - t3 (berekend) 
- versie 3, begin geldigheid t3 -   
```
</aside>

Dezelfde voorbeelden hebben we ook uitgewerkt met de tijdlijn registratie erbij. Uitgaande van:

- tijdstipRegistratie: het moment waarop begin geldigheid is geregistreerd. 
- eindRegistatie: het moment waarop de eind geldigheid is geregistreerd/bepaald.


KEUZE Dit is een regel die voor de BAG en de BRK geldt. Deze is toegepast. Dit past binnen NEN3610. 

De voorbeelden worden dan als volgt uitgebreid:

<aside class="example">
basisregistratie 1:

```
- versie 1, begin geldigheid t1 -  
            tijdstip registratie: t1 
```

basisregistratie 2:

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
</aside>
<aside class="example">
basisregistratie 1:

```
- versie 1, begin geldigheid t1 - t3
  tijdstip registratie: t1 - eind registratie t4
- versie 2, begin geldigheid t3 -
  tijdstip registratie: t4
```

basisregistratie 2: 

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
</aside>

Ook voor andere, complexere voorbeelden zullen we uitwerkingen moeten maken. Onder andere een voorbeeld met meerdere geldige versies op één dag, met een registratietijdstip waarvan de begin geldigheid op een latere tijd ligt dan het registratie tijdstip van de eind geldigheid. De vertaalspecificatie  wordt wellicht minder rechttoe rechtaan.

### Modellering van historie in de SOR

Het informatiemodel gaat uit van het modelleerpatroon van [[NEN3610-2021-ontw]] waarbij `Registratiegegevens` over het informatieobject, zoals de tijdlijn geldigheid en tijdlijn registratie in een apart metadata objecttype zitten, dat 1 op 1 gerelateerd is aan het objecttype waar het informatieobject over gaat. Dit tezamen met de modelleerprincipes van de SOR, zorgt er voor dat het object centraal gehouden kan worden, ofwel, dat het objecttype alleen directe eigenschappen van het object kent.

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
- Neem de objectidentificatie met de oudste `beginGeldigheid` uit de onderliggende basisregistratie als SOR identificatie.
- Hanteer per objecttype een geprioriteerde-lijst met registraties vanuit welke de identificatie overgenomen kan worden.
</aside>

Een informatieobject in een concrete serialisatie conform dit modelleerpatroon zou er bijvoorbeeld als volgt uit kunnen zien:

<aside class='example'>


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

Op basis van de keuzes zoals gemaakt in dit hoofdstuk werken we hier een fictief complexer voorbeeld uit op basis van het BAG historiemodel, waarin gegevens inactief gemaakt zijn.  

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
  

#### Insteek 'versies': stel de tijdreis vraag aan elke basisregistratie en voeg de antwoorden samen

De tijdreisvraag aan een SOR Gebouw kent maar 1 geldigOp en 1 beschikbaarOp. Stel deze tijdreisvraag aan de basisregistraties die gebruikt worden om het SOR Gebouw samen te stellen. Elk basisregistratie zal als antwoord éém versie van een informatieobject opleveren - met een setje gegevens erin - en deze versie kent een tijdlijn geldigheid en een tijdlijn registratie. De tijdlijn van registratie komt doorgaans overeen met het moment van beschikbaarstelling en als dit zo is, dan kunnen de gegevens, maar ook de tijdlijnen, samengevoegd worden.   

Oftewel, doe een tijdreis op de BAG en de WOZ en breng de gegevens samen in een SOR Gebouw.

Lange formulering: welke gegevens zijn geldig voor dit gebouw op 'datum', met de kennis/data die vanuit de informatievoorziening beschikbaar is/was op 'datumtijd'. De eerste datum wordt gebruikt voor de tijdreis parameter geldigOp en de tweede voor beschikbaarOp. De tijdsreis wordt beantwoord door eerst alle gegevens weg te filteren die na beschikbaarOp in de registatie zijn geregistreerd (inclusief einddatum geldigheid en eind registratie). Van de gegevens die overblijven wordt de geldigOp vraag gesteld. Deze vragen worden "onder water" aan de BAG gesteld en aan de WOZ. 

Korte formulering: welke gegevens zijn geldig op 'datum geldigOp' en beschikbaar op 'datumtijd beschikbaarOp'?

##### Vertaal specificatie

We ontvangen van de onderliggende basisregistraties één versie van een informatieobject, die geldig en beschikbaar is op de gevraagde tijdreis. Dat wil zeggen, data die op de gevraagde beschikbaarOp aanwezig was in de registratie. We ontvangen géén data die naderhand is geregistreerd; hieronder vallen ook later ingevulde data zoals 'einde geldigheid', 'eind registratie' en 'tijdstip inactief'. 

1) Als een gegeven er is, neem deze op in SOR Gebouw. 

2) Als een gegeven er niet is, maar wel zou moeten zijn volgens IMSOR - Gebouw, vul deze in als `nillable=true` (afhankelijk van gekozen serialisatietaal). 

3) Bereken de juiste waardes voor de historie / tijdlijn attributen. 
- Begin Geldigheid (BG):        je krijgt er twee, één van BAG, één van WOZ, kies de nieuwste/laatste die voor/gelijk aan 'geldigOp' ligt/is.  
- Eind  Geldigheid (EG):        je krijgt er twee, één van BAG, één van WOZ, kies de vroegste/eerste die na/gelijk aan 'geldigOp' ligt/is.  
- Tijdstip Registratie (TR):    je krijgt er twee, één van BAG, één van WOZ, kies de TR die hoort bij de geselecteerde BG. 
- Eind     Registratie (ER):    je krijgt er twee, één van BAG, één van WOZ, kies de ER die hoort bij de geselecteerde EG. 

4) Neem de identificaties van de objecten uit onderliggende informatieobject en overige data die erbij hoort over in de (optionele) 'herkomst data'. 

<aside class="note">Ad. 3. Als een basisregistratie de data niet kan leveren zoals bedoeld in de voorgaande opmerking, filter data die destijds leeg was er dan uit. 
</aside>

##### Tijdreisvragen

<aside class="example">
*Vraag 1.* Welke gegevens zijn geldig vandaag in 2021 en beschikbaar vandaag in 2021?

Antwoord: B en 220k                     (versie 4 van de BAG en versie 1 van de WOZ)  

- BG: BAG 03-03-2019 of BG WOZ 01-01-2020 --> 01-01-2020 (WOZ)
- EG: BAG leeg of WOZ leeg                --> leeg       (WOZ)
- TR: BAG 01-05-2019 of WOZ 10-01-2019    --> 10-01-2019 (WOZ) 
- ER: BAG leeg of WOZ leeg                --> leeg       (WOZ)

*Vraag 2.* Welke gegevens zijn geldig op 01-01-2019 en beschikbaar vandaag in 2021?

Antwoord* : A en 200k                     (versie 1 van de BAG en versie 0 van de WOZ)  

- BG: BAG 01-01-2018 of BG WOZ 01-01-2019 --> 01-01-2019 (WOZ)
- EG: BAG 03-03-2019 of WOZ 01-01-2020    --> 03-03-2019 (BAG)
- TR: BAG 30-12-2017 of WOZ 10-01-2019    --> 10-01-2019 (WOZ)
- ER: BAG 01-03-2019 of WOZ 20-02-2020    --> 01-03-2019 (BAG)

*Vraag 3.* Welke gegevens zijn geldig op 01-01-2020 en beschikbaar op 01-01-2020?

Antwoord: B en 200k                     (versie 4 van de BAG en versie 0 van de WOZ, versie 1 is immers pas per 20-02-2020 geregistreerd)  

- BG: BAG 03-03-2019 of BG WOZ 01-01-2019 --> 01-01-2019 (WOZ)
- EG: BAG leeg of WOZ leeg                --> leeg       (WOZ) 
        Opm. EG van versie 0 is pas per 20-02-2020 geregistreerd, op 01-01-2020 nog leeg.
- TR: BAG 01-05-2019 of WOZ 10-01-2019    --> 10-01-2019 (WOZ) 
        Opm. dus niet, de laatste TR, maar de TR die hoort bij BG. 
- ER: BAG leeg of WOZ 20-02-2020          --> leeg       (WOZ) 
        Opm. ER van versie 0 is pas per 20-02-2020 geregistreerd, op 01-01-2020 nog leeg.

*Vraag 4*. Welke gegevens zijn geldig op 01-01-2018 en beschikbaar vandaag in 2021?_ 

Antwoord: A en ??                       (versie 1 van de BAG en GEEN versie van de WOZ, immers WOZ heeft pas geldige gegevens vanaf 01-01-2019)

- BG: BAG 01-01-2018 of BG WOZ n.v.t.     --> 01-01-2020 (BAG)
- EG: BAG leeg of WOZ n.v.t.              --> leeg       (BAG)
- TR: BAG 30-12-2017 of WOZ n.v.t.        --> 30-12-2017 (BAG)
- ER: BAG leeg of WOZ n.v.t.              --> leeg       (BAG) 
</aside>

<aside class="note">Als je de vraag aan de LV-en wilt stellen dan zijn de registratie tijdstippen van de verwerking van deze data in LV-en van belang voor beschikbaarOp. Voeg dan een `TR-LV`, `EG-LV` en `IA-LV` toe.</aside>

#### Insteek 'levenscycli': vraag de geldige levenscycli op met een tijdreis en voeg deze samen

Een andere insteek is om de levenscyclus van de BAG en die van de WOZ op te vragen en om op basis hiervan de gegevens samen te voegen. Dit is ook nodig als een afnemer de levenscyclus van een SOR gebouw opvraagt. Voor tijdreizen is het altijd zo dat een afnemer naar geldige gegevens vraagt, met de kennis die de informatievoorziening had over de objecten. Het is dus niet nodig om de hele levenscyclus op te vragen. Het volstaat om de geldige levenscyclus op te vragen op de aangegeven beschikbaarOp. Nadat deze in elkaar geschoven zijn kan aan het resultaat - de geldige levenscyclus van het SOR Gebouw - gevraagd worden wat de geldige gegevens zijn op de aangegeveven geldigOp. 

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

##### Vertaal specificatie

- Doe een tijdreis naar de geldige levenscyclus van de BAG, zoals beschikbaar op een bepaalde datum. 
- Doe een tijdreis naar de geldige levenscyclus van de WOZ, zoals beschikbaar op een bepaalde datum. 
- Schuif deze in elkaar. 

1. Controleer of elke levenscyclus alleen geldige gegevens/versies bevat. 
   BAG: geen gegevens met bv. tijdstipNietBAG of tijdstip inactief. WOZ: vergelijkbare controle indien van toepassing.
   
2. Zet alle bron-versies van bron 1 en bron 2 in een lijst op begin datum, en hou per versie de BG en TR (er) bij. 
    - Als twee versies dezelfde BG hebben, sorteer ze op TR (oudste eerst). 
    - We hebben nu een bron-versie-lijst.
    - Per BG-TR combinatie gaan we 1 versie maken, oftewel als uit bron 1 X versies komen en uit bron 2 Y versies dan maken we X + Y versies. 
      
3. De einddatums van deze versies moeten nog bepaald worden. Zet alle EG datums op een rij in een bronnen-EG-lijst en hou bij elke EG bij welke ER erbij hoort.   

4. Doorloop de bron-versie-lijst. 
    - Neem de eerste versie uit de bron-versielijst: maak een 1e SOR versie met deze BG en bijbehorende TR en plaats deze in de SOR-versie lijst.  
    - Neem de 2e versie uit de bron-versielijst: maak een 2e SOR versie met deze BG en bijbehorende TR en plaats deze in ed SOR-versie lijst.  
    - Enz. 
   
 5. Bepaal de EG van de SOR-versies in de SOR-versielijst. 
    - Geef de 1e SOR versie als EG de datum die voorkomt als BG in de 2e versie. 
    - Geef de 2e SOR versie als EG de datum die voorkomt als BG in de 3e versie. 
    - Enz. 

 6. Bepaal de ER van de SOR-versies in de SOR-versielijst. 
    - Doorloop voor elke SOR-versie de bron-EG/ER lijst.     
    - Als een SOR-versie een EG heeft: 
        - Zoek de 1e EG op in de bronnen-EG-lijst die overeenkomt met de EG van de SOR-versie. 
        - Bij een match: neem de bijbehorende ER over naar de SOR-versie. Verwijder deze EG/ER entry uit de bronnen-EG-lijst 
        - Bij geen match: neem als TR de TR die hoort bij de BG van de volgende SOR-versie. 

  7. Controleer of de tijdlijn geldigheid tussen de SOR versies netjes op elkaar aansluiten. 
    - 1e SOR-versie EG = 2e SOR versie BG. 
    - 2e SOR-versie EG = 3e SOR versie BG. 
    - laatste SOR-versie EG = leeg en heeft een eindstatus.   

  8. Bepaal de functionele gegevens van de SOR-versie.  
    - Bepaal voor elke SOR-versie: 
        - is er overlap op de periode BG-EG van de SOR-versie met een geldige versie van bron 1? Zo ja, voeg de gegevens van deze bron-versie toe aan de SOR-versie. 
        - is er overlap op de periode BG-EG van de SOR-versie met een geldige versie van bron 2? Zo ja, voeg de gegevens van deze bron-versie toe aan de SOR-versie. 
        - Enz. 
        - Bij meerdere SOR-versies op 1 dag: TODO.    
  
Wellicht zijn er betere algoritmes denkbaar. Dat kan uiteraard besproken worden.   

##### Tijdreis vragen

<aside class="example">
*Vraag 1.* Welke gegevens zijn geldig vandaag in 2021 en beschikbaar vandaag in 2021?

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

Berekend: 
     
| ID BAG  | ID WOZ |  BG          | EG             | TR           | ER             |  Waarde BAG  | Waarde WOZ |
|---------|--------|--------------|----------------|--------------|----------------|--------------|------------| 
| 1000 	| NULL   | 01-01-2018 B | 01-01-2019 WOZ | 30-12-2017 B | 10-01-2019 WOZ |  A           |  NULL      |
| 1000    | 2000   | 01-01-2019 W | 03-03-2019 BAG | 10-01-2019 W | 01-03-2019 BAG |  A           |  200k      |      
| 1000    | 2000   | 03-03-2019 B | 01-01-2020 WOZ | 01-05-2019 B | 20-02-2020 WOZ |  B           |  200k      |       
| 1000    | 2000   | 01-01-2020 W | 	           | 20-02-2020 W |                |  B           |  220k      |            
  
Op beschikbaarOp 'vandaag 2021' voor SOR Gebouw is het deze tabel, alleen de geldigOp vraag hoeft nog gesteld te worden. 

_Antwoord 1_: B en 220k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek). 

*Vraag 2.* Welke gegevens zijn geldig op 01-01-2019 en beschikbaar vandaag in 2021?

De geldige levenscyclus van BAG en WOZ zijn vandaag op 2021 hetzelfde als bij de vorige berekening en in elkaar geschoven dus ook. 

Antwoord: A en 200k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek). 

*Vraag 3*. Welke gegevens zijn geldig op 01-01-2020 en beschikbaar op 01-01-2020?

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
     
Opmerking: versie 1 bestond nog niet en van versie 0 waren EG en ER nog niet gevuld. 
  
Deze is wel anders bij deze tijdreis in vergelijking tot de eerdere tijdreizen. 

Tussenstap: geldige levenscyclus SOR Gebouw op 01-01-2020.
     
Berekend:
       
| ID BAG  | ID WOZ |  BG          | EG             | TR           | ER           |  Waarde BAG  | Waarde WOZ |
|---------|--------|--------------|----------------|--------------|--------------|--------------|------------| 
| 1000    | NULL   | 01-01-2018 B | 01-01-2019 W   | 30-12-2017 B | 10-01-2019 W |     A        |    NULL    |
| 1000    | 2000   | 01-01-2019 W | 03-03-2019 B   | 10-01-2019 W | 01-03-2019 B |     A        |    200k    | 
| 1000    | 2000   | 03-03-2019 B | 	           | 01-05-2019 B |              |     B        |    200k    |

Opmerking: versie 1 van de WOZ zit er niet in. 
     
Op beschikbaarOp '01-01-2021' voor SOR Gebouw is het deze tabel, alleen de geldigOp vraag hoeft nog gesteld te worden. 

_Antwoord:_ B en 200k (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek).

*Vraag 4.*  Welke gegevens zijn geldig op 01-01-2018 en beschikbaar vandaag in 2021?

De geldige levenscyclus van BAG en WOZ zijn vandaag op 2021 hetzelfde als bij de eerste berekening en in elkaar geschoven dus ook. 

_Antwoord 4_: A en NULL/??  (de tijdreis vraag geeft - gelukkig, moet ook zo zijn - hetzelfde antwoord als bij de eerste insteek).

</aside>

Beide insteken komen tot hetzelfde antwoord. 

### Aanbevelingen voor vervolg (2e high-5)

Voor de aanbevelingen wordt verwezen naar paragraaf [Aanbevelingen met betrekking tot historie](#aanbevelingen-met-betrekking-tot-historie)




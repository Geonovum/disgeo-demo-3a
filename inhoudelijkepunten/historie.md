Modelleren van historie 

Subgroep high-5 Pano, Wouter, Lennart. 

Doel: een uniforme manier voor afnemers om te zien wanneer 1) gegevens geldig zijn en beschikbaar/geregistreerd zijn en 2) om een tijdreis vraag te stellen.

Deze tijdreis vragen zijn (ook) los aan de basisregistraties te stellen en te vertalen nara de SOR, maar in deze high-5 wordt de tijdreis vraag 1x gesteld aan het SOR object, en wordt exct dezelfde tijdreis "onder water" aan de BR's gesteld en worden de gegevens van de BR's "in elkaar geschoven". De specificatie voor dit in elkaar schuiven en de uitkomst ervan wordt hieronder beschreven. 

In het geval van de SOR gaat het in deze high-5 ook over het in elkaar schuiven van gegevens van afzonderlijke objecten in de BR's naar een samengesteld object in de SOR.

Historie: hiermee wordt bedoeld de tijdslijn geldigheid en de tijdslijn registratie. 
          Opm. Buiten scope van deze uitwerking: levensduur van het object.  

Uitgangspunten: 
- SOR afspraak: van alle gegevens moet het bekend zijn wanneer de gegevens geldig zijn en wanneer ze beschikbaar/geregistreerd zijn. 
- Conform MIM - maar MIM kent nog geen metadata, we volgen de huidige stand van de expertgroep modellering SOR 
- Conform NEN3610 - zie modellering historie aldaar 
- Conform de specificatie van ee tijdreis zoals beschreven in de NL API strategie en in bv. de BAG 
- In lijn met de SOR en met hoe de BR's nu grotendeels werken 

Dit betekent: 
- We stellen het object centraal - d.w.z. we willen gegevens over het gebouw in de werkelijkheid leveren, en we doen dit door de registratie gegevens over dit object te leveren.
- We geven de tijdslijnen per set gegevens over een object aan. Dit heet ook we een versie van een object. Niet per attribuut. Dit kan wel afgeleid worden, maar dit is niet de standaard use case. Afnemers willen immers vooral gegevens van/over een object weten.

Uitdaging: 
- Enerzijds: in het geval van de SOR gaat het in deze high-5 ook over het in elkaar schuiven van gegevens van afzonderlijke objecten in de BR's naar een samengesteld object in de SOR.
- Anderzijds: hoe de geo-basisregistraties data nu uitleveren maar dan geuniformeerd. D.w.z. dat historie grotendeels wordt bijgehouden/geregistreerd in versies van objecten. Een versie is een setje gegevens over een object, en over die set gegevens wordt de tijdslijn geldigheid en de tijdslijn registratie bijgehouden en uitgeleverd. 

De uit te werken punten zijn:
0) definities van tijdslijn geldigheid en tijdslijn registratie 
1) Als we het object centraal stellen, hoe gaan we dan om met objecten uit 2+ BR's die we in elkara schuiven, in het bijzonder met de meerdere identificaties
2) Niet elke geo-BR kent nu beide tijdslijnen. Maar weten wel wanneer gegevens geldig en beschikbaar/geregistreerd zijn. 
3) Niet elke geo-BR heeft voor de tijdslijn geldigheid hetzelfde dataype, sommige gebruiken een datum, sommige een datumtijd of een timestamp. Hoe gaan we hiermee om? 
4) Mutatie verschillen, met name t.a.v. beeindigen van objecten, wat bv. de BGT doet met een einddatum geldigheid en de BAG met een eindstatus. 
5) Hoe schuif je versies van objecten uit verschillende BR's in elkaar. Wat is het algoritme. 

--

Ad 0. Zie NEN3610 2021/2022 historie. 
Merk op:
- Elke Landelijke Voorziening die een verzameling is van een BR heeft een eigen tijdslijn van verwerking in de LV. We onderkennen dus tijdstipRegistratie bij de bronhouder en tijdstipRegistratie bij de LV.
- Van elk gegeven houden we het registratie tijdstip bij. Dit geldt ook voor wanneer een beginGeldigheid of eindGeldigheid is geregisteerd, in een BR en in een LV. 

Ad 1. Een SOR object kan en mag meerdere identificaties hebben. Dit is ook handig, want dan in de link naar de BR ook direct bekend. 
- Wanneer een SOR object meerdere identificaties heeft, dan betekent dit dat je elk afzonderlijk kan gebruiken als identificatie, en dat de objecten uit de onderliggende BR's over hetzelfde SOR object en hetzelfde object in de werkelijkheid gaat. 

Ad 2. Elke BR weet echt wel wanneer de gegevens geldig zijn, ook al wordt het niet altijd fysiek vastgelegd. Vertaal dus wat er geregistreerd in de BR naar de gevraagde tijdslijnen. 
- Lever vanuit elke BR de tijdslijnen. 
- Implementeer de NL AP strategie geldigOp (moment in de tijdslijn geldsigheid) en beschikbaarOp (moment in de tijdslijn registratie) 
- Lever vanuit elke BR een eindstatus (bekijk of je in de BR deze ook registreerd, of dat je deze afleid) 

Vertaal specificatie tijdslijnen: 
BAG: kent beide tijdslijnen. 
WOZ: kent beide tijdslijnen. 
BGT: kent nog geen tijdslijn geldigheid. Deze is als volgt  af te leiden: 
     - begin geldigheid = tijdstip registratie 
     - eind geldigheid = eindRegistratie. Wellicht nog wat logica rondom geconstateerd.    

Ad 3. Er is hier een keuze te maken. 

Optie a) We gebruiken altijd een DatumTijd voor geldigheid. BR's die alleen een datum kennen, daarvoor gebruiken we die datum en dan 00:00:00 
- Voor de geldigOp parameter wordt altijd een DatumTijd gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 
Opm. niet 00:00:01 en 00:00:02 enz. 
Opm. hier zijn we data aan het bijverzinnen.

Optie b) We volgen bij de tijdslijn geldigheid definitie van de BR. Daarom: gebruik een keuze tussen datatypes. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 

Opm. mits die verantwoord kan bij elke BR. Dit kan als de betekenis van meerdere versies op een dag is, de laatste is vigerend vanaf het moment dat ie er is.  

Optie c) We gebruiken altijd een Datum. Immers, besluiten voor BR's gaan in op een datum/
Opm. We willen toegroeien naar dat de tijdslijn geldigheid altijd een datum is. Dit is nu al te implementeren, mits ofwel de BR ofwel de SOR view erop goed omgaat met meerdere versies op 1 dag. 
- Voor de geldigOp parameter wordt altijd een datum gebruikt. 
- Bij meerdere versies van een object op een dag vinden we bij deze geldigOp altijd de laatste de meest actuele voor die dag. 

Advies: gezien het groeipad willen we onderzoeken of c) kan. 

Ad 4. Wanneer een object wordt beeindigd en de BR geen eindstatus kent, registreer/oof leidt af, een extra versie met wel een eindstatus. 

Ad 5. Onderstaande een verkenning.

Voorbeeld: 

BR 1: 
- versie 1, begin geldigheid t1 - ...
BR 2: 
- versie 1, begin geldigheid t3 - ...

SOR: 
Stel vraag aan BR 1: geldigOp t4. Antwoord: versie 1. Gebruik deze gegevens voor het SOR object. 
Stel vraag aan BR 2: geldigOp t4. Antwoord: versie 1. Gebruik deze gegevens voor het SOR object. 

Maar hoe doen we het met de tijdslijnen?

Optie 0: lever de losse antwoorden uit de losse BR's ook los door, maar wel technisch in hetelfde antwoord en bij elkaar. 
--> 1 versie in BR 1 en 1 versie in BR 2 = 2 losse versies (niet in elkaar geschoven). 

Optie 1: laat elke BR heel duidelijk terugkomen in het SOR object
- Geef van elk gegevens uit BR 1 aan: herkomst BR1, en de historie metagegevens zijn: begin geldigheid t1 - ... 
- Geef van elk gegevens uit BR 2 aan: herkomst BR2, en de historie metagegevens zijn: begin geldigheid t3 - ... 

Bv. een gegevensgroep voor gegevens uit BR 1 + de metagegevens voor historie uit BR 1 en voor BR 2 analoog. 
--> 1 versie in BR 1 en 1 versie in BR 2 = 1 versie van het SOR object, bestaande uit de delen die elk afzonderlijk tijdslijnen hebben. 

Optie 2: plaats alle kenmerken in het SOR object en bereken voor elk setje gegevens eigen tijdslijnen. 
nieuwe versies voor elke periode
--> 1 versie in BR 1 en 1 versie in BR 2 = 2 versies van het SOR object, met elk afzonderlijk tijdslijnen hebben. 

Deze laatste is het meeste in lijn met de intentie van de SOR en met de insteek: bepaal van elke setje gegevens wanneer dit setje geldig is. 

Keuze: voor deze exercitie gaan we uit van optie 2, om te kijken of dat goed kan. 

Uitwerking *5* - optie 2. 

Voorbeeld 1: 

BR 1: 
- versie 1, begin geldigheid t1 - ...
BR 2: 
- versie 1, begin geldigheid t3 - ...

wordt SOR: 
- versie 1, begin geldigheid t1 - eind geldigheid t3 (berekend)
- versie 2, begin geldigheid t3 - ...


Voorbeeld 2: 

BR 1: 
- versie 1, begin geldigheid t1 - t2
- versie 2, begin geldigheid t3 - ... 

BR 2: versie 1, begin geldigheid t2 - ...

wordt in de SOR:  
- versie 1, begin geldigheid t1 - eind geldigheid t2 (berekend) 
- versie 2, begin geldigheid t2 - t3 (berekend) 
- versie 3, begin geldigheid t3 - ... 

--

Met de tijdslijn registratie erbij:

- tijdstipRegistratie: het moment waarop begin geldigheid is geregistreerd. 
- eindRegistatie: het moment waarop de eind geldigheid is geregistreerd/bepaald.

Dus, 

Voorbeeld 1: 

BR 1: 
- versie 1, begin geldigheid t1 - ...
            tijdstip registratie: t1 
BR 2: 
- versie 1, begin geldigheid t3 - ...
            tijdstip registratie: t2 
 
wordt SOR: 
- versie 1, begin geldigheid t1 - eind geldigheid t3 (berekend) 
            tijdstip registratie: t1 - eind registratie: t2 
            
- versie 2, begin geldigheid t3 - ...
            tijdstip registratie: t2 

Voorbeeld 2: 

BR 1: 
- versie 1, begin geldigheid t1 - t3
  tijdstip registratie: t1 - eind registratie t4 
            
- versie 2, begin geldigheid t3 - ... 
  tijdstip registratie: t4

BR 2: versie 1, begin geldigheid t2 - ...
      tijdstip registratie: t2 

wordt in de SOR:  
- versie 1, begin geldigheid t1 - eind geldigheid t2
            tijdstip registratie: t1 - eind registratie t2 (berekend) 
            
- versie 2, begin geldigheid t2 - t3 (berekend) 
            tijdstip registratie: t2 - eind registratie t4 (berekend)
             
- versie 3, begin geldigheid t3 - ..
            tijdstip registratie: t4 - ... 
            
 Er zijn andere voorbeelden te verzinnen, we moeten kijken of we dit kunnen kraken, zoals een voorbeeld met meerdere geldige op 1 dag 
 of met een registratie tijdstip van de begin geldigheid op een latere tijd ligt dan het registratie tijdstip van de eind geldigheid - of dat de vertaal specificatie minder rechttoe rechtaan wordt. 


















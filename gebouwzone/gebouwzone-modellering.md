### Transponering van gebouwzones

Het SOR objecttype Gebouwzone is gebaseerd op het WOZ deelobject. Het WOZ deelobject kan in eenvoudige situaties een heel woonhuis zijn, maar er kunnen ook meerdere deelobjecten voor één huis zijn: bijvoorbeeld de woning zelf, een garage en een serre. De indeling in deelobjecten wordt gemaakt op basis van wat voor de waardebepaling van het object van belang is (bijvoorbeeld op basis van mate van isolatie), en niet puur op gegevens zoals het bouwjaar. De bronhouders doen veel marktanalyse en gebruiken hierbij bijvoorbeeld informatie uit verkoopplatforms zoals Funda. Daarnaast wordt de WOZ gevoed met informatie uit de BAG over wijzigingen aan objecten zoals verbouwingen.

Om een idee te krijgen van de data kunnen we kijken in het [WOZ waardeloket](https://www.wozwaardeloket.nl/). Hierin staan alleen de WOZ waarden per WOZ object, maar de contouren van WOZ deelobjecten zijn waar er een directe relatie met de BAG in de data zit, wel gevisualiseerd.

#### Gebouwzone transponeringstabel

De onderstaande tabel beschrijft voor de gegevens die bij SOR Gebouwzone zijn gespecificeerd, of en hoe deze uit de brondata gehaald kan worden. 

Gegeven in SOR           | Herkomst | Transponering
-------------------------|----------| -------------
identificatie            | WOZ      | WOZ deelobject heeft een eigenschap [nummerWOZDeelObject](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_nummerWOZDeelObject) die we kunnen overnemen. Dit nummer is uniek in combinatie met het bijbehorende [WOZ objectnummer](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WOZ_WOZObject_wozObjectnummer). 
geometrie                | BAG/BGT  | WOZ deelobjecten hebben in de WOZ geen geometrie (in theorie wel - zie [geometrie](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_geometrie), maar deze wordt niet ingewonnen). Wel zijn ze gekoppeld aan de BAG voor zover er een corresponderend BAG object is. Bijvoorbeeld de geometrie van een woonhuis en van een schuur kun je uit de BAG halen via het gekoppelde verblijfsobject of pand. Maar de geometrie van een tuin of bijvoorbeeld een zwembad, carport,  paardenrijbak of agrarische grond niet. De geometrieën van dat soort objecten zitten (deels) in de BGT. Via BAG pand en BGT pand zou je misschien het bij een pand horende erf (tuin) en andere objecten (bordes, carport, luifel, ...) kunnen vinden op basis van geometrische nabijheid en/of in combinatie met het kadastraal perceel.
geometrie afbakening     | ?        | Dit gegeven herkennen we niet. Het lijkt meer een gegeven te zijn voor de bijhouder van de WOZ, de bronhouder, maar niet een gegeven dat voor afnemers relevant is. Het zit niet in de huidige registratie. In een situatie waarin 1 deelobject correspondeert met 1 pand, dan zou je de BAG of BGT kunnen gebruiken. Vergelijk dan de BAG en BGT geometrie met elkaar: als de polygonen hetzelfde of bijna hetzelfde zijn is het betrouwbaar om uit één van beide het oppervlak te berekenen, anders moet je opletten want dan heeft het gebouw een niet rechttoe-rechtaan vorm. 
bouwlaagnummer           | WOZ      | 1 op 1 over te nemen uit WOZ deelobject [bouwlaag](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_bouwlaag). NB In de SOR een verplicht gegeven, maar in de WOZ alleen gevuld als de bouwlaag relevant is voor de waardebepaling. 
bouwjaar                 | WOZ      | Opgenomen bij deelobject als ofwel [bouwjaar](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_BouwjaarOfBouwjaarKlasse_bouwjaar) (type gYear), ofwel [bouwjaarklasse](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_BouwjaarOfBouwjaarKlasse_bouwjaarKlasse) (vrij tekstveld). Toelichting: het WOZ deelobject bouwjaar kan hetzelfde zijn als het oorspronkelijk bouwjaar in de BAG, maar in de WOZ zit het meer verfijnd: als er meerdere deelobjecten zijn, bijvoorbeeld een apart deelobject voor later aanbouwde delen van een pand. Het oudste bouwjaar binnen een set deelobjecten zou overeen moeten komen met BAG oorspronkelijk bouwjaar, zo niet dan duidt dat op incorrecte data.
type                     | WOZ      | Dit is in WOZ de gebruikscode (ook wel 'deelobjectcode') - waarschijnlijk het [typeWOZDeelObject](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_typeWOZDeelobject). Hiervoor is een mapping nodig. Zie transponeringstabel.
aard                     | WOZ      | Kan waarschijnlijk 1 op 1 worden overgenomen, maar dit gegeven zien wij eigenlijk als iets dan vooral belang heeft voor de bronhouder, niet voor de afnemer.
gebruiksoppervlakte      | WOZ      | WOZ deelobject [oppervlakte](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_oppervlakte) in combinatie met [codeBrutoNettoOppervlakte](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_codeBrutoNettoOppervlakte). dit geeft aan dat de oppervlakte op verschillende manieren bepaald kan zijn. Als de oppervlakte de gebruiksoppervlakte is, kan die 1 op 1 worden overgenomen. Anders is wellicht een berekening mogelijk. Verder: bij deelobjecten zijnde een woning werd altijd de inhoud in plaats van het oppervlakte bijgehouden. Bij niet woningen was dit wel het oppervlakte. Momenteel zijn de bronhouders de inhoudsgegevens naar oppervlakte aan het omzetten. Aandachtspunt voor ons: Als we met WOZ data gaan experimenteren, moeten we een gemeente selecteren die de transitie van inhoud naar oppervlakte al hebben gemaakt voor woningen. En deze gemeente moet het oppervlak dan wel per deelobject hebben geregistreerd (er zijn ook gemeenten die het gehele oppervlakte bij het WOZ object opnemen). 
status                   | WOZ      | Mapping: WOZ deelobject [statusWOZDeelObject](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_statusWOZDeelObject). Dit is/was in de WOZ als percentages uitgedrukt; zie [Voortgangspercentages bouw](https://www.waarderingskamer.nl/woz-voor-woningen/woningen-in-aanbouw/#c570). Het IMWOZ specificeert het gegeven [statusWOZDeelObject](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_attribute_WDO_WOZDeelobject_statusWOZDeelObject) met een waardelijst en op niveau WOZ-object de [aanduiding in aanbouw](https://www.waarderingskamer.nl/hulpmiddelen-gemeenten/objectcodering/). Beide zijn te transponeren, zie tabel. 
hoort bij vbo            | WOZ      | Mapping: WOZ deelobject [bestaatUit](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_association_WDO_WOZDeelobject_bestaatUit) of [bestaatUitPand](https://imvertor-tst.armatiek.nl/modellen/IMWOZ/IMWOZ.html#detail_association_WDO_WOZDeelobject_bestaatUitPand). Als het WOZ deelobject correspondeert met BAG objecten (verblijfsobject, standplaats, ligplaats of pand), dan is deze relatie in de brondata opgenomen. Niet alle gebouwzones corresponderen met een BAG object (denk aan tuin, zwembad, ...). Zo niet dan is het een type object dat niet in de BAG zit maar wellicht wel in de BGT. Zie verder de transponering bij het gegeven geometrie.
ligt op bouwlaag         | WOZ      | Dit zit in de WOZ als eigenschap van WOZ deelobject, maar het is een apart object in de SOR met 2.5D geometrie, dus een vlak met z waarden. Je kunt de geometrie bij gebouwen met eenvoudige vormen (als de BAG en BGT geometrie ongeveer hetzelfde zijn) van de BAG overnemen en dan aan de hand van bouwlaagnummer, bouwjaar en woningtype een hoogte erbij genereren. In het oppervlakte verdiepingsdocument voor gemeenten staat een tabel die kan worden toegepast om het volume van woningen, afhankelijk van hun type en bouwjaar, om te rekenen naar oppervlakte, waarbij per bouwjaarklasse een verdiepinghoogte wordt gehanteerd (zie hieronder). Dit zou je kunnen hanteren als z waarde voor bouwlagen van woningen.

<figure>
<img src="media/bouwlaag-verdiepingshoogtetabel.png" alt="bouwlaag verdiepingshoogtetabel"></img>
<figcaption>Tabel met omrekenfactor woningvolume naar oppervlakte (<a href="https://docplayer.nl/23780541-Oppervlakte-verdiepingsdocument-voor-gemeenten.html">bron</a>)</figcaption>
</figure>

#### Transponering van waardelijst `type`
De transponeringstabel voor het gegeven `type` van `Gebouwzone` staat hieronder. Deze tabel is nog niet ingevuld, omdat we eerst navraag doen of deze mapping al eens is gedaan. 

SOR Gebouwzone type | transponering
--------------------| -------------
...                 | ...

#### Transponering van waardelijst `status`

De status (levenscyclus fase) van WOZ deelobjecten wordt bijgehouden als percentage, waarbij 0% betekent dat de bouw van een object in voorbereiding is, en 100% dat het een bestaand object is waarvan de bouw gereed is. De WOZ is niet geinteresseerd in de voorfase (ontwerp, planning), alleen in gerealiseerde objecten; maar wel vanaf start bouw. Als de fundering ligt mogen ze al 20% van de uiteindelijke waarde aanslaan. 

In het IMWOZ wordt echter ook een gegeven `aanduiding in aanbouw` gespecificeerd. Hoe het precies zit in de WOZ zoeken we nog uit. 

In de SOR heeft de `Gebouwzone` de levenscyclus met statussen zoals gedefinieerd voor alle functionele ruimten. 

De globale transponeringstabel: 

SOR status functionele ruimte | transponering percentage | transponering waardelijst
------------------------------| -------------------------| -------------------------
Ontwerp                       | niet in WOZ | niet in WOZ?
In voorbereiding              | WOZ deelobject met statuspercentage kleiner dan 100%, ev.t in combinatie `met aanduiding in aanbouw` | 1 (gevormd, niet actief)
Bestaand                      | WOZ deelobject met statuspercentage = 100% | 0 (actief)
Onbruikbaar                   | WOZ deelobject met staat van onderhoud = `vervallen` (dit zou erin moeten zitten, maar is mogelijk wel lastig af te leiden) | 8 (beëindigd)
Opgeheven                     | ? | 8 (beëindigd)
Afgevoerd                     | niet in WOZ (deze objecten komen naar verwachting nooit vanuit de BAG in de WOZ) | 9 (ten onrechte opgevoerd)
### Specificatie van de vertaling van historie

BAG, BGT en IM Gebouw volgen alle NEN3610:2011 of 2021 en NEN3610 komt overeen met de SOR. 

We onderscheiden de tijdslijn Geldigheid, de tijdslijn Registratie bij de bronhouder en de tijdslijn Registratie bij de LV. 
Dit houden we bij per versie van een object. 

Deze gegevens willen we voor BGT gegevens afleiden uit de BGT en voor de BAG uit de BAG. Onderstaand is de mapping beschreven. 

- Tijdreizen met de geldigOp parameter werkt altijd op de tijdslijn Geldigheid 
- Tijdreizen met de beschikbaarOp parameter werkt altijd op de tijdslijn Registratie van de desbetreffende voorziening van waaruit geleverd wordt (tijdstip van commit in die database). 

In deze high-5 de LVBGT en de LVBAG. Dus beschikbaarOp mapped op de registratie tijd _in de LV_. Eigenlijk het tijdstip van beschikbaarstellen maar dat is in dit geval hetzelfde. De gebruiker stelt een vraag: geldigOp Tg en beschikbaarOp Tb en de API vertaalt dit request onder water naar het tijdstip registratie in de LV. Bij het opleveren van de data in de response worden de velden van de LV-en gemapped naar de velden van IM Gebouw. 

#### Historie in IM Gebouw 

IM Gebouw - registratie gegevens: in de definitie van tijdstipRegistratie en eindRegistratie van de versie van een object staat: “Tijdstip waarop deze versie van het informatieobject beschikbaar was via deze dienst.” - dit komt in dit geval overeen met tijdstip registratie in de LV. 

Vanwege de vertaal specificatie van de BAG en BGT samen moet in IM Gebouw de beginGeldigheid en eindGeldigheid een date time zijn of een datatype keuze. 
Leerpunt nog te bepalen. BAG: date, BGT date time. 

Vanwege de vertaal specificatie van de BAG en BGT samen moet in IM Gebouw de tijdstipRegistratie en eindRegistratie een date time zijn. 
Leerpunt nog te bepalen. BAG: date time, BGT date. 


#### Historie in BAG 

| IMBAG LV                    | Toelichting                                    | IM Gebouw                   |  
|-----------------------------|------------------------------------------------|-----------------------------|
| begin geldigheid            | begin geldigheid in de BAG (datum)             | begin geldigheid            |   
| eind geldigheid             | eind geldigheid in de BAG (datum)              | begin geldigheid            |   
| tijdstip registratie        | tijdstip registratie in de BAG (datum tijd)    | Niet                        |   
| eind registratie            | eind registratie in de BAG (datum tijd)        | Niet                        | 
| tijdstip registratie LV     | tijdstip registratie in de LVBAG (datum tijd)  | tijdstip registratie        | 
| eind registratie LV         | eind registratie in de LVBAG (datum tijd)      | eind registratie            | 

Beeindigde objecten: BAG heeft altijd een versie/voorkomen, ook als een object beeindigt is. Een voorkomen heeft dan een eindstatus.
https://imbag.github.io/praktijkhandleiding/artikelen/wat-is-het-verschil-tussen-actieve-voorkomens-actuele-voorkomens-en-huidige-voorkomens

Versies van objecten met bijzondere tijdstippen erin:

_indicatieNietBAG_
Dit is een LV veld om versies niet niet in de BAG voorkomen te verwijderen uit de LVBAG (logisch niet technisch). Dit veld zit (nog) niet in IM Gebouw. 

Negeer deze versie als indicatieNietBAG gevuld is en beschikbaarOp >= indicatieNietBAG. 
Map deze versie wel naar IM Gebouw als indicatieNietBAG leeg is, of als beschikbaarOp < indicatieNietBAG. 

OF neem dit veld toch gewoon over naar IM Gebouw, door IM Gebouw uit te breiden in de API met dit veld. Dit lijkt eenvoudiger voor de high-5. 

_tijdstipInactief_  
Dit is een BAG veld. Dit veld zit (nog) niet in IM Gebouw. 

Negeer deze versie als inactief gevuld is en beschikbaarOp >= inactief. 
Map deze versie wel naar IM Gebouw als inactief leeg is, of als beschikbaarOp < inactief. 

OF neem dit veld toch gewoon over naar IM Gebouw, door IM Gebouw uit te breiden in de API met dit veld. Dit lijkt eenvoudiger voor de high-5. 

_tijdstipInactiefLV_  
Dit is een LVBAG veld. Dit veld zit (nog) niet in IM Gebouw. 

Negeer deze versie als inactiefLV gevuld is en beschikbaarOp >= inactiefLV. 
Map deze versie wel naar IM Gebouw als inactiefLV leeg is, of als beschikbaarOp < inactiefLV. 

OF neem dit veld toch gewoon over naar IM Gebouw, door IM Gebouw uit te breiden in de API met dit veld. Dit lijkt eenvoudiger voor de high-5. 


#### Historie in BGT 

BGT wint gegevens in op een bepaalde datum en op dat moment worden het object, in een verschijningsvorm, geconstateerd. De BGT registreert deze gegevens vervolgens. 

De BGT kent de volgende gegevens: 


| IMBGT LV                    | Toelichting                                    | IM Gebouw                   |  
|-----------------------------|------------------------------------------------|-----------------------------|
| tijdstip registratie        | tijdstip registratie in de BGT                 | beginGeldigheid             |   
| eind registratie            | eind registratie in de BGT                     | eindGeldigheid              | 
| publicatiedatum LV          | tijdstip registratie in de LVBGT               | tijdstip registratie        | 
| publicatiedatum LV          | vertaal specificatie                           | eind registratie            | 

Beeindigde objecten: vertaal specificatie. 

Versies van objecten met bijzondere tijdstippen erin: niet aanwezig. 

**Tijdslijn geldigheid**

Gewenst gegeven: _beginGeldigheid_ van een voorkomen van object 
Zie: IMGeo-Object tijdstipRegistratie (8.1.4)
Bv. voorkomen 1, IMGeo-Object tijdstipRegistratie bij bronhouder is 2-1-2021 (ingewonnen op 1-1, maar geregistreerd op 2-1)
Dit wordt in IM Gebouw, voorkomen 1, beginGeldigheid is 2-1-2021 

Gewenst gegeven: _eindGeldigheid_ van een voorkomen van object 
Zie: IMGeo-Object eindRegistratie (8.1.5)
Bv. voorkomen 1, IMGeo-Object eindRegistratie (8.1.5) bij bronhouder is 2-3-2021 
Dit wordt in IM Gebouw, voorkomen 1, eindGeldigheid is 2-3-2021 

**Tijdslijn registratie bij LV (t.b.v. tijdreizen)**

Gewenst gegeven: _tijdstipRegistratie_ in LVBGT van een voorkomen van object 
Zie: IMGeo-Object LV-Publicatiedatum (8.1.6)
Bv. voorkomen 1, LVBGT, Publicatiedatum 3-1-2021
Dit wordt in IM Gebouw, voorkomen 1, tijdstipRegistratieLV is 3-1-2021 

Gewenst gegeven: _eindRegistratie_ in LVBGT van een voorkomen van object 
Zie: IMGeo-Object LV-Publicatiedatum (8.1.6) van het opvolgende voorkomen. 
Bv. voorkomen **2**, Publicatiedatum 3-3-2021 
Dit wordt in IM Gebouw, voorkomen **1**, eindRegistratieLV is 3-3-2021 


**Vertaal specificatie eindRegistratie** 

Elke versie van een object heeft in IM Gebouw een eind registratie (eind registratie in de LV). 

Er is echter geen PublicatieDatumEind in de LVBGT, dus deze eindRegistratie kan je niet 1 op 1 mappen, maar moet je afleiden van het _opvolgende_ objectversie en daarvan de LV-Publicatiedatum. 

Als er een opvolgende versie bestaat: neem hiervan publicatiedatum LV en gebruik deze als eindRegistratie. 

Als er geen opvolgende versie bestaat: dan is toch wel een eindRegistratie. Zie vertaal specificatie van beeindigde objecten, die een nieuw opvolgende objectversie creeert (met een eindstatus). Het tijdstipRegistratie van dat _opvolgende_ voorkomen is dat de eindRegistratie van _deze_ versie. 

Je kan kiezen: leidt dit af tijdens bevraging, of registreer dit bij het inladen. We willen leren wat handiger is.  


**Vertaal specificatie beeindigde objecten** 

Als een object beëindigd is in de BGT dan is er na dit moment geen versie van het object meer. De BGT gebruikt hier geen nieuwe versie met een eindstatus, en dit is wel de bedoeling in IM Gebouw. In IM Gebouw is er dus wel een versie van het object, met een eindstatus. Deze extra versie met een eindstatus kan je niet mappen, maar moet je afleiden. 

ALS een versie uit de BGT een gevulde _objectEindtijd_ (8.1.2) heeft dan is deze versie de _laatste versie_ uit de (LV)BGT. 
Maak een nieuwe versie van het object, met:

- Alle gegevens hetzelfde als het laatste versie uit de (LV)BGT, die een gevulde objectEindRegistratie heeft. 
- Geef deze als beginGeldigheid: de eindGeldigheid van het laatste versie uit de (LV)BGT (die een objectEindtijd heeft). 
- Geef deze als eindGeldigheid: leeg
- Geef deze als beginRegistratie (BH): de eindRegistratie van het laatste versie uit de (LV)BGT (die een objectEindtijd heeft) 
- Geef deze als eindRegistratie (BH): leeg 
- Geef deze als beginRegistratie (LV): publicatiedatum van het voorliggende voorkomen. 
- Geef deze als eindRegistratie (LV): leeg 
- Pas de vertaalspecificatie voor IM Gebouw 'status' toe 

Je kan kiezen: leidt dit af tijdens bevraging, of registreer dit bij het inladen. We willen leren wat handiger is.  


**Tijdslijn registratie bij de bronhouder**

Zit niet in de registratie gegevens van IM Gebouw, wanneer we IM Gebouw samenstellen vanuit de LVBGT. 

Mogelijk komen deze gegevens wel in de API response om de controleren of de herleidbaarheid van de gegevens klopt. 

Gewenst gegeven: tijdstipRegistratie Bronhouder van de versie van een object
Zie: IMGeo-Object tijdstipRegistratie (8.1.4)
Bv. voorkomen 1, IMGeo-Object tijdstipRegistratie 2-1-2021 (ingewonnen op 1-1, maar geregistreerd op 2-1).
Dit wordt in IM Gebouw, voorkomen 1: zit nu niet in IM Gebouw. 
Kan eventueel als bonus gegeven worden opgenomen in de API, dan: ‘tijdstip registratie authentieke bron’ is 2-1-2021 

Gewenst gegeven: eindRegistratie Bronhouder van een versie van een object
Zie: IMGeo-Object eindRegistratie (8.1.5)
Bv. voorkomen 1, IMGeo-Object eindRegistratie 2-3-2021 
Dit wordt in IM Gebouw, voorkomen 1: zit nu niet in IM Gebouw. 
Kan eventueel als bonus gegeven worden opgenomen in de API, dan: ‘eind registratie authentieke bron’ is 2-3-2021 

Als we deze gegevens wel opnemen in de API response, zet deze dan niet erbij in IM Gebouw zelf maar plaats deze erbuiten. Noem deze dan a.u.b. zoals de LVBGT ze levert, dit is BGT.tijdstipRegistratie en BGT.eindRegistratie en merk op dat de naam weliswaar overeenkomt met IM Gebouw.tijdstipRegistatie en IM Gebouw.eindRegistatie, maar de definitie en de data niet. IM Gebouw gebruikt immers de registratie tijdstippen in de LVBGT (publicatiedatum) als data voor IM Gebouw.tijdstipRegistratie en IM Gebouw.eindRegistratie. 


## Scope van de high 5

Op welke gebouw-eigenschappen en aan gebouwen gerelateerde objecttypen willen we ons richten tijdens de high 5? 

### Scope-bepalende vragen

Kleinste eenheid van registratie, wat is dat?
- Wat heeft de werkgroep Inhoud - Gebouwen aangeduid als de kleinste eenheid van registratie in het kader van Gebouwen? Damir: deze was lastig te bepalen. BIM gaat tot op het niveau van schroefjes. Er is gedacht aan binnenruimte als kleinste eenheid. Maar WOZ heeft ook ruimten die niet omsloten zijn, dat sloot niet mooi aan bij de BAG. Dan kom je uit bij muren, vloeren etc. Maar dat vond men wel heel gedetailleerd. 
- WOZ deelobject is nu opgenomen als kleinste eenheid. In de SOR heet deze `Gebouwzone`. Daaruit kunnen we verblijfsobjecten opbouwen. 

Wat nemen we als startpunt?
- Het eisen aan SOR document [[EMSO]]. Dat is de laatste stand van zaken. De laatste inzichten van de DisGeo werkgroep Inghoud - Gebouwen is daarin terechtgekomen. 
- Zie in dat document vooral ook het hoofdstuk Transitie / transponering. Daar staat de relatie met de huidige registraties. 
- Dus we nemen niet de informatiemodellen van de huidige BRs als uitgangspunt. Maar we kijken er wel naar, om te zien hoe deze zich verhouden tot het gewenste SOR model en wat er aan eventuele afleidingsregels nodig is.

Hoe zit het met de scheiding tussen fysieke objecten en hun functies? Is dit goed uit elkaar gehaald?
- In het eindrapport van de Gebouwen werkgroep is deze scheiding nog niet heel duidelijk doorgevoerd. Maar het was wel een onderwerp.
- Fysiek is waar je tegenaan loopt; dit is redelijk objectief vast te stellen. De wens was om dit in ieder geval zo goed mogelijk vast te leggen. 
- Functioneel niveau is afhankelijk van context, afspraken, maatschappelijke opgaven. Kan ook veranderen in de loop der tijd.
- Men had te maken met legacy vanuit de WOZ (waar iets minder strak is gemodelleerd). 
- In het EMSO is de scheiding fysiek/functioneel wel voor een deel doorgevoerd.
- De relatie met de huidige basisregistraties is interessant, omdat functie en fysiek in de huidige registraties nog door elkaar kan lopen. 

Hoe zit het met 3D representaties van objecten? 
- Deze zitten nu niet in een basisregistratie. Maar de 3D basisvoorziening bevat al wel 3D representaties van BAG/BGT objecten en ook de relatie met deze objecten is vastgelegd. Je kan dus het 3D model bij een object opvragen. 
- LOD: 1.3, in de toekomst wordt dit 2.1. 
- De 3D modellen zijn met een bepaalde methode afgeleid uit de basisdata.
- We gaan nu uit van wat je uit de basisregistraties kan halen plus kan berekenen. 

Zijn BRT gebouwen altijd bouwblokken? 
- Nee, een gebouw kan in de BRT een solitair gebouw zijn of een hele rij rijtjeshuizen. 
- De geometrie in de BRT is gericht op visualisatie en dus niet altijd waarheidsgetrouw.
- Weet de BRT de relatie tussen hun gebouwen en de BAG? Nee.

BRT in scope? 
- Het is in scope van de SOR dus in eerste instantie ook van deze high 5. 
- Hier zijn wel kanttekeningen bij te plaatsen omdat relatie met BGT/BAG lastig is. 
- Wel een reden om ze in scope te plaatsen, is dat je zou kunnen onderzoeken hoe generalisatie in de semantische laag kan worden gedefinieerd. 
- BRT is ook interessant omdat het rijk is aan functies, ook voor gebouwen. Maar je hebt ook functies in de WOZ. In het EMSO is een combinatie gemaakt van gebouwfuncties en WOZ functies, dit is de type lijst bij SOR Gebouw geworden.
- IGO heeft een analyse gedaan van de verhouding tussen BRT objecten en functies met andere basisregistraties. Zij hebben oa gevonden dat er een n op n relatie is tussen BRT en BAG/BGT. 
- Er staan ook wel wat gebouwen in de BRT die niet in de BAG/BGT staan. 
- BRT transponering staat niet in EMSO beschreven. 
- BRT parkeren voor deze high 5, misschien komt het aan bod maar in eerste instantie nog niet.

Wat is de relatie tussen verblijfsobject en gebouwzone?
- Gebouwzone is de nieuwe naam voor WOZ deelobject. Soms zijn deze fysiek en soms functioneel. 
- Vraag is of je het verblijfsobject uit gebouwzones opbouwt, of dat ze naast elkaar bestaan. Op basis van de huidige WOZ kun je vermoedelijk wel voor een groot deel vbo's afleiden.
- De gebouwzones zijn ontstaan vanuit een specifieke toepassing (belastingheffing).
- In de gemeentelijke WOZ zitten meer attributen dan in de BAG of de (beoogde) SOR.

Wat is de relatie van energielabels met de SOR?
- Energielabels kunnen aan een deel van een gebouw of aan een verblijfsobject hangen. Wat is dit 'deel van gebouw'? Energielabels hangen soms aan een ruimtelijke 'koker' binnen een flatbebouw; daar lijkt een soort gebouwzone handig voor, maar in de huidige definitie past dat niet, want een gebouwzone moet zich binnen een verdieping bevinden. Je zou hiervoor iets als de CityGML `BuildingUnit` moeten hebben.
- Er is geen informatiemodel energielabels, er is alleen een proza beschrijving. 
- Je kan altijd van een verblijfsobject het energielabel vinden, maar een energielabel kan aan verschillende verblijfsobjecten hangen. 
- Is het energielabel een object of is het een eigenschap van een verblijfsobject? 
- Energielabel is typisch een gegeven van buiten de SOR; het moet mogelijk zijn voor een externe partij om dit te koppelen aan een SOR object. Dus wel in scope van deze high 5, mooie case om externe gegevens aan de SOR te koppelen.

### Gebouw in Eisen aan SOR

Het [[EMSO]] document beschrijft de inhoudelijke eisen aan de SOR. Het bevat een hoofdstuk over [Gebouwen](https://docs.geostandaarden.nl/disgeo/emso/#gebouw), dat deze objecttypen definieert: 

- Gebouw, met eigenschappen: 
    - identificatie
    - geometrie
    - type Aansluiten op BRT (eventueel in combinatie met WOZ-object typering) 
    - aard
    - oorspronkelijk bouwjaar
    - naam
    - status

Interessante eigenschappen: 
- `type` is interessant want die heeft een classificerende waardelijst, waarvan de waarden uit de type waardelijst nader worden getypeerd aan de hand van een subtypen waardelijst. Bij vbo heb je ook subtypen. 
- `aard` is ook interessant. Deze geeft aan of een gebouw heterogeen, repeterend, of vrijstaand is. Denk aan relatie met de BRT... 
- `status` is interessant omdat die geuniformeerd moet worden maar nu in verschillende BRs op verschillende manieren is toegepast

Gebouw = BGT Pand plus een aantal BGT overig bouwwerken zoals schuur. Overkapping en open loods vallen niet onder Gebouw. Voedersilo is vervallen. 

- Bouwlaag - nieuw objecttype 
    - identificatie
    - geometrie
    - bouwlaagnummer
    - status
    - ligt in (gebouw)

- Ruimte - nieuw objecttype
    - identificatie
    - geometrie
    - bouwlaagnummer (nr waarop de ruimte zich bevindt)
    - oppervlakte
    - type (functionele aanduiding van ruimte)
    - status
    - ligt op (bouwlaag) - dubbelop

- Gebouwcomponent (BGT gebouwinstallatie)
    - identificatie
    - geometrie
    - aard
    - status
    - **hoort bij** (verblijfsobject, gebouw - dit kunnen er 2 zijn in geval van een loopbrug)

Interessant is de relatie met vbo en gebouw. Is relatie met gebouw uit BGT af te leiden?

- Toegangsdeur - nieuw objecttype
    - identificatie
    - geometrie
    - toegangssoort
    - gebruiksaard
    - status
    - hoort bij (verblijfsobject, gebouw)

- Open bouwwerk (open loods / overkapping)
    - identificatie
    - geometrie
    - type
    - naam
    - status

Interessant is oa dat bij Open bouwwerk het type `Parkeergarage` is toegevoegd. Deze is nieuw t.o.v. BGT. Interessant om dit te verhouden tot de BAG... 

-  Verblijfsobject (functioneel)
    - identificatie
    - geometrie
    - **gebruiksdoel** komt uit de BAG
    - **feitelijk gebruik** komt uit de WOZ
    - gebruiksoppervlakte
    - status
    - hoort bij (gebouw)
    - heeft 1 - * (nummeraanduiding)

Is `feitelijk gebruik` ook uit de huidige BRs af te leiden? 

- Gebouwzone (functioneel)
    - identificatie
    - geometrie
    - geometrie oppervlakte
    - bouwjaar
    - type (kan nog niet afgeleid worden, in de toekomst uit Ruimte)
    - aard
    - gebruiksoppervlakte
    - status
    - hoort bij (verblijfsobject)
    - ligt op (bouwlaag)

Gebouwzone is gebaseerd op WOZ deelobject. In het Transponering hoofdstuk van [[EMSO]] staat hier niets over. 

Er zijn een heleboel oppervlaktegegevens. Bij Ruimte, Verblijfsobject, en Gebouwzone. Maar niet bij Gebouw. 

Gebouwzone heeft `bouwjaar` en Gebouw heeft `oorspronkelijk bouwjaar`. 
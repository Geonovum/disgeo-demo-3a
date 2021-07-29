# High 5 Geonovum - Kadaster
# DisGeo - In samenhang bevragen

**!!**LET OP: Dit is een **CONCEPT** van het initiele plan voor de gezamenlijke High 5 in augustus.**!!**

## Context
Zie Plan van Aanpak Geonovum.

In de 4-sporen aanpak voor de doorontwikkeling van de geo-basisregistraties valt deze high 5 onder Spoor 1, “In samenhang bevragen”. 

## WAT
Beproeven of het mogelijk is de basisregistraties in samenhang te bevragen, waarbij deze samenhang nog niet in de data (in de vorm van relaties tussen instanties) aanwezig is, en zonder de onderliggende registraties of de data die daarin staan aan te passen. De samenhang wordt gerealiseerd door een samenhangende, integrale semantische laag die ervoor zorgt dat vragen over registraties heen kunnen worden gesteld en beantwoord. 

*Een interessante invalshoek is een mogelijke samenhang met het IGO traject van DisGeo. Het IGO-traject kijkt naar integraal gebruik op basis van de beschikbare bronnen. In het kader van de SOR kijken wij primair gebruiksgericht en van daar uit naar de databronnen.*

Dit willen we doen in 2 high 5 sessies: 
-	High 5 deel a waarin we gezamenlijk een semantisch model maken
-	High 5 deel b waarin we dit model implementeren in een proefomgeving

*We willen bekijken in welke mate (60/40 / 70/30 / 80/20) het SOR  resultaat haalbaar is op basis van de huidige situatie van de BR’s – Dit weten we pas goed na de 2e high5. We willen daarbij ontdekken op welke punten data-integratie bij de bronnen wel nodig is.*

## HOE
We maken op basis van de eisen aan de DisGeo inhoud een beknopt informatiemodel, voor een afgebakend onderwerp. We hanteren hierbij de door Geonovum, ism de expertgroep, opgestelde modelleerprincipes (nog in concept) en eerste concept-modelleringen van generieke zaken zoals historie, metadata en levensduur. Het informatiemodel is Inclusief:
1.	Begrippenkader (SKOS)
2.	Informatiemodel conform MIM 1.1 (UML)

Uit 2 leiden we in de 1e high5 ten behoeve van de 2e High5 af:
- een RDF model i.e. een samenhangend semantisch model van het gekozen afgebakende onderwerp. 
- OAS 3 API’s
- Een instantie-niveau (?)

## RESULTAAT
Deze hoofdvragen willen we beantwoord zien: 

**!! ISSUE: De vragen zijn geordend en zullen tijdens de high 5 in volgorde aan de orde komen. Is de onderstaande volgorde de juiste? !!**

1. Object centraal modelleren: Hoe doe je dit waarbij de gegevens van dit object uit verschillende registraties komen met verschillende contexten (definities, historie, …)
2. Moet het informatiemodel uit (2) een conceptueel of logisch model zijn en waarom? Wat is het verschil tussen de twee? 
3. Hoe kunnen we het informatiemodel relateren aan het begrippenkader? Wat is de relatie tussen die twee? En wat wordt de relatie tussen informatiemodel, begrippenkader en de data zelf?
4. Hoe kunnen we de verschillende producten (SKOS begrippenkader, UML informatiemodel, RDF model) publiceren?
5. Lukt het om een RDF model geautomatiseerd af te leiden uit het UML model, conform MIM 1.1? 
6. Zijn er handmatige stappen nodig om het afgeleide RDF model ‘goed’ te maken? (zoals bedoeld in het NEN 3610 Linked Data profiel, zie https://docs.geostandaarden.nl/nen3610/nldp/#basisprincipes-normalisatie). 
7. Op welke wijze zorgen we voor semantiek bij de bron? Hoe borgen we de MDA? M.a.w. hoe richten we de informatie-architectuur in?
8. Op welke manieren drukken we de relaties tussen objecten (en/of informatieobjecten) uit? Drukken we de samenhang uit met URI’s? Waar ontstaan ze en hoe houden we ze bij? 
9. Wat voor afspraken zijn er te maken rondom URI patroon en het gebruik van URIs voor begrippen, ontologie, en data? (hierbij aandacht voor URI’s in NL API strategie) 
10. Zijn er verbeteringen te noemen voor de DisGeo modelleerprincipes (zijn ze houdbaar, zijn ze volledig, etc)?
11. In welke taal druk je de semantische integratielaag uit als context boven de verschillende registraties, waarin de gegevens zijn zoals ze zijn, en waarvan de integratielaag onafhankelijk is? Is de semantische integratielaag (met data centraal over meerdere registraties) de representatie van de samenhang in gegevenscatalogi?

**!! ISSUE: Vraag 7 en vraag 11 nog onduidelijk geformuleerd !!**

Deze overige vragen zien we als mogelijk relevant, maar ze hoeven niet per sé aan de orde te komen: 
-	Wat is het verschil (en is er een verschil) tussen de begrippen- en gegevenscatalogus?
-	Welke rol heeft het UML klassediagram? Is dit de gegevenscatalogus?
-	Welke plek hebben waardelijsten? En hoe maak ik deze kenbaar (nog een catalogus?)? 
-	Wat is het verschil tussen een waarde uit een waardelijst en een begrip? Zijn bij geen verschil begrippen uit waardelijsten daarmee begrippen geworden uit begrippencatalogus? 
-	Is de semantische laag (per registratie) de representatie van de gegevenscatalogus?

Deze vragen zijn voorbeelden van vragen die we in de 2e High 5 zouden kunnen beantwoorden: 
-	Wat levert deze semantische integratielaag op? Waarom hebben we dit nodig? Met andere woorden wat helpt het de developer die een combinatie van de BAG en BGT API wil maken in een nieuwe API of applicatie? Of is het alleen nodig voor analyse?
-	Hebben we een “uber API” nodig die de gehele semantiek van alles ontsluit? Of hoe zien we dat voor ons?
- Wat heeft een developer aan de expliciet uitgedrukte relaties tussen objecten?
-	Aanvullen met vragen en inzichten uit de 1e H5

## USE CASE
Componenten:

I.	gebouwen, omdat dit onderwerp raakt aan meerdere basisregistraties. 

II.	Of : energieafgiftepunten – concrete casus vanuit …. (check Jan van Gelder) – BAG-EAN koppeling

III.	Of: energielabels. Gebouwen met energielabels, eventueel aangevuld met energieafgiftepunten [Dick checkt met Jan]

Keuze > Gebouwen met energielabels, eventueel aangevuld met energieafgiftepunten [Dick checkt met Jan]

Voorbereiden 
- Informatiemodellen van
  - BAG			Linda
  - BGT			Linda
  - BRT			Linda
  - WOZ			Dick 
  - Energielabels		Dick
  - Energieafgiftepunten  	Jan
  - SOR – EMSO		beschikbaar
-	In eerste instantie geen data.

## WANNEER
- 1e high5	23-27 augustus
- 2e high5	18-22 oktober

## WIE
Geonovum:
- Pano
- Linda
- Gabriella
- Jan [vanwege architectuur]
- Dick [coördinatie]

Kadaster
- Lennart
- Marcel
- Iemand uit het data science team met betrokkenheid IGO-traject?

BZK
- Damir
- Bart Jan – in 2e High5 vanwege architectuur

## PRAKTISCH
Samenwerking gedurende de high 5

Dubbelcheck van fysieke locatie bij Judith vanwege aanscherping regels- [Dick]

- Op locatie:	maandag, dinsdag, donderdag
- Op afstand: 	woensdag, vrijdag
- Afronding	vrijdag met webinar
- Werktijden:  	9.00 uur starten met standup
- Lunch: 		broodjes via Geonovum

Samenwerkomgeving – github-omgeving [Linda] 

## Eerste dag - kickoff

- Presentatie met hoofdlijnen aanpak en de vragen.
- Met welke tools werken we samen?

## Vastlegging
- Beantwoording onderzoeksvragen
- Lessons learned
- Begrippenkader + disclaimer
- Informatiemodel + disclaimer
- Webinar-presentatie
- Acties die hier uit volgen benoemen
  - Algemeen
  - Voor de 2e high 5

## Waarmee
- Samenwerkomgeving – github-omgeving [Linda – gedaan ]
- Samenwerkplek – zoals Slack of Gitter?
## Inleiding

In het kader van Doorontwikkeling in Samenhang van de Geo-basisregistraties (DiSGeo) zorgt Geonovum voor een stapsgewijze informatiemodellering van de Samenhangende Objecten Registratie. 
De stapsgewijze ontwikkeling van het informatiemodel wordt zo opgezet dat de gegevensspecificaties uit de betrokken basisregistraties (BAG, BGT, BRT en deels de WOZ) op basis van [de eisen aan het model](https://docs.geostandaarden.nl/disgeo/emso/), behoudens bepaalde daarin geformuleerde wijzigingen, zo optimaal mogelijk een plek kunnen vinden in de nieuwe omgeving waardoor de aanvullende inspanning voor betrokkenen uit het werkveld in de bijhouding zo klein mogelijk wordt gehouden. 

![semantische laag](media/semantische-laag.png)


In dit kader is er ook ruimte om in inspirerende onderzoeksweken (High-5's) specifieke onderwerpen te onderzoeken en daaruit lessen te trekken die in het vervolg van de informatiemodellering kunnen worden toegepast.



### Wat is in deze high-5 onderzocht

Het doel:
te beproeven of het mogelijk is de basisregistraties in samenhang te bevragen, waarbij deze samenhang nog niet in de data (in de vorm van relaties tussen instanties) aanwezig is, en zonder de onderliggende registraties of de data die daarin staan aan te passen. De samenhang wordt gerealiseerd door een samenhangende, integrale semantische laag die ervoor zorgt dat vragen over registraties heen kunnen worden gesteld en beantwoord.

Een interessante invalshoek is een mogelijke samenhang met het [IGO traject van DisGeo](https://labs.kadaster.nl/cases/integralegebruiksoplossing). Het IGO-traject kijkt naar integraal gebruik op basis van de beschikbare bronnen. In het kader van de SOR kijken wij primair gebruiksgericht en van daar uit naar de databronnen.

In deze High-5 hebben we ons puur gericht op het maken van een semantisch model. 
Deze High-5 krijgt in het najaar van 2021 een vervolg waarin we dit model implementeren in een proefomgeving

We willen bekijken in welke mate (60/40 / 70/30 / 80/20) het SOR resultaat haalbaar is op basis van de huidige situatie van de BR’s – Dit weten we pas goed na de 2e high5. We willen daarbij ontdekken op welke punten data-integratie bij de bronnen wel nodig is.

### Hoe doen we dat?

We maken op basis van de eisen aan de DisGeo inhoud een beknopt informatiemodel, voor een afgebakend onderwerp. We hanteren hierbij de door Geonovum, ism de expertgroep, opgestelde modelleerprincipes (nog in concept) en eerste concept-modelleringen van generieke zaken zoals historie, metadata en levensduur. Het informatiemodel is Inclusief:

1. Begrippenkader (SKOS)
2. Informatiemodel conform MIM 1.1 (UML)

Uit 2 leiden we in de 1e high5 ten behoeve van de 2e High5 af:

- een RDF model i.e. een samenhangend semantisch model van het gekozen afgebakende onderwerp.
- OAS 3 API’s
- Een instantie-niveau (?)

![samenhang](media/samenhang.png)

### Hoofdvragen


1. “Object centraal modelleren”: Hoe doe je dit waarbij de gegevens van dit object uit verschillende registraties komen met verschillende contexten (definities, historie, …)
2. In welke taal druk je de semantische integratielaag uit als context boven de verschillende registraties, waarin de gegevens zijn zoals ze zijn, en waarvan de integratielaag onafhankelijk is? Is de semantische integratielaag (met data centraal over meerdere registraties) de representatie van de samenhang in gegevenscatalogi?
3. Wat bedoelen we met een semantische laag?

### Verdiepende vragen

Behandeld:
1. Lukt het om een RDF model geautomatiseerd af te leiden uit het UML model, conform MIM 1.1?
2. Zijn er handmatige stappen nodig om het afgeleide RDF model ‘goed’ te maken? (zoals bedoeld in het [NEN 3610 Linked Data profiel](https://docs.geostandaarden.nl/nen3610/nldp/#basisprincipes-normalisatie). 
3. Moet het informatiemodel een conceptueel of logisch model zijn en waarom? Wat is het verschil tussen de twee?
4. Op welke wijze zorgen we voor semantiek bij de bron? Hoe borgen we de MDA? M.a.w. hoe richten we de informatie-architectuur in?
5. Op welke manieren drukken we de relaties tussen objecten (en/of informatieobjecten) uit? Drukken we de samenhang uit met URI’s? Waar ontstaan ze en hoe houden we ze bij?
6. Zijn er verbeteringen te noemen voor de [DisGeo modelleerprincipes](https://geonovum.github.io/disgeo-imsor/modelleerprincipes/) (zijn ze houdbaar, zijn ze volledig, etc)?

Wel benoemd, maar nog niet aan toegekomen:
7.  Hoe kunnen we het informatiemodel relateren aan het begrippenkader? Wat is de relatie tussen die twee? En wat wordt de relatie tussen informatiemodel, begrippenkader en de data zelf?
8. Hoe kunnen we de verschillende producten (SKOS begrippenkader, UML informatiemodel, RDF model) publiceren?
9.  Wat voor afspraken zijn er te maken rondom URI patroon en het gebruik van URIs voor begrippen, ontologie, en data? (hierbij aandacht voor URI’s in NL API strategie)

### Onderzoeksgebied: Gebouwen

Voor deze High-5 ise gekozen voor een afgebakend onderzoeksgebied. We richten ons op het onderdeel gebouwen van de SOR omdat dit onderwerp raakt aan meerdere basisregistraties.
Daarnaast zijn in het kader van gebruik twee beleidsthema's geselecteerd die in samenhang hiermee bevraagd worden:
- Energielabels
- Energieafgiftepunten 


### Eerdere DiSGeo-high-5's 

In 2019 en 2020 zijn twee high-5's uitgevoerd. 

1. [DiSGeo Demo 1 - Geodata in samenhang mbv huidige techniek bovenop APIs](https://docs.geostandaarden.nl/disgeo/dll/) (eind 2019). Deze is ontwikkeld door Netage en Geonovum in opdracht van BZK. 
    *Uitgangspunt*: Maak een demonstrator over geodata in samenhang mbv huidige techniek bovenop APIs.  
    *Conclusies*: 
    - Diverse haken en ogen. 
    - API maturiteit viel tegen; 
    - APIs zijn de nieuwe silo’s; 
    - Semantische samenhang daarbovenop realiseren vereist een onderhoudsgevoelige semantische laag; 
    - Er is governance op het snijvlak nodig.


2. [DiSGeo Demo 2 - Geodata in samenhang waarbij wordt getoond wat linked data voor DiSGeo kan betekenen](https://docs.geostandaarden.nl/disgeo/dll2/) (zomer 2020). Deze is ontwikkeld door Kadaster, Provincie Noord-Holland, Netage, IHW, en Geonovum in opdracht van BZK.  
    *Uitgangspunt*: Maak een demonstrator geodata in samenhang waarbij wordt getoond wat linked data voor DiSGeo kan betekenen.  
    *Conclusies*: 
    - Linked data is geschikt (onmisbaar) om de DisGeo ambities mbt in samenhang bevragen te realiseren. 
    - Zowel als directe toegangslaag, en als basis voor APIs en viewers. 
    - Er zijn geen grote technische belemmeringen gevonden. 


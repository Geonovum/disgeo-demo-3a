## Historie implementatie aspecten

Er zijn verschillende manieren waarop historie in linked data gerepresenteerd kan worden.  Deze manieren hebben verschillende voor- en nadelen die we hier inzichtelijk maken.  Hiervoor gebruiken we een versimpeld registratie object met twee eigenschappen (bouwjaar en oppervlakte).

### Variant 1: Uitspraak

Deze variant maakt gebruik van:
1. RDF uitspraken (<a href="">standaard</a>)
2. Registratie objecten (SOR-specifieke 'set')

![historie-model-uitspraak](media/historie-model-uitspraak.png)

    Figuur 1 ― Historie opslag op basis van uitspraken.


### Variant 2: Data Cube

Deze variant maakt gebruik van:
1. Data Cube observaties (<a href="">standaard</a>)
2. In Data Cube vastgelegde "dimensions" en "measures"

![historie-model-datacube](media/historie-model-datacube.png)

    Figuur 2 ― Historie opslag op basis van Data Cube.

### Variant 3: Graaf

Deze variant maakt gebruik van:
1. RDF graaf namen (<a href="">standaard</a>)

![historie-model-graaf](media/historie-model-graaf.png)

    Figuur 3 ― Historie opslag op basis van graphs.

### Variant 4: Graaf+Uitspraak

Deze variant maakt gebruik van:
1. RDF graaf namen (<a href="">standaard</a>)
2. RDF uispraken (<a href="">standaard</a>)

![historie-model-graaf-uitspraak](media/historie-model-graaf-uitspraak.png)


    Figuur 4 ― Historie opslag op basis van graphs.


### Implementatie kwadranten

![historie-model-implementatie](media/historie-model-implementatie.png)

    Figuur 5 ― De vier implementatie kwadranten.


## Modelleerpatronen voor metadata

### Modelleerpatroon voor herkomstmetadata

Onder herkomstmetadata verstaan we gegevens die beschrijven hoe een informatieobject tot stand is gekomen. Dit wordt ook wel de audit trail genoemd.
Voor dit modelleerpatroon baseren we ons op de W3C standaardenset PROV, in het bijzonder [[PROV-DM]] en [[PROV-O]].

[[PROV-DM]] beschrijft een standaard informatiemodel om herkomst (provenance) te definieren, en definieert provenance als:

> provenance is defined as a record that describes the people, institutions, entities, and activities involved in producing, influencing, or delivering a piece of data or a thing

In het kader van de SOR willen we het vooral hebben over de herkomst van "a piece of data", ofwel herkomst van informatieobjecten.

Voor het begrip introduceren we een Nederlandse vertaling van een subset van het PROV model.

<figure id="metadata-herkomst">
  <img src="media/metadata-herkomst.drawio.png" alt="metadata-herkomst">
  <figcaption>Nederlandse vertaling van het W3C PROV model</figcaption>
</figure>

Voor de herkomst van een informatieobject in de SOR kunnen we een informatieobject als een instantie van (een subtype van) een `prov:Herkomstentiteit` beschouwen. De herkomst van een `prov:Herkomstentiteit` kan middels het model vrij uitgebreid beschreven worden, waarbij de afleiding of generatie van een entiteit, de activiteiten die daarbij een rol speelden, en de actoren die handelden of verantwoordelijk zijn, in een keten (audit trail) uitgedrukt kunnen worden.

#### Modelleerpatroon voor brongegevens

De [[EMSO]] stelt eisen aan de bronverwijzing als metadata van informatieobjecten. Zie de volgende passage uit [[EMSO]]

> Bronverwijzing betreft aan de ene kant de formele onderbouwing van gegevens, bijvoorbeeld in de vorm van formele brondocumenten, zoals vergunningen en besluiten, maar aan de andere kant ook de meer technische bron van de gegevens, zoals plaatsbepalingspunten en indirect luchtfoto's, metingen en BIM-modellen.

Gezien deze eisen is het van belang om een modelleerpatroon te formuleren voor het vastleggen van metadata voor brongegevens, opdat dit voor alle informatieobjecten in de SOR op een standaardmanier kan worden toegepast.

Naast de eisen in [[EMSO]], zijn er ook modelleerprincieps geformuleerd in [[MPSOR]] die er voor zorgen dat het object centraal wordt gesteld, en daarmee samenhang gerealiseerd kan worden.
Een van de [modelleerrichtlijnen](https://geonovum.github.io/disgeo-imsor/modelleerprincipes/#r1-scheidt-registratie-bron-en-herkomstmetadata-van-directe-eigenschappen) luidt:

> Scheidt registratie-, bron- en herkomstmetadata van directe eigenschappen

Dit houdt in dat we bron- en herkomstmetadata niet op hetzelfde niveau als normale objecteigenschappen zoals `bouwjaar` en `oppervlakte` willen uitdrukken. De reden hiervoor is dat directe eigenschappen over het object gaan, en bron- en herkomstmetadata over **de informatie over** het object.

We hebben dus een aanknopingspunt voor bron- en herkomstmetagegevens nodig wat wel te relateren is aan het beschreven object, maar niet als directe gegevens over het object wordt uitgedrukt. De nieuwe [[NEN3610-2021-ontw]] biedt uitkomst. Daarin is dit aanknopingspunt al geformuleerd.

<figure id="nen3610-registratiegegevens">
  <img src="media/nen3610-registratiegegevens.drawio.png" alt="nen3610-registratiegegevens">
  <figcaption>NEN 3610 (2021 ontwerp) - Registratiegegevens van GeoObject</figcaption>
</figure>

De [[NEN3610-2021-ontw]] schrijft al voor hoe tijdlijnen en versieinformatie van informatieobjecten uitgedrukt kan worden, los van de directe gegevens over het object middels het construct `Registratiegegevens`.

In dit patroon nemen we `Registratiegegevens` als aanknopingspunt voor opname van verdere bron- en herkomstgegevens. Dit doen we door `Registratiegegevens` als (subtype van) `prov:Herkomstentiteit` te beschouwen ([](#metadata-herkomst-bron)). 

<figure id="metadata-herkomst-bron">
  <img src="media/metadata-herkomst-bron.drawio.png" alt="metadata-herkomst-bron">
  <figcaption>Toepassing van W3C PROV en NEN 3610 (2021 ontwerp) voor bron en herkomstgegevens</figcaption>
</figure>

Vervolgens introduceren we de mogelijkheid om verschillende soorten `Bronentiteit` te definieren die als `primaireBron` opgenomen kunnen worden voor een informatieobject. Hierbij maken we gebruik van een standaard [[PROV-DM]] modelleerpatroon ([primary source](https://www.w3.org/TR/prov-dm/#term-primary-source)). Hiermee maken we het bijvoorbeeld mogelijk om een brondocument, of andere bronnen zoals luchtfoto's op een standaard manier op te nemen als bron van een informatieobject. Daarnaast kunnen we zowel deze bronentiteiten, als het informatieobject zelf, toeschrijven aan een verantwoordelijke partij. In het geval van de SOR informatieobject is dat een overheidsorganisatie, maar een bronentiteit zou best van een niet-overheidspartij afkomstig kunnen zijn.

<aside class='example'>
Een voorbeeld hoe een informatieobject er in een concrete serialisatie conform dit modelleerpatroon uit zou kunnen zien is:

```json
{
    "identificatie": "12345",
    "domein": "NL.SOR.Gebouw",
    "oorspronkelijkBouwjaar": "1980",
    "status": "In gebruik",
    "geregistreerdMet": {
        "primaireBron": {
            "documentnummer": "GB1487",
            "documentdatum": "2020-09-28"
        },
        "toegeschrevenAan" : {
            "naam": "Gemeente Kemeltoet",
            "code": "GM1234"
        }
    }
}
```
</aside>

<aside class="note">
  In deze uitwerking is nog vastgehouden aan standaard PROV relaties als `pimaireBron`, `toegeschrevenAan`, maar deze zouden ook gespecialiseerd kunnen worden indien dat voordelen biedt.
</aside>

#### Modelleerpatroon voor de beschrijving van de afleiding van SOR-informatieobjecten

De implementatie van de SOR zal gefaseerd aangepakt gaan worden. Tijdens deze High 5 verkennen we hoe we in de eerste fase de SOR kunnen neerzetten als een ontsluitingslaag over de verschillende registraties heen. Daarbij zal een SOR-informatieobject dus afgeleid worden kunnen worden uit één of meer informatieobjecten uit onderliggende basisregistraties.

Het is dan ook belangrijk om te kunnen duiden uit welke informatieobjecten een SOR informatieobject is samengesteld, ofwel wat de herkomst van een SOR informatieobject is.

Voor dit doeleinde kunnen we wederom gebruikmaken van het PROV raamwerk voor het opstellen van een modelleerpatroon. 


<figure id="metadata-herkomst-afleiding">
  <img src="media/metadata-herkomst-afleiding.drawio.png" alt="metadata-herkomst-afleiding">
  <figcaption>Toepassing van W3C PROV en NEN 3610 (2021 ontwerp) de beschrijving van de afleiding van SOR-informatieobject</figcaption>
</figure>

Hierbij maken we gebruik van een standaard [[PROV-DM]] modelleerpatroon ([derivation](https://www.w3.org/TR/prov-dm/#term-Derivation)), waarbij een entiteit wordt afgeleid uit één of meerdere andere entiteiten. Op deze manier kan een `Registratiegegevens` uit de SOR, gekoppeld worden met een `Registratiegegevens` uit de onderliggende basisregsitraties, waarmee we uitdrukken uit welke informatieobjecten een SOR-informatieobject is samengesteld.

<aside class="note">
  We verkiezen hier om dit heel simpel weer te geven, maar het is ook mogelijk om de precieze activiteit en mogelijk gebruikte algoritmes ook als eigenschappen van de afleiding op te nemen. In dat geval wordt er van de relatie een relatieklasse `Afleiding` gemaakt, waaraan deze informatie gekoppeld kan worden.
</aside>

Een voorbeeld hoe een informatieobject er in een concrete serialisatie conform dit modelleerpatroon uit zou kunnen zien is:

```json
{
    "identificatie": "0200100000085932",
    "domein": "NL.SOR.Gebouw",
    "oorspronkelijkBouwjaar": "1980",
    "status": "Pand in gebruik",
    "nummeraanduidingreeks": [
        {
            "identificatieBAGVBOLaagsteHuisnummer": "0200010000130331" ,
            "identificatieBAGVBOHoogsteHuisnummer": "0200010000130339"
        }
    ],
    "geregistreerdMet": {
        "afgeleidVan" : [
            {
                "versie": "1"
                "beschrijft": {
                    "identificatie": "0200100000085932",
                    "domein": "NL.IMBAG.Pand"
                }
            },
            {
                "versie": "4",
                "beschrijft": {
                    "identificatie": "00016712f55b4b90874036fda00b7ab0",
                    "domein": "NL.BGT.Pand"
                }
            }
        ]
    }
}
```
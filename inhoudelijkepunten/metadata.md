## Modelleerpatronen voor metadata

### Modelleerpatroon voor herkomstmetadata

Onder herkomstmetadata verstaan we gegevens die beschrijven hoe een informatieobject tot stand is gekomen. Dit wordt ook wel de audit trail genoemd.
Voor dit modelleerpatroon baseren we ons op de W3C standaardenset PROV, in het bijzonder PROV-DM en PROV-O.

PROV-DM beschrijft een standaard informatiemodel om herkomst (provenance) te definieren.
PROV-DM definieert provenance als:

> provenance is defined as a record that describes the people, institutions, entities, and activities involved in producing, influencing, or delivering a piece of data or a thing

Het aanknopingspunt voor herkomstinformatie in PROV is de klasse Entity.

Voor het gemak introduceren we een Nederlandse vertaling van een subset van het PROV model

Voor de herkomst van een informatieobject in de SOR kunnen we een informatieobject als een instantie van PROV Entity beschouwen.


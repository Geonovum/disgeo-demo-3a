//-------------------------------------------------------------------------------------
//-- File. . . :  config.js
//-- Bevat . . :  Template voor de  configuratie voor respec  
//--              Gebaseerd op https://github.com/Geonovum/respec/wiki
//--              Deze file moet worden neergezet in de root-directory van de 
//--              betreffende standaard. 
//-- Door. . . :  Jan van Gelder
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-- Log . . . :  20181015 - JvG - Initiele versie 
//-- Log . . . :  20191022 - GRK - Handreiking Archiveren ruimtelijke plannen v2.0      
//-------------------------------------------------------------------------------------

//-- Postprocessors -------------------------------------------------------------------

//-- haalt gh-pages weg aan het eind van een URL
//-- Stopt zodra de eerste is gevonden (want komt maar 1x voor)
//-- JvG 2019-11-12
function custGHPG(respecConfig)  
{
  var tags = document.getElementsByTagName("a");
  var srch = "gh-pages";
  var slen = srch.length;
  var i;

  for (i = 0; i < tags.length; i++) 
  {
    if(tags[i].href.indexOf(srch) > -1)
    {
      console.log(tags[i].href + " is gevonden");
      tags[i].href = tags[i].href.substring(0, tags[i].href.length - slen);
      console.log(tags[i].href + " is aangepast");
      break;
    }
  } 
}

//-------------------------------------------------------------------------------------
var respecConfig = 
{
  //-- specStatus is verplicht! (activeer 1 van de volgende) --------------------------
  //specStatus: "GN-BASIS",             // Basis Document
  //specStatus: "GN-WV",              // Werk Versie
  //specStatus: "GN-CV",              // Consultatie Versie
  //specStatus: "GN-VV",              // Vaststellings Versie
  specStatus: "GN-DEF",             // Definitieve Versie
  //-- specType is verplicht bij alle andere dan BASIS ---------------------------------
  //specType: "NO",                   // Norm
  //specType: "ST",                   // Standaard
  //specType: "IM",                   // Informatie Model
  //specType: "PR",                   // Praktijkrichtlijn
  //specType: "HR",                   // HandReiking
  //specType: "WA",                   // Werkafspraak
  //specType: "BD",                   // Beheer Documentatie
  specType: "AL",                     // Algemeen document
  //-- format is verplicht! -----------------------------------------------------------
  format: "markdown",                 // altijd "markdown" - JvG W3C aangepast, op 1 plek markdown aangeven    
  //-- publishDate is verplicht -------------------------------------------------------
  //-- NB: in de werkversie uitzetten, want dan pakt Respec de pushdate ---------------
  publishDate: "2022-02-11",  	    // Format is "YYYY-MM-DD"
  previousPublishDate: "2021-10-22",
  previousMaturity: "GN-DEF",
  //-- Repositorynaam op GitHub -------------------------------------------------------
  github: "https://github.com/geonovum/disgeo-demo-3a",
  //-- Repositorynaam/issues op GitHub ------------------------------------------------
  issueBase: "https://github.com/geonovum/disgeo-demo-3a/issues",
  //-- edDraftURI: de URI van de werkversie van het document
  edDraftURI: "https://geonovum.github.io/disgeo-demo-3a/",
  //-- de namen van de Editor(s) ------------------------------------------------------
  //-- vul in: per Editor: name:, company:, companyURL: -------------------------------
  editors: 
 [
    {
      name:       "Linda van den Brink",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
    {
      name:       "Gabriella Wiersma",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
  ],
  //-- de namen van de Author(s) ------------------------------------------------------
  //-- vul in: per Author: name:, company:, companyURL: -------------------------------
  authors: 
  [    
    {
      name:       "Marcel Reuvers",
      company:    "Kadaster",
      companyURL: "https://www.kadaster.nl"
    },
    {
      name:       "Lennart van Bergen",
      company:    "Kadaster",
      companyURL: "https://www.kadaster.nl"
    },
    {
      name:       "Rob Wenneker",
      company:    "Kadaster",
      companyURL: "https://www.kadaster.nl"
    },
    {
      name:       "Wouter Beek",
      company:    "Kadaster",
      companyURL: "https://www.kadaster.nl"
    },
    {
      name:       "Damir Brnobic",
      company:    "Ministerie van BZK",
      companyURL: "https://www.rijksoverheid.nl/ministeries/ministerie-van-binnenlandse-zaken-en-koninkrijksrelaties"
    },
    {
      name:       "Pano Maria",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    },
    {
      name:       "Dick Krijtenburg",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    },
    {
      name:       "Linda van den Brink",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
    {
      name:       "Gabriella Wiersma",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
    {
      name:       "Silvy Horbach",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
    {
      name:       "Arnoud de Boer",
      company:    "Geonovum",
      companyURL: "https://www.geonovum.nl"
    }, 
    {
      name:       "Bart-Jan de Leuw",
      company:    "CGI",
      companyURL: "https://www.https://www.rijksoverheid.nl/ministeries/ministerie-van-binnenlandse-zaken-en-koninkrijksrelaties.com"
    }, 
  ],
  //-- shortName is verplicht! (komt in de URL: kies logische naam) --------------------
  shortName: "dll3a",  	              // Wordt gebruikt in de document URL
  //-- pubDomain is verplicht! (komt in de URL: Activeer 1 van de volgende) ------------
  pubDomain: "disgeo", 	              // Doorontwikkeling in Samenhang van de basisregistraties
  //pubDomain: "mim", 	            // Metamodel Informatie Modellering
  //pubDomain: "bor", 	            // Beheer Openbare Ruimte
  //pubDomain: "bro", 	            // Basisregistratie Ondergrond
  //pubDomain: "imgeo", 	          // IMGeo / BGT
  //pubDomain: "kl", 	              // Kabels en Leidingen
  //pubDomain: "liv", 	            // Landelijke Informatievoorziening Vastgoedgebruik
  //pubDomain: "md", 	              // Metadata
  //pubDomain: "nen3610", 	        // Basismodel NEN3610
  //pubDomain: "oov", 	            // Openbare Orde en Veiligheid
  //pubDomain: "ro", 	              // Ruimtelijke Ordening
  //pubDomain: "serv", 	            // Services
  //pubDomain: "visu", 	            // Visualisatie
  //pubDomain: "wp", 	              // White Paper
  //-- license: voor de geldende gebruiksvoorwaarden
  //licence: "cc-by-nd",            // bronvermelding, geen afgeleide werken (default)
  //licence: "cc0",                 // Public Domain Dedication
  licence: "cc-by",                 // Attribution, met bronvermelding
  
  //-- localBiblio: lokale bibliografie, voor verwijzigingen
  //-- NB: kijk eesrt naar de beschikbare www.specref.org voor verwijziging 
  localBiblio: 
  {
    "EMSO":
      {
        title:      "Eisen aan model samenhangende objectregistratie",
        href:       "https://docs.geostandaarden.nl/disgeo/emso/",
        status:     "Definitief",
        publisher:  "Geonovum",
        editor:     "Dick Krijtenburg",
        authors:    ["Sandra Leijten", "Marcel Rietdijk", "Dick Krijtenburg"],
    },
    "MPSOR": 
    {
        title:      "Modelleerprincipes samenhangende objectenregistratie",
        href:       "https://geonovum.github.io/disgeo-imsor/modelleerprincipes/",
        status:     "Werkversie 12 augustus 2021",
        publisher:  "Geonovum"
    },
    "NEN3610-2021-ontw":
    {
      title:      "NEN-3610 Basismodel geo-informatie",
      status:     "Ontwerp",
      date:       "2021",
      publisher:  "NEN",
    },
    "PUB-4":
      {
        title:      "Titel van Publicatie-4",
        href:       "https://www.geonovum.nl",
        status:     "V1.0.1",
        publisher:  "Publisher-4",
        company:    "Companynaam",
    },
    "MIM": {
      title: "MIM - Metamodel Informatie Modellering",
      href: "https://docs.geostandaarden.nl/mim/mim/",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2020-10-23"
    },
    "MODPR":
      {
        title:      "Modelleerprincipes samenhangende objectenregistratie",
        href:       "https://geonovum.github.io/disgeo-imsor/modelleerprincipes/",
        status:     "levend document",
        publisher:  "Geonovum",
    },
    "GENDOC":
    {
      title:      "Overzicht generieke onderwerpen voor DisGeo informatiemodellering",
      href:       "https://geonovum.github.io/disgeo-imsor/documentatie/",
      status:     "levend document",
      publisher:  "Geonovum",

    },
    "ARCH":
    {
      title:      "DiS Geo: Architectuurbeschrijving Voorzieningen Samenhangende Objectenregistratie",
      href:       "https://docs.geostandaarden.nl/disgeo/arch/",
      status:     "Versie ter vaststelling",
      publisher:  "Geonovum",
    },
    "CRS":
    {
      title:      "Handreiking Gebruik coördinaatreferentiesystemen bij uitwisseling en visualisatie van geo-informatie",
      href:       "https://docs.geostandaarden.nl/crs/cv-hr-crs-20211125/#transformatie-tussen-etrs89-en-itrs-wgs-84",
      status:     "Consultatieversie",
      publisher:  "Geonovum",

    }, 
    "ADR": {
      title: "API Design Rules (Nederlandse API Strategie IIa)",
      href: "https://publicatie.centrumvoorstandaarden.nl/api/adr/",
      status:     "Definitief",
      publisher:  "Geonovum",
    }, 
    "ogcapi-features": {
      title: "OGC API - Features - Part 1: Core", 
      href: "http://docs.opengeospatial.org/is/17-069r3/17-069r3.html", 
      status: "Approved", 
      publisher: "Open Geospatial Consortium",
    }
  },

  postProcess:[custGHPG],   //-- Optioneel voor een multi document repository

  //-- Voor dit blok geldt: alleen als er eerdere versies zijn en altijd beiden aan/uit! 
  //previousPublishDate: "2018-09-18",  	    // Format is "YYY-MM-DD"
  //previousMaturity: "CV",                   // kies 1 van deze 2 regels  	  
  //previousMaturity: "VV",  	                // kies 1 van deze 2 regels

  //-- Optionele parameters:
  //emailComments: "mim@geonovum.nl",         // reactie mailadres, alleen bij CV!
  //subtitle: "iets",                         // Subtitel van het document
  //maxTocLevel: 3,                           // Aantal niveau's ToC, default is 0
  //-- LOGO: Hier kan je een ander logo opgeven indien nodig
  //logos: [{
  //  src: "https://tools.geostandaarden.nl/respec/style/logos/OmgevingswetLogo.svg",
  //  alt: "Standaarden Omgevingswet",
  //  id: "TopLogo",
  //  height: 67,
  //  width: 300,
  //  url: "https://www.geonovum.nl/geo-standaarden/omgevingswet/STOPTPOD"
  // }],
};

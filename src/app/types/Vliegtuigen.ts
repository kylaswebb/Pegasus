/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/Vliegtuigen/CreateTable": {
    post: {
      parameters: {
        query: {
          /** Dummy records aanmaken */
          FILLDATA: boolean;
        };
      };
      responses: {
        /** Aangemaakt, Tabel toegevoegd */
        201: unknown;
        /** Data verwerkingsfout, bijv omdat de tabel al bestaat */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/CreateViews": {
    post: {
      responses: {
        /** Aangemaakt, View toegevoegd */
        201: unknown;
        /** Data verwerkingsfout, view niet aangemaak */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/GetObject": {
    get: {
      parameters: {
        query: {
          /** Database ID van het vliegtuig record */
          ID: number;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["ref_vliegtuigen"];
          };
        };
        /** Data niet gevonden */
        404: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/GetObjects": {
    get: {
      parameters: {
        query: {
          /** Database ID van het aanwezig record */
          ID?: number;
          /** Toon welke records verwijderd zijn. Default = false */
          VERWIJDERD?: boolean;
          /** Laatste aanpassing op basis van records in dataset. Bedoeld om data verbruik te verminderen. Dataset is daarom leeg */
          LAATSTE_AANPASSING?: boolean;
          /** HASH van laatste GetObjects aanroep. Indien bij nieuwe aanroep dezelfde data bevat, dan volgt http status code 304. In geval dataset niet hetzelfde is, dan komt de nieuwe dataset terug. Ook bedoeld om dataverbruik te vermindereren. Er wordt alleen data verzonden als het nodig is. */
          HASH?: string;
          /** Sortering van de velden in ORDER BY formaat. Default = CLUBKIST DESC, VOLGORDE, REGISTRATIE */
          SORT?: string;
          /** Maximum aantal records in de dataset. Gebruikt in LIMIT query */
          MAX?: number;
          /** Eerste record in de dataset. Gebruikt in LIMIT query */
          START?: number;
          /** Welke velden moet opgenomen worden in de dataset */
          VELDEN?: string;
          /** Zoek in de REGISTRATIE, CALLSIGN, FLARM_CODE */
          SELECTIE?: string;
          /** Een of meerdere vliegtuig database IDs in CSV formaat. AND conditie als er geen andere parameters zijn, anders OR conditie */
          IN?: string;
          /** Zoek op een of meerder type vliegtuig(en). Types als CSV formaat */
          TYPES?: string;
          /** Zoek op zitplaatsen 1/2 */
          ZITPLAATSEN?: number;
          /** Haal alle clubvliegtuigen op */
          CLUBKIST?: boolean;
          /** Haal alle zelfstarters op. */
          ZELFSTART?: boolean;
          /** Haal alle sleepkisten op. */
          SLEEPKIST?: boolean;
          /** Haal alle TMGs op. */
          TMG?: boolean;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["view_vliegtuigen"];
          };
        };
        /** Data niet gemodificeerd, HASH in aanroep == hash in dataset */
        304: never;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/DeleteObject": {
    delete: {
      parameters: {
        query: {
          /** Database ID van het vliegtuig record. Meerdere ID's in CSV formaat */
          ID: string;
          /** Controleer of record bestaat voordat het verwijderd wordt. Default = true */
          VERIFICATIE?: boolean;
        };
      };
      responses: {
        /** Vliegtuig verwijderd */
        204: never;
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Data niet gevonden */
        404: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/RestoreObject": {
    patch: {
      parameters: {
        query: {
          /** Database ID van het record. Meerdere ID's in CSV formaat */
          ID: string;
        };
      };
      responses: {
        /** Record(s) hersteld */
        202: unknown;
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Data niet gevonden */
        404: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
    };
  };
  "/Vliegtuigen/SaveObject": {
    put: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["ref_vliegtuigen"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Data niet gevonden */
        404: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Conflict, registratie bestaat al */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Vliegtuig data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["ref_vliegtuigen_in"];
        };
      };
    };
    post: {
      responses: {
        /** OK, data succesvol toegevoegd */
        200: {
          content: {
            "application/json": components["schemas"]["ref_vliegtuigen"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Conflict, registratie bestaat al */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Vliegtuig data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["ref_vliegtuigen_in"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    ref_vliegtuigen_in: {
      /** Database ID van het vliegtuig record */
      ID?: number;
      /** Het registratie nummer van het vliegtuig */
      REGISTRATIE?: string;
      /** Optioneel het callsign van het vliegtuig */
      CALLSIGN?: string;
      /** De flarmcode zoals deze wordt uitgezonden. Zo kunnen we ontvangen flarm data herleiden naar een vliegtuig uit de database */
      FLARMCODE?: string;
      /** Het aantal zitplaatsen. Is 1 of 2. */
      ZITPLAATSEN?: number;
      /** Kan het vliegtuig op eigen kracht starten. */
      ZELFSTART?: boolean;
      /** Is het een club vliegtuig? */
      CLUBKIST?: boolean;
      /** Is het een TMG? */
      TMG?: boolean;
      /** Is het een sleepvliegtuig? */
      SLEEPKIST?: boolean;
      /** Link naar vliegtuig type tabel. Alleen nodig voor clubvliegtuigen */
      TYPE_ID?: number;
      /** Volgorde van vliegtuiglijst, bedoeld voor club vliegtuigen */
      VOLGORDE?: number;
    };
    ref_vliegtuigen: components["schemas"]["ref_vliegtuigen_in"] & {
      /** Is dit record gemarkeerd als verwijderd? */
      VERWIJDERD?: boolean;
      /** Tijdstempel van laaste aanpassing in de database */
      LAATSTE_AANPASSING?: string;
    };
    view_vliegtuigen_dataset: components["schemas"]["ref_vliegtuigen"] & {
      /** Beschrijving van het vliegtuig type */
      VLIEGTUIGTYPE?: string;
      /** Vliegtuig registratie en callsign */
      REG_CALL?: string;
    };
    view_vliegtuigen: {
      /** Aantal records dat voldoet aan de criteria in de database */
      totaal?: number;
      /** Tijdstempel van laaste aanpassing in de database van de records dat voldoet aan de criteria */
      laatste_aanpassing?: string;
      /** hash van de dataset */
      hash?: string;
      /** De dataset met records */
      dataset?: components["schemas"]["view_vliegtuigen_dataset"][];
    };
  };
}

export interface operations {}

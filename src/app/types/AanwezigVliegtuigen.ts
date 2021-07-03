/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/AanwezigVliegtuigen/CreateTable": {
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
  "/AanwezigVliegtuigen/CreateViews": {
    post: {
      responses: {
        /** Aangemaakt, View toegevoegd */
        201: unknown;
        /** Data verwerkingsfout, view niet aangemaak */
        500: unknown;
      };
    };
  };
  "/AanwezigVliegtuigen/GetObject": {
    get: {
      parameters: {
        query: {
          /** Database ID van het aanwezig record */
          ID?: number;
          /** Vliegtuig ID (ID uit ref_vliegtuigen). Werkt alleen als ID null is. Bovendien is DATUM vereist */
          VLIEGTUIG_ID?: number;
          /** DATUM van de vliegdag. Werkt alleen als ID null is. Bovendien is LID_ID vereist */
          DATUM?: string;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["oper_aanwezig_vliegtuigen"];
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
  "/AanwezigVliegtuigen/GetObjects": {
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
          /** Sortering van de velden in ORDER BY formaat. Default = NAAM */
          SORT?: string;
          /** Maximum aantal records in de dataset. Gebruikt in LIMIT query */
          MAX?: number;
          /** Eerste record in de dataset. Gebruikt in LIMIT query */
          START?: number;
          /** Welke velden moet opgenomen worden in de dataset */
          VELDEN?: string;
          /** Zoek in de NAAM van de aanwezige */
          SELECTIE?: string;
          /** Een of meerdere vliegtuigen database IDs in CSV formaat. AND conditie als er geen andere parameters zijn, anders OR conditie */
          IN?: string;
          /** Begin datum (inclusief deze dag) */
          BEGIN_DATUM?: string;
          /** Eind datum (inclusief deze dag) */
          EIND_DATUM?: string;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["view_aanwezig_vliegtuigen"];
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
  "/AanwezigVliegtuigen/Aanmelden": {
    post: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["oper_aanwezig_vliegtuigen"];
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
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Lid data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_aanwezig_vliegtuigen_in"] &
            ({
              /** Tijdstip van de aanmelding. Indien afwezig, huidige tijd. ISO8601 */
              TIJDSTIP?: string;
            } & { [key: string]: any }) & { [key: string]: any };
        };
      };
    };
  };
  "/AanwezigVliegtuigen/Afmelden": {
    post: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["oper_aanwezig_vliegtuigen"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Lid is niet aanwezig */
        404: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Lid data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_aanwezig_vliegtuigen_in"] &
            ({
              /** Tijdstip van de afmelding. Indien afwezig, huidige tijd. ISO8601 */
              TIJDSTIP?: string;
            } & { [key: string]: any }) & { [key: string]: any };
        };
      };
    };
  };
  "/AanwezigVliegtuigen/DeleteObject": {
    delete: {
      parameters: {
        query: {
          /** Database ID van het aanwezig record. Meerdere ID's in CSV formaat */
          ID?: string;
          /** Datum van de vliegdag */
          DATUM?: string;
          /** Het vliegtuig ID. Verwijzing naar vliegtuigen tabel */
          VLIEGTUIG_ID?: number;
          /** Controleer of record bestaat voordat het verwijderd wordt. Default = true */
          VERIFICATIE?: boolean;
        };
      };
      responses: {
        /** Aanwezig record verwijderd */
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
  "/AanwezigVliegtuigen/RestoreObject": {
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
  "/AanwezigVliegtuigen/SaveObject": {
    put: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["oper_aanwezig_vliegtuigen"];
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
        /** Conflict, lid is al/niet aanwezig op deze dag */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Aanmelding data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_aanwezig_vliegtuigen_in"];
        };
      };
    };
    post: {
      responses: {
        /** OK, data succesvol toegevoegd */
        200: {
          content: {
            "application/json": components["schemas"]["oper_aanwezig_vliegtuigen"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Conflict, lid is al aanwezig */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Aanmelding data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_aanwezig_vliegtuigen_in"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    oper_aanwezig_vliegtuigen_in: {
      /** Database ID van het aanwezig record */
      ID?: number;
      /** Datum van de vliegdag */
      DATUM?: string;
      /** Het vliegtuig ID. Verwijzing naar vliegtuigen tabel */
      VLIEGTUIG_ID?: number;
      /** Aankomsttijd van het vliegtuig. ISO8601 */
      AANKOMST?: string;
      /** Vertrektijd van het vliegtuig. ISO8601 */
      VERTREK?: string;
      /** Positie van het vliegtuig in latitude */
      LATITUDE?: number;
      /** Positie van het vliegtuig in longitude */
      LONGITUDE?: number;
      /** Hoogte van het vliegtuig in meters */
      HOOGTE?: number;
      /** Snelheid van het vliegtuig in km/h */
      SNELHEID?: number;
    } & { [key: string]: any };
    oper_aanwezig_vliegtuigen: components["schemas"]["oper_aanwezig_vliegtuigen_in"] &
      ({
        /** Is dit record gemarkeerd als verwijderd? */
        VERWIJDERD?: boolean;
        /** Tijdstempel van laaste aanpassing in de database */
        LAATSTE_AANPASSING?: string;
      } & { [key: string]: any }) & { [key: string]: any };
    view_aanwezig_vliegtuigen_dataset: components["schemas"]["oper_aanwezig_vliegtuigen"] &
      ({
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
        /** Vliegtuig registratie en callsign van het vliegtuig */
        REG_CALL?: string;
      } & { [key: string]: any }) & { [key: string]: any };
    view_aanwezig_vliegtuigen: {
      /** Aantal records dat voldoet aan de criteria in de database */
      totaal?: number;
      /** Tijdstempel van laaste aanpassing in de database van de records dat voldoet aan de criteria */
      laatste_aanpassing?: string;
      /** hash van de dataset */
      hash?: string;
      /** De dataset met records */
      dataset?: components["schemas"]["view_aanwezig_vliegtuigen_dataset"][];
    } & { [key: string]: any };
  };
}

export interface operations {}
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/Competenties/CreateTable": {
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
  "/Competenties/CreateViews": {
    post: {
      responses: {
        /** Aangemaakt, View toegevoegd */
        201: unknown;
        /** Data verwerkingsfout, view niet aangemaak */
        500: unknown;
      };
    };
  };
  "/Competenties/GetObject": {
    get: {
      parameters: {
        query: {
          /** Database ID van het type record */
          ID: number;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["ref_competenties"];
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
  "/Competenties/GetObjects": {
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
          /** Haal alle types op van een specieke leerfase */
          LEERFASE_ID?: string;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["view_competenties"];
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
  "/Competenties/DeleteObject": {
    delete: {
      parameters: {
        query: {
          /** Database ID van het record. Meerdere ID's in CSV formaat */
          ID: string;
          /** Controleer of record bestaat voordat het verwijderd wordt. Default = true */
          VERIFICATIE?: boolean;
        };
      };
      responses: {
        /** Type verwijderd */
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
  "/Competenties/RestoreObject": {
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
  "/Competenties/SaveObject": {
    put: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["ref_competenties"];
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
      /** type data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["ref_competenties_in"];
        };
      };
    };
    post: {
      responses: {
        /** OK, data succesvol toegevoegd */
        200: {
          content: {
            "application/json": components["schemas"]["ref_competenties"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Conflict, record bestaat al */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** type data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["ref_competenties_in"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    ref_competenties_in: {
      /** Database ID van het record */
      ID?: number;
      /** Volgorde van weergave */
      VOLGORDE?: number;
      /** In welke leerfase zit deze competentie. Verwijzing naar ref_types */
      LEERFASE_ID?: number;
      /** Volgnummer */
      BLOK?: string;
      /** Verwijzing naar bovenliggend record van boom structuur */
      BLOK_ID?: number;
      /** Volledige omschrijving van de compententie */
      ONDERWERP?: string;
      /** Verwijzing naar de volledige documentie */
      DOCUMENTATIE?: string;
    };
    ref_competenties: components["schemas"]["ref_competenties_in"] & {
      /** Is dit record gemarkeerd als verwijderd? */
      VERWIJDERD?: boolean;
      /** Tijdstempel van laaste aanpassing in de database */
      LAATSTE_AANPASSING?: string;
    };
    view_competenties_dataset: components["schemas"]["ref_competenties"] & {
      /** Fase van de vliegopleiding */
      LEERFASE?: string;
    };
    view_competenties: {
      /** Aantal records dat voldoet aan de criteria in de database */
      totaal?: number;
      /** Tijdstempel van laaste aanpassing in de database van de records dat voldoet aan de criteria */
      laatste_aanpassing?: string;
      /** hash van de dataset */
      hash?: string;
      /** De dataset met records */
      dataset?: components["schemas"]["view_competenties_dataset"][];
    };
  };
}

export interface operations {}

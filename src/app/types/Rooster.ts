/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/Rooster/CreateTable": {
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
  "/Rooster/CreateViews": {
    post: {
      responses: {
        /** Aangemaakt, View toegevoegd */
        201: unknown;
        /** Data verwerkingsfout, view niet aangemaak */
        500: unknown;
      };
    };
  };
  "/Rooster/GetObject": {
    get: {
      parameters: {
        query: {
          /** Database ID van het rooster record */
          ID?: number;
          /** Datum van het rooster */
          DATUM?: string;
        };
      };
      responses: {
        /** OK, data succesvol opgehaald */
        200: {
          content: {
            "application/json": components["schemas"]["oper_rooster"];
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
  "/Rooster/GetObjects": {
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
          /** Sortering van de velden in ORDER BY formaat. Default = DATUM DESC */
          SORT?: string;
          /** Maximum aantal records in de dataset. Gebruikt in LIMIT query */
          MAX?: number;
          /** Eerste record in de dataset. Gebruikt in LIMIT query */
          START?: number;
          /** Welke velden moet opgenomen worden in de dataset */
          VELDEN?: string;
          /** Zoek op datum */
          DATUM?: string;
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
            "application/json": components["schemas"]["view_rooster"];
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
  "/Rooster/DeleteObject": {
    delete: {
      parameters: {
        query: {
          /** Database ID van het rooster record. Meerdere ID's in CSV formaat */
          ID?: string;
          /** Datum van het rooster */
          DATUM?: string;
          /** Controleer of record bestaat voordat het verwijderd wordt. Default = true */
          VERIFICATIE?: boolean;
        };
      };
      responses: {
        /** Rooster verwijderd */
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
  "/Rooster/RestoreObject": {
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
  "/Rooster/SaveObject": {
    put: {
      responses: {
        /** OK, data succesvol aangepast */
        200: {
          content: {
            "application/json": components["schemas"]["oper_rooster"];
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
        /** Conflict, datum bestaat al */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Rooster data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_rooster_in"];
        };
      };
    };
    post: {
      responses: {
        /** OK, data succesvol toegevoegd */
        200: {
          content: {
            "application/json": components["schemas"]["oper_rooster"];
          };
        };
        /** Niet geautoriseerd, geen schrijfrechten */
        401: unknown;
        /** Methode niet toegestaan, input validatie error */
        405: unknown;
        /** Niet aanvaardbaar, input ontbreekt */
        406: unknown;
        /** Conflict, datum bestaat al */
        409: unknown;
        /** Data verwerkingsfout, bijv onjuiste veldwaarde (string ipv integer) */
        500: unknown;
      };
      /** Rooster data */
      requestBody: {
        content: {
          "application/json": components["schemas"]["oper_rooster_in"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    oper_rooster_in: {
      /** Database ID van het rooster record */
      ID?: number;
      /** Datum van de vliegdag */
      DATUM?: string;
      /** De DDI voor het ochtend bedrijf. Link naar leden tabel */
      OCHTEND_DDI_ID?: number;
      /** De instructeur voor het ochtend bedrijf. Link naar leden tabel */
      OCHTEND_INSTRUCTEUR_ID?: number;
      /** De startleider voor het ochtend bedrijf. Link naar leden tabel */
      OCHTEND_STARTLEIDER_ID?: number;
      /** De lierist voor het ochtend bedrijf. Link naar leden tabel */
      OCHTEND_LIERIST_ID?: number;
      /** De hulplierist voor het ochtend bedrijf. Link naar leden tabel */
      OCHTEND_HULPLIERIST_ID?: number;
      /** De DDI voor het middag bedrijf. Link naar leden tabel */
      MIDDAG_DDI_ID?: number;
      /** De instructeur voor het middag bedrijf. Link naar leden tabel */
      MIDDAG_INSTRUCTEUR_ID?: number;
      /** De startleider voor het middag bedrijf. Link naar leden tabel */
      MIDDAG_STARTLEIDER_ID?: number;
      /** De lierist voor het middag bedrijf. Link naar leden tabel */
      MIDDAG_LIERIST_ID?: number;
      /** De hulplierist voor het middag bedrijf. Link naar leden tabel */
      MIDDAG_HULPLIERIST_ID?: number;
      /** Is het een DDWV dag? */
      DDWV?: boolean;
      /** Is er een clubbedrijf */
      CLUB_BEDRIJF?: boolean;
    };
    oper_rooster: components["schemas"]["oper_rooster_in"] & {
      /** Is dit record gemarkeerd als verwijderd? */
      VERWIJDERD?: boolean;
      /** Tijdstempel van laaste aanpassing in de database */
      LAATSTE_AANPASSING?: string;
    };
    view_rooster_dataset: components["schemas"]["oper_rooster"] & {
      /** De naam van de DDI voor het ochtend bedrijf */
      OCHTEND_DDI?: string;
      /** De naam van de instructeur voor het ochtend bedrijf */
      OCHTEND_INSTRUCTEUR?: string;
      /** De naam van de startleider voor het ochtend bedrijf */
      OCHTEND_STARTLEIDER?: string;
      /** De naam van de lierist voor het ochtend bedrijf */
      OCHTEND_LIERIST?: string;
      /** De naam van de hulplierist voor het ochtend bedrijf */
      OCHTEND_HULPLIERIST?: string;
      /** De naam van de DDI voor het middag bedrijf */
      MIDDAG_DDI?: string;
      /** De naam van de instructeur voor het middag bedrijf */
      MIDDAG_INSTRUCTEUR?: string;
      /** De naam van de startleider voor het middag bedrijf */
      MIDDAG_STARTLEIDER?: string;
      /** De naam van de lierist voor het middag bedrijf */
      MIDDAG_LIERIST?: string;
      /** De naam van de hulplierist voor het middag bedrijf */
      MIDDAG_HULPLIERIST?: string;
    };
    view_rooster: {
      /** Aantal records dat voldoet aan de criteria in de database */
      totaal?: number;
      /** Tijdstempel van laaste aanpassing in de database van de records dat voldoet aan de criteria */
      laatste_aanpassing?: string;
      /** hash van de dataset */
      hash?: string;
      /** De dataset met records */
      dataset?: components["schemas"]["view_rooster_dataset"][];
    };
  };
}

export interface operations {}

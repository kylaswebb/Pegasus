import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HeliosAanwezigLedenDataset, HeliosVliegtuigenDataset} from '../../../../../types/Helios';

@Component({
    selector: 'app-lid-invoer',
    templateUrl: './lid-invoer.component.html',
    styleUrls: ['./lid-invoer.component.scss']
})
export class LidInvoerComponent implements OnInit, OnChanges {
    @Input() leden: HeliosAanwezigLedenDataset[] = [];
    @Input() aanwezig: HeliosAanwezigLedenDataset[] = [];
    @Input() placeholder: string = "";
    @Input() label: string = "";
    @Input() disabled: boolean = false;
    @Input() excludeLidTypes: string = ""
    @Input() LID_ID: number | undefined;
    @Input() vliegtuig: HeliosVliegtuigenDataset | undefined = undefined

    @Output() LidChanged: EventEmitter<number> = new EventEmitter<number>();
    EventEmitterDelay: number;

    lidInput$ = new Subject<string | null>();
    ledenFiltered: HeliosAanwezigLedenDataset[] = [];
    aanwezigFiltered: HeliosAanwezigLedenDataset[] = [];
    ledenSelectie$: Observable<HeliosAanwezigLedenDataset[]>;

    constructor() {}

    ngOnInit(): void {
        this.lidInput$.subscribe((newTerm) => {
            const nweLijst = this.zoekLid(newTerm);

            this.ledenSelectie$ = of(nweLijst);

            if (newTerm && nweLijst.length > 0) {
                this.LID_ID = nweLijst[0].LID_ID;
                this.inputChange(this.LID_ID);
            }
        });
    }

    // zoek naar records die overeenkomen met input
    // als geen leden aanwezig zijn, dan gebruiken we de volledige ledenlijst
    private zoekLid(term: string | null): HeliosAanwezigLedenDataset[] {
        const searchTerm = term ? term : '';

        // bekijk of aanwezige leden voldoen
        const nweLijst = this.aanwezigFiltered.filter((lid: HeliosAanwezigLedenDataset) => {
            return lid.NAAM!.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if ((nweLijst.length > 0) && ((nweLijst.length >= 5) || (searchTerm.length <= 2))) {
            return nweLijst
        }

        // nee, geen aanwezige leden, dan alle leden
        return this.ledenFiltered.filter((lid: HeliosAanwezigLedenDataset) => {
            return lid.NAAM!.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    // De Input datasets zijn gewijzigd, zorg dat combobox goede data krijgt via ledenSelectie$
    ngOnChanges(changes: SimpleChanges) {
        if (!this.excludeLidTypes) {
            this.aanwezigFiltered = this.aanwezig;
            this.ledenFiltered = this.leden;
        }
        else {
            this.aanwezigFiltered = this.aanwezig.filter((lid: HeliosAanwezigLedenDataset) => {
                if (lid.LID_ID == this.LID_ID) return true;  // reeds invoerde lid moet ook in de lijst
                return (!this.excludeLidTypes.includes(lid.LIDTYPE_ID!.toString()))
            });

            this.ledenFiltered = this.leden.filter((lid: HeliosAanwezigLedenDataset) => {
                return (!this.excludeLidTypes.includes(lid.LIDTYPE_ID!.toString()))
            });
        }

        const defaultLijst = this.aanwezigFiltered.filter((lid: HeliosAanwezigLedenDataset) => {
            if (lid.LID_ID == this.LID_ID) return true;     // reeds invoerde lid moet ook in de lijst
            if ((this.vliegtuig?.TYPE_ID) && (lid.VOORKEUR_VLIEGTUIG_TYPE) &&
                (lid.VOORKEUR_VLIEGTUIG_TYPE.includes(this.vliegtuig.TYPE_ID.toString())))
                return true;
            return (lid.OVERLAND_VLIEGTUIG_ID == this.vliegtuig?.ID)
        });

        const inDefault = defaultLijst.findIndex(lid => lid.LID_ID == this.LID_ID) >= 0;
        const inAanwezig = this.aanwezigFiltered.findIndex(lid => lid.LID_ID == this.LID_ID) >= 0;
        const inLeden = this.ledenFiltered.findIndex(lid => lid.LID_ID == this.LID_ID) >= 0;

        // niet alle leden staan in aanwezig (denk aan zusterclubs), voor edit moeten we goede lijst kiezen
        if (inDefault) {
            this.ledenSelectie$ = of(defaultLijst);           // leden die graag op dit vliegtuig vliegen
        } else if (inAanwezig) {
            this.ledenSelectie$ = of(this.aanwezigFiltered);  // alle aanwezig leden
        } else if (inLeden) {
            this.ledenSelectie$ = of(this.ledenFiltered);     // complete ledenlijst
        } else if (defaultLijst.length > 0) {
            this.ledenSelectie$ = of(defaultLijst);           // leden die graag op dit vliegtuig vliegen
        } else if (this.aanwezig.length > 0) {
            this.ledenSelectie$ = of(this.aanwezigFiltered);  // alle aanwezig leden
        } else {
            this.ledenSelectie$ = of(this.ledenFiltered);     // complete ledenlijst
        }
    }

    inputChange (id: number | undefined) {
        clearTimeout(this.EventEmitterDelay);
        this.EventEmitterDelay = window.setTimeout(() => this.LidChanged.emit(id), 1000);
    }
}

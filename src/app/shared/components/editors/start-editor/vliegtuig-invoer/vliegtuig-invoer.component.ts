import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HeliosVliegtuigenDataset} from '../../../../../types/Helios';

@Component({
    selector: 'app-vliegtuig-invoer',
    templateUrl: './vliegtuig-invoer.component.html',
    styleUrls: ['./vliegtuig-invoer.component.scss']
})
export class VliegtuigInvoerComponent implements OnInit, OnChanges {
    @Input() vliegtuigen: HeliosVliegtuigenDataset[] = [];
    @Input() aanwezig: HeliosVliegtuigenDataset[] = [];
    @Input() label: string = "";
    @Input() disabled: boolean = false;
    @Input() Sleep: boolean = false
    @Input() VLIEGTUIG_ID: number | undefined;

    @Output() VliegtuigChanged: EventEmitter<number> = new EventEmitter<number>();
    EventEmitterDelay: number;

    vliegtuigInput$ = new Subject<string | null>();
    vliegtuigenSelectie$: Observable<HeliosVliegtuigenDataset[]>;

    constructor() {
    }

    ngOnInit(): void {
        this.vliegtuigInput$.subscribe((newTerm) => {
            const nweLijst = this.zoekVliegtuig(newTerm);
            this.vliegtuigenSelectie$ = of(nweLijst);

            if (newTerm && nweLijst.length > 0) {
                this.VLIEGTUIG_ID = nweLijst[0].ID;
                this.inputChange(this.VLIEGTUIG_ID);
            }
        });
    }

    // zoek naar records die overeenkomen met input
    // als geen vliegtuigen aanwezig zijn, dan gebruiken we de volledige lijst met vliegtuigen
    private zoekVliegtuig(term: string | null): HeliosVliegtuigenDataset[] {
        const searchTerm = term ? term : '';

        // bekijk of aanwezig vliegtuigen voldoen
        const nweLijst = this.aanwezig.filter((vliegtuig: HeliosVliegtuigenDataset) => {
            return vliegtuig.REG_CALL!.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Indien de lijst 5 items, of meer heeft, toon dan deze lijst
        if ((nweLijst.length > 0) && ((nweLijst.length >= 5) || (searchTerm.length < 2))) {
            return nweLijst
        }

        // nee, aantal aanwezige vliegtuigen <= 4, dan alle vliegtuigen
        // dit is bedacht omdat
        // stel dat E12 is aanwezig, maar de E1 nog niet. Dan wordt bij intypen E1 alleen de E12 getoond
        // maar nu niet meer, nu wordt ook de E1 getoond
        const nweLijst2 = this.vliegtuigen.filter((vliegtuig: HeliosVliegtuigenDataset) => {
            return vliegtuig.REG_CALL!.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return nweLijst2;
    }

    // De Input datasets zijn gewijzigd, zorg dat combobox goede data krijgt via vliegtuigenSelectie$
    ngOnChanges(changes: SimpleChanges) {
        // bij update van VLIEGTUIG_ID doen we niets
        if (changes.hasOwnProperty("VLIEGTUIG_ID")) {
            return;
        }

        // Indien we sleepkist moeten invoeren, halen we de andere kisten weg uit het array
        if (this.Sleep) {
            this.aanwezig = this.aanwezig.filter((vliegtuig: HeliosVliegtuigenDataset) => {
                return (vliegtuig.SLEEPKIST == true);
            });

            this.vliegtuigen = this.vliegtuigen.filter((vliegtuig: HeliosVliegtuigenDataset) => {
                return (vliegtuig.SLEEPKIST == true);
            });
        }

        if (this.aanwezig.length > 0) {
            this.vliegtuigenSelectie$ = of(this.aanwezig);
        } else {
            this.vliegtuigenSelectie$ = of(this.vliegtuigen);
        }
    }

    inputChange(id: number | undefined) {
        clearTimeout(this.EventEmitterDelay);
        this.EventEmitterDelay = window.setTimeout(() => this.VliegtuigChanged.emit(id), 1000);
    }
}

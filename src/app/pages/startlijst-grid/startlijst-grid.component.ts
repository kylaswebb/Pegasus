import {Component, OnInit, ViewChild} from '@angular/core';
import {StartlijstService} from '../../services/apiservice/startlijst.service';
import {CheckboxRenderComponent} from '../../shared/components/datatable/checkbox-render/checkbox-render.component';
import {faRecycle} from '@fortawesome/free-solid-svg-icons';
import {ColDef, RowDoubleClickedEvent} from 'ag-grid-community';
import {IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {DeleteActionComponent} from '../../shared/components/datatable/delete-action/delete-action.component';
import {RestoreActionComponent} from '../../shared/components/datatable/restore-action/restore-action.component';
import {HeliosStart, HeliosStartDataset} from '../../types/Helios';
import {CustomError, KeyValueArray} from '../../types/Utils';
import * as xlsx from 'xlsx';
import {LoginService} from '../../services/apiservice/login.service';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {DateTime} from 'luxon';
import {VliegerRenderComponent} from './vlieger-render/vlieger-render.component';
import {InzittendeRenderComponent} from './inzittende-render/inzittende-render.component';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';
import {StarttijdRenderComponent} from '../../shared/components/datatable/starttijd-render/starttijd-render.component';
import {LandingstijdRenderComponent} from '../../shared/components/datatable/landingstijd-render/landingstijd-render.component';
import {TijdInvoerComponent} from '../../shared/components/editors/tijd-invoer/tijd-invoer.component';
import {StartEditorComponent} from '../../shared/components/editors/start-editor/start-editor.component';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared/shared.service';
import {nummerSort, tijdSort} from '../../utils/Utils';

@Component({
    selector: 'app-startlijst-grid',
    templateUrl: './startlijst-grid.component.html',
    styleUrls: ['./startlijst-grid.component.scss']
})
export class StartlijstGridComponent implements OnInit {
    @ViewChild(StartEditorComponent) editor: StartEditorComponent;
    @ViewChild(TijdInvoerComponent) tijdInvoerEditor: TijdInvoerComponent;

    data: HeliosStartDataset[] = [];

    dataColumns: ColDef[] = [
        {field: 'ID', headerName: 'ID', sortable: true, hide: true, comparator: nummerSort},
        {field: 'DAGNUMMER', headerName: '#', sortable: true,},
        {field: 'REGISTRATIE', headerName: 'Registratie', sortable: true, hide: true, enableRowGroup: true},
        {field: 'CALLSIGN', headerName: 'Callsign', sortable: true, hide: true, enableRowGroup: true},
        {field: 'REG_CALL', headerName: 'RegCall', sortable: true, enableRowGroup: true},
        {field: 'CLUBKIST', headerName: 'Clubkist', sortable: true, cellRenderer: 'checkboxRender', hide: true},
        {field: 'STARTMETHODE', headerName: 'Start methode', sortable: true, hide: true, enableRowGroup: true},

        {
            field: 'VLIEGERNAAM_LID',
            headerName: 'Vlieger',
            sortable: true,
            enableRowGroup: true,
            cellRenderer: 'vliegerRender'
        },
        {
            field: 'INZITTENDENAAM_LID',
            headerName: 'Inzittende',
            sortable: true,
            enableRowGroup: true,
            cellRenderer: 'inzittendeRender'
        },

        {
            field: 'STARTTIJD',
            headerName: 'Starttijd',
            sortable: true,
            hide: false,
            cellRenderer: 'startTijdRender',
            comparator: tijdSort,
            cellRendererParams: {
                tijdClicked: (record: HeliosStartDataset) => {
                    this.tijdInvoerEditor.openStarttijdPopup(record);
                }
            },
        },
        {
            field: 'LANDINGSTIJD',
            headerName: 'Landingstijd',
            sortable: true,
            cellRenderer: 'landingsTijdRender',
            comparator: tijdSort,
            cellRendererParams: {
                tijdClicked: (record: HeliosStartDataset) => {
                    this.tijdInvoerEditor.openLandingsTijdPopup(record);
                }
            },
        },
        {field: 'DUUR', headerName: 'Duur', sortable: true, comparator: tijdSort},
        {field: 'OPMERKINGEN', headerName: 'Opmerkingen', sortable: true},
        {field: 'VLIEGTUIG_ID', headerName: 'Vliegtuig ID', sortable: true, hide: true},
        {field: 'STARTMETHODE_ID', headerName: 'Startmethode ID', sortable: true, hide: true, comparator: nummerSort},
        {field: 'VLIEGER_ID', headerName: 'Vlieger ID', sortable: true, hide: true, comparator: nummerSort},
        {field: 'INZITTENDE_ID', headerName: 'Inzittende ID', sortable: true, hide: true, comparator: nummerSort},
        {field: 'SLEEPKIST_ID', headerName: 'Sleepkist ID', sortable: true, hide: true, comparator: nummerSort},
        {field: 'SLEEP_HOOGTE', headerName: 'Sleep hoogte', sortable: true, hide: true, comparator: nummerSort},
        {field: 'VELD', headerName: 'Veld', sortable: true, hide: true},
    ];

    columns: ColDef[] = this.dataColumns;

    // kolom om record te verwijderen
    deleteColumn: ColDef[] = [{
        pinned: 'left',
        maxWidth: 100,
        initialWidth: 100,
        resizable: false,
        suppressSizeToFit:true,
        hide: false,
        cellRenderer: 'deleteAction', headerName: '', sortable: false,
        cellRendererParams: {
            onDeleteClicked: (ID: number) => {
                this.editor.openVerwijderPopup(ID);
            }
        },
    }];

    // kolom om terug te kunnen terughalen
    restoreColumn: ColDef[] = [{
        pinned: 'left',
        maxWidth: 100,
        initialWidth: 100,
        resizable: false,
        suppressSizeToFit:true,
        hide: false,
        cellRenderer: 'restoreAction', headerName: '', sortable: false,
        cellRendererParams: {
            onRestoreClicked: (ID: number) => {
                this.editor.openRestorePopup(ID);
            }
        },
    }];

    frameworkComponents = {
        vliegerRender: VliegerRenderComponent,
        inzittendeRender: InzittendeRenderComponent,
        startTijdRender: StarttijdRenderComponent,
        landingsTijdRender: LandingstijdRenderComponent,
        checkboxRender: CheckboxRenderComponent,
        deleteAction: DeleteActionComponent,
        restoreAction: RestoreActionComponent
    };
    iconCardIcon: IconDefinition = faClipboardList;
    filterIcon: IconDefinition = faFilter;
    prullenbakIcon: IconDefinition  = faRecycle;

    zoekString: string;
    zoekTimer: number;                  // kleine vertraging om data ophalen te beperken
    deleteMode: boolean = false;        // zitten we in delete mode om starts te kunnen verwijderen
    trashMode: boolean = false;         // zitten in restore mode om starts te kunnen terughalen

    filterOn: boolean = false;

    error: CustomError | undefined;

    datumAbonnement: Subscription;         // volg de keuze van de kalender
    datum: DateTime;                       // de gekozen dag in de kalender

    magToevoegen: boolean = false;
    magVerwijderen: boolean = false;
    magWijzigen: boolean = false;
    magExporten: boolean = false;

    constructor(private readonly startlijstService: StartlijstService,
                private readonly loginService: LoginService,
                private readonly sharedService: SharedService) {
    }

    ngOnInit(): void {
        // plaats de juiste kolommen in het grid
        this.kolomDefinitie();

        // de datum zoals die in de kalender gekozen is
        this.datumAbonnement = this.sharedService.ingegevenDatum.subscribe(datum => {
            this.datum = DateTime.fromObject({
                year: datum.year,
                month: datum.month,
                day: datum.day
            })
            this.opvragen();
        })

        let ui = this.loginService.userInfo?.Userinfo;
        this.magToevoegen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT || ui?.isInstructeur) ? true : false;
        this.magVerwijderen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT || ui?.isInstructeur) ? true : false;
        this.magWijzigen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT || ui?.isInstructeur) ? true : false;
        this.magExporten = (!ui?.isDDWV) ? true : false;
    }

    // openen van popup om nieuwe start te kunnen invoeren
    addStart(): void {
        this.editor.openPopup(null);
    }

    // openen van popup om bestaande start te kunnen aanpassen
    openEditor(event?: RowDoubleClickedEvent) {
        this.editor.openPopup(event?.data.ID);
    }

    // schakelen tussen deleteMode JA/NEE. In deleteMode kun je starts verwijderen
    deleteModeJaNee() {
        this.deleteMode = !this.deleteMode;
        this.kolomDefinitie();
    }

    // schakelen tussen trashMode JA/NEE. In trashMode worden te verwijderde starts getoond
    trashModeJaNee() {
        this.kolomDefinitie();
        this.opvragen();
    }

    // Welke kolommen moet worden getoond in het grid
    kolomDefinitie() {
        if (!this.deleteMode) {
            this.columns = this.dataColumns;
        } else {
            if (this.trashMode) {
                this.columns = this.restoreColumn.concat(this.dataColumns)
            } else {
                this.columns = this.deleteColumn.concat(this.dataColumns)
            }
        }
    }

    // Opvragen van de data via de api
    opvragen() {
        let queryParams: KeyValueArray = {};

        if (this.filterOn) {
            queryParams["OPEN_STARTS"] = "true"
        }

        this.startlijstService.getStarts(this.trashMode, this.datum, this.datum, this.zoekString, queryParams).then((dataset) => {
            this.data = dataset;
        });
    }

    // nieuwe start is ingevoerd, nu opslaan
    Toevoegen(start: HeliosStart) {
        this.startlijstService.nieuweStart(start).then(() => {
            this.opvragen();
            this.editor.closePopup();
        }).catch(e => {
            this.error = e;
        })
    }

    // bestaande start is aangepast, nu opslaan
    Aanpassen(start: HeliosStart) {
        this.startlijstService.updateStart(start).then(() => {
            this.opvragen();
            this.editor.closePopup();
        }).catch(e => {
            this.error = e;
        })
    }

    // markeer een start als verwijderd
    Verwijderen(id: number) {
        this.startlijstService.deleteStart(id).then(() => {
            this.deleteMode = false;
            this.trashMode = false;
            this.kolomDefinitie();      // verwijderen van de kolom met delete icons

            this.opvragen();
            this.editor.closePopup();
        });
    }

    // de start moet hersteld worden, haal de markering 'verwijderd' weg
    Herstellen(id: number) {
        this.startlijstService.restoreStart(id).then(() => {
            this.deleteMode = false;
            this.trashMode = false;
            this.kolomDefinitie();      // verwijderen van de kolom met herstel icons

            this.opvragen();
            this.editor.closePopup();
        });
    }

    // Export naar excel
    exportDataset() {
        let datum: DateTime = DateTime.fromObject({
            year: this.datum.year,
            month: this.datum.month,
            day: this.datum.day
        })

        const ws = xlsx.utils.json_to_sheet(this.data);
        const wb: xlsx.WorkBook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Blad 1');
        xlsx.writeFile(wb, 'startlijst ' + datum.toISODate() + '.xlsx');
    }

    // Als filter aan staat, dan tonen we alleen de openstaande vluchten
    filter() {
        this.filterOn = !this.filterOn;
        this.opvragen();
    }

    // De starttijd is ingevoerd/aangepast. Opslaan van de starttijd
    opslaanStartTijd(start: HeliosStart) {
        this.startlijstService.startTijd(start.ID as number, start.STARTTIJD as string).then((s) => { this.opvragen(); });
        this.tijdInvoerEditor.closePopup();
    }

    // De landingstijd is ingevoerd/aangepast. Opslaan van de landingstijd
    opslaanLandingsTijd(start: HeliosStart) {
        this.startlijstService.landingsTijd(start.ID as number, start.LANDINGSTIJD as string).then((s) => { this.opvragen(); });
        this.tijdInvoerEditor.closePopup();
    }
}

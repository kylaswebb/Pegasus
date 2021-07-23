import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DateTime} from 'luxon';
import {faEye, faEyeSlash, faInfo, faInfoCircle, faUser} from '@fortawesome/free-solid-svg-icons';
import {TypesService} from '../../../../services/apiservice/types.service';
import {HeliosLid, HeliosType, HeliosUserinfo} from '../../../../types/Helios';
import {LedenService} from '../../../../services/apiservice/leden.service';

@Component({
  selector: 'app-lid-editor',
  templateUrl: './lid-editor.component.html',
  styleUrls: ['./lid-editor.component.scss']
})
export class LidEditorComponent implements OnInit {
  @Input() lidID: number;
  @Output() opslaan: EventEmitter<HeliosUserinfo> = new EventEmitter<HeliosUserinfo>();
  lid: HeliosLid = {};
  informatieIcon = faInfo;

  types: HeliosType[];
  wachtwoordVerborgen: boolean = true;
  oogIcon = faEye;
  controleWachtwoord = '';
  wachtwoord = '';
  infoIcon = faInfoCircle;
  persoonIcon = faUser;
  subtitel = 'Instellen van uw gegevens en voorkeuren';
  titel = 'Aanpassen profiel';


  constructor(
    private readonly typeService: TypesService,
    private readonly ledenService: LedenService
  ) {
    this.haalLidmaatschappenOp();
  }

  ngOnInit(): void {
    if (this.lidID > 0) {
      this.ledenService.getLid(this.lidID).then((lid: HeliosLid) => this.lid = lid);
    } else {
      this.titel = 'Lid aanmaken'
      this.subtitel = 'Toevoegen van een nieuw lid'
      this.lid = {
        GEBOORTE_DATUM: '',
        MEDICAL: ''
      };
    }
  }

  haalLidmaatschappenOp(): void {
    this.typeService.getTypes(6).then(types => this.types = types);
  }

  submit() {
    if (this.wachtwoord === '' || (this.controleWachtwoord !== this.wachtwoord)) {
      this.lid.WACHTWOORD = undefined;
    } else {
      this.lid.WACHTWOORD = this.wachtwoord;
    }
    this.opslaan.emit(this.lid);
  }

  converteerDatumNaarISO($event: NgbDate): string {
    const unformatted = DateTime.fromObject($event);
    return unformatted.isValid ? unformatted.toISODate().toString() : '';
  }

  verbergWachtwoord() {
    this.wachtwoordVerborgen = !this.wachtwoordVerborgen;
    this.oogIcon = this.wachtwoordVerborgen ? faEye : faEyeSlash;
  }
}
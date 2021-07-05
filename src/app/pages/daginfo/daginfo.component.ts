import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbDatepicker, NgbDatepickerI18n, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {VliegtuigenService} from "../../services/apiservice/vliegtuigen.service";
import {LoginService} from "../../services/apiservice/login.service";
import {DaginfoService} from "../../services/apiservice/daginfo.service";
import {SharedService} from "../../services/shared/shared.service";
import {DateTime} from "luxon";
import {Observable, of, Subscription} from "rxjs";
import {CustomError, KeyValueString} from "../../types/Utils";
import {HeliosDagInfo, HeliosType} from "../../types/Helios";
import {TypesService} from "../../services/apiservice/types.service";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faCloudSunRain, faFlagCheckered, faInfo, faPlane, faTruck, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faArtstation} from "@fortawesome/free-brands-svg-icons";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons/faPaperPlane";


@Component({
  selector: 'app-daginfo',
  templateUrl: './daginfo.component.html',
  styleUrls: ['./daginfo.component.scss']
})
export class DaginfoComponent  {
  iconCardIcon: IconDefinition = faInfo;
  iconBedrijf: IconDefinition = faArtstation;
  iconVliegveld: IconDefinition = faPlane;
  iconDiensten: IconDefinition = faUsers;
  iconMeteo: IconDefinition = faCloudSunRain;
  iconVliegend: IconDefinition = faPaperPlane;
  iconRollend: IconDefinition = faTruck;
  iconVerslag: IconDefinition = faFlagCheckered;

  datumAbonnement: Subscription;
  datum: DateTime;                       // de gekozen dag

  data: HeliosDagInfo = {};
  clubTypes$: Observable<HeliosType[]>;
  veldTypes$: Observable<HeliosType[]>;
  baanTypes$: Observable<HeliosType[]>;
  startMethodeTypes$: Observable<HeliosType[]>;
  windSterkteTypes$: Observable<HeliosType[]>;
  windRichtingTypes$: Observable<HeliosType[]>;

  magToevoegen: boolean = false;
  magVerwijderen: boolean = false;
  magWijzigen: boolean = false;
  magExporten: boolean = false;

  error: CustomError | undefined;

  constructor(private readonly daginfoService: DaginfoService,
              private readonly sharedService: SharedService,
              private readonly typesService: TypesService,
              private readonly loginService: LoginService) {

    this.typesService.getTypes(1).then(types => this.baanTypes$ = of(types));
    this.typesService.getTypes(2).then(types => this.windRichtingTypes$ = of(types));
    this.typesService.getTypes(3).then(types => this.windSterkteTypes$ = of(types));

    this.typesService.getTypes(5).then(types => this.startMethodeTypes$ = of(types));

    this.typesService.getTypes(9).then(types => this.veldTypes$ = of(types));
    this.typesService.getTypes(15).then(types => this.clubTypes$ = of(types));
  }

  ngOnInit(): void {
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
    this.magToevoegen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT) ? true : false;
    this.magVerwijderen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT) ? true : false;
    this.magWijzigen = (ui?.isBeheerder || ui?.isBeheerderDDWV || ui?.isStarttoren || ui?.isCIMT) ? true : false;
  }

  opvragen() {
    let queryParams: KeyValueString = {};

    this.daginfoService.getDagInfo(undefined, this.datum)
        .then((di) => { this.data = di; })
        .catch((e) => {
          this.data = {};

          if (e.responseCode != 404) { // 404 = daginfo nog niet ingevuld
            this.error = e;
          }
        });
  }

  opslaanDagInfo() {
    if (this.data.ID == undefined) {
      this.data.DATUM = this.datum.toISODate();
      this.daginfoService.nieuweDagInfo(this.data).then((di) => this.data = di);
    }
    else {
      this.daginfoService.updateDagInfo(this.data).then((di) => this.data = di);
    }

  }
}


import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {GameService} from "../game.service";

@Component({
    selector: 'app-leader-board-modal',
    templateUrl: './leader-board-modal.component.html',
    styleUrls: ['./leader-board-modal.component.scss']
})
export class LeaderBoardModalComponent {
    constructor(public modalRef: BsModalRef, public gameService: GameService) {
    }
}

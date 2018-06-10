import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { RaiseTicket } from './raise-ticket.model';
import { RaiseTicketService } from './raise-ticket.service';

@Component({
    selector: 'jhi-raise-ticket-detail',
    templateUrl: './raise-ticket-detail.component.html'
})
export class RaiseTicketDetailComponent implements OnInit, OnDestroy {

    raiseTicket: RaiseTicket;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private raiseTicketService: RaiseTicketService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRaiseTickets();
    }

    load(id) {
        this.raiseTicketService.find(id)
            .subscribe((raiseTicketResponse: HttpResponse<RaiseTicket>) => {
                this.raiseTicket = raiseTicketResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRaiseTickets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'raiseTicketListModification',
            (response) => this.load(this.raiseTicket.id)
        );
    }
}

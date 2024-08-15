import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { InspectionCreatedEvent } from 'src/inspection-management/domain/domain-events/inspection-created.event';
import { ScheduleInspectionCommand } from '../inspection/schedule-inspection.command';

@Injectable()
export class InspectionScheduler {
    constructor(private readonly commandBus: CommandBus) { }

    @OnEvent(InspectionCreatedEvent.name, {})
    async handle(event: InspectionCreatedEvent) {
        const command = new ScheduleInspectionCommand(event.getInspectionId());
        const rs = await this.commandBus.execute(command);
        debugger
        console.log('Inspection scheduled', rs);
    }
}

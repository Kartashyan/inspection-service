import { Injectable } from '@nestjs/common';

export type CreateNewInspectionDto = {
    clientId: string;
    siteId: string;
};

@Injectable()
export class InspectionManagementService {
    registerNewInspection(dto: {
        clientId: string;
        siteId: string;
    }) {
        if (!dto.clientId || !dto.siteId) {
            throw new Error('Client ID and Site ID are required');
        }
        return 'Inspection created';
    }
}

import { Body, Controller, Post } from '@nestjs/common';

@Controller('inspection-management')
export class InspectionManagementController {
    @Post('create-inspection')
    createInspection(@Body() body: {
        clientId: string;
        siteId: string;
    }): string {
        return 'Inspection created';
    }
}

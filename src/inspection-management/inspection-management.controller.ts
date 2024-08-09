import { Controller, Post } from '@nestjs/common';

@Controller('inspection-management')
export class InspectionManagementController {
    @Post('inspection')
    createInspection() {
        return 'Inspection created';
    }
}

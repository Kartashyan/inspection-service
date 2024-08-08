import { Controller, Post } from '@nestjs/common';

@Controller('inspector-management')
export class InspectorManagementController {
    @Post('inspection')
    createInspection() {
        return 'Inspection created';
    }
}

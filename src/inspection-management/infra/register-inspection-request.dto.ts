import { MaxLength, MinLength } from "class-validator";

export class RegisterInspectionRequestDto {
    @MaxLength(320)
    @MinLength(5)
    readonly clientId: string;
    @MaxLength(320)
    @MinLength(5)
    readonly siteId: string;
}
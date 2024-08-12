import { IsString, MaxLength, MinLength } from "class-validator";

export class RegisterInspectionRequestDto {
    @MaxLength(320)
    @MinLength(5)
    @IsString()
    readonly clientId: string;
    @MaxLength(320)
    @MinLength(5)
    @IsString()
    readonly siteId: string;
}
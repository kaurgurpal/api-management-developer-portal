import ITenantService from "./ITenantService";

/**
 * A service for management operations with Data API tenant.
 */
export class TenantService implements ITenantService {
    constructor() { }

    //TODO: Not implemented.
    public async getServiceSkuName(): Promise<string> {
        return "Developer";
    }
}
import { expect } from "chai";
import { describe, it } from "mocha";
import { ConsoleLogger } from "@paperbits/common/logging";
import { ProductService } from "./productService";
import { DataApiClient } from "../clients";
import { MockHttpClient, starterProduct } from "../../tests/mocks";
import { StaticAuthenticator } from "../components/staticAuthenticator";
import { StaticSettingsProvider } from "../components/staticSettingsProvider";
import { DataTenantService } from "./dataTenantService";


const settingsProvider = new StaticSettingsProvider({
    backendUrl: "https://contoso.developer.azure-api.net",
    managementApiAccessToken: "SharedAccessSignature 1&220001010000&000000000000000000000000000=="
});

const authenticator = new StaticAuthenticator();

describe("Product service", async () => {
    it("Returns list of products", async () => {
        const httpClient = new MockHttpClient();
        const logger = new ConsoleLogger();

        httpClient.mock()
            .get("/products")
            .reply(200, { value: [starterProduct] });

        const apiClient = new DataApiClient(httpClient, authenticator, settingsProvider);
        const tenantService = new DataTenantService(apiClient);

        const productService = new ProductService(apiClient, tenantService);
        const products = await productService.getProducts();

        expect(products.length).to.equals(1);
    });

    it("Returns specific product", async () => {
        const httpClient = new MockHttpClient();
        const logger = new ConsoleLogger();

        httpClient.mock()
            .get("/products/starter")
            .reply(200, starterProduct);

        const apiClient = new DataApiClient(httpClient, authenticator, settingsProvider);
        const tenantService = new DataTenantService(apiClient);

        const productService = new ProductService(apiClient, tenantService);
        const product = await productService.getProduct("/products/starter");

        expect(product.displayName).to.equal(product.displayName);
    });
});
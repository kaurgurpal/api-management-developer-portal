import { ReactModule } from "@paperbits/react/react.module";
import { AadConfigPublisher } from "./publishing/aadConfigPublisher";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { ConsoleLogger } from "@paperbits/common/logging";
import { RoleBasedSecurityPublishModule } from "@paperbits/core/security/roleBasedSecurity.publish.module";
import { MapiClient } from "./services/mapiClient";
import { MapiObjectStorage, MapiBlobStorage } from "./persistence";
import { ListOfApisPublishModule } from "./components/apis/list-of-apis/ko/listOfApis.module";
import { DetailsOfApiPublishModule } from "./components/apis/details-of-api/ko/detailsOfApi.module";
import { HistoryOfApiPublishModule } from "./components/apis/history-of-api/ko/historyOfApi.module";
import { SigninPublishModule } from "./components/users/signin/signin.publish.module";
import { SigninSocialPublishModule } from "./components/users/signin-social/signinSocial.module";
import { SignupPublishModule } from "./components/users/signup/signup.publish.module";
import { SignupSocialPublishModule } from "./components/users/signup-social/signupSocial.publish.module";
import { ProfilePublishModule } from "./components/users/profile/profile.module";
import { SubscriptionsPublishModule } from "./components/users/subscriptions/subscriptions.module";
import { ProductDetailsPublishModule } from "./components/products/product-details/productDetails.module";
import { StaticRouter } from "./components/staticRouter";
import { StaticUserService } from "./services/userService";
import { StaticAuthenticator } from "./components/staticAuthenticator";
import { OperationListPublishModule } from "./components/operations/operation-list/ko/operationList.module";
import { OperationDetailsPublishModule } from "./components/operations/operation-details/operationDetails.publish.module";
import { ProductListPublishModule } from "./components/products/product-list/ko/productList.module";
import { ProductSubscribePublishModule } from "./components/products/product-subscribe/ko/productSubscribe.module";
import { ProductApisPublishModule } from "./components/products/product-apis/ko/productApis.module";
import { ProductSubscriptionsPublishModule } from "./components/products/product-subscriptions/ko/productSubscriptions.module";
import { IdentityService } from "./services/identityService";
import { ResetPasswordPublishModule } from "./components/users/reset-password/resetPassword.publish.module";
import { ConfirmPasswordPublishModule } from "./components/users/confirm-password/ko/confirmPassword.module";
import { ChangePasswordPublishModule } from "./components/users/change-password/changePassword.publish.module";
import { ReportsPublishModule } from "./components/reports/ko/reports.module";
import { TenantService } from "./services/tenantService";
import { ValidationSummaryPublishModule } from "./components/users/validation-summary/validationSummary.publish.module";
import { BackendService } from "./services/backendService";
import { StaticRoleService } from "./services/roleService";
import { ProvisionService } from "./services/provisioningService";
import { OAuthService } from "./services/oauthService";
import { ApiProductsPublishModule } from "./components/apis/api-products/ko/apiProducts.module";
import { RuntimeConfigPublisher } from "./publishing/runtimeConfigPublisher";
import { RuntimeConfigBuilder } from "./publishing/runtimeConfigBuilder";
import { CustomHtmlPublishModule } from "./components/custom-html/customHtml.publish.module";
import { CustomWidgetPublishModule } from "./components/custom-widget/customWidget.publish.module";
import { StaticDataHttpClient } from "./services/staticDataHttpClient";
import { PublisherStaticDataProvider } from "./services/publisherStaticDataProvider";
import { staticDataEnvironment, mockStaticDataEnvironment } from "./../environmentConstants";

export class ApimPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new ReactModule());
        injector.bindModule(new ListOfApisPublishModule());
        injector.bindModule(new ApiProductsPublishModule());
        injector.bindModule(new DetailsOfApiPublishModule());
        injector.bindModule(new HistoryOfApiPublishModule());
        injector.bindModule(new SigninPublishModule());
        injector.bindModule(new SigninSocialPublishModule());
        injector.bindModule(new SignupPublishModule());
        injector.bindModule(new SignupSocialPublishModule());
        injector.bindModule(new ProfilePublishModule());
        injector.bindModule(new SubscriptionsPublishModule());
        injector.bindModule(new ProductListPublishModule());
        injector.bindModule(new ProductDetailsPublishModule());
        injector.bindModule(new ProductApisPublishModule());
        injector.bindModule(new ProductSubscriptionsPublishModule());
        injector.bindModule(new ProductSubscribePublishModule());
        injector.bindModule(new OperationListPublishModule());
        injector.bindModule(new OperationDetailsPublishModule());
        injector.bindModule(new ResetPasswordPublishModule());
        injector.bindModule(new ConfirmPasswordPublishModule());
        injector.bindModule(new ChangePasswordPublishModule());
        injector.bindModule(new ReportsPublishModule());
        injector.bindModule(new ValidationSummaryPublishModule());
        injector.bindModule(new CustomHtmlPublishModule());
        injector.bindModule(new CustomWidgetPublishModule());
        injector.bindModule(new RoleBasedSecurityPublishModule());
        injector.bindSingleton("tenantService", TenantService);
        injector.bindSingleton("backendService", BackendService);
        injector.bindSingleton("userService", StaticUserService);
        injector.bindSingleton("roleService", StaticRoleService);
        injector.bindSingleton("provisioningService", ProvisionService);
        injector.bindSingleton("identityService", IdentityService);
        injector.bindSingleton("router", StaticRouter);
        injector.bindSingleton("authenticator", StaticAuthenticator);
        injector.bindSingleton("mapiClient", MapiClient);
        injector.bindSingleton("objectStorage", MapiObjectStorage);
        injector.bindSingleton("blobStorage", MapiBlobStorage);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindSingleton("oauthService", OAuthService);
        injector.bindSingleton("runtimeConfigBuilder", RuntimeConfigBuilder);
        injector.bindToCollection("publishers", AadConfigPublisher);
        injector.bindToCollection("publishers", RuntimeConfigPublisher);

        if (process.env.NODE_ENV === staticDataEnvironment || process.env.NODE_ENV === mockStaticDataEnvironment) {
            injector.bind("httpClient", StaticDataHttpClient);
            injector.bind("dataProvider", PublisherStaticDataProvider);
        }
    }
}
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetService } from "@paperbits/common/widgets";
import { ReactComponentBinder } from "@paperbits/react/bindings";
import { ComponentFlow } from "@paperbits/common/components/componentFlow";
import { ValidationSummaryHandlers } from "./validationSummaryHandlers";
import { ValidationSummaryModel } from "./validationSummaryModel";
import { ValidationSummaryModelBinder } from "./validationSummaryModelBinder";
import { ValidationSummaryViewModel } from "./react/ValidationSummaryViewModel";
import { ValidationSummaryViewModelBinder } from "./validationSummaryViewModelBinder";

export class ValidationSummaryDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("validationSummaryModelBinder", ValidationSummaryModelBinder);
        injector.bindSingleton("validationSummaryViewModelBinder", ValidationSummaryViewModelBinder)
        injector.bindSingleton("validationSummaryHandlers", ValidationSummaryHandlers);

        const widgetService = injector.resolve<IWidgetService>("widgetService");

        widgetService.registerWidget("validationSummary", {
            modelDefinition: ValidationSummaryModel,
            componentBinder: ReactComponentBinder,
            componentDefinition: ValidationSummaryViewModel,
            modelBinder: ValidationSummaryModelBinder,
            viewModelBinder: ValidationSummaryViewModelBinder,
            componentFlow: ComponentFlow.Block
        });

        widgetService.registerWidgetEditor("validationSummary", {
            displayName: "Validation summary",
            category: "User",
            iconClass: "widget-icon widget-icon-api-management",
            handlerComponent: ValidationSummaryHandlers,
            componentBinder: ReactComponentBinder
        });
    }
}
import { Contract } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { ValidationSummaryModel } from "./validationSummaryModel";
import { ValidationSummaryContract } from "./validationSummaryContract";


export class ValidationSummaryModelBinder implements IModelBinder<ValidationSummaryModel> {
    public canHandleModel(model: Object): boolean {
        return model instanceof ValidationSummaryModel;
    }

    public async contractToModel(contract: ValidationSummaryContract): Promise<ValidationSummaryModel> {
        const model = new ValidationSummaryModel();
        model.styles = contract.styles ?? {};

        return model;
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "validationSummary";
    }

    public modelToContract(model: ValidationSummaryModel): Contract {
        const contract: ValidationSummaryContract = {
            type: "validationSummary",
            styles: model.styles
        };

        return contract;
    }
}
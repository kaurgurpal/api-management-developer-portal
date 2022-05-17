﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import { OperationListModel } from "./operationListModel";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";

export class OperationListHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "operationList",
            category: "Operations",
            displayName: "List of operations",
            iconClass: "widget-icon widget-icon-api-management",
            requires: ["html"],
            createModel: async () => new OperationListModel()
        };

        return widgetOrder;
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            components: {
                operationList: {
                    displayName: "Operation List",
                    plugins: ["background", "typography", "margin", "padding"],
                    defaults: {
                        typography: {
                            colorKey: "colors/default"
                        }
                    },
                    components: {
                        searchInput: DefaultStyleDefinitions.SearchInput,
                        tagInput: DefaultStyleDefinitions.TagInput,
                        toggleButtonLabel: DefaultStyleDefinitions.ToggleButtonLabel,
                        widgetText: DefaultStyleDefinitions.WidgetText,
                        tagCard: DefaultStyleDefinitions.TagCard,
                        dropdownInput: DefaultStyleDefinitions.DropdownInput,
                        dropdownInputButton: DefaultStyleDefinitions.DropdownInputButton,
                        dropdownContainer: DefaultStyleDefinitions.DropdownContainer
                    }

                }
            }
        };
    }
}
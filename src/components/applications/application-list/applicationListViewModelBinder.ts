import { ViewModelBinder, WidgetState } from "@paperbits/common/widgets";
import { StyleCompiler } from "@paperbits/common/styles";
import { ISiteService } from "@paperbits/common/sites";
import { Logger } from "@paperbits/common/logging";
import { layoutsMap } from "../../utils/react/TableListInfo";
import { ApplicationListViewModel } from "./react/ApplicationListViewModel";
import { ApplicationListModel } from "./applicationListModel";
import { isRedesignEnabledSetting } from "../../../constants";

export class ApplicationListViewModelBinder implements ViewModelBinder<ApplicationListModel, ApplicationListViewModel> {
    constructor(
        private readonly styleCompiler: StyleCompiler,
        private readonly siteService: ISiteService,
        private readonly logger: Logger
    ) { }

    public stateToInstance(state: WidgetState, componentInstance: ApplicationListViewModel): void {
        componentInstance.setState(prevState => ({
            isRedesignEnabled: state.isRedesignEnabled,
            styles: state.styles,
            layout: state.layout,
            layoutDefault: layoutsMap[state.layout],
            allowViewSwitching: state.allowViewSwitching,
            detailsPageUrl: state.detailsPageHyperlink
                ? state.detailsPageHyperlink.href
                : undefined
        }));
    }

    public async modelToState(model: ApplicationListModel, state: WidgetState): Promise<void> {
        state.allowViewSwitching = model.allowViewSwitching;
        state.detailsPageHyperlink = model.detailsPageHyperlink;
        state.layout = model.layout;

        if (model.styles) {
            state.styles = await this.styleCompiler.getStyleModelAsync(model.styles);
        }

        let isRedesignEnabled = false;
        
        try {
            isRedesignEnabled = !!(await this.siteService.getSetting(isRedesignEnabledSetting));
        } catch (error) {
            this.logger?.trackError(error, { message: `Failed to get setting: ${isRedesignEnabledSetting} - ApplicationListViewModelBinder` });
        } finally {
            state.isRedesignEnabled = isRedesignEnabled;
        }
    }
}
import * as React from "react";
import { FluentProvider } from "@fluentui/react-components";
import { Resolve } from "@paperbits/react/decorators";
import { fuiTheme } from "../../../../../constants";
import { Product } from "../../../../../models/product";
import { ProductService } from "../../../../../services/productService";
import { ApiService } from "../../../../../services/apiService";
import { RouteHelper } from "../../../../../routing/routeHelper";
import { TLayout } from "../../../../utils/react/TableListInfo";
import { ApplicationsTableCards } from "./ApplicationsTableCards";

export const application = {
    id: "1",
    name: "application",
    displayName: "Application",
    description: "Description of the application",
    clientId: 'ClientIDname',
    owner: 'Jelena Sorohova',
}

export interface ProductsListProps {
    allowSelection?: boolean;
    allowViewSwitching?: boolean;
    detailsPageUrl: string;
    layoutDefault: TLayout;
}

interface ProductsListState {
    working: boolean;
    selectedProduct?: Product | null;
}

export type TProductListRuntimeFCProps = Omit<ProductsListProps, "detailsPageUrl"> & {
    getReferenceUrl: (productName: string) => string;
    productService?: ProductService;
    apiService?: ApiService;
    apiName?: string;
    selectedProduct?: Product | null;
    isApiProducts?: boolean;
};

export class ApplicationsListRuntime extends React.Component<ProductsListProps, ProductsListState> {
    @Resolve("productService")
    public productService: ProductService;

    @Resolve("routeHelper")
    public routeHelper: RouteHelper;

    constructor(props) {
        super(props);

        this.state = {
            working: false,
            selectedProduct: undefined,
        };
    }

    public componentDidMount() {
        this.loadSelectedProduct();
    }

    async loadSelectedProduct() {
        const productName = this.routeHelper.getProductName();
        if (!productName) {
            this.setState({ selectedProduct: null });
            return;
        }

        this.setState({ working: true, selectedProduct: undefined });

        return this.productService
            .getProduct(`products/${productName}`)
            .then((selectedProduct) => this.setState({ selectedProduct }))
            .finally(() => this.setState({ working: false }));
    }

    getReferenceUrl(productName: string): string {
        return this.routeHelper.getProductReferenceUrl(productName, this.props.detailsPageUrl);
    }

    render() {
        return (
            <FluentProvider theme={fuiTheme}>
                <ApplicationsTableCards
                    {...this.props}
                    productService={this.productService}
                    getReferenceUrl={(productName) => this.getReferenceUrl(productName)}
                />
            </FluentProvider>
        );
    }
}

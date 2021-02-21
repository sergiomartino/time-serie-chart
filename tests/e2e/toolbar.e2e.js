import { Selector } from "testcafe";
import { stocks as stocksMock } from "./data-mocks";
import packageJson from '../../package.json';

fixture`Toolbar`.page`${packageJson.config.e2eTestHost}`;

test.requestHooks(stocksMock)(
    "It should show 3 selectors: Stocks, Price Type and Date Range",
    async (t) => {
        const stocks = Selector(".toolbar .stocks");
        const stocksLabel = stocks.find("label").withExactText("Stocks");
        const priceTypes = Selector(".toolbar .price-types");
        const priceTypesLabel = priceTypes.find("label").withExactText("Price Types");
        const dateRange = Selector(".toolbar .date-range");
        const dateRangeLabel = dateRange.find("label").withExactText("Date Range (from/to)");

        await t
            .expect(stocks.exists)
            .ok()
            .expect(stocksLabel.exists)
            .ok()
            .expect(priceTypes.exists)
            .ok()
            .expect(priceTypesLabel.exists)
            .ok()
            .expect(dateRange.exists)
            .ok()
            .expect(dateRangeLabel.exists)
            .ok();
    }
);

test.requestHooks(stocksMock)(
    "When typing text in the stock selector, it should search for stocks",
    async (t) => {
        const searchInput = Selector(".stock-multi-select__input input");
        const dropdownOption = Selector(".stock-multi-select__option").nth(0);
        const selectedStockSymbol = Selector(".stock-multi-select__multi-value__label");

        await t
            .typeText(searchInput, "app")
            .expect(dropdownOption.textContent)
            .eql("AAPL (APPLE INC)")
            .pressKey("enter")
            .expect(selectedStockSymbol.count)
            .eql(1)
            .expect(selectedStockSymbol.withExactText("AAPL").exists)
            .ok();
    }
);

test.requestHooks(stocksMock)(
    "The stock selector should only allow up to a maximum of 3 stocks",
    async (t) => {
        const searchInput = Selector(".stock-multi-select__input input");
        const selectedStockSymbols = Selector(".stock-multi-select__multi-value").count;
        const warning = Selector(".stock-multi-select__menu-notice--no-options").withExactText(
            "Cannot select more than 3 stocks."
        );

        await t
            .typeText(searchInput, "app")
            .pressKey("enter")
            .typeText(searchInput, "exco")
            .pressKey("enter")
            .typeText(searchInput, "upow")
            .pressKey("enter")
            .typeText(searchInput, "someother")
            .pressKey("enter")
            .expect(selectedStockSymbols)
            .eql(3)
            .expect(warning.exists)
            .ok();
    }
);

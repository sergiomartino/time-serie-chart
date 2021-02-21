import { Selector } from "testcafe";
import {
    stocks as stocksMock,
    price as priceMock,
    error as errorMock,
} from "./data-mocks";
import packageJson from "../../package.json";

fixture`Chart`.page`${packageJson.config.e2eTestHost}`;

test.requestHooks([stocksMock, errorMock(/stock\/candle/)])(
    "When the pricing requests fail, it should show an error",
    async (t) => {
        const searchInput = Selector(".stock-multi-select__input input");
        const dateFrom = Selector(".date-picker[name=date-from]");
        const dateTo = Selector(".date-picker[name=date-to]");
        const chart = Selector(".stock-chart svg");
        const error = Selector('.pricing-error').withText('Could not get pricing.');

        await t
            .typeText(searchInput, "app")
            .pressKey("enter")
            .typeText(dateFrom, "2019-01-01", { replace: true })
            .typeText(dateTo, "2020-02-20", { replace: true })
            .expect(chart.exists).notOk()
            .expect(error.exists).ok()
    }
);

test.requestHooks([stocksMock, priceMock])(
    "When stocks and a date range are selected, it should show a chart",
    async (t) => {
        const searchInput = Selector(".stock-multi-select__input input");
        const dateFrom = Selector(".date-picker[name=date-from]");
        const dateTo = Selector(".date-picker[name=date-to]");
        const chart = Selector(".stock-chart svg");

        await t
            .typeText(searchInput, "app")
            .pressKey("enter")
            .typeText(dateFrom, "2019-01-01", { replace: true })
            .typeText(dateTo, "2020-02-20", { replace: true })
            .expect(chart.exists)
            .ok();
    }
);

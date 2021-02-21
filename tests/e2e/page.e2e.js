import { Selector } from "testcafe";
import { stocks as stocksMock, error as errorMock } from "./data-mocks";
import packageJson from "../../package.json";

fixture`Page`.page`${packageJson.config.e2eTestHost}`;

test.requestHooks(stocksMock)("It should show a loading message", async (t) => {
    const loading = Selector(".app-loading").with({ visibilityCheck: true }).exists;
    await t.expect(loading).notOk();
});

test.requestHooks(errorMock(/stock\/symbol/))(
    "When unable to load initial stocks, it should show an error message",
    async (t) => {
        await t.expect(Selector(".app-error").withText("Could not get stocks.").exists).ok();
    }
);

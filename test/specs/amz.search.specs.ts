import SearchPage from "../../src/main/pageobjects/amz.search.page";
import SEARCH_DATA from "../testData/searchData";
import { expect } from "chai";

const searchString: string = SEARCH_DATA.dataset1.searchString;
const expectedString: string = SEARCH_DATA.dataset1.expectedString;

describe("Search a product from Amazon", () => {
    it("Should search a product and store the value", async () => {
        await SearchPage.open();

        await SearchPage.searchProduct(searchString);
        const getAllIphone = await SearchPage.searchResults;

        await getAllIphone.forEach((element) => {
            console.log(element.getText());
        });

        expect(await getAllIphone[0].getText()).toHaveValue(expectedString);
    });

    it.only("Validate Help and Setting section", async () => {
        const expectedHeadings: string[] = [];
        const actualHeadings: string[] = [
            "Your Account",
            "Customer Service",
            "Sign In",
        ];

        await SearchPage.open();

        await SearchPage.clickOnSearchAllButton();
        await SearchPage.scrollToHelpAndSettingsSection();
        const allHeadings = await SearchPage.helpAndSettingAllHeadings;

        for (let i = 0; i < (await allHeadings.length); i++) {
            expectedHeadings.push(await allHeadings[i].getText());
        }

        const isTrue = expectedHeadings.some((item) =>
            actualHeadings.includes(item),
        );
        expect(isTrue).to.be.true;
    });
});

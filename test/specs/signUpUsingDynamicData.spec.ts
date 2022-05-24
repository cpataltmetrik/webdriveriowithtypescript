import dynamicDataGenerator from '../../src/main/utilities/dynamicDataGenerator';
import loginPage from '../../src/main/pageobjects/login.page';
import signupPage from '../../src/main/pageobjects/signup.page';
const chaiExpect: any = require("chai").expect;
const testdata = dynamicDataGenerator.randomData({});

describe("Signup amazon Page", async () => {
  it("Should try to signup amazon page", async () => {
    await loginPage.open("");
    await loginPage.successLog.clickWhenReady();
    await loginPage.clickCreateAccountButton();
    await signupPage.enterName(testdata.name);
    await signupPage.enterPhoneNumber(testdata.phoneNumber);
    await signupPage.enterEmailAddress(testdata.email);
    await signupPage.enterPassword(testdata.password);
    await signupPage.confirmPassword(testdata.password);
    await signupPage.clickContinueButton(); 
  });

  it("validate signup success message", async () => {
    if(await signupPage.expectedLog.isElementExist()) {
      let txt: string = await signupPage.expectedLog.getText();
      chaiExpect(txt).to.equal("Solve this puzzle to protect your account"); 
    }
    else{
      let txt: string = await signupPage.header.getText();
      chaiExpect(txt.toLocaleLowerCase()).to.equal("create account"); 
    }
  });
});

import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import com.kms.katalon.core.util.KeywordUtil as KeywordUtil

/* "Enter Invalid Data
 1. Email Address
 2. Password
 3. Password (again )
 4. Click on Register
 
 It should allow to display error message
  *
  */
// Opens the selected Browser
String regLink = 'http://localhost:3000'

WebUI.openBrowser('')

//Navigated to Local host
WebUI.navigateToUrl('http://localhost:3000/')

// Maximize the window
WebUI.maximizeWindow()

// Click on Register button which navigates to Create new account Page
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/a_Register'))

// Checking if the user has reached on the Registration Page
if (regLink == WebUI.getUrl()) {
    KeywordUtil.logInfo('User has successfully opened the Registration Page')
} else {
    KeywordUtil.logInfo('Wrong URL is Opened')
}

WebUI.takeScreenshot('~/Katalon/Registration/RegistrationPage')

/* Scenario 1 : 
 * Clicking on Registration Button with entering any details
 */
// CLickin on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

// Error message is displayed to Enter Email Address
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_Email Required Field'), 'Email: Required Field')

// Error message is displayed to Enter Password
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_Password Required Field'), 'Password: Required Field')

// Error message is displayed to Enter Password Again
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_Password (again) Required Field'), 'Password (again): Required Field')

WebUI.takeScreenshot('~/Katalon/Registration/WithoutanyDetails')

/* Scenario 2 :
 * Enter Valid Email Address and Clickin on Register Button
 */
//Enter valid email address
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), 'payal+user2@gmail.com')

// Clicking on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

// Error message is displayed to Enter Password
WebUI.verifyMatch('Password: Required Field', 'Password: Required Field', false)

// Error message is displayed to Enter Password Again
WebUI.verifyMatch('Password (again): Required Field', 'Password (again): Required Field', false)

WebUI.takeScreenshot('~/Katalon/Registration/BothPasswordError')

/* Scenario 3 :
 * Email address is already entered. Entering password
 */
// Entering password
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password_at-field-password'), '5xx1bkCcAlw=')

// Clicking on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

// Error message is displayed to Enter Password Again
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/div_Password (again) Required Field'), 'Password (again): Required Field')

WebUI.takeScreenshot('~/Katalon/Registration/AgainPassword')

/* Scenario 4: 
 * Leaving Email address blank and entering password and password again
 */
// Leaving Email address field blank
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), '')

// Entering password
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password_at-field-password'), 'kbs23wq117C4z+7JL/PnBA==')

// Entering password again
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password (again)_at-field-password_again'), 
    'kbs23wq117C4z+7JL/PnBA==')

// Click on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

// Error message is displayed to Enter Email Address
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_Email Required Field'), 'Email: Required Field')

WebUI.takeScreenshot('~/Katalon/Registration/Email Required')

/* Scenario 5:
 * Entering invalid Email address
 * 
 */
// Entering invalid email address without .com
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), 'payal+user1@gmail')

// Clickin on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

WebUI.delay(7)

//Error message is displayed to Enter Valid Email Address
WebUI.verifyElementText(findTestObject('SignUp/Page_GeriLife/p_Email Invalid email'), 'Email: Invalid email')

WebUI.delay(10)

// Entering invalid email address without com
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), 'payal+user1@gmail.')

// Clickin on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

WebUI.delay(7)

//Error message is displayed to Enter Valid Email Address
WebUI.verifyElementText(findTestObject('SignUp/Page_GeriLife/p_Email Invalid email'), 'Email: Invalid email')

WebUI.delay(10)

WebUI.takeScreenshot('~/Katalon/Registration/EmailInvalid')

/* Scenario 6 :
 *  Entering Existing email address
 */
// Entering existing email address
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), 'payal+user1@gmail.com')

// Clicking on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

WebUI.delay(10)

// Error message is displayed that email address already exists
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_Email already exists'), 'Email already exists.')

WebUI.takeScreenshot('~/Katalon/Registration/EmailExists')


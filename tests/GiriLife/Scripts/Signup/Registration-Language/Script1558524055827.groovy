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
import java.text.SimpleDateFormat as SimpleDateFormat
import com.kms.katalon.core.util.KeywordUtil as KeywordUtil

/*
 * Scenario :
 * On the Registration Page Verify 
 * Language drop list. Select Suomi should translate the text from English to Suomi. 
 * Able to create new account and logout from the application
 * Logout button to be translated into Suomi
 */
// Using the variable to create new registration which will include time format
RegID = (('User' + getDateTime()) + '@gmail.com')

// Variable declared to compare if correct URL is opened after registration
String regLink = 'http://localhost:3000'

// Opens the selected Browser
WebUI.openBrowser('')

//Navigated to Local host
WebUI.navigateToUrl('http://localhost:3000/')

// Maximize the window
WebUI.maximizeWindow()

// Clicking on Register Button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/a_Register'))

if (regLink == WebUI.getUrl()) {
    KeywordUtil.logInfo('User has successfully opened the Registration Page')
} else {
    KeywordUtil.logInfo('Wrong URL is Opened')
}

// Captures the screenshot after Opening the registration page
WebUI.takeScreenshot('~/Katalon/Registration/LanguageRegistration')

//WebUI.verifyImagePresent(findTestObject('img_GeriLife_navbar-logo'))
// Selecting Language from English to Suomi
WebUI.selectOptionByValue(findTestObject('Object Repository/SignUp/Page_GeriLife/select_English                  Suomi'), 
    'fi', true)

// Checking for Translation of Email in Suomi
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/label_Email'), 'Email')

// Checking for Translation of Password in Suomi
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/label_Password'), 'Password')

// Checking for Translation of Password Again in Suomi
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/label_Password (again)'), 'Password (again)')

// Checing for Translation for the text
WebUI.verifyElementText(findTestObject('Object Repository/SignUp/Page_GeriLife/p_If you already have an account      sign in'), 
    'If you already have an account sign in')

// Captures the screenshot after Opening the registration page
WebUI.takeScreenshot('~/Katalon/Registration/LanguageRegistrationPage')

// Entering Email
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), RegID)

// Entering Password
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password_at-field-password'), '5xx1bkCcAlw=')

//Entering PAssword Again
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password (again)_at-field-password_again'), 
    '5xx1bkCcAlw=')

//Cliking on Register button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))

// Verifying the Logout button text in Suomi
WebUI.verifyElementText(findTestObject('SignUp/Page_GeriLife/button_Kirjaudu ulos'), 'Kirjaudu ulos')

// Captures the screenshot after Opening the registration page
WebUI.takeScreenshot('~/Katalon/Registration/LanguageLogout')

//Clicking on Logout button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Kirjaudu ulos'))

String getDateTime() {
    SimpleDateFormat nowDateTime = new SimpleDateFormat('yyyyMMddHHmmss')

    Date now = new Date()

    String strDate = nowDateTime.format(now)

    return strDate
}


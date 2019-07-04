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
/* "Enter Valid 
1. Email Address
2. Password
3. Password (again )
4. Click on Register

It should allow user to sucessfully register and reach the main page of GeriLife "
 * 
 */

// Using the variable to create new registration which will include time format
RegID = (('User' + getDateTime()) + '@gmail.com')

// Variable declared to compare if correct URL is opened after registration
String actLink = 'http://localhost:3000'
String regLink = 'http://localhost:3000/residents'
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
WebUI.takeScreenshot('~/Katalon/Registration/RegistrationPage')

// Entering the Email Address on the bases of the format mentioned
WebUI.setText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Email_at-field-email'), RegID)

// Entering the password
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password_at-field-password'), 'YsxTccsmuDpQRMqhZqvXbA==')

// Reentering the password
WebUI.setEncryptedText(findTestObject('Object Repository/SignUp/Page_GeriLife/input_Password (again)_at-field-password_again'), 
    'YsxTccsmuDpQRMqhZqvXbA==')

// Clicking on Register button
WebUI.click(findTestObject('Object Repository/SignUp/Page_GeriLife/button_Register'))
// Waiting for the application to load within 10 sec
WebUI.delay(10)
// Taking screenshot after user registers
WebUI.takeScreenshot('~/Katalon/Registration/AfterRegistration')
// Comparing the correct URL is displayed
if (actLink == WebUI.getUrl()) {
    KeywordUtil.logInfo('User has successfully registered and have reached to Activities Page')
} else {
    KeywordUtil.logInfo('Wrong URL is Opened')
}
// Function for the Date Time for create a unique email format
String getDateTime() {
    SimpleDateFormat nowDateTime = new SimpleDateFormat('yyyyMMddHHmmss')

    Date now = new Date()

    String strDate = nowDateTime.format(now)

    return strDate
}

// End for Registration
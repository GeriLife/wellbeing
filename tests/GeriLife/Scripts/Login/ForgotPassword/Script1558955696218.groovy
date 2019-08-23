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

/*
 * Scenario : 1 - Forgot password with invalid data
 * Scenario : 2 - Forgot password with valid data which displays validation message as "Email Sent"
 */
//Opening the Browser
WebUI.openBrowser('')

//Navigating the URL
WebUI.navigateToUrl('http://192.168.0.100:3000')

//Cliking on Forgot Your Password Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/a_Forgot your password'))

WebUI.delay(3)

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Login/ForgotPassword')

//Verifying the Reset your password 
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/h3_Reset your password'), 'Reset your password')

//Verifying the Email
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/label_Email'), 'Email')

//Clicking on Email Rest Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/button_Email Reset Link'), FailureHandling.STOP_ON_FAILURE)
WebUI.takeScreenshot('~/Katalon/Login/EmailResetLink')
WebUI.delay(3)

//Verifying the validation message Email: Required Field
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/div_Email Required Field'), 'Email: Required Field')

//Entering invalid email address
WebUI.setText(findTestObject('LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payal')

//Clicking on Email Rest Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/button_Email Reset Link'))

//Verifying the validation message 'Email: Invalid email
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/div_Email Invalid email'), 'Email: Invalid email')

//Entering invalid email address
WebUI.setText(findTestObject('LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@')

//Clicking on Email Rest Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/button_Email Reset Link'))

WebUI.delay(3)

//Verifying the validation message as "User not Found"
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/div_User not found'), 'User not found')

WebUI.takeScreenshot('~/Katalon/Login/UsernotFound')
//Entering invalid email address
WebUI.setText(findTestObject('LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payal@gmail.com')

//Clicking on Email Rest Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/button_Email Reset Link'))

WebUI.delay(5)

//Entering valid email address
WebUI.setText(findTestObject('LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@gmail.com')

//Clicking on Email Rest Link
WebUI.click(findTestObject('LoginPage/Page_GeriLife/button_Email Reset Link'))

WebUI.closeBrowser(FailureHandling.CONTINUE_ON_FAILURE)


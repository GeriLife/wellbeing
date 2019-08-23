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
//Opening the browser
WebUI.openBrowser('')

//Opening the application
WebUI.navigateToUrl('http://localhost:3000/')

//Entering invalid email address
WebUI.setText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payal')

//Entering the password
WebUI.setEncryptedText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Password_at-field-password'), 'kbs23wq117C4z+7JL/PnBA==')

//Clicking on sign in button
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/button_Sign In'))

//Error message - Login forbidden
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/div_Login forbidden'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Login/Loginforbidden')

//Entering invalid email address
WebUI.setText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@')

//Entering password
WebUI.setEncryptedText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Password_at-field-password'), 'kbs23wq117C4z+7JL/PnBA==')

//Clicking on sign in button
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/button_Sign In'))

//Error message - Login forbidden
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/div_Login forbidden'))

//Entering valid email address
WebUI.setText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@gmail.com')

//Entering valid password
WebUI.setEncryptedText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Password_at-field-password'), 'kbs23wq117C4z+7JL/PnBA==')

//Clicking on sign in button
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/button_Sign In'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Login/LoginSucessfully')

//Clicking on logout 
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/button_Logout'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Login/Logout')
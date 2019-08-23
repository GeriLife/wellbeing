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
// Verifying Sign In link
WebUI.verifyElementText(findTestObject('Object Repository/LoginPage/Page_GeriLife/h3_Sign In'), 'Sign In')

//Verifying Email text
WebUI.verifyElementText(findTestObject('Object Repository/LoginPage/Page_GeriLife/label_Email'), 'Email')

//Verifying Password text
WebUI.verifyElementText(findTestObject('Object Repository/LoginPage/Page_GeriLife/label_Password'), 'Password')

//Verifying forgot password text
WebUI.verifyElementText(findTestObject('LoginPage/Page_GeriLife/a_Forgot your password'), 'Forgot your password?')

//Capturing Screenshot
WebUI.takeScreenshot('~/Katalon/Login/TextVerified')
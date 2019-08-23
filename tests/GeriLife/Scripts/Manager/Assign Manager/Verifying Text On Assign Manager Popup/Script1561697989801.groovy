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
 * Verifying the Text on Assign Manager Popup
 */
//Clicking on Homes
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/a_              Homes (1)'))

// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager (1)'))

WebUI.delay(5)

// Verifyig Assign a Manager Text
WebUI.verifyElementText(findTestObject('Assign Manager/Page_GeriLife/h2_Assign a manager'), 'Assign a manager')

// Verifying Users Text
WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Users (1)'), 'Users')

// Verifying Add a manager text
WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Add new manager (1)'), 'Add new manager')

// Verifying text No manager assigned currently text
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_No manager assigned curren (1)'))

// Closing the ppop
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/i_Assign a manager_fa fa-remov (1)'))

// Logout from application
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Logout'))

// Closing the browser
WebUI.closeBrowser()


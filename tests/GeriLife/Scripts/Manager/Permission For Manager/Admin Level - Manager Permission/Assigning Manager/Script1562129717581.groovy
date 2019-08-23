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

/* Scenario 1 : Assigning a Manager Permission for Admin Level
*/
// Clicking on Homes
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Homes'))

// Scrolling to Onnela Homes
WebUI.scrollToElement(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/h2_Onnela'), 0)

// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Assign Manager'))

// Clicking to select a user
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/span_Select a user'))

WebUI.delay(7)

// Selecting a User
WebUI.click(findTestObject('Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/div_Users'))

// Clicking on Submit button
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Submit'))

WebUI.delay(5)
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
 * Scenario 4 : Selecting only One User
 */
// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

// Selecting a User
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Select a user'))

WebUI.delay(5)

// Selecting one user
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

WebUI.delay(5)

// Clicking on x button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_x_ss-plus ss-cross'))

WebUI.delay(5)

// Clicking on Submit Button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Filter'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/a_payalchokseygmail.com_revoke'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_          Manager access r'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

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
 * Scenario 5: Selecting Multiple Users to be assigned as Manager
 */

// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

// Clicking to select a User
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Select a user'))

// Selecting 1st User
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

// Selecting 2nd User
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_gerilife440gmail.com'))

// Selecting 3rd User
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payaladmin1gmail.com'))

// Clicking on x too close the selection
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_x_ss-add'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_x_ss-add'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_Users'))

// Clicking on Submit button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

WebUI.delay(5)

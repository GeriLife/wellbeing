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
 * Scenario 3 : Without Entering User trying to Submit on Assign Manager Popup. Displays a validation message
 */
// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

// Clicking on Submit button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

// Validation Message is displayed
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_          Users is require'))

// Closing the Assign Manager Popup
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

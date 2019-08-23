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
 * Scenario 2 : Cancelling the Assign Manager Popup
 */
// Clicking on Assign Manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

// Verifying the Assign manager text
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/h2_Assign a manager'))

// Verifying Users
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Users'))

// Clikcing on Add new Add new manager
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Add new manager'))

// No manager selected error message
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_No manager assigned curren'))

// Closing the manager popup
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

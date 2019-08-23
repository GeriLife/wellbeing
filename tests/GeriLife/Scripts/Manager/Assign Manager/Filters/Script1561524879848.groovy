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
 * Scenario 6: Checking with the filters
 */
// Selecting Assign Mnaager Button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

// entering the details to check for filter
WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Filter_reactive-table-in'), 'Ger')

// Entering a text which doesn't match with the filter name
WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Filter_reactive-table-in'), 'b')

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/i_Assign a manager_fa fa-remov'))

// Closing the browser
WebUI.closeBrowser()

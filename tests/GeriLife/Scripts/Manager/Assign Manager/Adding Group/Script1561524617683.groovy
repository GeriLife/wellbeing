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
 * Scenario 1 : Adding New Group
 */
//Clicking on Homes
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/a_              Homes'))

// Clicking on Add Group
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_        Add Group'))

WebUI.delay(5)

// Adding New Group
WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Group name_name'), 'New Group')

// Clicking on Save Button
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Save'))

WebUI.delay(5)


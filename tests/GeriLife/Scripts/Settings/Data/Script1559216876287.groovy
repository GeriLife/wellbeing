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

// Clicking on Setting button
WebUI.click(findTestObject('Object Repository/Settings/Data/Page_GeriLife/a_                  Settings'))

//Clicking on Data link
WebUI.click(findTestObject('Object Repository/Settings/Data/Page_GeriLife/span_Data'))

//Clicking on Export data
WebUI.click(findTestObject('Object Repository/Settings/Data/Page_GeriLife/button_          Export data'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Setting/ExportData')

// Clicking Data Settings
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Data/Page_GeriLife/h1_Data settings'), 'Data settings')

//Clicking on Export Data
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Data/Page_GeriLife/h3_Export data'), 'Export data')

//Clicking on 
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Data/Page_GeriLife/p_Click the button below to export all data'), 
    'Click the button below to export all data.')

WebUI.click(findTestObject('Object Repository/Settings/Data/Page_GeriLife/span_Export data_label label-primary pull-right'))

WebUI.verifyElementText(findTestObject('Object Repository/Settings/Data/Page_GeriLife/h3_Import Data'), 'Import Data')

WebUI.verifyElementText(findTestObject('Object Repository/Settings/Data/Page_GeriLife/p_Import Data by uploading a JSON file'), 
    'Import Data by uploading a JSON file')

WebUI.click(findTestObject('Object Repository/Settings/Data/Page_GeriLife/b_GeriLife'))


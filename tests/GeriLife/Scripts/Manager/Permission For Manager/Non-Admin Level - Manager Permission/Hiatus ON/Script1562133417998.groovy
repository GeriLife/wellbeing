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
 * Scenario 4:  Checking for Hiatus.
 */

WebUI.click(findTestObject('Assign Manager/User Level/Page_GeriLife/input_On hiatus_onHiatus'))

WebUI.verifyElementText(findTestObject('Assign Manager/User Level/Page_GeriLife/label_On hiatus'), 'On hiatus')

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Save (1)'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_              Residents (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_Residency_btn btn-default (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Edit resident (1)'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/input_On hiatus_onHiatus (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Save (1)'))

WebUI.delay(5)


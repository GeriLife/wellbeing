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
 * Scenario 3 : Editing the Resident with Hiatus ON
 */
// Clikcing 
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_Residency_btn btn-default'))

// Clicking on Edit Resident
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Edit resident'))

//
WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/h4_Edit resident'), 'Edit resident')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_First name'), 'First Name')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_Last initial'), 
    'Last Initials')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_On hiatus'), 'Hiatus')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/p_Resident is on temporary hia'), 
    'Resident')

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_On hiatus_onHiatus'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_3'))

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/span_On hiatus'), 'Hiatus')


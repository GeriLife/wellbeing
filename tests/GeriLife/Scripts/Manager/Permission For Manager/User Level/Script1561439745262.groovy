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
 * Scenario 1 : User is being assigned as Manager
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_              Homes (1)'))

WebUI.scrollToElement(findTestObject('Assign Manager/Admin Level/Page_GeriLife/h2_Onnela'), 5)

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Assign Manager (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/span_Select a user (1)'))

WebUI.delay(5)

WebUI.click(findTestObject('Assign Manager/User Level/Page_GeriLife/div_gerilife440gmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/div_Users (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Submit (1)'))

WebUI.delay(5)


WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Logout (1)'))

/*
 * Scenario 2 : Login to Non-Admin Account
 */
WebUI.setText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/input_Email_at-field-email (1)'), 
    'gerilife440@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/input_Password_at-field-passwo (1)'), 
    'kbs23wq117C4z+7JL/PnBA==')

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Sign In (1)'))

/*
 *  Scenario 3 : Edit Residency. Not All Resident can be edited. 
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_              Residents (1)'))

WebUI.delay(5)

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_Edit Residency_btn btn-defau (1)'), 
    '')

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_              Residents (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_Residency_btn btn-default (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Edit resident (1)'))

WebUI.delay(5)

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

/*
 * Scenario 5 : Editing Residents
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/a_              Residents (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Edit Residency (1)'))

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/h4_Edit residency (1)'), 
    'Edit residency')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/label_Resident (1)'), 
    'Resident')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/label_Home (1)'), 'Home')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/label_Move in date (arrival) (1)'), 
    'Move in date (arrival)')

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/label_Move out date (departure (1)'), 
    'Move out date (departure)')

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Cancel (1)'))

WebUI.delay(5)

/*
 * Scenario 6: Saving Edited Residency.
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Edit Residency (1)'))

WebUI.click(findTestObject('Object Repository/Assign Manager/User Level/Page_GeriLife/button_Save_1 (1)'))

WebUI.closeBrowser()


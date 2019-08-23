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

//Opening the Browser
WebUI.openBrowser('')

// Opening the URL
WebUI.navigateToUrl('http://localhost:3000/')

//Maximizing the Window
WebUI.maximizeWindow()

/*
 * This script is used for entering the valid credentials
 */
//Entering admin email address

//Entering the email address
WebUI.setText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@gmail.com')

//Entering Password
WebUI.setEncryptedText(findTestObject('Object Repository/LoginPage/Page_GeriLife/input_Password_at-field-password'), 'kbs23wq117C4z+7JL/PnBA==')

//Clicking on Sign In button
WebUI.click(findTestObject('Object Repository/LoginPage/Page_GeriLife/button_Sign In'))



/*
 * Scenario 1 : Assigning a Manager Permission for Admin Level
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Homes'))

WebUI.scrollToElement(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/h2_Onnela'), 0)

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Assign Manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/span_Select a user'))

WebUI.delay(7)

WebUI.click(findTestObject('Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/div_Users'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Submit'))

WebUI.delay(5)

/*
 * Scenario 2 :  Adding a New Residency 
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Residents'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Add new Residency'))

WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_First name_firstName'), 'New')

WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_Last initial_lastInitial'), 
    'R')

WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)'), 
    'MRF8A56WAtkjjBPS3', true)

WebUI.click(findTestObject('Assign Manager/Admin Level/Page_GeriLife/input_Move in date (arrival)_m'))

WebUI.delay(5)

WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_Move in date (arrival)_m'), 
    '2019-06-28')

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_1'))

WebUI.delay(5)

/*
 * Scenario 3 : Editing the Resident with Hiatus ON
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_Residency_btn btn-default'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Edit resident'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/h4_Edit resident'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_First name'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_Last initial'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/label_On hiatus'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/p_Resident is on temporary hia'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_On hiatus_onHiatus'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_3'))

WebUI.verifyElementText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/span_On hiatus'), 'Hiatus')

/*
 * Edit Residency
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Residents (1)'))
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Edit Residency'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _2'),
	'HtgskRe32QEdejBf5', true)

WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _3'),
	'MRF8A56WAtkjjBPS3', true)

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_1 (1)'))
/*
 * Scenario 4 : Logout from Application
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Logout'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_GeriLife'))

WebUI.closeBrowser()


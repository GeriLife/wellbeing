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
 * Verifying Date and Time Settings
 */
//Clicking on Setting
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/a_                  Settings (1)'))

//Clicking on Date and Time
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/span_DateTime (1)'))

//Verifying the heading Date/Time Settings
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Date/Page_GeriLife/h1_        Datetime settings (1)'), 
    '  Date/time settings')

//Verifying the text Timezones 
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Date/Page_GeriLife/h3_Timezone (1)'), 'Timezone')

//Verifying the text Select timezone for use in scheduled reports.
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Date/Page_GeriLife/p_Select timezone for use in s'), 
    'Select timezone for use in scheduled reports.')

WebUI.delay(3)

//Selecting one option from the timezone
WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Date/Page_GeriLife/select_(GMT -1200) EtcGMT12(GM'), 
    'Indian/Kerguelen', true)

// Saving the option selected in the timezone
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/button_Save'))

WebUI.delay(3)

// Again checking to select one option from the timezone
WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Date/Page_GeriLife/select_(GMT -1200) EtcGMT12(GM'), 
    'Asia/Calcutta', true)

//Saving the timezone
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/button_Save'))

// Clicking on GeriLife logo
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/b_GeriLife'))


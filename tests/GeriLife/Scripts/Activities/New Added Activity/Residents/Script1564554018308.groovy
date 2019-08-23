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

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:3000/')

WebUI.setText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Email_at-field-email'), 
    'payalchoksey@gmailcom')

WebUI.setEncryptedText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Password_at-field-passwo'), 
    'kbs23wq117C4z+7JL/PnBA==')

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Sign In'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/div_Sign In'))

WebUI.setText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Email_at-field-email'), 
    'payalchoksey@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Password_at-field-passwo'), 
    'kbs23wq117C4z+7JL/PnBA==')

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Sign In'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/a_              Activities'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Add Activity'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/span_Select resident(s)'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/div_Kacey K'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/select_Chandler G            D'), 
    'ncGuuKryArtPQxmCa', true)

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Cancel'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/a_              Residents'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/i_Residency_fa fa-user'))

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Add activity (1)'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/select_(Select One)'), 
    'sTSqa7GJe2frZz6Rs', true)

WebUI.setText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Activity date_activityDa'), 
    '2019-07-31')

WebUI.setText(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/input_Activity duration (in mi'), 
    '6')

WebUI.selectOptionByValue(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/select_(Select One)           _1'), 
    'AwXqAiJsiPWgxe53R', true)

WebUI.click(findTestObject('Object Repository/Activities/New Activities Added/Page_GeriLife/button_Save'))


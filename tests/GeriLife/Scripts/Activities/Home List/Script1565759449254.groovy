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

WebUI.setText(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/input_Email_at-field-email'), 'payalchoksey@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/input_Password_at-field-passwo'), 
    'kbs23wq117C4z+7JL/PnBA==')

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/button_Sign In'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/a_              Homes'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/span_Puistola'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/button_View'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/td_Moderate'))

WebUI.back()

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/td_Inactive'))

WebUI.back()

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/h2_             Residents'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/div_            Activity level'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/div_        Activities'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/th_Level'))

WebUI.click(findTestObject('Object Repository/Activities/Home List/Page_GeriLife/td_Moderate'))


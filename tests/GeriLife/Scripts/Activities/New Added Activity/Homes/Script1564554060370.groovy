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

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/a_              Homes'))

WebUI.verifyMatch('Activity levels', 'Activity levels', false)

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/button_View'))

WebUI.delay(5)

WebUI.verifyElementText(findTestObject('Activities/Residents/Page_GeriLife/div_            Activity level'), '  Activity level trends')

WebUI.verifyElementText(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/div_        Activities'), '  Activities')

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/a_Resident activity summary'))

WebUI.verifyElementText(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/h3_Activity summary by residen'), 
    'Activity summary by resident  (last 7 days)')

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/label_Activity count'))

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/label_Activity minutes'))

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/label_7 days'))

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/label_30 days'))

WebUI.verifyElementText(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/h3_Activity type'), 'Activity type')

WebUI.verifyElementText(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/h3_Facilitator role'), 'Facilitator role')

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/a_Activity table'))

WebUI.verifyMatch('Residents', 'Residents', false)

WebUI.verifyMatch('Activity Type', 'Activity Type', false)

WebUI.verifyMatch('Duration', 'Duration', false)

WebUI.verifyMatch('Activity Date', 'Activity Date', false)

WebUI.verifyElementText(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/h2_Activities'), 'Activities')

WebUI.click(findTestObject('Object Repository/Activities/Residents/Page_GeriLife/div_Activities'))

WebUI.closeBrowser()


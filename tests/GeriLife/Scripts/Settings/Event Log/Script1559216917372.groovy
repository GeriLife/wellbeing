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
 * Verifying all the text element on the event log
 */

//Clicking on Settings
WebUI.click(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/a_                  Settings'))

//Clicking on Event Log
WebUI.click(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/span_Event Log'))

//Verifying text event log
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/h1_      Event Log'), '  Event Log')

//Verifying text event date
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/th_eventDate'), 'eventDate  ')

//Verifying the text user id
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/th_userId'), 'userId')

//Verifying the text action
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/th_action'), 'action')

//Verifying the text entity type
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/th_entityType'), 'entityType')

//Verifying the text entity id
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Event Log/Page_GeriLife/th_entityId'), 'entityId')

// Clicking on GeriLife logo
WebUI.click(findTestObject('Object Repository/Settings/Date/Page_GeriLife/b_GeriLife'))
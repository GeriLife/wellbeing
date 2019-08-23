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

// Clicking on Activities
WebUI.click(findTestObject('Page_GeriLife/a_              Activities'))

WebUI.delay(5)
// Selecting Resident
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), '3KKnpKnw4CqurEW5H', true)

// Selecting Activity Type
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose activity type'), 'r3WYaG8KFrkbHXTpa', true)

// Selecting Activity Type
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose activity type'), 'YrgPdzGkqNzbjWLxA', true)

// Clicking on Activity Type
WebUI.click(findTestObject('Activities/Page_GeriLife/td_Musiikki'))

// Clicking to Clear the filters
WebUI.click(findTestObject('Activities/Page_GeriLife/button_Clear filters'))

// Selecting Resident
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), 'D7mqjSZpsK5BZkDGD', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), 'MkLHnWkg9eDfs25BS', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), 'WwnYxKS8v2dJG8WZj', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), '3KKnpKnw4CqurEW5H', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), 'D7mqjSZpsK5BZkDGD', true)

// Clicking to Clear filters
WebUI.click(findTestObject('Activities/Page_GeriLife/button_Clear filters'))

WebUI.takeScreenshot('~/Katalon/Activities/ClearFilters')


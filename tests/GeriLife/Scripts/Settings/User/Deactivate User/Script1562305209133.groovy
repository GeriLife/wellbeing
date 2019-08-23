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

// Clicking on Edit Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Edit (2)'))

// Verifyinf the Deactivate On text
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_Deactivate on (1)'), 'Deactivate on')

// Clicking to Save the Edit User
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save (3)'))

// Clicking on Edit button
WebUI.click(findTestObject('Settings/Users/Page_GeriLife/button_Edit'))

// Setting the date to deactivate the user
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Deactivate on_deactivate'), '12-07-2019')

// Clicking to Save the Edit User
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save (3)'))

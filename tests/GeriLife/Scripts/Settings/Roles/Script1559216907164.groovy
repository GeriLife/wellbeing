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

//Clikcing on Settings
WebUI.click(findTestObject('Settings/Role/Page_GeriLife/a_                  Settings'))

//Cliking on Roles
WebUI.click(findTestObject('Page_GeriLife/a_            Roles'))

//Verifying Roles text
WebUI.verifyElementText(findTestObject('Page_GeriLife/h1_      Roles'), '  Roles')

//Verifing Henkiökunta text
WebUI.verifyElementText(findTestObject('Page_GeriLife/td_Henkikunta'), 'Henkiökunta')

// Verifying Itse text
WebUI.verifyElementText(findTestObject('Page_GeriLife/td_Itse'), 'Itse')

//Verifying Perhe text
WebUI.verifyElementText(findTestObject('Page_GeriLife/td_Perhe'), 'Perhe')

WebUI.delay(2)

// Clikcing on Add Role button
WebUI.click(findTestObject('Page_GeriLife/button_Add Role'), FailureHandling.STOP_ON_FAILURE)

WebUI.delay(2)

// Adding a new role
WebUI.setText(findTestObject('Page_GeriLife/input_Role name_name'), 'Role Added8')

//Clicking on Save button
WebUI.click(findTestObject('Page_GeriLife/button_Save'))

WebUI.delay(5)

//Clicking on Add Role button
WebUI.click(findTestObject('Page_GeriLife/button_Add Role'))

WebUI.delay(2)

//Verifying text Create new role
WebUI.verifyElementText(findTestObject('Page_GeriLife/h4_            Create new Role'), '  Create new Role')

//Verifying Role name text
WebUI.verifyElementText(findTestObject('Page_GeriLife/label_Role name'), 'Role name')

//Verifying cancel button
WebUI.click(findTestObject('Page_GeriLife/button_Cancel'))

WebUI.delay(5)

//Verifying Add Role button
WebUI.click(findTestObject('Page_GeriLife/button_Add Role'))

WebUI.delay(5)

//Clicking on Save button
WebUI.click(findTestObject('Page_GeriLife/button_Save'))

WebUI.delay(5)

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Settings/AddingRoles')

//Clikcing on Cancel button
WebUI.click(findTestObject('Page_GeriLife/button_Cancel'))

WebUI.delay(5)

//Clicking on GeriLife Logo
WebUI.click(findTestObject('Settings/Role/Page_GeriLife/b_GeriLife'))


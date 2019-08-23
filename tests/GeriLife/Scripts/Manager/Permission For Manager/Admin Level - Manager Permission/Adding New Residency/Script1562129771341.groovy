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
 * Scenario 2 :  Adding a New Residency
 */
//Clicking on Residents
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Residents'))

// Adding new Residency
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Add new Residency'))

// Entering First Name
WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_First name_firstName'), 'New')

// Entering the Last Initials
WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_Last initial_lastInitial'), 
    'R')

// Selecting a value
WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)'), 
    'MRF8A56WAtkjjBPS3', true)

// Clicking on Move in date
WebUI.click(findTestObject('Assign Manager/Admin Level/Page_GeriLife/input_Move in date (arrival)_m'))

WebUI.delay(7)

// Setting the Move in Date
WebUI.setText(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/input_Move in date (arrival)_m'), 
    '2019-06-28')

// Clicking on Save button
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_1'))

WebUI.delay(5)


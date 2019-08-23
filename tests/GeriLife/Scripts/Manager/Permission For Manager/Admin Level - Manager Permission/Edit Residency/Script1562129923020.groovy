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
 * Edit Residency
 */
// Clicking on Residents
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/a_              Residents (1)'))

// Clicking on Edit Residency
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Edit Residency'))

// Selecting one option from Resident
WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _2'), 
    'HtgskRe32QEdejBf5', true)
Count = WebUI.getNumberOfSelectedOption(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _2'))
println("Total of Resident are :" + Count)
WebUI.verifyEqual(Count, 20)

// Selection one option drom Homes
WebUI.selectOptionByValue(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _3'), 
    'MRF8A56WAtkjjBPS3', true)

Count1 = WebUI.getNumberOfSelectedOption(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/select_(Select One)           _3'))
println("Total of Resident are :" + Count1)
WebUI.verifyEqual(Count1, 20)

// Clicking on Save Button
WebUI.click(findTestObject('Object Repository/Assign Manager/Admin Level/Page_GeriLife/button_Save_1 (1)'))


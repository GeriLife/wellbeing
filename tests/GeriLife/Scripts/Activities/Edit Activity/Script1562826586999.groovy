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

WebUI.click(findTestObject('Page_GeriLife/a_              Activities'))

// Selecting an Option to Edit
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose resident'), '3KKnpKnw4CqurEW5H', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose activity type'), 'r3WYaG8KFrkbHXTpa', true)

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Choose activity type'), 'HSv4gRM2RoMEtqmLE', true)

// Clicking on Edit button to Edit Activity
WebUI.click(findTestObject('Activities/Page_GeriLife/button_    Edit'))


WebUI.click(findTestObject('Activities/Page_GeriLife/div_Emory Kx'))

WebUI.delay(5)

// Selecting a Resident to Edit the Activity
WebUI.click(findTestObject('Activities/Page_GeriLife/div_Chandler G'))

// Option is selected for Resident
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Chandler G            D'), 'WwnYxKS8v2dJG8WZj', 
    true)

// Entering the Activity duration to edit it
WebUI.setText(findTestObject('Activities/Page_GeriLife/input_Activity duration (in mi'), '11')

WebUI.delay(5)

// Saving the Activity after Editing
WebUI.click(findTestObject('Page_GeriLife/button_Save'))


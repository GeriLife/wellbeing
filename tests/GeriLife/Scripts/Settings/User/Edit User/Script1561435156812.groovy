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

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Edit'))

// Selecting Admin Rights
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Is admin_isAdmin'))

//Clicking on Save Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save (1)'))

//Editing 
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Edit'))

// Editing the user
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/h4_             Edit user'))

// Verifying all text on Edit User
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_Email (1)'))

// Clicking on System Admin
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_System administrator (1)'))

// Entering Email address
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Email_email (1)'), 'payal+admin1@gmail.com')

// Clikcing on Admin
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Is admin_isAdmin'))

// Saving the changes
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save (1)'))

// Clicking on Edit
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Edit'))

// Clicking on Cancel button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Cancel (1)'))

// Assigning Groups to User
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Groups'))

// Selecting groups
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_Select one or more groups'))

// Clikcing on Onnela
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/div_Onnela'))

// Selecting option Onnela
WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'ucdvFZoEzjkTrNTtZ', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x_ss-plus ss-cross'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save_1'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Groups'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/div_Onnelax'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/div_Tammela'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'ucdvFZoEzjkTrNTtZ', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/div_Puistola'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'dmGPP2tv6o3vs5Kxn', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/div_Homes 1'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'Ys2aTJRHg9RL2nwxx', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x'))

WebUI.deselectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'Ys2aTJRHg9RL2nwxx', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x_ss-plus ss-cross_1'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save_2'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Groups'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Cancel (1)'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/i_Groups_fa fa-cubes'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x'))

WebUI.selectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'ucdvFZoEzjkTrNTtZ', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x'))

WebUI.deselectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'm3X2HFs3MKZQEttMY', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/span_x'))

WebUI.deselectOptionByValue(findTestObject('Object Repository/Settings/Users/Page_GeriLife/select_Onnela            Tamme'), 
    'ucdvFZoEzjkTrNTtZ', true)

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save_3'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Groups'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/h4_            Edit user group'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_Group(s)'))

WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save_4'))


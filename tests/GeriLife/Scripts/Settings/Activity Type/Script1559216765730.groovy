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
 *
Scenario 1: Clicking on Add Activity Type and Cancelling the popup
 */
//Clicking on Settings button
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/a_                  Settings'))

//Clicking on Activity Types
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/span_Activity Types'))

//Clicking on Add Activity Type
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_Add Activity Type'))

WebUI.delay(5)

//Clicking on cancel button
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_Cancel'))

WebUI.delay(5)

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Settings/ActivityType')
/*
 * Scenario 2 : Saving a New Activity Type
 */
//Clicking on Add Button
WebUI.click(findTestObject('Settings/Activity Type/Page_GeriLife/button_Add Activity Type'))

WebUI.delay(5)
//Adding new activity
WebUI.setText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/input_Name_name'), 'New Activity')

//Clikcing on save button
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_Save'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Settings/ActivityTypeSave')

WebUI.delay(5)
/*
 * Scenario 3: Deleting an Activity Type
 */
//Clicking to delete an activity
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_New Activity_delete-activity-type btn btn-danger pull-right'))

WebUI.delay(5)
//Clicking on Cancel button
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_No cancel'))

/*
 * Deleting an Activity
 */
WebUI.delay(5)
//Clicking on Delete button
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_New Activity_delete-activity-type btn btn-danger pull-right'))

WebUI.delay(5)
//Accepting to delete an activity
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/h4_            Delete activity type'))

//WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/div_Do you want to delete this activity type'), 
//    'Do you want to Delete this activity')
WebUI.click(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/button_Yes delete'))

//Capturing screenshot
WebUI.takeScreenshot('~/Katalon/Settings/DeleteActivity')

/*
 * Verifying all text for Activity Type
 */
// Verifying the text Lukeminen
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Lukeminen'), 'Lukeminen')

//Verifying the text Musiikki
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Musiikki'), 'Musiikki')

//Verifying the text Retki
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Retki'), 'Retki')

//Verifying the text Taide
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Taide'), 'Taide')

//Verifying the text Tapahtuma
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Tapahtuma (esim konsertti)'), 
    'Tapahtuma (esim. konsertti)')

//Verifying the text Ulkoilu
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/td_Ulkoilu'), 'Ulkoilu')

WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/p_ For data integrity activity types can only be removed when they are related to no recorded activities'), 
    '* For data integrity, activity types can only be removed when they are related to no recorded activities.')

//Verifying the text Activity Types
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Activity Type/Page_GeriLife/h1_      Activity Types'), 
    '  Activity Types')

//Clicking on GeriLife logo
WebUI.click(findTestObject('Settings/Page_GeriLife/b_GeriLife'))


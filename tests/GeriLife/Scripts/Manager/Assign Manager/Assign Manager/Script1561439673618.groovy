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
 * Scenario 1 : Adding New Group
 */




WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/a_              Homes'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_        Add Group'))

WebUI.delay(5)

WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Group name_name'), 'New Group')

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Save'))

WebUI.delay(5)

/*
 * Scenario 2 : Cancelling the Assign Manager Popup
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/h2_Assign a manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Users'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/label_Add new manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_No manager assigned curren'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

/*
 * Scenario 3 : Without Entering User trying to Submit on Assign Manager Popup. Displays a validation message
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_          Users is require'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

/*
 * Scenario 4 : Selecting only One User 
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Select a user'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_x_ss-plus ss-cross'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Filter'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/a_payalchokseygmail.com_revoke'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_          Manager access r'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign a manager_closeA'))

WebUI.delay(5)

/*
 * Scenario 5: Selecting Multiple Users to be assigned as Manager
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/span_Select a user'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payalchokseygmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_gerilife440gmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_payaladmin1gmail.com'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_x_ss-add'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_x_ss-add'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/div_Users'))

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Submit'))

WebUI.delay(5)

/*
 * Scenario 6: Checking with the filters
 */
WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/button_Assign Manager'))

WebUI.delay(5)

WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Filter_reactive-table-in'), 'Ger')

WebUI.setText(findTestObject('Object Repository/Assign Manager/Page_GeriLife/input_Filter_reactive-table-in'), 'b')

WebUI.click(findTestObject('Object Repository/Assign Manager/Page_GeriLife/i_Assign a manager_fa fa-remov'))

WebUI.closeBrowser()


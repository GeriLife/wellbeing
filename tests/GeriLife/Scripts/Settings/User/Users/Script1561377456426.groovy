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

// Clikcing on Settings
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/a_                  Settings'))

//Clikcing on Users
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/a_            Users'))

//Clicking on Add Users
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Add User'))

WebUI.delay(5)

//Clicking on Cancel
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Cancel'))

WebUI.delay(5)

//Clicking on Add Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Add User'))

WebUI.delay(5)

// Entering Email Address
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Email_email'), 'payal+usertest@gmail.com')

//Entering Password
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Password_password'), 'payal123')

//Clicking on Save Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save'))

WebUI.delay(5)

//Clikcing on Add User
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Add User'))

WebUI.delay(5)

// ENtering Email address
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Email_email'), 'payal+usertest2@gmail.com')

// Entering Password
WebUI.setText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_Password_password'), 'payal123')

// Selecting Admin
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/input_System administrator_isA'))

// Saving
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Save'))

WebUI.delay(5)

// Adding user
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Add User'))

// Verifying text
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/h4_            Create new User'), 
    '  Create new User')

// Verifying text Email
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_Email'), 'Email')

// Verifying text Password
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_Password'), 'Password')

// Verifying text Admin
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/label_System administrator'), 'System administrator')

// Clicking on Cancel Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Cancel'))

WebUI.delay(5)

// Clicking on Delete Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Delete'))

WebUI.delay(5)

// // Verifying text
WebUI.verifyElementText(findTestObject('Object Repository/Settings/Users/Page_GeriLife/h4_             Delete user'), '  Delete user')

// Clicking on Cancel Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_No cancel.'))

WebUI.delay(5)

// Clicking on Delete Button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Delete'))

WebUI.delay(5)

// Clicking on Delete
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Yes delete.'))

WebUI.delay(5)

// Clicking on Delete
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Delete'))

WebUI.delay(5)

// Clicking on Yes button
WebUI.click(findTestObject('Object Repository/Settings/Users/Page_GeriLife/button_Yes delete.'))


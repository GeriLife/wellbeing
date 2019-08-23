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
 * Sending an invite to user through Enrol user.
 */
//Clikcing on Users
WebUI.click(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/a_            Users (1)'))

// Clicking on Enrol User
WebUI.click(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/h2_Enroll users (1)'))

WebUI.click(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/p_Create one or more user acco (1)'))

// Verifying text Subject
WebUI.verifyElementText(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/label_Subject (1)'), 'Subject')

// Verifying text Message
WebUI.verifyElementText(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/label_Message (1)'), 'Message')

// Verifying text Email Address
WebUI.verifyElementText(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/div_Email addresses (1)'), 'Email Addresses')

// Verfiying text Groups
WebUI.verifyElementText(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/div_Group(s) (1)'), 'Groups')

/*
 * Sending invite without entering subject, message and email.
 */
// Cliksing on Send Invite Button
WebUI.click(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/button_Send invite(s) (1)'))

// Verifying text " Subject is required "
WebUI.verifyElementText(findTestObject('Object Repository/Settings/EnrolUser/Page_GeriLife/div_          Subject is requi (1)'), 
    'Subject is required.')


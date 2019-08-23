import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import org.openqa.selenium.Keys as Keys
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

// Adding the details in Add Activity Page
WebUI.click(findTestObject('Page_GeriLife/button_Add Activity'))

//Screenshit is captured when Add Activity popup is displayed
WebUI.takeScreenshot('~/Katalon/Activities/AddActivity')

WebUI.delay(7)

// Selecting Resident
WebUI.click(findTestObject('Page_GeriLife/span_Select resident(s)'))

WebUI.delay(5)

// Resident is selected
WebUI.click(findTestObject('Activities/Page_GeriLife/div_Chandler G'))

// Options of Resident is selected
WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_Chandler G            D'), 'WwnYxKS8v2dJG8WZj', 
    true)

WebUI.click(findTestObject('Activities/Page_GeriLife/span_x_ss-plus ss-cross'))

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_(Select One)'), 'HSv4gRM2RoMEtqmLE', true)

// Entering Activity Duration
WebUI.setText(findTestObject('Activities/Page_GeriLife/input_Activity duration (in mi'), '10')

WebUI.selectOptionByValue(findTestObject('Activities/Page_GeriLife/select_(Select One)           _1'), 'zuEaopcPsebadkBJc', 
    true)

WebUI.delay(5)

WebUI.focus(findTestObject('Activities/Page_GeriLife/input_Activity date_activityDa'))

WebUI.executeJavaScript('$(\':input\').removeAttr(\'readonly\')', [])

WebUI.delay(5)
// Entering Activity Date
WebUI.setText(findTestObject('Activities/Page_GeriLife/input_Activity date_activityDa'), '2019-08-06')

//Capturing Screenshot
WebUI.takeScreenshot('~/Katalon/Activities/AddActivity1')

WebUI.sendKeys(findTestObject('Activities/Page_GeriLife/input_Activity date_activityDa'), Keys.chord(Keys.ENTER))


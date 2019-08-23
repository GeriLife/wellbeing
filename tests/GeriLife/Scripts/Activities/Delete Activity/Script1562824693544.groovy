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
import com.kms.katalon.core.util.KeywordUtil as KeywordUtil
// Clicking on Activities
WebUI.click(findTestObject('Object Repository/Activities/Page_GeriLife/a_              Activities'))

//Clicking on Delete Button
WebUI.click(findTestObject('Object Repository/Activities/Page_GeriLife/button_    Delete'))

WebUI.delay(5)

// Verifying the Delete Activity 
if(WebUI.verifyElementText(findTestObject('Object Repository/Activities/Page_GeriLife/h4_            Delete activity'), '  Delete activity'))
{
	
 KeywordUtil.logInfo('Correct URL is opened for Activites')
	WebUI.takeScreenshot('~/Katalon/Activities/VAcitivitesPage')
} else {
    KeywordUtil.logInfo('Incorrect URL is opened for Activities')
	WebUI.takeScreenshot('~/Katalon/Activities/INVAcitivitesPage')
}
WebUI.delay(5)

//WebUI.verifyElementText(findTestObject('Activities/Page_GeriLife/div_Do you want to delete this'), 'Do you want to delete')
WebUI.click(findTestObject('Activities/Page_GeriLife/button_Cancel_1'))

WebUI.delay(5)

//Clicking to delete the activity
WebUI.click(findTestObject('Object Repository/Activities/Page_GeriLife/i_Delete_fa fa-trash'))

WebUI.delay(5)

// Activity deleted
WebUI.click(findTestObject('Object Repository/Activities/Page_GeriLife/button_Delete'))

